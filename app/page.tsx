import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Section anchors — empty placeholders for Phase 3 and 4 content */}
      <section id="work" className="min-h-screen bg-canvas" />
      <section id="about" className="min-h-screen bg-canvas" />
      <section id="contact" className="min-h-screen bg-canvas" />
    </main>
  );
}
