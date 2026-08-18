"""Benchmark task runner CLI."""

from __future__ import annotations

import argparse
import importlib
import json
import sys
from pathlib import Path

import yaml

from benchmark.scorer import load_benchmark_config, score_task, write_benchmark_report
from benchmark.tasks import (
    background_estimation,
    detector_correction,
    histogram_reproduction,
    paper_reproduction,
    statistical_inference,
    uncertainty_propagation,
)

RUNNERS = {
    "benchmark.tasks.histogram_reproduction": histogram_reproduction,
    "benchmark.tasks.detector_correction": detector_correction,
    "benchmark.tasks.background_estimation": background_estimation,
    "benchmark.tasks.uncertainty_propagation": uncertainty_propagation,
    "benchmark.tasks.statistical_inference": statistical_inference,
    "benchmark.tasks.paper_reproduction": paper_reproduction,
}


def run_task(task: dict, output_dir: Path, *, production: bool = False) -> dict:
    runner_path = task["runner"]
    fn = RUNNERS.get(runner_path)
    if fn is None:
        mod_name, func_name = runner_path.rsplit(".", 1)
        mod = importlib.import_module(mod_name)
        fn = getattr(mod, func_name)

    dry_run = not production and task.get("mode", "dry_run") == "dry_run"
    max_events = task.get("scoring", {}).get("cost", {}).get("max_events_dry_run", 5000)
    if production:
        max_events = task.get("scoring", {}).get("cost", {}).get("max_events_production", 50000)

    return fn(output_dir, dry_run=dry_run, max_events=max_events)


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="HEP Agent Benchmark runner")
    parser.add_argument("--task", help="Run single task by id (default: all)")
    parser.add_argument("--output-dir", type=Path, default=Path("outputs/benchmark"))
    parser.add_argument("--production", action="store_true", help="Use XRootD real data (requires approval)")
    parser.add_argument("--approve-expensive", action="store_true")
    args = parser.parse_args(argv)

    if args.production and not args.approve_expensive:
        print(json.dumps({"error": "Production benchmark requires --approve-expensive"}), file=sys.stderr)
        sys.exit(1)

    cfg = load_benchmark_config()
    weights = cfg["scoring_weights"]
    tasks = cfg["tasks"]

    if args.task:
        tasks = [t for t in tasks if t["id"] == args.task]
        if not tasks:
            print(json.dumps({"error": f"Unknown task: {args.task}"}), file=sys.stderr)
            sys.exit(1)

    results = []
    for task in tasks:
        task_dir = args.output_dir / task["id"]
        task_dir.mkdir(parents=True, exist_ok=True)
        raw = run_task(task, task_dir, production=args.production)
        scored = score_task(task, raw, weights)
        results.append(scored)
        (task_dir / "task_result.json").write_text(json.dumps(scored.to_dict(), indent=2))
        print(f"{task['id']}: {'PASS' if scored.passed else 'FAIL'} (score={scored.weighted_total:.3f})")

    report_path = write_benchmark_report(results, args.output_dir / "benchmark_report.json")
    summary = {
        "passed": sum(1 for r in results if r.passed),
        "total": len(results),
        "report": str(report_path),
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
