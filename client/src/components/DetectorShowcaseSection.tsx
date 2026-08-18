/* ============================================================
   DESIGN: "Collision Event" — Detector Showcase Section
   Interactive 3D CMS model with quant/scientific computing context
   ============================================================ */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Cpu, LineChart, Database } from "lucide-react";
import CMSDetector3D from "./CMSDetector3D";

function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
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

const computeHighlights = [
  {
    icon: Database,
    title: "Petabyte-Scale Pipelines",
    color: "#f5c842",
    text: "Built end-to-end analysis workflows on CERN Grid and HTCondor — processing collision datasets at the scale quant firms handle tick-level market data.",
  },
  {
    icon: LineChart,
    title: "Statistical Inference",
    color: "#4d9fff",
    text: "Bayesian and frequentist hypothesis testing, CLs limits, and uncertainty quantification — the same rigor required for model validation in quant research.",
  },
  {
    icon: Cpu,
    title: "HPC & Distributed Systems",
    color: "#a78bfa",
    text: "Scaled Monte Carlo simulations and ML training across Slurm clusters and grid computing — optimizing throughput for compute-intensive workloads.",
  },
  {
    icon: Box,
    title: "Numerical Modeling",
    color: "#34d399",
    text: "GNNs and attention networks for high-dimensional sensor data — translating detector geometry into graph structures for predictive modeling.",
  },
];

export default function DetectorShowcaseSection() {
  return (
    <section
      id="detector"
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #070f1e 0%, #050d1a 50%, #070f1e 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, rgba(77, 159, 255, 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center lg:text-left">
            <span className="section-label">// interactive — CMS detector</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              FROM DETECTOR
              <br />
              <span style={{ color: "#f5c842" }}>TO DATA SCIENCE</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4 mx-auto lg:mx-0"
              style={{
                background: "linear-gradient(90deg, #f5c842, transparent)",
              }}
            />
            <p
              className="mt-4 max-w-2xl mx-auto lg:mx-0"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(232, 237, 245, 0.65)",
                lineHeight: 1.7,
              }}
            >
              The CMS detector is a 14,000-ton instrument measuring proton
              collisions 40 million times per second. The same scientific
              computing skills — large-scale data pipelines, statistical
              inference, and numerical optimization — transfer directly to
              quantitative finance and HPC research roles.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.15}>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: "min(520px, 70vw)",
                background:
                  "radial-gradient(ellipse at center, rgba(77,159,255,0.08) 0%, rgba(5,13,26,0.95) 70%)",
                border: "1px solid rgba(245, 200, 66, 0.15)",
                boxShadow:
                  "0 0 80px rgba(77, 159, 255, 0.08), inset 0 0 60px rgba(5, 13, 26, 0.8)",
              }}
            >
              <CMSDetector3D className="w-full h-full" />
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 40%, rgba(5,13,26,0.4) 100%)",
                }}
              />
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {computeHighlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={0.2 + i * 0.08}>
                  <div
                    className="p-5 rounded-xl transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${item.color}20`,
                      borderLeft: `3px solid ${item.color}`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="p-2.5 rounded-lg flex-shrink-0"
                        style={{
                          background: `${item.color}12`,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        <Icon size={18} style={{ color: item.color }} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: "#e8edf5",
                            marginBottom: "6px",
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.85rem",
                            color: "rgba(232, 237, 245, 0.65)",
                            lineHeight: 1.65,
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
