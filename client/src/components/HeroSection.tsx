/* ============================================================
   DESIGN: "Collision Event" — Hero Section
   Full-screen hero with particle collision background,
   interactive 3D CMS detector, and quant-focused typography
   ============================================================ */

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import CMSDetector3D from "./CMSDetector3D";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663449292838/7LZbx2seopNHpyyYuMs8z3/hero-bg-6jcntJ2MmTamqjjrQhfdjD.webp";

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#050d1a" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
        }}
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,13,26,0.9) 0%, rgba(10,31,46,0.7) 50%, rgba(5,13,26,0.9) 100%)",
        }}
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(77,159,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(77,159,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span
                className="section-label mb-4 block"
                style={{ color: "#4d9fff" }}
              >
                // quant research · scientific computing · ML
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                lineHeight: 0.95,
                letterSpacing: "0.02em",
                color: "#e8edf5",
              }}
            >
              ANKUSH
              <br />
              <span style={{ color: "#f5c842" }}>KANUGANTI</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-4 mb-8"
            >
              <div
                className="h-0.5 w-24 mb-6"
                style={{
                  background: "linear-gradient(90deg, #f5c842, transparent)",
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.1rem",
                  color: "rgba(232, 237, 245, 0.75)",
                  lineHeight: 1.7,
                  maxWidth: "480px",
                }}
              >
                Physics PhD building{" "}
                <span style={{ color: "#f5c842", fontWeight: 600 }}>
                  large-scale data pipelines
                </span>
                ,{" "}
                <span style={{ color: "#4d9fff", fontWeight: 600 }}>
                  statistical models
                </span>
                , and{" "}
                <span style={{ color: "#f5c842", fontWeight: 600 }}>
                  HPC workflows
                </span>
                . From petabyte-scale analysis at{" "}
                <span style={{ color: "#4d9fff", fontWeight: 600 }}>CERN</span>{" "}
                to AI deployment at{" "}
                <span style={{ color: "#f5c842", fontWeight: 600 }}>
                  Brookhaven National Lab
                </span>
                — bridging fundamental research and quantitative methods.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {[
                { value: "PB+", label: "Data Processed" },
                { value: "6+", label: "Years HPC/ML" },
                { value: "Bayes", label: "Inference" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(245, 200, 66, 0.15)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.8rem",
                      color: "#f5c842",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.65rem",
                      color: "rgba(232, 237, 245, 0.5)",
                      letterSpacing: "0.1em",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <a
                href="mailto:kanuganti.ankush@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "#f5c842",
                  color: "#050d1a",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px rgba(245, 200, 66, 0.5)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                <Mail size={15} />
                Contact Me
              </a>
              <a
                href="https://linkedin.com/in/ankush-kanuganti"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded transition-all duration-200"
                style={{
                  border: "1px solid rgba(77, 159, 255, 0.3)",
                  color: "#4d9fff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(77, 159, 255, 0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 16px rgba(77, 159, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded transition-all duration-200"
                style={{
                  border: "1px solid rgba(245, 200, 66, 0.3)",
                  color: "#f5c842",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(245, 200, 66, 0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 16px rgba(245, 200, 66, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Github size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right: Interactive 3D CMS detector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-xl" style={{ height: "480px" }}>
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 65%)",
                  transform: "scale(1.15)",
                }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full pointer-events-none"
                style={{
                  border: "1px solid rgba(245, 200, 66, 0.15)",
                  borderTopColor: "rgba(245, 200, 66, 0.5)",
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full pointer-events-none"
                style={{
                  border: "1px solid rgba(77, 159, 255, 0.15)",
                  borderBottomColor: "rgba(77, 159, 255, 0.5)",
                }}
              />
              <CMSDetector3D className="w-full h-full" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs whitespace-nowrap"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  background: "rgba(5, 13, 26, 0.9)",
                  border: "1px solid rgba(245, 200, 66, 0.3)",
                  color: "#f5c842",
                  letterSpacing: "0.1em",
                }}
              >
                CMS Detector · 3D Cross-Section
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(232, 237, 245, 0.4)" }}
      >
        <span
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
