"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { aboutContent } from "@/content/about";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduceMotion } = context.conditions!;

          if (reduceMotion) {
            gsap.set(".about-content", { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(".about-content", {
            autoAlpha: 0,
            y: 32,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#about",
              start: "top 75%",
            },
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" className="bg-canvas py-24">
      <div ref={containerRef} className="max-w-5xl mx-auto px-8">
        <p className="font-sans text-sm uppercase tracking-widest text-ink/40 mb-16">
          About
        </p>
        <div className="about-content">
          {aboutContent.narrative.map((paragraph, i) => (
            <p
              key={i}
              className="font-display text-xl text-ink/80 mb-6 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <a
            href="/ida-dilfer-tinker-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-accent text-accent font-sans px-6 py-3 rounded-sm hover:bg-accent/10 transition-colors inline-block mt-4"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
