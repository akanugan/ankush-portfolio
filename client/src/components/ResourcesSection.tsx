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
            <span className="section-label">// 07 — resources</span>
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
                maxWidth: "36rem",
              }}
            >
              A starter kit for Claude Code, agents, and AI engineering —
              videos, repos, guides, papers, and a community to dig into.
            </p>
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
