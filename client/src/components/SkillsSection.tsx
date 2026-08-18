/* ============================================================
   DESIGN: "Collision Event" — Skills Section
   Animated skill bars and categorized tech stack
   ============================================================ */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layers, Cloud, Cpu, Sigma } from "lucide-react";

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

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(232, 237, 245, 0.8)",
            fontWeight: 500,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: "0.7rem",
            color: color,
            opacity: 0.7,
          }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

const skillCategories = [
  {
    icon: Code2,
    title: "Scientific Computing",
    color: "#f5c842",
    skills: [
      { name: "Python (NumPy/Pandas)", level: 95 },
      { name: "C / C++", level: 85 },
      { name: "R / SQL", level: 80 },
      { name: "MATLAB / Julia", level: 70 },
    ],
  },
  {
    icon: Sigma,
    title: "Quant & Statistics",
    color: "#ff6b6b",
    skills: [
      { name: "Bayesian Inference", level: 92 },
      { name: "Time Series / Cointegration", level: 88 },
      { name: "Monte Carlo Simulation", level: 90 },
      { name: "Hypothesis Testing", level: 93 },
    ],
  },
  {
    icon: Layers,
    title: "ML / AI Frameworks",
    color: "#4d9fff",
    skills: [
      { name: "PyTorch", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "Scikit-learn", level: 92 },
      { name: "XGBoost", level: 80 },
    ],
  },
  {
    icon: Cpu,
    title: "HPC & Distributed",
    color: "#a78bfa",
    skills: [
      { name: "HTCondor / Slurm", level: 90 },
      { name: "CERN Grid Computing", level: 85 },
      { name: "CUDA / GPU Computing", level: 78 },
      { name: "Docker / Kubernetes", level: 78 },
    ],
  },
];

const techBadges = [
  { group: "Numerical Libraries", items: ["NumPy", "SciPy", "Pandas", "Statsmodels", "ROOT"], color: "#f5c842" },
  { group: "Cloud & HPC", items: ["AWS", "Google Cloud", "HTCondor", "Slurm"], color: "#4d9fff" },
  { group: "Quant Finance", items: ["Options 101 — Aquatic Capital", "Options 201 — Aquatic Capital", "Pairs Trading"], color: "#ff6b6b" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24"
      style={{ background: "#050d1a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16">
            <span className="section-label">// 06 — skills</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              QUANT & SCIENTIFIC
              <br />
              <span style={{ color: "#f5c842" }}>COMPUTING STACK</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4"
              style={{ background: "linear-gradient(90deg, #f5c842, transparent)" }}
            />
          </div>
        </AnimatedSection>

        {/* Skill bars grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <AnimatedSection key={cat.title} delay={ci * 0.1}>
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderTop: `2px solid ${cat.color}`,
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}25`,
                      }}
                    >
                      <Icon size={16} style={{ color: cat.color }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.1rem",
                        color: "#e8edf5",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {cat.title}
                    </span>
                  </div>
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={ci * 0.1 + si * 0.08}
                    />
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Additional badges */}
        <AnimatedSection delay={0.4}>
          <div className="grid md:grid-cols-3 gap-6">
            {techBadges.map((group) => (
              <div
                key={group.group}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${group.color}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Cloud size={14} style={{ color: group.color }} />
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1rem",
                      color: "#e8edf5",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {group.group}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded text-xs"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: `${group.color}10`,
                        border: `1px solid ${group.color}25`,
                        color: group.color,
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
