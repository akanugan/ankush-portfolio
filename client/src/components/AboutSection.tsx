/* ============================================================
   DESIGN: "Collision Event" — About Section
   Split layout with summary and education timeline
   ============================================================ */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const CERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663449292838/7LZbx2seopNHpyyYuMs8z3/cern-abstract-Yft3PDqiNpEKr2NjemWnrS.webp";

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: "#050d1a" }}
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-10"
        style={{
          backgroundImage: `url(${CERN_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
        }}
      />
      <div
        className="absolute right-0 top-0 w-1/2 h-full"
        style={{
          background: "linear-gradient(90deg, #050d1a 0%, rgba(5,13,26,0.6) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16">
            <span className="section-label">// 01 — about</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              THE QUANT MIND
              <br />
              <span style={{ color: "#f5c842" }}>BEHIND THE MODELS</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4"
              style={{ background: "linear-gradient(90deg, #f5c842, transparent)" }}
            />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Summary */}
          <div>
            <AnimatedSection delay={0.1}>
              <div
                className="p-6 rounded-lg mb-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(77, 159, 255, 0.15)",
                  borderLeft: "3px solid #4d9fff",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(232, 237, 245, 0.85)",
                    lineHeight: 1.8,
                  }}
                >
                  Physics Ph.D. with deep expertise in{" "}
                  <span style={{ color: "#f5c842", fontWeight: 600 }}>
                    scientific computing
                  </span>
                  ,{" "}
                  <span style={{ color: "#4d9fff", fontWeight: 600 }}>
                    statistical inference
                  </span>
                  , and{" "}
                  <span style={{ color: "#f5c842", fontWeight: 600 }}>
                    machine learning
                  </span>
                  . I build rigorous, production-grade models and pipelines
                  for high-dimensional data — from LHC collision events to
                  quantitative trading signals.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(232, 237, 245, 0.65)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                Proven track record designing Monte Carlo simulations, Bayesian
                inference pipelines, and distributed compute workflows on HPC
                clusters. Experienced in model validation, backtesting, and
                uncertainty quantification — the same statistical rigor demanded
                in quant research and scientific computing roles.
              </p>
            </AnimatedSection>

            {/* Key highlights */}
            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "PhD Physics", sub: "Statistical Modeling" },
                  { label: "CERN / LHC", sub: "PB-Scale Data Pipelines" },
                  { label: "Brookhaven Lab", sub: "AI/ML Deployment" },
                  { label: "Quant Methods", sub: "Cointegration · Backtesting" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded"
                    style={{
                      background: "rgba(245, 200, 66, 0.05)",
                      border: "1px solid rgba(245, 200, 66, 0.12)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "#f5c842",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(232, 237, 245, 0.5)",
                        marginTop: "2px",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Education */}
          <div>
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={20} style={{ color: "#f5c842" }} />
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.5rem",
                    color: "#e8edf5",
                    letterSpacing: "0.05em",
                  }}
                >
                  Education
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div
                className="relative p-6 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(245, 200, 66, 0.15)",
                }}
              >
                {/* Glow dot */}
                <div
                  className="absolute -left-3 top-6 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "#f5c842",
                    boxShadow: "0 0 12px rgba(245, 200, 66, 0.6)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#050d1a]" />
                </div>

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "#e8edf5",
                      }}
                    >
                      Masters & Ph.D.
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem",
                        color: "#4d9fff",
                        marginTop: "2px",
                      }}
                    >
                      Experimental Particle Physics
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.7rem",
                      color: "rgba(232, 237, 245, 0.4)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    2017 – 2023
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#f5c842",
                    marginBottom: "8px",
                  }}
                >
                  Baylor University — Waco, TX
                </p>

                <div
                  className="p-3 rounded text-sm"
                  style={{
                    background: "rgba(77, 159, 255, 0.06)",
                    border: "1px solid rgba(77, 159, 255, 0.12)",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(232, 237, 245, 0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "#4d9fff", fontWeight: 600 }}>
                    Thesis:{" "}
                  </span>
                  Search for electroweak production of charginos and neutralinos
                  at CMS experiment (LHC, CERN)
                </div>

                <p
                  className="mt-3 text-sm"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(232, 237, 245, 0.6)",
                    lineHeight: 1.7,
                  }}
                >
                  Conducted rigorous statistical modeling and data analyses for
                  supersymmetry (SUSY) searches using advanced machine learning
                  techniques on massive datasets from a multi-billion dollar
                  experiment.
                </p>
              </div>
            </AnimatedSection>

            {/* Honors */}
            <AnimatedSection delay={0.4}>
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award size={18} style={{ color: "#f5c842" }} />
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.3rem",
                      color: "#e8edf5",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Honors & Leadership
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      title: "Outstanding Graduate Dissertation Award Nominee",
                      year: "2023",
                    },
                    {
                      title: "Technical Lead, AI in Physics Research Group",
                      year: "2022",
                    },
                    {
                      title: "Graduate Student Representative, Physics Dept.",
                      year: "2020",
                    },
                    { title: "Shim & Park Research Scholarship", year: "2018" },
                  ].map((h) => (
                    <div
                      key={h.title}
                      className="flex justify-between items-center py-2 px-3 rounded"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderLeft: "2px solid rgba(245, 200, 66, 0.3)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: "rgba(232, 237, 245, 0.75)",
                        }}
                      >
                        {h.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: "0.7rem",
                          color: "#f5c842",
                          opacity: 0.7,
                          marginLeft: "12px",
                          flexShrink: 0,
                        }}
                      >
                        {h.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
