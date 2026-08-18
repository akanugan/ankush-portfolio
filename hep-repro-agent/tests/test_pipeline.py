"""Tests for hep-repro-agent pipeline."""

from pathlib import Path

import pytest

from agent.orchestrator import parse_request, run_pipeline
from agent.validation_agent import validate_analysis_outputs
from analysis.cutflow import CutFlow
from analysis.dimuon_processor import generate_synthetic_events, run_dimuon_analysis


def test_cutflow_monotonic():
    cf = CutFlow()
    cf.add("initial", 1000)
    cf.add("trigger", 800)
    cf.add("selection", 200)
    assert cf.to_dict()["final"] == 200


def test_cutflow_rejects_increase():
    cf = CutFlow()
    cf.add("initial", 100)
    with pytest.raises(ValueError):
        cf.add("bad", 150)


def test_parse_request_dimuon():
    from agent.orchestrator import load_configs

    base = Path(__file__).resolve().parents[1]
    cfg, _ = load_configs(base)
    assert parse_request("Reproduce the CMS dimuon mass spectrum", cfg) == "cms_dimuon_2011_doublemu"
    assert parse_request("Use 2012 DoubleMu data", cfg) == "cms_dimuon_2012_doublemu"


def test_dry_run_analysis(tmp_path):
    summary = run_dimuon_analysis(None, dry_run=True, max_events=2000, output_dir=tmp_path)
    assert summary["cutflow"]["final"] > 0
    assert (tmp_path / "dimuon_spectrum.png").exists()
    assert (tmp_path / "cutflow.json").exists()


def test_validation_passes_after_dry_run(tmp_path):
    run_dimuon_analysis(None, dry_run=True, max_events=3000, output_dir=tmp_path)
    result = validate_analysis_outputs(tmp_path)
    assert result.passed, result.errors


def test_full_pipeline_dry_run(tmp_path):
    result = run_pipeline(
        "Reproduce CMS 2011 dimuon spectrum",
        output_dir=tmp_path,
        dry_run=True,
        max_events=2000,
    )
    assert result["validation_passed"]
    assert Path(result["report"]).exists()


def test_synthetic_events_schema():
    events = generate_synthetic_events(100)
    assert len(events) == 100
    assert "Muon_pt" in events.fields
