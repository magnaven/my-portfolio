"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useRef, useEffect } from "react";
import { heroCopy } from "@/content/hero";

gsap.registerPlugin(SplitText);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduceMotion } = context.conditions!;

          if (reduceMotion) {
            gsap.set(
              [
                headlineRef.current,
                ".credential-line",
                ".cta-group",
                ".scroll-indicator",
              ],
              { autoAlpha: 1, y: 0 }
            );
            return;
          }

          const split = SplitText.create(headlineRef.current, {
            type: "chars",
            tag: "span",
          });

          const tl = gsap.timeline();

          tl.from(split.chars, {
            autoAlpha: 0,
            y: 40,
            duration: 0.45,
            stagger: 0.018,
            ease: "back.out(1.4)",
          })
            .from(
              ".credential-line",
              {
                autoAlpha: 0,
                y: 16,
                duration: 0.4,
                ease: "power2.out",
              },
              "-=0.1"
            )
            .from(
              ".cta-group",
              {
                autoAlpha: 0,
                y: 14,
                duration: 0.35,
                ease: "power2.out",
              },
              "-=0.1"
            )
            .from(
              ".scroll-indicator",
              {
                autoAlpha: 0,
                y: 8,
                duration: 0.3,
                ease: "power2.out",
              },
              "-=0.05"
            );

        }
      );
    },
    { scope: containerRef }
  );

  // Bounce + fade-out for scroll indicator (separate effect — uses gsap.to outside of matchMedia context)
  useEffect(() => {
    const prefersReduced =
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const indicator = document.querySelector<HTMLElement>(
      "[data-testid='scroll-indicator']"
    );
    if (!indicator) return;

    // Bounce loop only when motion is allowed
    if (!prefersReduced) {
      gsap.to(indicator, {
        y: 6,
        duration: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }

    // Fade out once user scrolls past 50px
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(indicator, { autoAlpha: 0, duration: 0.3 });
      } else {
        gsap.to(indicator, { autoAlpha: 1, duration: 0.3 });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-start justify-center bg-canvas"
    >
      <div className="max-w-5xl mx-auto px-8 w-full">
        <h1
          ref={headlineRef}
          className="font-display text-[7rem] leading-[1.05] text-ink"
        >
          I&apos;ve built products from zero. I design like I still{" "}
          <span className="text-accent">own it.</span>
        </h1>

        <p className="credential-line font-sans text-lg text-ink/70 mt-6">
          {heroCopy.credentialLine}
        </p>

        <div className="cta-group flex gap-4 mt-8">
          <button
            onClick={() => lenis?.scrollTo("#work", { offset: -80 })}
            className="bg-accent text-canvas font-sans px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            {heroCopy.ctaDesignPartner}
          </button>
          <button
            onClick={() => lenis?.scrollTo("#contact", { offset: -80 })}
            className="border border-accent text-accent font-sans px-6 py-3 rounded-sm hover:bg-accent/10 transition-colors"
          >
            {heroCopy.ctaHiring}
          </button>
        </div>
      </div>

      <div
        data-testid="scroll-indicator"
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-ink/50"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
