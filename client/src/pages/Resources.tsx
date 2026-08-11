/* ============================================================
   DESIGN: "Collision Event" — Standalone Free AI Resources page
   ============================================================ */

import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import NavBar from "@/components/NavBar";
import ResourcesSection from "@/components/ResourcesSection";

export default function Resources() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050d1a", color: "#e8edf5" }}
    >
      <NavBar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(232, 237, 245, 0.55)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#f5c842";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "rgba(232, 237, 245, 0.55)";
          }}
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </Link>
      </div>
      <ResourcesSection />
      <footer
        className="py-8 text-center"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: "rgba(232, 237, 245, 0.35)",
        }}
      >
        © {new Date().getFullYear()} Ankush Kanuganti
      </footer>
    </div>
  );
}
