/* ============================================================
   DESIGN: "Collision Event" — Research Section
   Highlights SUSY searches and CMS experiment work
   ============================================================ */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Atom, Brain, BarChart3, Cpu } from "lucide-react";

const DATA_SCI_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663449292838/7LZbx2seopNHpyyYuMs8z3/data-science-bg-HezsxviC9kJ5Ex93H76GqW.webp";

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

const researchAreas = [
  {
    icon: Atom,
    title: "Large-Scale Data Analysis",
    color: "#f5c842",
    description:
      "Led petabyte-scale analysis pipelines at CMS/CERN — processing collision events with rigorous statistical inference, background estimation, and systematic uncertainty quantification.",
    tags: ["PB-Scale Data", "CLs Method", "Monte Carlo", "ROOT"],
  },
  {
    icon: Brain,
    title: "Machine Learning & AI",
    color: "#4d9fff",
    description:
      "Designed GNNs and attention-based neural networks for high-dimensional sensor data. Deployed RAG frameworks for production AI systems — bridging research prototypes and operational pipelines.",
    tags: ["GNNs", "Attention Networks", "RAG", "PyTorch"],
  },
  {
    icon: BarChart3,
    title: "Quantitative Methods",
    color: "#a78bfa",
    description:
      "Bayesian and frequentist inference, cointegration testing, and pairs trading backtesting. Applied the same statistical rigor from particle physics to financial time series and mean-reversion strategies.",
    tags: ["Bayesian Stats", "Cointegration", "Backtesting", "Time Series"],
  },
  {
    icon: Cpu,
    title: "Scientific Computing & HPC",
    color: "#34d399",
    description:
      "Built distributed compute workflows on HTCondor, Slurm, and CERN Grid. Expanded HPC infrastructure (oVirt, GlusterFS) for large-scale Monte Carlo simulations and ML training at scale.",
    tags: ["HTCondor", "Slurm", "HPC", "CUDA"],
  },
];

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative py-24 overflow-hidden"
      style={{ background: "#070f1e" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${DATA_SCI_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #070f1e 0%, rgba(7,15,30,0.85) 50%, #070f1e 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16">
            <span className="section-label">// 03 — research</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              SCIENTIFIC
              <br />
              <span style={{ color: "#4d9fff" }}>COMPUTING</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4"
              style={{ background: "linear-gradient(90deg, #4d9fff, transparent)" }}
            />
          </div>
        </AnimatedSection>

        {/* Research cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {researchAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <AnimatedSection key={area.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-xl h-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderTop: `2px solid ${area.color}`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="p-2.5 rounded-lg flex-shrink-0"
                      style={{
                        background: `${area.color}15`,
                        border: `1px solid ${area.color}30`,
                      }}
                    >
                      <Icon size={20} style={{ color: area.color }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "#e8edf5",
                        lineHeight: 1.3,
                        paddingTop: "4px",
                      }}
                    >
                      {area.title}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(232, 237, 245, 0.65)",
                      lineHeight: 1.75,
                      marginBottom: "16px",
                    }}
                  >
                    {area.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          background: `${area.color}10`,
                          border: `1px solid ${area.color}25`,
                          color: area.color,
                          opacity: 0.85,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Thesis highlight */}
        <AnimatedSection delay={0.4}>
          <div
            className="mt-12 p-8 rounded-xl relative overflow-hidden"
            style={{
              background: "rgba(245, 200, 66, 0.04)",
              border: "1px solid rgba(245, 200, 66, 0.2)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
              style={{ background: "linear-gradient(180deg, #f5c842, #4d9fff)" }}
            />
            <div className="pl-4">
              <span
                className="section-label mb-2 block"
                style={{ color: "#f5c842" }}
              >
                PhD Thesis
              </span>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#e8edf5",
                  marginBottom: "8px",
                }}
              >
                "Search for electroweak production of charginos and neutralinos
                at CMS experiment (LHC, CERN)"
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(232, 237, 245, 0.6)",
                  lineHeight: 1.7,
                }}
              >
                Conducted rigorous statistical modeling and data analyses for
                supersymmetry (SUSY) searches using advanced machine learning
                techniques on massive datasets from a multi-billion dollar
                experiment at the Large Hadron Collider.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
