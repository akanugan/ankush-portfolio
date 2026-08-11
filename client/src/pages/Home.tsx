/* ============================================================
   DESIGN: "Collision Event" — Main Portfolio Page
   Assembles all sections with smooth scroll navigation
   ============================================================ */

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#050d1a", color: "#e8edf5" }}
    >
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ResearchSection />
      <ProjectsSection />
      <PublicationsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
