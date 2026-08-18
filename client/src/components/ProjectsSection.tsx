/* ============================================================
   DESIGN: "Collision Event" — Projects Section
   Horizontal sliding project cards with hover effects
   ============================================================ */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, TrendingUp, ChevronLeft, ChevronRight, Bot } from "lucide-react";

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const projects = [
  {
    id: 1,
    title: "Reproducible HEP Analysis Agent",
    subtitle: "NL → Coffea/ROOT → REANA workflow",
    icon: Bot,
    color: "#ff6b6b",
    accent: "rgba(255, 107, 107, 0.08)",
    border: "rgba(255, 107, 107, 0.2)",
    link: "https://github.com/akanugan/ankush-portfolio/tree/main/hep-repro-agent",
    description:
      "Open-source agent that turns natural-language physics requests into reproducible CMS analyses — dataset selection, cut-flow plots, statistical fits, and containerized REANA workflows with independent validation.",
    highlights: [
      "First target: CMS 2011 dimuon mass spectrum from CERN Open Data",
      "Pinned datasets/containers, sandboxed execution, full tool traces",
      "Independent validation agent checks physics invariants before report",
      "Guardrails: approval gates for expensive jobs, human owns final claims",
    ],
    tech: ["Coffea", "ROOT", "Awkward", "REANA", "Python", "CERN Open Data"],
    category: "HEP Agents",
  },
  {
    id: 2,
    title: "Pairs Trading Strategy",
    subtitle: "Statistical Arbitrage with AAPL & MSFT",
    icon: TrendingUp,
    color: "#f5c842",
    accent: "rgba(245, 200, 66, 0.08)",
    border: "rgba(245, 200, 66, 0.2)",
    link: "https://github.com",
    description:
      "Developed a market-neutral quantitative trading model in Python using historical equity data (2020–2024) fetched via yfinance to capitalize on mean-reverting price divergences.",
    highlights: [
      "Engle-Granger Cointegration Test (p-value < 0.05) to validate long-term statistical linkage",
      "OLS regression to determine hedge ratio and compute normalized spread",
      "Z-score thresholds for algorithmic trading signals: long/short entry (|Z| > 1) and exit (|Z| < 0.5)",
      "Backtested against historical data with capital growth simulation",
    ],
    tech: ["Python", "yfinance", "NumPy", "Pandas", "Statsmodels", "Matplotlib"],
    category: "Quantitative Finance",
  },
  {
    id: 3,
    title: "SUSY Search Pipeline",
    subtitle: "CMS Experiment @ LHC, CERN",
    icon: TrendingUp,
    color: "#4d9fff",
    accent: "rgba(77, 159, 255, 0.08)",
    border: "rgba(77, 159, 255, 0.2)",
    link: "https://arxiv.org/abs/2402.01888",
    description:
      "End-to-end analysis pipeline for searching supersymmetric particles in hadronic final states using the CMS detector at CERN's Large Hadron Collider.",
    highlights: [
      "Processed and analyzed multi-billion dollar datasets from CMS detector",
      "Implemented ML-based event selection and background estimation",
      "Statistical inference using CLs method for exclusion limits",
      "Published results in Physics Letters B (arXiv:2205.09597)",
    ],
    tech: ["Python", "C++", "ROOT", "CMSSW", "HTCondor", "CERN Grid"],
    category: "Particle Physics",
  },
  {
    id: 4,
    title: "Graph Neural Network",
    subtitle: "Energy Prediction for CMS Calorimeter",
    icon: TrendingUp,
    color: "#a78bfa",
    accent: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.2)",
    link: "https://github.com",
    description:
      "Designed and trained Graph Neural Networks for predictive modeling of particle energy deposits in the CMS calorimeter system, achieving significant accuracy improvements.",
    highlights: [
      "10% improvement in energy prediction accuracy over baseline",
      "GNN architecture capturing spatial relationships between detector cells",
      "Trained on large-scale simulation datasets",
      "Integrated into Phase II CMS software development",
    ],
    tech: ["PyTorch", "PyTorch Geometric", "Python", "CUDA", "Scikit-learn"],
    category: "Deep Learning",
  },
  {
    id: 5,
    title: "RAG Framework Deployment",
    subtitle: "AI/ML at Brookhaven National Lab",
    icon: TrendingUp,
    color: "#34d399",
    accent: "rgba(52, 211, 153, 0.08)",
    border: "rgba(52, 211, 153, 0.2)",
    link: "https://www.bnl.gov",
    description:
      "Designed and deployed Retrieval-Augmented Generation (RAG) frameworks for scientific data analysis, with comprehensive testing to ensure operational efficiency and reliability.",
    highlights: [
      "RAG framework design and deployment for scientific use cases",
      "Rigorous testing protocols for model validation",
      "Integration with existing data analysis pipelines",
      "Scalable infrastructure using oVirt and GlusterFS",
    ],
    tech: ["Python", "LangChain", "Docker", "Kubernetes", "oVirt", "GlusterFS"],
    category: "AI/ML Engineering",
  },
];

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollTo = (idx: number) => {
    setActiveIdx(idx);
    if (sliderRef.current) {
      const card = sliderRef.current.children[idx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  const prev = () => scrollTo(Math.max(0, activeIdx - 1));
  const next = () => scrollTo(Math.min(projects.length - 1, activeIdx + 1));

  return (
    <section
      id="projects"
      className="py-24 overflow-hidden"
      style={{ background: "#050d1a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-12">
            <span className="section-label">// 04 — projects</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              FEATURED
              <br />
              <span style={{ color: "#f5c842" }}>PROJECTS</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4"
              style={{ background: "linear-gradient(90deg, #f5c842, transparent)" }}
            />
          </div>
        </AnimatedSection>

        {/* Navigation */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollTo(i)}
                  className="px-3 py-1 rounded text-xs transition-all duration-200"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: activeIdx === i ? p.color : "rgba(255,255,255,0.04)",
                    color: activeIdx === i ? "#050d1a" : "rgba(232, 237, 245, 0.45)",
                    border: `1px solid ${activeIdx === i ? p.color : "rgba(255,255,255,0.08)"}`,
                    fontWeight: activeIdx === i ? 700 : 400,
                  }}
                >
                  {p.category}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={activeIdx === 0}
                className="p-2 rounded transition-all duration-200 disabled:opacity-30"
                style={{
                  border: "1px solid rgba(245, 200, 66, 0.3)",
                  color: "#f5c842",
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={activeIdx === projects.length - 1}
                className="p-2 rounded transition-all duration-200 disabled:opacity-30"
                style={{
                  border: "1px solid rgba(245, 200, 66, 0.3)",
                  color: "#f5c842",
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Slider */}
        <AnimatedSection delay={0.2}>
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(245,200,66,0.3) transparent",
            }}
          >
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  onClick={() => setActiveIdx(i)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    width: "min(480px, 85vw)",
                    scrollSnapAlign: "start",
                    background: activeIdx === i ? project.accent : "rgba(255,255,255,0.02)",
                    border: `1px solid ${activeIdx === i ? project.border : "rgba(255,255,255,0.06)"}`,
                    boxShadow: activeIdx === i
                      ? `0 8px 40px ${project.color}15`
                      : "none",
                  }}
                >
                  {/* Card top accent bar */}
                  <div
                    className="h-1"
                    style={{
                      background: `linear-gradient(90deg, ${project.color}, transparent)`,
                    }}
                  />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="p-2 rounded-lg mt-0.5 flex-shrink-0"
                          style={{
                            background: `${project.color}15`,
                            border: `1px solid ${project.color}30`,
                          }}
                        >
                          <Icon size={18} style={{ color: project.color }} />
                        </div>
                        <div>
                          <h3
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 700,
                              fontSize: "1rem",
                              color: "#e8edf5",
                              lineHeight: 1.3,
                            }}
                          >
                            {project.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.8rem",
                              color: project.color,
                              marginTop: "2px",
                            }}
                          >
                            {project.subtitle}
                          </p>
                        </div>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "rgba(232, 237, 245, 0.3)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = project.color;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "rgba(232, 237, 245, 0.3)";
                        }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.87rem",
                        color: "rgba(232, 237, 245, 0.65)",
                        lineHeight: 1.7,
                        marginBottom: "16px",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-5">
                      {project.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="flex gap-2 text-xs"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "rgba(232, 237, 245, 0.6)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
                            style={{ background: project.color }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            fontFamily: "'Fira Code', monospace",
                            background: `${project.color}10`,
                            border: `1px solid ${project.color}20`,
                            color: project.color,
                            opacity: 0.8,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? "24px" : "8px",
                height: "8px",
                background: activeIdx === i ? "#f5c842" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
