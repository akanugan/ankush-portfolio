"""Append-only tool trace logging for reproducibility."""

from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


class TraceLogger:
    def __init__(self, output_dir: Path, run_id: str | None = None):
        self.run_id = run_id or uuid.uuid4().hex[:12]
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.trace_path = self.output_dir / f"trace_{self.run_id}.jsonl"

    def log(self, tool: str, action: str, **payload: Any) -> None:
        record = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "run_id": self.run_id,
            "tool": tool,
            "action": action,
            **payload,
        }
        with self.trace_path.open("a") as f:
            f.write(json.dumps(record) + "\n")

    def read_all(self) -> list[dict[str, Any]]:
        if not self.trace_path.exists():
            return []
        return [json.loads(line) for line in self.trace_path.read_text().splitlines() if line.strip()]
