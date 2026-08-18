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
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"

# Dry-run with synthetic events (no network / ROOT install required)
python -m analysis.run_analysis --dry-run --output-dir outputs/demo

# Full agent pipeline (synthetic data)
python -m agent.orchestrator "Reproduce the CMS 2011 dimuon mass spectrum" --dry-run

# Submit to REANA (requires reana-client + credentials)
reana-client create reana/reana.yaml
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

## License

MIT
