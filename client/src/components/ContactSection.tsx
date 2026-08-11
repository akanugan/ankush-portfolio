/* ============================================================
   DESIGN: "Collision Event" — Contact Section & Footer
   Clean contact CTA with social links and footer
   ============================================================ */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin, ExternalLink } from "lucide-react";

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

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "kanuganti.ankush@gmail.com",
    href: "mailto:kanuganti.ankush@gmail.com",
    color: "#f5c842",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ankush-kanuganti",
    href: "https://linkedin.com/in/ankush-kanuganti",
    color: "#4d9fff",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 254-400-6273",
    href: "tel:+12544006273",
    color: "#a78bfa",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ridge, NY (Brookhaven National Lab)",
    href: "#",
    color: "#34d399",
  },
];

export default function ContactSection() {
  return (
    <>
      <section
        id="contact"
        className="relative py-24 overflow-hidden"
        style={{ background: "#070f1e" }}
      >
        {/* Radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,200,66,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label">// 07 — contact</span>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#e8edf5",
                  lineHeight: 1,
                  marginTop: "8px",
                }}
              >
                LET'S
                <br />
                <span style={{ color: "#f5c842" }}>CONNECT</span>
              </h2>
              <div
                className="h-0.5 w-16 mt-4 mx-auto"
                style={{ background: "linear-gradient(90deg, transparent, #f5c842, transparent)" }}
              />
              <p
                className="mt-6 max-w-lg mx-auto"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(232, 237, 245, 0.6)",
                  lineHeight: 1.7,
                }}
              >
                Open to research collaborations, industry roles in quantitative
                analysis, ML engineering, and data science. Let's explore what
                we can build together.
              </p>
            </div>
          </AnimatedSection>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <AnimatedSection key={link.label} delay={i * 0.08}>
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="block p-5 rounded-xl text-center"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${link.color}20`,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${link.color}08`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${link.color}40`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${link.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                      (e.currentTarget as HTMLElement).style.borderColor = `${link.color}20`;
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                      }}
                    >
                      <Icon size={18} style={{ color: link.color }} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: "0.65rem",
                        color: link.color,
                        letterSpacing: "0.1em",
                        marginBottom: "4px",
                        opacity: 0.7,
                      }}
                    >
                      {link.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: "rgba(232, 237, 245, 0.7)",
                        wordBreak: "break-all",
                      }}
                    >
                      {link.value}
                    </div>
                  </motion.a>
                </AnimatedSection>
              );
            })}
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.35}>
            <div className="text-center">
              <a
                href="mailto:kanuganti.ankush@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3 rounded text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "linear-gradient(135deg, #f5c842, #e8a820)",
                  color: "#050d1a",
                  letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(245, 200, 66, 0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 40px rgba(245, 200, 66, 0.45)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 20px rgba(245, 200, 66, 0.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Mail size={16} />
                Send a Message
                <ExternalLink size={13} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#050d1a",
          borderTop: "1px solid rgba(245, 200, 66, 0.1)",
          padding: "2rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #f5c842, #4d9fff)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "10px",
                    color: "#050d1a",
                  }}
                >
                  AK
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(232, 237, 245, 0.35)",
                }}
              >
                Ankush Kanuganti, PhD — 2025
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.7rem",
                color: "rgba(232, 237, 245, 0.25)",
              }}
            >
              // particle physicist · data scientist · ML researcher
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
