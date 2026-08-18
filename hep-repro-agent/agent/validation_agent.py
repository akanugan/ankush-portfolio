"""Independent validation agent — checks physics invariants before report."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml


@dataclass
class ValidationResult:
    passed: bool
    checks: list[dict[str, Any]] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "passed": self.passed,
            "checks": self.checks,
            "errors": self.errors,
            "warnings": self.warnings,
        }


def load_invariants(config_dir: Path | None = None) -> dict[str, Any]:
    config_dir = config_dir or Path(__file__).resolve().parents[1] / "config"
    with (config_dir / "invariants.yaml").open() as f:
        return yaml.safe_load(f)


def validate_analysis_outputs(output_dir: Path, config_dir: Path | None = None) -> ValidationResult:
    """Run all invariant checks on analysis artifacts."""
    output_dir = Path(output_dir)
    result = ValidationResult(passed=True)

    summary_path = output_dir / "summary.json"
    cutflow_path = output_dir / "cutflow.json"
    fit_path = output_dir / "fit_results.json"

    if not summary_path.exists():
        result.passed = False
        result.errors.append("Missing summary.json")
        return result

    summary = json.loads(summary_path.read_text())
    cutflow = json.loads(cutflow_path.read_text()) if cutflow_path.exists() else {}
    fit = json.loads(fit_path.read_text()) if fit_path.exists() else {}
    invariants = load_invariants(config_dir)

    # Cut-flow monotonicity
    steps = cutflow.get("steps", [])
    counts = [s["passing"] for s in steps]
    monotonic = all(counts[i] >= counts[i + 1] for i in range(len(counts) - 1)) if len(counts) > 1 else True
    result.checks.append({"name": "cutflow_monotonic", "passed": monotonic, "counts": counts})
    if not monotonic:
        result.passed = False
        result.errors.append("Cut-flow is not monotonically non-increasing")

    # Minimum selected events
    final = cutflow.get("final", 0)
    min_ev = invariants["invariants"]["min_selected_events"]["min"]
    ok_min = final >= min_ev
    result.checks.append({"name": "min_selected_events", "passed": ok_min, "final": final, "min": min_ev})
    if not ok_min:
        result.passed = False
        result.errors.append(f"Too few selected events: {final} < {min_ev}")

    # J/ψ peak (warning level)
    jpsi = invariants["invariants"]["jpsi_peak"]
    fit_ok = fit.get("status") == "ok"
    mass = fit.get("mass_gev", 0)
    in_window = abs(mass - jpsi["mass_gev"]) < jpsi["window_gev"] if fit_ok else False
    result.checks.append({
        "name": "jpsi_peak",
        "passed": in_window or fit.get("status") == "insufficient_data",
        "fit_mass_gev": mass,
        "expected_gev": jpsi["mass_gev"],
    })
    if fit_ok and not in_window:
        result.warnings.append(f"J/ψ fit mass {mass:.3f} GeV outside expected window")

    # Trace file exists
    traces = list(output_dir.glob("trace_*.jsonl"))
    result.checks.append({"name": "tool_traces", "passed": len(traces) > 0, "count": len(traces)})

    # Human disclaimer marker in summary
    result.checks.append({
        "name": "analysis_complete",
        "passed": summary.get("cutflow") is not None,
    })

    return result
