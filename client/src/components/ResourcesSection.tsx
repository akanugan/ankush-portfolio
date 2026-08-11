/* ============================================================
   DESIGN: "Collision Event" — Free AI Resources Section
   Curated videos, repos, guides, papers, and community links
   ============================================================ */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Video,
  Github,
  Map,
  FileText,
  Users,
  ExternalLink,
  Route,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

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

type ResourceItem = {
  title: string;
  href: string;
};

type ResourceCategory = {
  icon: LucideIcon;
  label: string;
  color: string;
  items: ResourceItem[];
};

const categories: ResourceCategory[] = [
  {
    icon: Video,
    label: "3 Videos",
    color: "#f5c842",
    items: [
      {
        title: "Master Claude AI & Claude Code in Just 30 Minutes",
        href: "https://lnkd.in/e59WK-nK",
      },
      {
        title: "Skills vs MCP vs Plugins vs CLI: What To Actually Use",
        href: "https://lnkd.in/efavqyZ3",
      },
      {
        title: "How the Top 5% Actually Use Claude Code",
        href: "https://lnkd.in/eFKr55V6",
      },
    ],
  },
  {
    icon: Github,
    label: "3 Repos",
    color: "#4d9fff",
    items: [
      {
        title: "Everything Claude Code (ECC)",
        href: "https://lnkd.in/exm8AqJE",
      },
      {
        title: "Awesome Claude Code",
        href: "https://lnkd.in/eR-GNHd4",
      },
      {
        title: "Superpowers",
        href: "https://lnkd.in/eXajbpaw",
      },
    ],
  },
  {
    icon: Map,
    label: "3 Guides",
    color: "#a78bfa",
    items: [
      {
        title: "Claude Code Best Practices",
        href: "https://lnkd.in/eHYBKhKE",
      },
      {
        title: "How Anthropic Teams Use Claude Code",
        href: "https://lnkd.in/enU5Z8yw",
      },
      {
        title: "Effective Context Engineering for AI Agents",
        href: "https://lnkd.in/emcith_K",
      },
    ],
  },
  {
    icon: FileText,
    label: "2 Papers + 1 Book",
    color: "#34d399",
    items: [
      {
        title: "Attention Is All You Need (the Transformer paper)",
        href: "https://lnkd.in/dU7fgUdD",
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        href: "https://lnkd.in/eciPRWfK",
      },
      {
        title: "AI Engineering by Chip Huyen",
        href: "https://lnkd.in/e8cbyQhm",
      },
    ],
  },
  {
    icon: Users,
    label: "1 Community",
    color: "#ff6b6b",
    items: [
      {
        title:
          "AI Inner Circle — Claude, agents, and automation every day",
        href: "https://lnkd.in/eE9fip-F",
      },
    ],
  },
];

const omniSteps = [
  {
    n: "01",
    title: "Install & launch",
    body: "Install OmniRoute globally, then start the local gateway and dashboard on port 20128.",
    code: "npm install -g omniroute\nomniroute",
  },
  {
    n: "02",
    title: "Connect free providers",
    body: "Open the dashboard → Providers → Add Provider. Connect Kiro AI, OpenCode Free, Pollinations, Qwen, or Cloudflare AI — many need no API key.",
    code: "http://localhost:20128",
  },
  {
    n: "03",
    title: "Point Claude Code / your IDE",
    body: "Set the base URL to OmniRoute’s OpenAI-compatible endpoint and paste the key from Dashboard → Endpoints. Use model auto for smart free-tier routing.",
    code: "Base URL: http://localhost:20128/v1\nAPI Key:  <from dashboard>\nModel:    auto",
  },
  {
    n: "04",
    title: "Stack free APIs",
    body: "Connect 3–4 free providers so OmniRoute can fall back when one hits a quota. Pair with Cerebras, Groq, or NVIDIA NIM free signup tiers for more headroom.",
    code: "auto  → pick best free/cheap route\nauto/cheap → prioritize free tiers",
  },
];

const freeProviders = [
  { name: "Kiro AI", note: "Claude Sonnet / Opus · ~50 credits/mo", color: "#f5c842" },
  { name: "OpenCode Free", note: "GPT / Claude / Gemini · unlimited", color: "#4d9fff" },
  { name: "Pollinations", note: "Multi-model · no key needed", color: "#a78bfa" },
  { name: "Qwen / Qoder", note: "Strong coding models · free forever", color: "#34d399" },
  { name: "Cerebras", note: "1M tokens/day · signup free tier", color: "#ff6b6b" },
  { name: "NVIDIA NIM", note: "~40 RPM · 100+ models", color: "#f5c842" },
];

const omniLinks = [
  { label: "OmniRoute site", href: "https://omniroute.online/" },
  { label: "GitHub", href: "https://github.com/diegosouzapw/OmniRoute" },
  {
    label: "Free Tiers Guide",
    href: "https://github.com/diegosouzapw/OmniRoute/blob/main/docs/getting-started/FREE-TIERS-GUIDE.md",
  },
];

export default function ResourcesSection() {
  return (
    <section
      id="resources"
      className="py-24"
      style={{ background: "#070f1e" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16">
            <span className="section-label">// free ai resources</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              FREE AI
              <br />
              <span style={{ color: "#4d9fff" }}>RESOURCES</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4"
              style={{
                background: "linear-gradient(90deg, #4d9fff, transparent)",
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(232, 237, 245, 0.55)",
                lineHeight: 1.7,
                marginTop: "16px",
                maxWidth: "40rem",
              }}
            >
              A starter kit for Claude Code, agents, and AI engineering —
              plus how to run OmniRoute and stack free API tiers so you
              keep coding without burning paid credits.
            </p>
          </div>
        </AnimatedSection>

        {/* OmniRoute how-to */}
        <AnimatedSection>
          <div
            className="mb-16 p-6 sm:p-8 rounded-xl relative overflow-hidden"
            style={{
              background: "rgba(77, 159, 255, 0.04)",
              border: "1px solid rgba(77, 159, 255, 0.2)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
              style={{
                background: "linear-gradient(180deg, #4d9fff, #f5c842)",
              }}
            />

            <div className="pl-2 sm:pl-4">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: "rgba(77, 159, 255, 0.12)",
                        border: "1px solid rgba(77, 159, 255, 0.3)",
                      }}
                    >
                      <Route size={18} style={{ color: "#4d9fff" }} />
                    </div>
                    <span
                      className="section-label"
                      style={{ color: "#4d9fff" }}
                    >
                      How to use OmniRoute
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      color: "#e8edf5",
                      letterSpacing: "0.03em",
                      lineHeight: 1.1,
                    }}
                  >
                    Free AI gateway for Claude Code & IDEs
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(232, 237, 245, 0.6)",
                      lineHeight: 1.7,
                      marginTop: "10px",
                      maxWidth: "42rem",
                    }}
                  >
                    OmniRoute is an open-source local gateway that aggregates
                    90+ free provider tiers into one endpoint (
                    <span style={{ color: "#4d9fff", fontFamily: "'Fira Code', monospace", fontSize: "0.82rem" }}>
                      localhost:20128/v1
                    </span>
                    ). Connect free backends, set{" "}
                    <span style={{ color: "#f5c842", fontFamily: "'Fira Code', monospace", fontSize: "0.82rem" }}>
                      model: auto
                    </span>
                    , and it routes around quotas with automatic fallback.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {omniLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all duration-200"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        background: "rgba(77, 159, 255, 0.1)",
                        border: "1px solid rgba(77, 159, 255, 0.35)",
                        color: "#4d9fff",
                      }}
                    >
                      {link.label}
                      <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {omniSteps.map((step) => (
                  <div
                    key={step.n}
                    className="p-4 rounded-lg"
                    style={{
                      background: "rgba(5, 13, 26, 0.55)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: "0.7rem",
                          color: "#f5c842",
                        }}
                      >
                        {step.n}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "#e8edf5",
                        }}
                      >
                        {step.title}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: "rgba(232, 237, 245, 0.55)",
                        lineHeight: 1.65,
                        marginBottom: "12px",
                      }}
                    >
                      {step.body}
                    </p>
                    <pre
                      className="overflow-x-auto rounded p-3"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: "0.72rem",
                        color: "#4d9fff",
                        background: "rgba(0,0,0,0.35)",
                        border: "1px solid rgba(77, 159, 255, 0.15)",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {step.code}
                    </pre>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} style={{ color: "#f5c842" }} />
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem",
                    color: "#e8edf5",
                    letterSpacing: "0.05em",
                  }}
                >
                  Free API providers to connect
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {freeProviders.map((p) => (
                  <div
                    key={p.name}
                    className="px-3 py-3 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${p.color}22`,
                      borderLeft: `2px solid ${p.color}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: p.color,
                        marginBottom: "2px",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(232, 237, 245, 0.5)",
                        lineHeight: 1.4,
                      }}
                    >
                      {p.note}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg"
                style={{
                  background: "rgba(245, 200, 66, 0.06)",
                  border: "1px solid rgba(245, 200, 66, 0.2)",
                }}
              >
                <Terminal size={16} style={{ color: "#f5c842", flexShrink: 0 }} />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(232, 237, 245, 0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  Tip: For Claude Code, set{" "}
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      color: "#f5c842",
                      fontSize: "0.78rem",
                    }}
                  >
                    ANTHROPIC_BASE_URL=http://localhost:20128/v1
                  </span>{" "}
                  (and the dashboard API key) so the CLI talks to OmniRoute
                  instead of Anthropic directly — then free providers power your
                  sessions with auto-fallback when one tier runs out.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category, ci) => {
            const Icon = category.icon;
            return (
              <AnimatedSection key={category.label} delay={ci * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-xl h-full"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderTop: `2px solid ${category.color}`,
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: `${category.color}15`,
                        border: `1px solid ${category.color}25`,
                      }}
                    >
                      <Icon size={16} style={{ color: category.color }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.15rem",
                        color: "#e8edf5",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {category.label}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-2.5 transition-colors duration-200"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.9rem",
                            color: "rgba(232, 237, 245, 0.7)",
                            lineHeight: 1.5,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              category.color;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "rgba(232, 237, 245, 0.7)";
                          }}
                        >
                          <span
                            className="mt-1.5 flex-shrink-0 rounded-full"
                            style={{
                              width: "6px",
                              height: "6px",
                              background: category.color,
                              opacity: 0.7,
                            }}
                          />
                          <span className="flex-1">{item.title}</span>
                          <ExternalLink
                            size={13}
                            className="mt-1 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                            style={{ color: category.color }}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
