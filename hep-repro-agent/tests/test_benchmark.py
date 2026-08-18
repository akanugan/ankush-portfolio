"""Benchmark and production path tests."""

from pathlib import Path

import pytest

from agent.guardrails import check_execution
from agent.reana_client import reana_available, submit_workflow
from benchmark.runner import run_task
from benchmark.scorer import load_benchmark_config, score_task


def test_production_requires_approval():
    decision = check_execution(max_events=50000, use_xrootd=True, submit_reana=True, approve_expensive=False)
    assert not decision.allowed


def test_production_allowed_with_approval():
    decision = check_execution(max_events=50000, use_xrootd=True, submit_reana=True, approve_expensive=True)
    assert decision.allowed


def test_reana_client_graceful_when_unavailable():
    sub = submit_workflow(Path("/nonexistent/reana.yaml"))
    assert sub.status in ("error", "unavailable", "create_failed")


def test_benchmark_task_t1_dry_run(tmp_path):
    cfg = load_benchmark_config()
    task = next(t for t in cfg["tasks"] if t["id"] == "T1_histogram_reproduction")
    raw = run_task(task, tmp_path / "T1", production=False)
    scored = score_task(task, raw, cfg["scoring_weights"])
    assert scored.passed
    assert scored.weighted_total > 0.5


def test_benchmark_task_t6_paper_reproduction(tmp_path):
    cfg = load_benchmark_config()
    task = next(t for t in cfg["tasks"] if t["id"] == "T6_paper_reproduction")
    raw = run_task(task, tmp_path / "T6", production=False)
    scored = score_task(task, raw, cfg["scoring_weights"])
    assert scored.passed
    assert raw.get("report_generated")


@pytest.mark.skipif(not __import__("importlib").util.find_spec("fsspec_xrootd"), reason="no xrootd")
def test_xrootd_smoke():
    from analysis.dimuon_processor import run_dimuon_analysis
    url = (
        "root://eospublic.cern.ch//eos/opendata/cms/derived-data/NanoAODRun1/"
        "01-Jul-22/Run2011A_DoubleMu_merged.root"
    )
    summary = run_dimuon_analysis(url, dry_run=False, max_events=500, output_dir=Path("/tmp/xrootd_smoke"))
    assert summary["cutflow"]["final"] >= 0
