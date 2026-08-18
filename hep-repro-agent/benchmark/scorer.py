"""Benchmark scoring engine for HEP agent tasks."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml


@dataclass
class TaskScore:
    task_id: str
    passed: bool
    scores: dict[str, float] = field(default_factory=dict)
    weighted_total: float = 0.0
    details: dict[str, Any] = field(default_factory=dict)
    human_review_required: bool = False

    def to_dict(self) -> dict[str, Any]:
        return {
            "task_id": self.task_id,
            "passed": self.passed,
            "scores": self.scores,
            "weighted_total": round(self.weighted_total, 4),
            "details": self.details,
            "human_review_required": self.human_review_required,
        }


def load_benchmark_config(config_dir: Path | None = None) -> dict[str, Any]:
    config_dir = config_dir or Path(__file__).resolve().parents[1] / "benchmark"
    with (config_dir / "tasks.yaml").open() as f:
        return yaml.safe_load(f)


def score_dimension(name: str, criteria: dict[str, Any], result: dict[str, Any]) -> tuple[float, dict[str, Any]]:
    """Score a single dimension 0.0–1.0 based on task result vs criteria."""
    detail: dict[str, Any] = {"dimension": name}
    score = 1.0

    if name == "physics_accuracy":
        if criteria.get("all_invariants_pass"):
            score = 1.0 if result.get("validation_passed") else 0.0
            detail["validation_passed"] = result.get("validation_passed")
        elif "jpsi_mass_tolerance_gev" in criteria:
            fit = result.get("fit", {})
            expected = criteria.get("jpsi_mass_gev", 3.096)
            tol = criteria["jpsi_mass_tolerance_gev"]
            if fit.get("status") == "ok":
                delta = abs(fit.get("mass_gev", 0) - expected)
                score = max(0.0, 1.0 - delta / tol) if delta <= tol else 0.0
                detail["mass_delta_gev"] = delta
            elif fit.get("status") == "insufficient_data" and result.get("dry_run"):
                score = 0.5  # partial credit in dry-run with low stats
                detail["note"] = "insufficient_data in dry-run"
            else:
                score = 0.0
        elif "cutflow_efficiency_min" in criteria:
            cf = result.get("cutflow", {})
            init = cf.get("initial", 1) or 1
            final = cf.get("final", 0)
            eff = final / init
            score = 1.0 if eff >= criteria["cutflow_efficiency_min"] else eff / criteria["cutflow_efficiency_min"]
            detail["efficiency"] = eff
        elif "os_ss_ratio_range" in criteria:
            ratio = result.get("os_ss_ratio", 1.0)
            lo, hi = criteria["os_ss_ratio_range"]
            score = 1.0 if lo <= ratio <= hi else 0.0
            detail["os_ss_ratio"] = ratio
        elif "max_relative_uncertainty" in criteria:
            rel = result.get("max_relative_uncertainty", 0)
            score = 1.0 if rel <= criteria["max_relative_uncertainty"] else 0.0
            detail["max_relative_uncertainty"] = rel
        elif "corrected_mean_shift_pct_max" in criteria:
            shift = abs(result.get("mean_shift_pct", 0))
            score = 1.0 if shift <= criteria["corrected_mean_shift_pct_max"] else 0.0
            detail["mean_shift_pct"] = shift

    elif name == "reproducibility":
        score = 1.0
        if criteria.get("requires_trace"):
            score *= 1.0 if result.get("has_trace") else 0.0
            detail["has_trace"] = result.get("has_trace")
        if criteria.get("requires_pinned_config"):
            score *= 1.0 if result.get("pinned_config") else 0.0
        if criteria.get("requires_reana_yaml"):
            score *= 1.0 if result.get("reana_spec_exists") else 0.0

    elif name == "tool_reliability":
        failures = result.get("tool_failures", 0)
        max_retries = criteria.get("max_retries", 1)
        score = 1.0 if failures <= max_retries else max(0.0, 1.0 - failures * 0.25)
        detail["tool_failures"] = failures

    elif name == "cost":
        events = result.get("max_events", 0)
        limit = criteria.get("max_events_dry_run", 10000)
        score = 1.0 if events <= limit else max(0.0, limit / events)
        detail["max_events"] = events

    elif name == "human_review_burden":
        if criteria.get("auto_pass_if_validation_ok") and result.get("validation_passed"):
            score = 1.0
        elif criteria.get("requires_manual_signoff"):
            score = 0.5  # always needs human for hard tasks
            detail["manual_signoff"] = True
        else:
            score = 1.0 if result.get("validation_passed") else 0.3

    detail["score"] = round(score, 4)
    return score, detail


def score_task(task: dict[str, Any], result: dict[str, Any], weights: dict[str, float]) -> TaskScore:
    """Compute weighted score for one benchmark task."""
    scores: dict[str, float] = {}
    details: dict[str, Any] = {"dimensions": {}}

    for dim, weight in weights.items():
        criteria = task.get("scoring", {}).get(dim, {})
        s, d = score_dimension(dim, criteria, result)
        scores[dim] = s
        details["dimensions"][dim] = d

    weighted = sum(scores.get(d, 0) * w for d, w in weights.items())
    acceptance = task.get("acceptance", {})
    passed = _check_acceptance(acceptance, result)

    human_review = any(
        task.get("scoring", {}).get(dim, {}).get("requires_manual_signoff")
        for dim in weights
    ) or task.get("scoring", {}).get("human_review_burden", {}).get("requires_manual_signoff", False)

    return TaskScore(
        task_id=task["id"],
        passed=passed,
        scores=scores,
        weighted_total=weighted,
        details=details,
        human_review_required=bool(human_review),
    )


def _check_acceptance(criteria: dict[str, Any], result: dict[str, Any]) -> bool:
    if criteria.get("cutflow_monotonic") and not result.get("cutflow_monotonic", True):
        return False
    if "min_final_events" in criteria and result.get("cutflow", {}).get("final", 0) < criteria["min_final_events"]:
        return False
    if criteria.get("plot_exists") and not result.get("plot_exists"):
        return False
    if criteria.get("validation_passed") and not result.get("validation_passed"):
        return False
    if criteria.get("report_generated") and not result.get("report_generated"):
        return False
    if criteria.get("reana_spec_valid") and not result.get("reana_spec_exists"):
        return False
    if criteria.get("fit_converged") and result.get("fit", {}).get("status") != "ok":
        # allow partial pass in dry-run
        if not (result.get("dry_run") and result.get("fit", {}).get("status") == "insufficient_data"):
            return False
    if criteria.get("correction_applied") and not result.get("correction_applied"):
        return False
    if criteria.get("os_ss_ratio_computed") and result.get("os_ss_ratio") is None:
        return False
    if criteria.get("poisson_errors_computed") and not result.get("poisson_errors_computed"):
        return False
    return True


def write_benchmark_report(results: list[TaskScore], path: Path) -> Path:
    summary = {
        "tasks": [r.to_dict() for r in results],
        "passed": sum(1 for r in results if r.passed),
        "total": len(results),
        "mean_weighted_score": round(sum(r.weighted_total for r in results) / max(len(results), 1), 4),
        "human_review_required": any(r.human_review_required for r in results),
    }
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(summary, indent=2))
    return path
