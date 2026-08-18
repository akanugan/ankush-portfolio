#!/usr/bin/env bash
# REANA entrypoint — production run against CERN Open Data via XRootD
set -euo pipefail

DATASET="${DATASET:-cms_dimuon_2011_doublemu}"
MAX_EVENTS="${MAX_EVENTS:-50000}"
OUTPUT_DIR="${OUTPUT_DIR:-outputs/reana}"

pip install --quiet numpy matplotlib pyyaml uproot awkward hist scipy

python analysis/run_analysis.py \
  --dataset "${DATASET}" \
  --max-events "${MAX_EVENTS}" \
  --output-dir "${OUTPUT_DIR}"

python -c "
from pathlib import Path
import sys
sys.path.insert(0, '.')
from agent.validation_agent import validate_analysis_outputs
r = validate_analysis_outputs(Path('${OUTPUT_DIR}'))
if not r.passed:
    print('Validation failed:', r.errors)
    sys.exit(1)
print('Validation passed')
"
