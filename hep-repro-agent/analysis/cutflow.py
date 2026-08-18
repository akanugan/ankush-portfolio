"""Cut-flow tracking for HEP analysis pipelines."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class CutFlow:
    """Ordered list of selection steps with passing event counts."""

    steps: list[tuple[str, int]] = field(default_factory=list)

    def add(self, name: str, count: int) -> None:
        if self.steps and count > self.steps[-1][1]:
            raise ValueError(
                f"Cut-flow violation: '{name}' count {count} exceeds "
                f"prior step '{self.steps[-1][0]}' count {self.steps[-1][1]}"
            )
        self.steps.append((name, count))

    def to_dict(self) -> dict[str, Any]:
        return {
            "steps": [{"name": n, "passing": c} for n, c in self.steps],
            "initial": self.steps[0][1] if self.steps else 0,
            "final": self.steps[-1][1] if self.steps else 0,
        }

    def plot(self, ax=None):
        import matplotlib.pyplot as plt

        if ax is None:
            _, ax = plt.subplots(figsize=(8, 4))

        names = [s[0] for s in self.steps]
        counts = [s[1] for s in self.steps]
        bars = ax.barh(names, counts, color="#4d9fff", edgecolor="#050d1a")
        ax.set_xlabel("Events passing")
        ax.set_title("Cut-flow")
        ax.invert_yaxis()
        for bar, c in zip(bars, counts):
            ax.text(bar.get_width(), bar.get_y() + bar.get_height() / 2,
                    f" {c:,}", va="center", fontsize=9)
        return ax
