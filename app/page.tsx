import { HeroSection } from "@/components/HeroSection";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <WorkSection />

      {/* Section anchors — empty placeholders for Phase 4 content */}
      <section id="about" className="min-h-screen bg-canvas" />
      <section id="contact" className="min-h-screen bg-canvas" />
    </main>
  );
}
