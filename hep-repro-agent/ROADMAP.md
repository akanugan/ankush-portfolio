# HEP Agent Open-Source Roadmap

Prioritized project ideas for agentic high-energy physics tooling.

## 1. Reproducible HEP Analysis Agent (this repo) — highest priority

**Goal:** Natural-language request → dataset selection → Coffea/ROOT analysis → cut-flow plots → statistical fit → REANA workflow → reproducibility report.

**MVP:** Reproduce one published CMS result from CERN Open Data; containerized REANA workflow; independent validation agent before report.

**Stack:** Coffea, ROOT, Awkward Array, REANA, CERN Open Data.

**Status:** Scaffold complete; first target = CMS 2011 dimuon spectrum.

---

## 2. Agentic Physics Review and Uncertainty Auditor

Independent reviewer agent checks event selections, normalization, systematic uncertainties, fit assumptions, plots, citations, and whether conclusions follow from data.

**Key output:** Evidence graph linking every claim to code, input data, configuration, and generated artifact.

---

## 3. Theory–Experiment Loop for Event Shapes

Agents compare measured LEP event-shape distributions with perturbative QCD predictions, tune parameters, generate simulations, and propose follow-up measurements.

**Stack:** ALEPH/DELPHI data, ROOT/Coffea, Rivet, HEPData.

---

## 4. HEP Agent Benchmark

Public benchmark of progressively harder tasks: histogram reproduction, detector correction, background estimation, uncertainty propagation, statistical inference, paper reproduction.

**Scoring:** Physics accuracy, reproducibility, tool-call reliability, cost, human-review burden.

---

## 5. MCP Scientific Computing Gateway

Secure MCP servers for ROOT, Coffea, REANA, HTCondor/Slurm, HEPData, and simulation tools. Agents request jobs and inspect results through typed, permissioned interfaces.

**Backends:** Yadage, Snakemake.

---

## 6. Cross-domain Agent for Particle and Multiphysics Simulation

Extend the OASiS pattern to connect particle-transport, detector, plasma, or fluid solvers with validated parameter schemas and automatic convergence checks.

---

## Shared guardrails (all projects)

1. Sandbox all code execution
2. Require approval for expensive jobs
3. Pin containers and datasets
4. Preserve full tool traces
5. Test physics invariants
6. Keep a human responsible for final scientific claims
