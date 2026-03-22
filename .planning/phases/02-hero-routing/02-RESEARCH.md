# Phase 2: Hero + Routing - Research

**Researched:** 2026-03-22
**Domain:** GSAP SplitText animation, Lenis smooth scroll, React/Next.js sticky nav, prefers-reduced-motion
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**CTA routing**
- Both CTAs scroll to sections on the same page — no separate routes (/consulting, /hiring)
- "Looking for a design partner?" smooth-scrolls to `#work`
- "Hiring?" smooth-scrolls to `#contact`
- Visual distinction: "design partner" CTA = solid terracotta button (primary); "Hiring?" = ghost/outlined button
- Both use Lenis smooth scroll (already wired) for the scroll behavior

**Hero layout & composition**
- Full viewport height (100vh)
- Text left-aligned, vertically centered within the viewport
- Pure typography — no decoration, shapes, textures, or imagery; canvas background only
- Headline very large: ~6–8rem (96–128px), expected to wrap to 2–3 lines at desktop widths
- Element order top to bottom: headline → credential line → CTAs
- Scroll-down indicator: subtle animated bouncing down-arrow/chevron at the bottom of the hero (centered or left-aligned)

**Animation sequence**
- Headline: GSAP SplitText character reveal — sharp and quick feel (fast stagger, slight spring/overshoot), completes under 1s
- Credential line: fades up with a slight upward translate, short delay after headline completes
- CTAs: fade up immediately after credential line, as a unit
- Total sequence: ~1–1.5s from page load
- Inline styling: one key phrase gets the terracotta accent color — "own it." (the second sentence's kicker) — applied via `<span>` wrapping the characters within the SplitText target
- `prefers-reduced-motion`: skip all GSAP animations, render content at final visible state immediately; scroll-down indicator animation also suppressed

**Nav**
- Minimal top nav included in Phase 2 (not deferred)
- Left: "Ida Dilfer Tinker" typeset in brand fonts (not an image logo)
- Right: Work · About · Contact links (smooth-scroll to page anchors)
- Scroll behavior: nav starts transparent over the hero, transitions to solid canvas-color background when visitor scrolls past the hero
- Nav is sticky (fixed to top of viewport)
- Nav fades in as part of the load sequence (after or alongside CTAs)

### Claude's Discretion
- Exact spring/overshoot easing values for SplitText stagger
- Exact pixel threshold at which nav transitions from transparent to solid
- Scroll-down indicator icon (chevron vs arrow) and exact bounce animation
- Nav link hover states and transition style
- Exact delay values between sequence steps (credential line, CTA fade-up)
- Max-width / container padding for hero content

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Visitor sees an animated POV headline on landing that expresses the founder lens (not a generic design bio) | GSAP SplitText.create() with type:"chars", stagger + back.out easing; `heroCopy.headline` from content/hero.ts |
| HERO-02 | Visitor can choose one of two explicit audience paths ("Looking for a design partner?" / "Hiring?") that route to path-specific content | useLenis() hook to get Lenis instance imperatively; lenis.scrollTo('#work') and lenis.scrollTo('#contact') on button click |
| HERO-03 | Hero includes a role/credential line (Magna Ventures, AIDA AI, 12 years experience) as an authority signal | Simple gsap.from fade-up tween on credentialLine element, delayed after headline sequence |
| A11Y-01 | All animations respect the visitor's `prefers-reduced-motion` OS preference (animations skip or reduce appropriately) | gsap.matchMedia() with reduceMotion condition; render at final state (autoAlpha:1, y:0) when matched |
</phase_requirements>

---

## Summary

Phase 2 builds the animated hero section and sticky nav on top of the GSAP/Lenis/Tailwind v4 stack established in Phase 1. The core technical challenge is orchestrating a multi-element load sequence (headline → credential → CTAs → nav) using GSAP with SplitText for the headline, while fully respecting `prefers-reduced-motion` via `gsap.matchMedia()`. All infrastructure is already in place: GSAP 3.14.2 with SplitText available free, Lenis 1.3.19 wired to GSAP ticker in SmoothScrollProvider, and Tailwind v4 `@theme` tokens established in globals.css.

The CTA routing is purely scroll-based: two buttons call `lenis.scrollTo()` imperatively via the `useLenis()` hook (called with no callback to get the instance). The nav transparency-to-solid transition uses a `useEffect` + `window.scrollY` threshold pattern with a CSS `transition` on `background-color` — this avoids adding ScrollTrigger overhead to a simple one-time state change.

The most significant implementation gotcha is the `"own it."` terracotta accent: SplitText's `deepSlice` feature handles nested `<span>` elements within the headline, but the span's inline color must be applied before SplitText runs. The `type: "chars"` split will subdivide the span's characters but preserve their inherited color, so wrapping just `"own it."` in `<span className="text-accent">` in JSX before calling `SplitText.create()` is the correct approach.

**Primary recommendation:** Build three components — `<NavBar />` (in layout.tsx), `<HeroSection />` (in page.tsx), and a `<ScrollDownIndicator />` sub-component. Use `useGSAP` for all GSAP animations scoped to their container refs. Use `gsap.matchMedia()` with a single `reduceMotion` condition wrapping the entire load sequence.

---

## Standard Stack

### Core (already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | Animation engine and SplitText | SplitText free since 3.12; no Club membership needed |
| @gsap/react | 2.1.2 | useGSAP hook for React lifecycle cleanup | Official GSAP React integration; handles strict mode double-invoke |
| lenis | 1.3.19 | Smooth scroll engine wired to GSAP ticker | Already connected with autoRaf:false in SmoothScrollProvider |
| motion | 12.38.0 | Page transition wrapper in template.tsx | Already wired; hero enters via this wrapper |
| tailwindcss | 4.x | Utility CSS with @theme tokens | Established in Phase 1; tokens: text-ink, bg-canvas, text-accent, font-display, font-sans |

### No New Installs Required

All dependencies for Phase 2 are already present. SplitText ships as part of the `gsap` package — import from `gsap/SplitText`.

**Plugin registration:**
```typescript
// In the component using SplitText (NOT in SmoothScrollProvider — already registered there):
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
```

Note: `ScrollTrigger` and `useGSAP` are already registered in `SmoothScrollProvider.tsx`. Do not re-register them. Register `SplitText` locally in `HeroSection.tsx`.

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── layout.tsx          # Add <NavBar /> here (outside {children}, inside SmoothScrollProvider)
├── page.tsx            # Replace placeholder with <HeroSection /> + empty section anchors
├── template.tsx        # Already wired — no changes needed
components/
├── NavBar.tsx          # NEW: sticky nav, transparent→solid on scroll
├── HeroSection.tsx     # NEW: hero layout + GSAP load sequence
└── ScrollDownIndicator.tsx  # NEW: bounce animation sub-component (or inline in HeroSection)
content/
└── hero.ts             # Already exists — import heroCopy, do not modify
providers/
└── SmoothScrollProvider.tsx  # Already wired — no changes
```

### Pattern 1: SplitText Character Reveal with useGSAP

**What:** Use `SplitText.create()` inside `useGSAP` for automatic cleanup. The `<span className="text-accent">own it.</span>` must exist in the JSX before splitting — SplitText's `deepSlice:true` (default) preserves the span's color inheritance across character splits.

**When to use:** Any headline that needs per-character entrance animation.

**Example:**
```typescript
// Source: https://gsap.com/docs/v3/Plugins/SplitText/
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { reduceMotion } = context.conditions!;

        if (reduceMotion) {
          // Render at final state immediately — no animation
          gsap.set([headlineRef.current, ".credential-line", ".cta-group"], {
            autoAlpha: 1, y: 0,
          });
          return;
        }

        // Split headline chars
        const split = SplitText.create(headlineRef.current, {
          type: "chars",
          tag: "span",
        });

        const tl = gsap.timeline();

        // Headline: fast stagger with spring overshoot
        tl.from(split.chars, {
          autoAlpha: 0,
          y: 40,
          duration: 0.45,
          stagger: 0.018,
          ease: "back.out(1.4)",
        })
        // Credential line: fade up after headline
        .from(".credential-line", {
          autoAlpha: 0,
          y: 16,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.1")
        // CTAs: fade up as a unit
        .from(".cta-group", {
          autoAlpha: 0,
          y: 14,
          duration: 0.35,
          ease: "power2.out",
        }, "-=0.1");
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center px-8 max-w-5xl">
      <h1 ref={headlineRef} className="font-display text-[7rem] leading-tight text-ink">
        I&apos;ve built products from zero. I design like I still{" "}
        <span className="text-accent">own it.</span>
      </h1>
      {/* credential-line and cta-group below */}
    </section>
  );
}
```

### Pattern 2: Getting Lenis Instance for CTA Buttons

**What:** `useLenis()` called with no callback returns the Lenis instance — use this for imperative `scrollTo` from button click handlers.

**When to use:** Any button or link that triggers programmatic smooth scroll.

**Example:**
```typescript
// Source: https://github.com/darkroomengineering/lenis/discussions/316
"use client";
import { useLenis } from "lenis/react";

export function CTAButtons() {
  const lenis = useLenis(); // no callback = returns instance only

  return (
    <div className="cta-group flex gap-4">
      <button
        onClick={() => lenis?.scrollTo("#work", { offset: -80 })}
        className="bg-accent text-canvas px-6 py-3 font-sans"
      >
        {heroCopy.ctaDesignPartner}
      </button>
      <button
        onClick={() => lenis?.scrollTo("#contact", { offset: -80 })}
        className="border border-accent text-accent px-6 py-3 font-sans"
      >
        {heroCopy.ctaHiring}
      </button>
    </div>
  );
}
```

Note: `offset: -80` accounts for the sticky nav height so the section heading isn't hidden behind the nav after scrolling. Exact value is Claude's discretion — 64–88px is a typical sticky nav range; measure the actual rendered nav height.

### Pattern 3: Nav Transparent → Solid on Scroll

**What:** `useEffect` + `window.addEventListener("scroll")` to detect when `scrollY` exceeds hero height threshold, toggling a CSS class that transitions `background-color`.

**When to use:** Sticky nav that needs to distinguish itself from the hero background.

**Example:**
```typescript
// Source: verified pattern from React community, https://dev.to/bilalmohib/how-to-change-navbar-style-on-scroll-in-react-jsnext-js-582b
"use client";
import { useState, useEffect } from "react";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80); // threshold: Claude's discretion
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-colors duration-300
        ${scrolled ? "bg-canvas" : "bg-transparent"}`}
    >
      {/* Left: Ida Dilfer Tinker in font-display */}
      {/* Right: Work · About · Contact using useLenis().scrollTo */}
    </nav>
  );
}
```

The nav is placed in `app/layout.tsx` inside `<SmoothScrollProvider>`, outside `{children}`:
```typescript
// app/layout.tsx addition
<SmoothScrollProvider>
  <NavBar />          {/* persistent across all pages */}
  {children}
</SmoothScrollProvider>
```

### Pattern 4: gsap.matchMedia() for prefers-reduced-motion

**What:** GSAP's built-in mechanism for condition-based animations. The entire load sequence lives inside a single `mm.add()` call. When `reduceMotion` is true, `gsap.set()` places all elements at their final state immediately with no tweening.

**When to use:** Any component with GSAP animations that must respect A11Y-01.

**Example:**
```typescript
// Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/
const mm = gsap.matchMedia();
mm.add(
  { reduceMotion: "(prefers-reduced-motion: reduce)" },
  (context) => {
    const { reduceMotion } = context.conditions!;
    if (reduceMotion) {
      gsap.set(".animated-element", { autoAlpha: 1, y: 0 });
      return; // early return — no tweens created
    }
    // Full animation timeline here
  }
);
```

`gsap.matchMedia()` automatically re-runs the handler if the user toggles their system preference mid-session, reverting the previous state and re-applying the correct one. This is strictly more correct than a one-time `window.matchMedia` check.

### Pattern 5: SplitText + Nested Span Color (the "own it." case)

**What:** Wrap the phrase to be colored in a `<span>` with the accent color class in JSX before SplitText runs. SplitText's `deepSlice: true` (default) splits the span's characters individually while preserving their color inheritance.

**Critical detail:** The `<span className="text-accent">` must be in the DOM before `SplitText.create()` is called. Since `useGSAP` runs after mount, this is guaranteed as long as the span is in the JSX return.

```typescript
// Source: https://gsap.com/docs/v3/Plugins/SplitText/ — deepSlice behavior
// JSX (rendered first, before useGSAP executes):
<h1 ref={headlineRef} className="font-display text-[7rem]">
  I&apos;ve built products from zero. I design like I still{" "}
  <span className="text-accent">own it.</span>
</h1>

// Inside useGSAP (runs after mount — span already in DOM):
const split = SplitText.create(headlineRef.current, { type: "chars" });
// split.chars includes the chars inside the <span> — they inherit text-accent color
gsap.from(split.chars, { autoAlpha: 0, y: 40, stagger: 0.018, ease: "back.out(1.4)" });
```

### Anti-Patterns to Avoid

- **Calling `gsap.registerPlugin(ScrollTrigger, useGSAP)` again in HeroSection.tsx:** Already done in SmoothScrollProvider. Double registration is harmless but noisy. Only register SplitText locally.
- **Using `autoSplit: true` without `onSplit` callback:** For a load animation (not a responsive resize animation), `autoSplit` is unnecessary complexity. Use a direct `SplitText.create()` call.
- **Setting initial state in CSS as `opacity: 0` and then animating to `opacity: 1`:** Use GSAP's `autoAlpha` (which handles both `opacity` and `visibility`) so content is visible without JS. Use `gsap.from()` rather than `gsap.to()` so the final rendered state is always visible.
- **Detecting scroll in NavBar with ScrollTrigger:** ScrollTrigger is overengineered for a simple transparent→solid toggle. Use a plain `scroll` event listener with `{ passive: true }`.
- **text-wrap: balance on the headline:** Interferes with SplitText line calculation. Do not apply `text-balance` to the `<h1>` that SplitText targets.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Character-level text splitting | Custom DOM manipulation splitting text into `<span>` per char | `SplitText.create()` from gsap/SplitText | Handles font loading timing, nested spans, line recalculation, revert/cleanup — edge cases in custom code cause layout jank |
| Smooth scroll to anchor | `element.scrollIntoView()` or CSS `scroll-behavior: smooth` | `lenis.scrollTo('#target', { offset })` | Lenis already wired to GSAP ticker; native smooth scroll doesn't support offset, duration control, or easing customization |
| Animation cleanup in React | Manual `useEffect` cleanup with `tween.kill()` | `useGSAP()` hook | Handles React 18 Strict Mode double-invoke, auto-reverts all tweens/SplitTexts/ScrollTriggers on unmount |
| Reduced motion detection | Custom `window.matchMedia` hook + useState | `gsap.matchMedia()` with `reduceMotion` condition | Re-runs on preference change, automatically reverts animations, composable with breakpoint conditions |

**Key insight:** All four problems above are 2–10 lines with existing infrastructure; hand-rolling them produces 30–100 line solutions with bugs around edge cases (font timing, strict mode, resize, accessibility preference changes).

---

## Common Pitfalls

### Pitfall 1: Font Not Loaded When SplitText Runs

**What goes wrong:** SplitText splits text before the custom font (Playfair Display) has loaded, measuring character widths with the fallback font. On font swap, the line breaks shift, causing visual jank.

**Why it happens:** `useGSAP` runs on mount, and `next/font` with `display: 'swap'` may complete after first paint.

**How to avoid:** Use `autoSplit: true` with an `onSplit` callback — SplitText will automatically re-split when fonts load. Alternatively, since `next/font` with `display: 'swap'` injects fonts via `<link rel="preload">`, fonts are typically available by the time `useGSAP` runs in Next.js. Monitor for jank and add `autoSplit: true` if it occurs.

**Warning signs:** Characters jump position 100–300ms after page load, or line count changes during animation.

### Pitfall 2: text-wrap: balance on the Headline

**What goes wrong:** Applying Tailwind's `text-balance` (which sets `text-wrap: balance`) to the SplitText target produces incorrect line splitting — SplitText measures lines based on DOM geometry, and `text-wrap: balance` changes that geometry dynamically.

**Why it happens:** CSS text balancing alters element widths during text layout in a way that SplitText's measurement pass doesn't anticipate.

**How to avoid:** Never apply `text-balance` to elements targeted by SplitText. The 6–8rem headline will naturally wrap to 2–3 lines without balancing.

### Pitfall 3: AnimatePresence / Motion Template Conflicts

**What goes wrong:** `template.tsx` wraps children in `<motion.div>` with `initial={{ opacity: 0, y: 8 }}`. If the hero's GSAP `from()` animation also starts from `opacity: 0`, the two systems can conflict — GSAP fires while Motion is still animating the wrapper in, causing the headline animation to be invisible or double-animated.

**Why it happens:** Motion's `template.tsx` animation and GSAP's `useGSAP` execute concurrently on mount.

**How to avoid:** The Motion wrapper transitions `opacity 0→1` over 0.35s. Add a short delay (0.2–0.3s) to the GSAP timeline's start, or add `delay: 0.3` to the first tween in the sequence. This ensures the hero container is at opacity:1 before GSAP begins character reveals.

**Warning signs:** Headline animation appears invisible or plays too fast on first load, then works on navigation back to the page.

### Pitfall 4: Missing `"use client"` on Components Using Hooks

**What goes wrong:** Components using `useGSAP`, `useLenis`, `useState`, or `useEffect` throw a Next.js build error: "You're importing a component that needs... use client".

**Why it happens:** Next.js App Router defaults to Server Components. Any component using browser APIs or React hooks must opt into client rendering.

**How to avoid:** Add `"use client"` as the first line of `NavBar.tsx`, `HeroSection.tsx`, and any sub-components that use hooks.

### Pitfall 5: Nav in `layout.tsx` Outside Server Component Boundary

**What goes wrong:** `NavBar` uses `"use client"` hooks but is placed inside `layout.tsx` which is a Server Component. Import of a client component inside a server component is fine — but if any server-only imports are accidentally pulled into the Nav's import chain, it will fail.

**How to avoid:** Keep `NavBar.tsx` a pure client component with no server-only imports. `layout.tsx` can import and render it without issue — Next.js handles the server/client boundary correctly.

### Pitfall 6: SplitText Cleanup Not Called on Unmount

**What goes wrong:** If SplitText is created outside `useGSAP` (e.g., in a plain `useEffect`), the split elements persist in the DOM after component unmount, causing memory leaks or stale DOM on re-mount.

**How to avoid:** Always create SplitText inside `useGSAP`. The hook auto-reverts all GSAP contexts (including SplitText instances) on unmount — no manual `.revert()` call needed.

---

## Code Examples

### Full Hero Section Shell

```typescript
// components/HeroSection.tsx
// Source: pattern from GSAP docs + project established conventions
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { heroCopy } from "@/content/hero";

gsap.registerPlugin(SplitText);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { reduceMotion } = context.conditions!;

        if (reduceMotion) {
          gsap.set(
            [headlineRef.current, ".credential-line", ".cta-group", ".scroll-indicator"],
            { autoAlpha: 1, y: 0 }
          );
          return;
        }

        const split = SplitText.create(headlineRef.current!, {
          type: "chars",
          tag: "span",
        });

        const tl = gsap.timeline({ delay: 0.25 }); // wait for Motion template fade-in

        tl.from(split.chars, {
          autoAlpha: 0,
          y: 40,
          duration: 0.45,
          stagger: 0.018,
          ease: "back.out(1.4)",
        })
        .from(".credential-line", {
          autoAlpha: 0,
          y: 16,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.1")
        .from(".cta-group", {
          autoAlpha: 0,
          y: 14,
          duration: 0.35,
          ease: "power2.out",
        }, "-=0.05")
        .from(".scroll-indicator", {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power1.out",
        }, "-=0.1");
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center relative px-8 lg:px-16"
    >
      <div className="max-w-5xl">
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(4rem,8vw,8rem)] leading-[1.05] text-ink mb-6"
          style={{ fontKerning: "none", textRendering: "optimizeSpeed" }}
        >
          {/* "own it." wrapped in accent span — must be in DOM before SplitText runs */}
          I&apos;ve built products from zero. I design like I still{" "}
          <span className="text-accent">own it.</span>
        </h1>

        <p className="credential-line font-sans text-ink/70 text-lg mb-10" style={{ opacity: 0 }}>
          {heroCopy.credentialLine}
        </p>

        <div className="cta-group flex gap-4 flex-wrap" style={{ opacity: 0 }}>
          <button
            onClick={() => lenis?.scrollTo("#work", { offset: -80 })}
            className="bg-accent text-canvas font-sans px-7 py-3 hover:bg-accent-light transition-colors"
          >
            {heroCopy.ctaDesignPartner}
          </button>
          <button
            onClick={() => lenis?.scrollTo("#contact", { offset: -80 })}
            className="border border-accent text-accent font-sans px-7 py-3 hover:bg-accent/10 transition-colors"
          >
            {heroCopy.ctaHiring}
          </button>
        </div>
      </div>

      {/* Scroll-down indicator — bottom-centered */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
        {/* ChevronDown icon with CSS bounce animation — suppressed via prefers-reduced-motion in Tailwind */}
        {/* Use: animate-bounce with motion-safe: prefix in Tailwind v4 */}
      </div>
    </section>
  );
}
```

### NavBar Component Shell

```typescript
// components/NavBar.tsx
// Source: React scroll detection pattern
"use client";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5
        transition-colors duration-300
        ${scrolled ? "bg-canvas" : "bg-transparent"}`}
    >
      <span className="font-display text-ink text-lg tracking-tight">
        Ida Dilfer Tinker
      </span>
      <ul className="flex gap-8 font-sans text-ink text-sm">
        {[
          { label: "Work", target: "#work" },
          { label: "About", target: "#about" },
          { label: "Contact", target: "#contact" },
        ].map(({ label, target }) => (
          <li key={label}>
            <button
              onClick={() => lenis?.scrollTo(target, { offset: -80 })}
              className="hover:text-accent transition-colors"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### page.tsx Replacement

```typescript
// app/page.tsx — replaces Foundation placeholder
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* Empty section anchors — scroll targets for Work/About/Contact (built in later phases) */}
      <section id="work" className="min-h-screen" />
      <section id="about" className="min-h-screen" />
      <section id="contact" className="min-h-screen" />
    </main>
  );
}
```

### Scroll-Down Indicator with prefers-reduced-motion

```typescript
// The bounce animation should use Tailwind's motion-safe: variant
// In Tailwind v4, use the motion-safe: prefix which maps to @media (prefers-reduced-motion: no-preference)

// Tailwind v4 supports motion-safe: natively:
<div className="scroll-indicator motion-safe:animate-bounce">
  {/* chevron icon */}
</div>

// The GSAP prefers-reduced-motion check suppresses the initial fade-in of .scroll-indicator
// The CSS motion-safe: prefix suppresses the ongoing bounce CSS animation
// Both layers are needed — one for entrance, one for continuous motion
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SplitText behind Club GreenSock paywall | SplitText free in GSAP 3.12+ | GSAP acquired by Webflow ~2024 | No license check; import directly from `gsap/SplitText` |
| `new SplitText(target, config)` constructor | `SplitText.create(target, config)` static method | GSAP 3.13 rewrite | Both work; prefer `.create()` per current docs |
| ScrollTrigger.matchMedia (deprecated) | gsap.matchMedia() | GSAP 3.11+ | Cleaner API, supports any media query, auto-reverts on change |
| @studio-freight/react-lenis | lenis/react (first-party) | Lenis moved to darkroomengineering | `lenis/react` is the current import; `@studio-freight/react-lenis` is unmaintained |
| Tailwind config via tailwind.config.js | Tailwind v4 `@theme {}` in CSS | Tailwind v4 (2025) | No config file needed; already in globals.css |

**Deprecated/outdated:**
- `@studio-freight/lenis` and `@studio-freight/react-lenis`: Archived. The project already uses `lenis` (darkroomengineering) correctly.
- `ScrollTrigger.matchMedia()`: Removed in GSAP 3.11+. Use `gsap.matchMedia()`.

---

## Open Questions

1. **Scroll-down indicator disappearing on scroll start**
   - What we know: CONTEXT.md specifies "opacity 0 on scroll start"
   - What's unclear: Whether this uses GSAP + ScrollTrigger (pinpoint onset) or a Lenis scroll callback (every frame)
   - Recommendation: Use `useLenis((lenis) => { if (lenis.scroll > 10) gsap.to(".scroll-indicator", { autoAlpha: 0, duration: 0.3 }); })` — this integrates with the established Lenis scroll loop without adding a separate event listener, but this one-shot fade needs to be guarded to not fire on every frame after first scroll. A `useRef(false)` guard flag is the clean solution.

2. **Nav fade-in as part of load sequence**
   - What we know: Nav "fades in as part of the load sequence (after or alongside CTAs)"
   - What's unclear: Whether the nav fade-in should be driven by the hero's GSAP timeline (tight coupling) or a standalone GSAP animation in NavBar.tsx
   - Recommendation: Add the nav fade-in to the hero's GSAP timeline via a `.from("nav", ...)` tween positioned alongside the CTA fade. This keeps the full sequence in one place and easier to tune timing.

3. **Motion template.tsx delay calibration**
   - What we know: template.tsx animates `opacity 0→1, y: 8→0` over 0.35s
   - What's unclear: Exact overlap needed before GSAP headline animation starts looking good vs feeling delayed
   - Recommendation: Start with `delay: 0.25` on the GSAP timeline (sees Motion at ~70% complete). Planner should note this as a tuning task during visual verification.

---

## Validation Architecture

> nyquist_validation is enabled in .planning/config.json.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no jest.config.*, vitest.config.*, playwright.config.*, or test files found |
| Config file | None — see Wave 0 gaps |
| Quick run command | N/A until Wave 0 installs framework |
| Full suite command | N/A until Wave 0 installs framework |

**Note:** This is a visual/animation-heavy phase. The primary validation mechanism is visual inspection in the browser (dev server) and Storybook or snapshot testing if added. Unit testing for GSAP animations is non-standard; the community consensus is that animation correctness is verified visually.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | HeroSection renders h1 with headline text from heroCopy | unit | `npx vitest run components/HeroSection.test.tsx` | Wave 0 |
| HERO-01 | headline h1 contains "own it." span with text-accent class | unit | `npx vitest run components/HeroSection.test.tsx` | Wave 0 |
| HERO-02 | Two CTA buttons render with correct labels from heroCopy | unit | `npx vitest run components/HeroSection.test.tsx` | Wave 0 |
| HERO-02 | Clicking "Looking for a design partner?" calls lenis.scrollTo('#work') | unit (mock) | `npx vitest run components/HeroSection.test.tsx` | Wave 0 |
| HERO-03 | credential-line element renders with credentialLine copy | unit | `npx vitest run components/HeroSection.test.tsx` | Wave 0 |
| A11Y-01 | With reduced-motion, elements render with opacity:1 / no GSAP from() | manual | Observe with DevTools "Emulate CSS media feature prefers-reduced-motion: reduce" | manual-only |
| A11Y-01 | NavBar renders without crashing | unit | `npx vitest run components/NavBar.test.tsx` | Wave 0 |

**Note on A11Y-01:** GSAP animation behavior cannot be reliably unit tested without mocking GSAP entirely (high complexity, low value). Manual verification in Chrome DevTools is the standard approach for GSAP + prefers-reduced-motion.

### Sampling Rate
- Per task commit: Visual check in `npm run dev` browser
- Per wave merge: `npx vitest run` (after Wave 0 setup)
- Phase gate: All unit tests green + manual visual check before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `vitest` and `@vitejs/plugin-react` + `@testing-library/react` — install: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event jsdom`
- [ ] `vitest.config.ts` — configure with jsdom environment
- [ ] `components/HeroSection.test.tsx` — covers HERO-01, HERO-02, HERO-03
- [ ] `components/NavBar.test.tsx` — covers A11Y-01 render check
- [ ] Mock for `lenis/react`'s `useLenis` (GSAP and Lenis don't run in jsdom)

---

## Sources

### Primary (HIGH confidence)
- [gsap.com/docs/v3/Plugins/SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) — SplitText.create() API, deepSlice behavior, tag option, mask option, autoSplit + onSplit, cleanup
- [gsap.com/docs/v3/GSAP/gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) — conditions object, reduceMotion pattern, auto-revert behavior
- [github.com/darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) — scrollTo() method signature, all options (offset, duration, easing, onComplete)
- [github.com/darkroomengineering/lenis — packages/react/README.md](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md) — useLenis() hook, ReactLenis root prop, context access

### Secondary (MEDIUM confidence)
- [gsap.com community — useGSAP with SplitText pattern](https://gsap.com/resources/React/) — useGSAP automatic cleanup of SplitText, strict mode double-invoke behavior
- [github.com/darkroomengineering/lenis discussions #316](https://github.com/darkroomengineering/lenis/discussions/316) — useLenis() without callback returns instance for imperative use
- [webflow.com/blog/gsap-splittext-rewrite](https://webflow.com/blog/gsap-splittext-rewrite) — SplitText rewrite post-Webflow acquisition, deepSlice nested element handling
- [dev.to/bilalmohib — navbar scroll transition](https://dev.to/bilalmohib/how-to-change-navbar-style-on-scroll-in-react-jsnext-js-582n) — useEffect + scroll event listener pattern for nav background

### Tertiary (LOW confidence)
- [tympanus.net/codrops — Free GSAP Plugins 2025](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) — Confirms SplitText free status in current GSAP; no detailed API

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages already installed, versions confirmed in package.json
- SplitText API: HIGH — fetched directly from gsap.com/docs
- gsap.matchMedia pattern: HIGH — fetched directly from gsap.com/docs
- Lenis scrollTo API: HIGH — fetched from official GitHub README
- useLenis() without callback: MEDIUM — confirmed in GitHub Discussions, consistent with package design
- Nav transparent→solid pattern: MEDIUM — community-verified React pattern, no official Next.js docs
- Pitfall: font loading + SplitText: MEDIUM — from official GSAP docs warnings, not empirically tested on this project

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (stable stack — GSAP and Lenis APIs are stable; 30-day window safe)
