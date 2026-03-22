"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyCard } from "@/components/CaseStudyCard";

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const published = caseStudies.filter((cs) => cs.status === "published");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduceMotion } = context.conditions!;

          if (reduceMotion) {
            gsap.set(".case-study-card", { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(".case-study-card", {
            autoAlpha: 0,
            y: 32,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#work",
              start: "top 75%",
            },
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="work" className="bg-canvas py-24">
      <div ref={containerRef} className="max-w-5xl mx-auto px-8">
        <p className="font-sans text-sm uppercase tracking-widest text-ink/40 mb-16">
          Selected Work
        </p>
        <div>
          {published.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
