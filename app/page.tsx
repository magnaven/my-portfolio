import { HeroSection } from "@/components/HeroSection";
import { WorkSection } from "@/components/WorkSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <WorkSection />

      <AboutSection />
      <ContactSection />
    </main>
  );
}
