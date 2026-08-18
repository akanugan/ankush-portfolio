"""Main agent orchestrator — NL request to analysis pipeline."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

from agent.guardrails import check_execution
from agent.report import render_report, write_report
from agent.traces import TraceLogger
from agent.validation_agent import validate_analysis_outputs
from analysis.dimuon_processor import run_dimuon_analysis


INTENT_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"dimuon|di-muon|di muon|mass spectrum", re.I), "cms_dimuon_2011_doublemu"),
    (re.compile(r"2012|Run2012", re.I), "cms_dimuon_2012_doublemu"),
    (re.compile(r"2011|Run2011", re.I), "cms_dimuon_2011_doublemu"),
]


def parse_request(request: str, datasets_cfg: dict) -> str:
    """Map natural-language request to a pinned dataset key."""
    for pattern, key in INTENT_PATTERNS:
        if pattern.search(request) and key in datasets_cfg["datasets"]:
            return key
    return datasets_cfg["default_dataset"]


def load_configs(base: Path) -> tuple[dict, dict]:
    with (base / "config" / "datasets.yaml").open() as f:
        datasets = yaml.safe_load(f)
    with (base / "config" / "containers.yaml").open() as f:
        containers = yaml.safe_load(f)
    return datasets, containers


def run_pipeline(
    request: str,
    *,
    base_dir: Path | None = None,
    dry_run: bool = False,
    max_events: int | None = 5000,
    approve_expensive: bool = False,
    submit_reana: bool = False,
    output_dir: Path | None = None,
) -> dict:
    base_dir = base_dir or Path(__file__).resolve().parents[1]
    datasets_cfg, containers_cfg = load_configs(base_dir)

    dataset_key = parse_request(request, datasets_cfg)
    ds = datasets_cfg["datasets"][dataset_key]
    container = containers_cfg["containers"][containers_cfg["default"]]["image"]

    out = output_dir or base_dir / "outputs" / "agent_run"
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)

    trace = TraceLogger(out)
    trace.log("orchestrator", "parse_request", request=request, dataset=dataset_key)

    use_xrootd = not dry_run
    decision = check_execution(
        max_events=max_events,
        use_xrootd=use_xrootd,
        submit_reana=submit_reana,
        approve_expensive=approve_expensive,
    )
    trace.log("guardrails", "check_execution", decision=decision.reason, allowed=decision.allowed)

    if not decision.allowed:
        raise RuntimeError(decision.reason)

    trace.log("analysis", "start", dataset=dataset_key, dry_run=dry_run)
    source = None if dry_run else ds.get("xrootd")
    summary = run_dimuon_analysis(
        source,
        dry_run=dry_run,
        max_events=max_events,
        output_dir=out,
    )
    trace.log("analysis", "complete", summary_keys=list(summary.keys()))

    reana_result = None
    if submit_reana:
        from agent.reana_client import submission_to_dict, submit_workflow

        spec = base_dir / "reana" / ("reana.yaml" if dry_run else "reana-production.yaml")
        trace.log("reana", "submit_start", spec=str(spec))
        sub = submit_workflow(
            spec,
            workflow_name=f"hep-repro-{trace.run_id}",
            parameters={"MAX_EVENTS": str(max_events or 50000)},
        )
        reana_result = submission_to_dict(sub)
        trace.log("reana", "submit_complete", **reana_result)

    validation = validate_analysis_outputs(out)
    trace.log("validation_agent", "complete", passed=validation.passed)

    if not validation.passed:
        trace.log("orchestrator", "blocked", reason="validation_failed")
        raise RuntimeError(
            "Validation agent failed: " + "; ".join(validation.errors)
        )

    report_md = render_report(
        request=request,
        run_id=trace.run_id,
        summary=summary,
        validation=validation,
        trace_path=trace.trace_path,
        dataset_key=dataset_key,
        container_image=container,
    )
    report_path = write_report(out / "reproducibility_report.md", report_md)
    trace.log("report", "written", path=str(report_path))

    result = {
        "run_id": trace.run_id,
        "dataset": dataset_key,
        "validation_passed": validation.passed,
        "output_dir": str(out),
        "report": str(report_path),
        "trace": str(trace.trace_path),
    }
    if reana_result:
        result["reana"] = reana_result
    (out / "pipeline_result.json").write_text(json.dumps(result, indent=2))
    return result


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="Reproducible HEP Analysis Agent")
    parser.add_argument("request", nargs="?", default="Reproduce CMS dimuon mass spectrum")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--max-events", type=int, default=5000)
    parser.add_argument("--output-dir", type=Path, default=None)
    parser.add_argument("--approve-expensive", action="store_true")
    parser.add_argument("--submit-reana", action="store_true", help="Submit REANA workflow after local analysis")
    parser.add_argument("--production", action="store_true", help="Use real XRootD data (implies not dry-run)")
    args = parser.parse_args(argv)

    dry_run = args.dry_run and not args.production

    try:
        result = run_pipeline(
            args.request,
            dry_run=dry_run,
            max_events=args.max_events,
            approve_expensive=args.approve_expensive or args.production,
            submit_reana=args.submit_reana,
            output_dir=args.output_dir,
        )
        print(json.dumps(result, indent=2))
    except RuntimeError as exc:
        print(json.dumps({"error": str(exc)}, indent=2), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
