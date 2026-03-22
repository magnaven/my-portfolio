"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register all GSAP plugins in one place
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
