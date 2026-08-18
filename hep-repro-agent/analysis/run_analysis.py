"""CLI entry point for dimuon analysis."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import yaml

from analysis.dimuon_processor import run_dimuon_analysis


def load_dataset_config() -> dict:
    cfg_path = Path(__file__).resolve().parents[1] / "config" / "datasets.yaml"
    with cfg_path.open() as f:
        return yaml.safe_load(f)


def main() -> None:
    parser = argparse.ArgumentParser(description="CMS dimuon mass spectrum analysis")
    parser.add_argument("--dataset", default=None, help="Dataset key from config/datasets.yaml")
    parser.add_argument("--source", default=None, help="Override ROOT file path (XRootD or local)")
    parser.add_argument("--max-events", type=int, default=5000)
    parser.add_argument("--output-dir", type=Path, default=Path("outputs/run"))
    parser.add_argument("--dry-run", action="store_true", help="Use synthetic events")
    args = parser.parse_args()

    cfg = load_dataset_config()
    ds_key = args.dataset or cfg["default_dataset"]
    ds = cfg["datasets"][ds_key]
    source = args.source or (None if args.dry_run else ds.get("xrootd"))

    summary = run_dimuon_analysis(
        source,
        dry_run=args.dry_run,
        max_events=args.max_events,
        output_dir=args.output_dir,
    )
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
