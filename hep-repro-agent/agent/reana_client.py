"""REANA workflow submission wrapper."""

from __future__ import annotations

import json
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from agent.guardrails import sandbox_run


@dataclass
class ReanaSubmission:
    workflow_name: str
    status: str
    workflow_id: str | None = None
    message: str = ""
    stdout: str = ""
    stderr: str = ""


def reana_available() -> bool:
    return shutil.which("reana-client") is not None


def submit_workflow(
    spec_path: Path,
    *,
    workflow_name: str | None = None,
    parameters: dict[str, str] | None = None,
    timeout_sec: int = 120,
) -> ReanaSubmission:
    """Create and submit a REANA workflow from a reana.yaml spec."""
    spec_path = Path(spec_path).resolve()
    if not spec_path.exists():
        return ReanaSubmission(
            workflow_name=workflow_name or spec_path.stem,
            status="error",
            message=f"Spec not found: {spec_path}",
        )

    if not reana_available():
        return ReanaSubmission(
            workflow_name=workflow_name or spec_path.stem,
            status="unavailable",
            message=(
                "reana-client not installed. Install with: pip install reana-client && "
                "reana-client ping  # verify credentials"
            ),
        )

    name = workflow_name or f"hep-repro-{spec_path.stem}"
    create = sandbox_run(
        ["reana-client", "create", str(spec_path), name],
        cwd=str(spec_path.parent.parent),
        timeout_sec=timeout_sec,
    )
    if create.returncode != 0:
        return ReanaSubmission(
            workflow_name=name,
            status="create_failed",
            message=create.stderr or create.stdout,
            stdout=create.stdout,
            stderr=create.stderr,
        )

    submit_cmd = ["reana-client", "submit", name]
    if parameters:
        for key, val in parameters.items():
            submit_cmd.extend(["-p", f"{key}={val}"])

    submit = sandbox_run(submit_cmd, cwd=str(spec_path.parent.parent), timeout_sec=timeout_sec)
    workflow_id = _parse_workflow_id(submit.stdout)

    return ReanaSubmission(
        workflow_name=name,
        status="submitted" if submit.returncode == 0 else "submit_failed",
        workflow_id=workflow_id,
        message=submit.stderr or submit.stdout,
        stdout=submit.stdout,
        stderr=submit.stderr,
    )


def _parse_workflow_id(stdout: str) -> str | None:
    for line in stdout.splitlines():
        if "workflow" in line.lower() and ("id" in line.lower() or "reana" in line.lower()):
            parts = line.replace(":", " ").split()
            for p in parts:
                if len(p) > 8 and p.isalnum():
                    return p
    return None


def submission_to_dict(sub: ReanaSubmission) -> dict[str, Any]:
    return {
        "workflow_name": sub.workflow_name,
        "status": sub.status,
        "workflow_id": sub.workflow_id,
        "message": sub.message,
    }
