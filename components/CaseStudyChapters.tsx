"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudy } from "@/data/case-studies";
import { DecisionCard } from "./DecisionCard";
import { OutcomeStat } from "./OutcomeStat";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudyChapters({ study }: { study: CaseStudy }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute next study for "Next: [Title] →" link
  const allPublished = caseStudies.filter((cs) => cs.status === "published");
  const currentIndex = allPublished.findIndex((cs) => cs.id === study.id);
  const nextStudy = allPublished[(currentIndex + 1) % allPublished.length];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { reduceMotion } = context.conditions!;
        if (reduceMotion) {
          gsap.set(".chapter-content", { autoAlpha: 1, y: 0 });
          return; // NO ScrollTrigger created — no pinning for reduced motion
        }

        // Pin each chapter and animate chapter-line children on enter
        document.querySelectorAll<HTMLElement>(".chapter").forEach((chapter) => {
          const lines = chapter.querySelectorAll(".chapter-line");
          ScrollTrigger.create({
            trigger: chapter,
            start: "top top",
            end: "+=200%",
            pin: true,
            pinSpacing: true,
            onEnter: () => {
              gsap.from(lines, {
                autoAlpha: 0,
                y: 18,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
              });
            },
          });
        });

        // Progress bar — tracks overall chapters scroll progress
        ScrollTrigger.create({
          trigger: ".chapters-container",
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            gsap.set(".progress-bar-fill", { scaleY: self.progress });
          },
        });
      });
    },
    { scope: containerRef }
  );

  // ScrollTrigger.refresh() fix — called after paint to account for pinned heights (Pitfall 3)
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef} className="chapters-container relative">
      {/* Progress bar — fixed right edge */}
      <div className="fixed right-0 top-0 h-screen w-[3px] bg-ink/10 z-40 pointer-events-none">
        <div
          className="progress-bar-fill w-full bg-accent origin-top"
          style={{ height: "100%", transform: "scaleY(0)", transformOrigin: "top" }}
        />
      </div>

      {/* Chapter: Problem */}
      <section className="chapter min-h-screen flex items-center px-8">
        <div className="chapter-content max-w-2xl mx-auto w-full">
          <p className="chapter-line font-sans text-sm uppercase tracking-widest text-ink/40 mb-6">
            Problem
          </p>
          <p className="chapter-line font-sans text-xl text-ink leading-relaxed">{study.problem}</p>
        </div>
      </section>

      {/* Chapter: Process */}
      <section className="chapter min-h-screen flex items-center px-8">
        <div className="chapter-content max-w-2xl mx-auto w-full">
          <p className="chapter-line font-sans text-sm uppercase tracking-widest text-ink/40 mb-6">
            Process
          </p>
          <p className="chapter-line font-sans text-xl text-ink leading-relaxed">{study.process}</p>
        </div>
      </section>

      {/* Chapter: Key Decisions */}
      <section className="chapter min-h-screen flex items-center px-8">
        <div className="chapter-content max-w-2xl mx-auto w-full">
          <p className="chapter-line font-sans text-sm uppercase tracking-widest text-ink/40 mb-8">
            Key Decisions
          </p>
          <div className="space-y-6">
            {study.keyDecisions.map((decision, i) => (
              <DecisionCard key={i} decision={decision} />
            ))}
          </div>
        </div>
      </section>

      {/* Chapter: Outcomes */}
      <section className="chapter min-h-screen flex items-center px-8">
        <div className="chapter-content max-w-2xl mx-auto w-full">
          <p className="chapter-line font-sans text-sm uppercase tracking-widest text-ink/40 mb-10">
            Outcomes
          </p>
          <div className="space-y-10">
            {study.outcomes.map((outcome, i) => (
              <OutcomeStat key={i} outcome={outcome} />
            ))}
          </div>
        </div>
      </section>

      {/* Next case study link */}
      <div className="py-24 px-8 text-center border-t border-ink/10">
        <Link
          href={`/work/${nextStudy.id}`}
          className="font-display text-2xl text-ink hover:text-accent transition-colors duration-200"
        >
          Next: {nextStudy.title} &rarr;
        </Link>
      </div>
    </div>
  );
}
