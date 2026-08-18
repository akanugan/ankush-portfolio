# Reproducible HEP Analysis Agent

Natural-language request → dataset selection → Coffea/ROOT analysis → cut-flow plots → statistical fit → REANA workflow → reproducibility report.

**First target:** reproduce the CMS 2011 dimuon invariant-mass spectrum from [CERN Open Data record 5001](https://opendata.cern.ch/record/5001), using NanoAODRun1 files on EOSPUBLIC.

## Architecture

```
User request (NL)
       │
       ▼
┌──────────────────┐     pinned datasets/containers
│ Analysis Agent   │◄──── config/datasets.yaml
│ (orchestrator)   │      config/containers.yaml
└────────┬─────────┘
         │ tool traces (JSONL)
         ▼
┌──────────────────┐     sandbox + approval gates
│ Guardrails       │◄──── expensive jobs require explicit OK
└────────┬─────────┘
         ▼
┌──────────────────┐     Coffea / uproot processor
│ Analysis runner  │──── cut-flow, histograms, fit
└────────┬─────────┘
         ▼
┌──────────────────┐     physics invariants
│ Validation Agent │──── independent re-check
└────────┬─────────┘
         ▼
   REANA workflow + reproducibility report
```

## Quick start

```bash
cd hep-repro-agent
pip install numpy matplotlib pyyaml uproot awkward scipy fsspec-xrootd pytest

# Dry-run with synthetic events (no network required)
PYTHONPATH=. python -m agent.orchestrator "Reproduce CMS 2011 dimuon mass spectrum" --dry-run

# Production: real CERN Open Data via XRootD (requires approval gate)
PYTHONPATH=. python -m agent.orchestrator "Reproduce CMS 2011 dimuon mass spectrum" \
  --production --approve-expensive --max-events 100000
# Expected at 100k events: ~2100 dimuons, J/ψ fit at 3.097 ± 0.001 GeV, significance > 50

# Run HEP Agent Benchmark (6 tasks, dry-run mode)
PYTHONPATH=. python -m benchmark.runner

# Submit to REANA (requires reana-client + credentials)
PYTHONPATH=. python -m agent.orchestrator "Reproduce CMS dimuon spectrum" \
  --production --approve-expensive --submit-reana
reana-client create reana/reana-production.yaml
reana-client submit
```

## Guardrails

| Guardrail | Implementation |
|-----------|----------------|
| Sandbox code execution | `guardrails.py` — subprocess only, no shell injection |
| Approval for expensive jobs | `--approve-expensive` flag or interactive prompt |
| Pin containers & datasets | `config/containers.yaml`, `config/datasets.yaml` |
| Preserve tool traces | `outputs/traces/<run_id>.jsonl` |
| Test physics invariants | `config/invariants.yaml` + validation agent |
| Human owns final claims | Report template includes disclaimer |

## Stack

- **Analysis:** Coffea-compatible processor (uproot/awkward for portable dev runs)
- **Workflow:** REANA serial workflow
- **Data:** CERN Open Data NanoAODRun1 via XRootD
- **Validation:** Independent agent checks cut-flow monotonicity, resonance peaks, event counts

## References

- [REANA CMS dimuon demo](https://github.com/reanahub/reana-demo-cms-dimuon-mass-spectrum)
- [NanoAODRun1 dimuon examples](https://github.com/cms-opendata-analyses/NanoAODRun1Examples)
- [CERN Open Data portal — record 5001](https://opendata.cern.ch/record/5001)

## HEP Agent Benchmark

Six progressively harder tasks in `benchmark/tasks.yaml`, scored on physics accuracy, reproducibility, tool reliability, cost, and human-review burden:

| Task | Difficulty | Description |
|------|------------|-------------|
| T1 | 1 | Histogram reproduction |
| T2 | 2 | Detector correction |
| T3 | 3 | Background estimation |
| T4 | 4 | Uncertainty propagation |
| T5 | 4 | Statistical inference |
| T6 | 5 | Full paper reproduction pipeline |

```bash
PYTHONPATH=. python -m benchmark.runner              # all tasks, dry-run
PYTHONPATH=. python -m benchmark.runner --task T1    # single task
PYTHONPATH=. python -m benchmark.runner --production --approve-expensive  # XRootD
```

## License

MIT
