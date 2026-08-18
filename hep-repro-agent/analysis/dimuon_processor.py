"""Dimuon invariant-mass analysis — Coffea-compatible, uproot backend for dev."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import awkward as ak
import numpy as np

from analysis.cutflow import CutFlow


def _select_dimuons(events: ak.Array, pt_threshold: float = 6.0) -> tuple[ak.Array, CutFlow]:
    """Apply CMS Open Data dimuon selection (DoubleMu high-pT channel)."""
    cf = CutFlow()
    n_initial = len(events)
    cf.add("initial", n_initial)

    # Run filter (NanoAODRun1: run branch)
    if "run" in events.fields:
        mask = events.run < 170000
        events = events[mask]
    cf.add("run < 170000", len(events))

    # Trigger: Trig_DoubleMuThresh > 12
    if "Trig_DoubleMuThresh" in events.fields:
        mask = events.Trig_DoubleMuThresh > 12
        events = events[mask]
    cf.add("Trig_DoubleMuThresh > 12", len(events))

    # Build dimuon candidates from muon branches
    mu_pt = events.Muon_pt
    mu_id = events.Muon_mediumId
    n_mu = ak.num(mu_pt)

    # Opposite-sign dimuon pairs per event (simplified: use pre-computed Dimu branches if present)
    if all(f in events.fields for f in ("Dimu_mass", "Dimu_charge", "Dimu_t1muIdx", "Dimu_t2muIdx")):
        masses = []
        for i in range(len(events)):
            evt_masses = []
            n_dimu = len(events.Dimu_mass[i])
            for j in range(n_dimu):
                if events.Dimu_charge[i][j] != 0:
                    continue
                t1 = events.Dimu_t1muIdx[i][j]
                t2 = events.Dimu_t2muIdx[i][j]
                if mu_pt[i][t1] <= pt_threshold or mu_pt[i][t2] <= pt_threshold:
                    continue
                if not mu_id[i][t1] or not mu_id[i][t2]:
                    continue
                evt_masses.append(float(events.Dimu_mass[i][j]))
            masses.append(evt_masses)
        flat_masses = ak.Array(masses)
    else:
        # Synthetic / minimal schema: reconstruct from muons
        flat_masses = _dimuons_from_muons(events, pt_threshold)

    n_selected = int(ak.sum(ak.num(flat_masses)))
    cf.add(f"OS dimuon, pT>{pt_threshold}, mediumId", n_selected)

    return flat_masses, cf


def _dimuons_from_muons(events: ak.Array, pt_threshold: float) -> ak.Array:
    """Build opposite-sign dimuon masses from per-event muon arrays."""
    results = []
    for i in range(len(events)):
        pts = np.asarray(events.Muon_pt[i])
        eta = np.asarray(events.Muon_eta[i])
        phi = np.asarray(events.Muon_phi[i])
        charge = np.asarray(events.Muon_charge[i])
        medium = np.asarray(events.Muon_mediumId[i]) if "Muon_mediumId" in events.fields else np.ones(len(pts), dtype=bool)

        evt_masses = []
        n = len(pts)
        for a in range(n):
            for b in range(a + 1, n):
                if charge[a] * charge[b] >= 0:
                    continue
                if pts[a] <= pt_threshold or pts[b] <= pt_threshold:
                    continue
                if not medium[a] or not medium[b]:
                    continue
                px_a = pts[a] * np.cos(phi[a]) / np.cosh(eta[a])
                py_a = pts[a] * np.sin(phi[a]) / np.cosh(eta[a])
                pz_a = pts[a] * np.tanh(eta[a])
                px_b = pts[b] * np.cos(phi[b]) / np.cosh(eta[b])
                py_b = pts[b] * np.sin(phi[b]) / np.cosh(eta[b])
                pz_b = pts[b] * np.tanh(eta[b])
                mass = np.sqrt(
                    max((np.sqrt(px_a**2 + py_a**2 + pz_a**2 + 0.105658**2)
                         + np.sqrt(px_b**2 + py_b**2 + pz_b**2 + 0.105658**2)) ** 2
                        - (px_a + px_b) ** 2 - (py_a + py_b) ** 2 - (pz_a + pz_b) ** 2, 0)
                )
                evt_masses.append(float(mass))
        results.append(evt_masses)
    return ak.Array(results)


def build_mass_histogram(masses: ak.Array, name: str = "dimuon_mass") -> tuple[np.ndarray, np.ndarray]:
    """Dimuon mass histogram bins and counts."""
    flat = ak.to_numpy(ak.flatten(masses))
    flat = flat[flat > 0.2]
    counts, edges = np.histogram(flat, bins=120, range=(0.2, 200.0))
    return edges, counts


def fit_jpsi_peak(edges: np.ndarray, counts: np.ndarray) -> dict[str, Any]:
    """Simple Gaussian fit around J/ψ mass for demonstration."""
    from scipy.optimize import curve_fit

    centers = 0.5 * (edges[:-1] + edges[1:])
    window = (centers > 2.8) & (centers < 3.4)
    x = centers[window]
    y = counts[window]
    if len(x) < 3 or y.sum() == 0:
        return {"status": "insufficient_data"}

    def gauss(m, amp, mean, sigma):
        return amp * np.exp(-0.5 * ((m - mean) / sigma) ** 2)

    try:
        popt, pcov = curve_fit(gauss, x, y, p0=[y.max(), 3.096, 0.05], maxfev=5000)
        return {
            "status": "ok",
            "amplitude": float(popt[0]),
            "mass_gev": float(popt[1]),
            "sigma_gev": float(abs(popt[2])),
            "mass_err_gev": float(np.sqrt(pcov[1, 1])) if pcov is not None else None,
        }
    except Exception as exc:
        return {"status": "fit_failed", "error": str(exc)}


def generate_synthetic_events(n_events: int = 5000, seed: int = 42) -> ak.Array:
    """Synthetic NanoAOD-like events for dry-run testing."""
    rng = np.random.default_rng(seed)
    n_mu = rng.poisson(2.0, n_events).clip(0, 6)

    records = []
    for i in range(n_events):
        nm = int(n_mu[i])
        if nm < 2:
            nm = 2
        # Inject J/ψ-like resonances ~5% of events
        if rng.random() < 0.05:
            m_res = 3.096 + rng.normal(0, 0.02)
            pt1, pt2 = rng.uniform(8, 40, 2)
        else:
            m_res = rng.uniform(0.5, 120)
            pt1, pt2 = rng.uniform(4, 30, 2)

        phi1, phi2 = rng.uniform(-np.pi, np.pi, 2)
        eta1, eta2 = rng.uniform(-2.4, 2.4, 2)
        q1, q2 = (-1, 1) if rng.random() > 0.5 else (1, -1)

        records.append({
            "run": int(rng.integers(160000, 169999)),
            "Trig_DoubleMuThresh": int(rng.integers(13, 20)),
            "Muon_pt": [float(pt1)] + [float(rng.uniform(3, 15)) for _ in range(nm - 2)] + [float(pt2)],
            "Muon_eta": [float(eta1)] + [float(rng.uniform(-2.4, 2.4)) for _ in range(nm - 2)] + [float(eta2)],
            "Muon_phi": [float(phi1)] + [float(rng.uniform(-np.pi, np.pi)) for _ in range(nm - 2)] + [float(phi2)],
            "Muon_charge": [q1] + [int(rng.choice([-1, 1])) for _ in range(nm - 2)] + [q2],
            "Muon_mediumId": [True] * nm,
            "Dimu_mass": [float(m_res)],
            "Dimu_charge": [0],
            "Dimu_t1muIdx": [0],
            "Dimu_t2muIdx": [nm - 1],
        })

    return ak.Array(records)


def run_dimuon_analysis(
    source: str | Path | None,
    *,
    dry_run: bool = False,
    max_events: int | None = 5000,
    output_dir: Path,
) -> dict[str, Any]:
    """Run dimuon analysis and write artifacts."""
    import json
    import matplotlib.pyplot as plt

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    if dry_run or source is None:
        events = generate_synthetic_events(n_events=max_events or 5000)
    else:
        import uproot

        try:
            with uproot.open(source) as f:
                tree = f["Events"]
                events = tree.arrays(
                    filter_name=[
                        "run", "Trig_DoubleMuThresh",
                        "Muon_*", "Dimu_*", "nDimu",
                    ],
                    entry_stop=max_events,
                    library="ak",
                )
        except ImportError as exc:
            if "fsspec-xrootd" in str(exc) or "xrootd" in str(exc).lower():
                raise ImportError(
                    "XRootD access requires fsspec-xrootd. Install with: pip install fsspec-xrootd"
                ) from exc
            raise

    masses, cutflow = _select_dimuons(events)
    edges, counts = build_mass_histogram(masses)
    fit = fit_jpsi_peak(edges, counts)

    # Save histogram plot
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    cutflow.plot(axes[0])
    centers = 0.5 * (edges[:-1] + edges[1:])
    axes[1].step(centers, counts, where="mid", color="#f5c842")
    axes[1].set_xlabel("Dimuon mass [GeV]")
    axes[1].set_ylabel("Events")
    axes[1].set_yscale("log")
    axes[1].set_title("Invariant mass spectrum")
    if fit.get("status") == "ok":
        axes[1].axvline(fit["mass_gev"], color="#ff6b6b", ls="--", label=f"J/ψ fit: {fit['mass_gev']:.3f} GeV")
        axes[1].legend()
    fig.tight_layout()
    plot_path = output_dir / "dimuon_spectrum.png"
    fig.savefig(plot_path, dpi=150)
    plt.close(fig)

    cutflow_path = output_dir / "cutflow.json"
    cutflow_path.write_text(json.dumps(cutflow.to_dict(), indent=2))

    fit_path = output_dir / "fit_results.json"
    fit_path.write_text(json.dumps(fit, indent=2))

    summary = {
        "source": str(source) if source else "synthetic",
        "dry_run": dry_run,
        "max_events": max_events,
        "cutflow": cutflow.to_dict(),
        "fit": fit,
        "artifacts": {
            "plot": str(plot_path),
            "cutflow": str(cutflow_path),
            "fit": str(fit_path),
        },
    }
    (output_dir / "summary.json").write_text(json.dumps(summary, indent=2))
    return summary
