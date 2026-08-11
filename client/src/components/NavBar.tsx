/* ============================================================
   DESIGN: "Collision Event" — Fixed navigation bar
   Transparent with blur backdrop, gold accent on active
   ============================================================ */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Skills", href: "#skills" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? "rgba(5, 13, 26, 0.92)"
          : "rgba(5, 13, 26, 0.4)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(245, 200, 66, 0.15)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #f5c842, #4d9fff)",
                boxShadow: "0 0 12px rgba(245, 200, 66, 0.4)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "14px",
                  color: "#050d1a",
                  fontWeight: "bold",
                }}
              >
                AK
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.1em",
                color: "#e8edf5",
              }}
            >
              Ankush Kanuganti
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-3 py-2 text-sm transition-colors duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    color: isActive ? "#f5c842" : "rgba(232, 237, 245, 0.7)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "#f5c842" }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="mailto:kanuganti.ankush@gmail.com"
              className="px-4 py-2 text-sm font-medium rounded transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(245, 200, 66, 0.1)",
                border: "1px solid rgba(245, 200, 66, 0.4)",
                color: "#f5c842",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background =
                  "rgba(245, 200, 66, 0.2)";
                (e.target as HTMLElement).style.boxShadow =
                  "0 0 16px rgba(245, 200, 66, 0.25)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background =
                  "rgba(245, 200, 66, 0.1)";
                (e.target as HTMLElement).style.boxShadow = "none";
              }}
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#f5c842" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(5, 13, 26, 0.97)",
              borderTop: "1px solid rgba(245, 200, 66, 0.15)",
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-3 py-3 text-sm rounded transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color:
                      activeSection === link.href.slice(1)
                        ? "#f5c842"
                        : "rgba(232, 237, 245, 0.8)",
                    borderLeft:
                      activeSection === link.href.slice(1)
                        ? "2px solid #f5c842"
                        : "2px solid transparent",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
