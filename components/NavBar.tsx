"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  // Transparent → solid on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 90); // ~90px threshold — just past the nav's own height
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load fade-in animation — after hero CTAs (~1.4s delay)
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { reduceMotion } = context.conditions!;
        if (reduceMotion) {
          gsap.set(navRef.current, { autoAlpha: 1 });
          return;
        }
        gsap.from(navRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
          delay: 1.4, // after hero sequence completes (~1.3s total)
        });
      }
    );
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-colors duration-300
        ${scrolled ? "bg-canvas shadow-sm" : "bg-transparent"}`}
    >
      {/* Left: name as typeset text */}
      <button
        onClick={() => lenis?.scrollTo("body", { offset: 0 })}
        className="font-display text-lg text-ink hover:text-accent transition-colors"
        aria-label="Back to top"
      >
        Ida Dilfer Tinker
      </button>

      {/* Right: nav links */}
      <ul className="flex gap-8 list-none m-0 p-0" role="list">
        {[
          { label: "Work", target: "#work" },
          { label: "About", target: "#about" },
          { label: "Contact", target: "#contact" },
        ].map(({ label, target }) => (
          <li key={label}>
            <button
              onClick={() => lenis?.scrollTo(target, { offset: -80 })}
              className="font-sans text-sm text-ink/70 hover:text-ink transition-colors tracking-wide uppercase"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
