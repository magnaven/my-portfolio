# Phase 1: Foundation - Research

**Researched:** 2026-03-21
**Domain:** Next.js 15 scaffold, Tailwind v4 token system, GSAP + Lenis animation infrastructure, content authoring
**Confidence:** HIGH (stack is current; all key claims verified against official docs)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Hero copy direction:** Declarative statement register, founder perspective, Ida's identity (not visitor outcome). Direction: "I've built products from zero. I design like I still own it." — not final, directional. Credential line uses dot separators: "Lead Product Designer · Magna Ventures · AIDA AI · 12 years"
- **Case study selection and structure:** Consistent template — problem → process → key decisions → outcomes. Full draft written and approved before build starts. Mixed raw material readiness across projects.
- **Visual foundation:** Editorial serif headline + clean sans body. Near-black + warm white + terracotta/burnt sienna accent. Light primary background. These tokens go into Tailwind v4 @theme in Phase 1 — locked before any component work.
- **About narrative angle:** Current state + belief structure. Balanced personal/professional voice. Single narrative that serves both consulting clients and hiring managers.
- **Animation infrastructure:** GSAP + Motion (formerly Framer Motion) + Lenis + app/template.tsx — all initialized in this phase.

### Claude's Discretion
- Exact headline wording (direction locked: declarative, founder-perspective, Ida's identity — Claude writes the actual line)
- Specific font selection within the agreed category (editorial serif headline + clean sans body)
- Exact color values for terracotta accent and off-white background (within the agreed palette direction)
- Tailwind @theme token naming conventions
- Animation infrastructure specifics (Lenis config, GSAP plugin registration order)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

## Summary

Phase 1 is a pure foundation phase: no visible UI ships, but every downstream phase depends on what gets locked here. It has two equally important tracks — content authoring (copy and narratives that must be approved before Phase 2 touches markup) and technical scaffolding (Next.js 15 repo with TypeScript, Tailwind v4, GSAP, Lenis, and Motion wired up in the right order). These tracks are largely independent and can proceed in parallel once the project is initialized.

The stack is current and well-supported. Next.js 15 ships with Tailwind v4 by default via `create-next-app`. GSAP 3.14.x is now fully free (including SplitText and other previously paid plugins), integrates cleanly into the App Router using the `@gsap/react` package and `useGSAP` hook, and the `@studio-freight/react-lenis` package has been superseded — the correct import is now `lenis/react` from the `lenis` package. Motion (the library formerly named Framer Motion) is at v12 and uses `import { ... } from 'motion/react'` — `framer-motion` still works but is the legacy path. The `template.tsx` pattern for page transitions is officially documented by Next.js and is the right primitive — it remounts on every navigation (unlike `layout.tsx`), which gives Motion's AnimatePresence a clean lifecycle to animate in/out.

The primary collaboration dependency is Ida: case study narratives and hero copy cannot be drafted without her input, especially for projects with no existing write-ups. This is the most likely schedule risk for the phase.

**Primary recommendation:** Initialize the repo with `create-next-app@latest` (Tailwind v4, TypeScript, App Router, Turbopack), then immediately scaffold the four integration files (`globals.css`, `data/case-studies.ts`, `providers/SmoothScrollProvider.tsx`, `app/template.tsx`) so the technical skeleton is verifiable before content authoring completes.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x (latest) | App framework, routing, SSR/SSG | Official recommendation; Tailwind v4 + Turbopack ship by default |
| react / react-dom | 19.x (canary via App Router) | UI runtime | Bundled with Next.js 15 App Router |
| typescript | 5.1+ | Type safety | Default in create-next-app; required for typed data layer |
| tailwindcss | 4.x | CSS utility system with @theme token layer | CSS-first config, no tailwind.config.js needed, generates CSS variables from tokens |
| gsap | 3.14.x | Core animation engine, ScrollTrigger, SplitText | Now 100% free including all plugins; industry standard for scroll storytelling |
| @gsap/react | latest | useGSAP hook for React cleanup | Official GSAP React integration; auto-reverts on unmount, solves Strict Mode double-fire |
| motion | 12.x | AnimatePresence for page transitions | Replaces framer-motion package; import from `motion/react` |
| lenis | 1.3.x | Smooth scroll engine | Standard for premium portfolio/agency sites; integrates via GSAP ticker |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font/google | (built-in) | Self-hosted Google Fonts at build time | Always — eliminates runtime font fetch, zero FOUT |
| eslint-config-next | latest | Linting with Next.js rules | Default in create-next-app |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `motion` (v12) | `framer-motion` | `framer-motion` still works but is the legacy package name; `motion` + `motion/react` is the current path |
| `lenis/react` | manual Lenis setup | ReactLenis component handles ref and context; less boilerplate |
| `next/font/google` | self-hosted font files | next/font is simpler and equally performant; no manual hosting needed |
| Tailwind v4 @theme | Tailwind v3 + config | v3 still works but v4 is the current default in create-next-app and the right choice for new projects |

**Installation (after scaffold):**
```bash
npm install gsap @gsap/react motion lenis
```

---

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx           # Root layout — html/body, font variables, providers
├── template.tsx         # Root template — remounts per navigation, wraps AnimatePresence
├── globals.css          # Tailwind v4 @import + @theme token definitions
├── page.tsx             # Home page
providers/
├── SmoothScrollProvider.tsx  # Lenis + GSAP ticker integration ("use client")
data/
├── case-studies.ts      # CaseStudy interface + typed array of all case studies
├── types.ts             # (optional) shared type exports
public/
├── fonts/               # (empty in Phase 1 — next/font handles Google Fonts)
```

### Pattern 1: Tailwind v4 @theme Token Definition
**What:** All design tokens (colors, fonts) defined in `globals.css` via `@theme` directive. Tailwind auto-generates utility classes and CSS custom properties from these.
**When to use:** Phase 1 scaffolding. Define once, lock before Phase 2 component work.
**Example:**
```css
/* app/globals.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Typography */
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;

  /* Colors */
  --color-ink: oklch(0.15 0.02 250);          /* near-black */
  --color-canvas: oklch(0.97 0.01 80);        /* warm off-white */
  --color-accent: oklch(0.62 0.12 38);        /* terracotta / burnt sienna */
  --color-accent-light: oklch(0.72 0.10 38);  /* terracotta hover/tint */
}
```
Token naming: prefix by semantic role (`ink`, `canvas`, `accent`) — not by color name. This is the recommended naming convention for Tailwind v4 @theme.

### Pattern 2: Font Loading via next/font/google
**What:** Self-hosted fonts via Next.js's built-in optimizer. Loaded once in `layout.tsx`, CSS variables injected on `<html>`.
**When to use:** Always for Google Fonts. Eliminates external requests, prevents FOUT.
**Example:**
```typescript
// app/layout.tsx
// Source: https://nextjs.org/docs/messages/google-font-display
import { Playfair_Display, DM_Sans } from "next/font/google";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const sansFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### Pattern 3: SmoothScrollProvider — Lenis + GSAP Ticker
**What:** Client component wrapping the app with Lenis. Uses `autoRaf: false` so Lenis is driven by GSAP's ticker — one RAF loop for all animation.
**When to use:** Mounted in `layout.tsx` wrapping children. Must be "use client".
**Example:**
```typescript
// providers/SmoothScrollProvider.tsx
// Source: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md
"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<any>(null);

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
```

### Pattern 4: template.tsx for Page Transitions with AnimatePresence
**What:** `app/template.tsx` is remounted on every navigation (unlike `layout.tsx` which persists). This gives Motion a proper component lifecycle to trigger enter/exit animations.
**When to use:** Root-level page transitions. The key insight is that Next.js automatically passes a unique key to each Template instance per route segment, which is exactly what AnimatePresence needs.
**Example:**
```typescript
// app/template.tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/template
"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
```
Note: AnimatePresence is not strictly required at the template.tsx level because Next.js handles the mount/unmount via the unique key it assigns automatically. The `motion.div` animate/exit alone fires correctly on navigation.

### Pattern 5: Typed CaseStudy Data Layer
**What:** Single source of truth for all case study content. Typed interface guarantees compile-time safety. All downstream phases import from here.
**When to use:** Defined once in Phase 1, never restructured after.
**Example:**
```typescript
// data/case-studies.ts
export interface CaseStudy {
  id: string;                    // slug, used in routing: /work/[id]
  title: string;
  category: string;              // e.g. "Product Design", "0-to-1"
  thumbnailAlt: string;
  problem: string;               // full paragraph(s)
  process: string;               // full paragraph(s)
  keyDecisions: KeyDecision[];   // structured array for WORK-04
  outcomes: Outcome[];           // measurable, specific
  status: "published" | "draft";
}

export interface KeyDecision {
  what: string;      // what was weighed
  killed: string;    // what was rejected
  constraint: string; // what shaped the outcome
  chosen: string;    // the actual decision made
}

export interface Outcome {
  metric: string;    // e.g. "Activation rate"
  result: string;    // e.g. "42% lift in 6 weeks"
}

export const caseStudies: CaseStudy[] = [
  // populated in Phase 1 content tasks
];
```

### Anti-Patterns to Avoid
- **Registering GSAP plugins in multiple files:** Register once, in `SmoothScrollProvider.tsx` or a dedicated `lib/gsap.ts`. Multiple registrations are safe but add noise.
- **Using `framer-motion` import path:** Use `motion/react` from the `motion` package. The `framer-motion` package still works but is the legacy path.
- **Using `@studio-freight/react-lenis`:** Deprecated. Use `import { ReactLenis } from 'lenis/react'`.
- **Putting animation in `layout.tsx`:** Layout persists across routes and does not remount — animations won't fire on navigation. Use `template.tsx`.
- **Defining Tailwind tokens in `tailwind.config.js`:** This file does not exist in Tailwind v4. All tokens go in `globals.css` via `@theme`.
- **Driving Lenis with its own RAF while also using GSAP ScrollTrigger:** Set `autoRaf: false` on Lenis and drive it from `gsap.ticker` — one loop, no conflicts.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll | Custom `requestAnimationFrame` loop with lerp | Lenis (`lenis/react`) | Handles momentum, touch, keyboard, a11y, accessibility scroll stop |
| Page transitions | Manual CSS class toggling on route change | `motion/react` + `template.tsx` | Next.js lifecycle is complex; Motion handles mount/unmount timing |
| Animation cleanup in React | `useEffect` return with manual `.kill()` calls | `@gsap/react` `useGSAP` hook | Automatically reverts all animations, handles Strict Mode double-fire |
| Font loading | Manual `<link>` tags or `@font-face` CSS | `next/font/google` | Self-hosts at build time, eliminates external requests, zero FOUT |
| Design token CSS variables | Manual `:root` custom properties | Tailwind v4 `@theme` | @theme tokens generate utility classes AND CSS variables simultaneously |

**Key insight:** The animation stack (GSAP + Lenis + Motion) is a coordinated system. Each library has a specific role and they interact via the GSAP ticker. Trying to mix custom scroll or transition code into this system creates timing conflicts that are extremely difficult to debug.

---

## Common Pitfalls

### Pitfall 1: `@studio-freight/react-lenis` is Deprecated
**What goes wrong:** Build fails or you get stale behavior because the old package hasn't received updates.
**Why it happens:** Lenis moved maintainers from Studio Freight to darkroom.engineering. The package was renamed.
**How to avoid:** Install `lenis` (not `@studio-freight/lenis`). Import via `import { ReactLenis, useLenis } from 'lenis/react'`.
**Warning signs:** ESM import warnings in the terminal, or types pointing to the wrong definitions.

### Pitfall 2: Lenis Running Its Own RAF While GSAP Runs Another
**What goes wrong:** ScrollTrigger and Lenis desync — pinned sections stutter, scroll progress jumps.
**Why it happens:** Both Lenis (with `autoRaf: true`) and GSAP each run `requestAnimationFrame`. They run at slightly different times and disagree on scroll position.
**How to avoid:** Always initialize ReactLenis with `options={{ autoRaf: false }}` and drive Lenis from `gsap.ticker.add()`. Call `gsap.ticker.lagSmoothing(0)` to prevent GSAP from compensating for dropped frames in a way that breaks scroll sync.
**Warning signs:** Scroll trigger "pins" that unlock at the wrong time, or scroll progress jitter on slower machines.

### Pitfall 3: Animating in `layout.tsx` Instead of `template.tsx`
**What goes wrong:** Page transition animations fire on first load only, then never again — because `layout.tsx` persists across navigations and does not remount.
**Why it happens:** `layout.tsx` and `template.tsx` look identical in structure. The distinction is behavioral: layout persists, template remounts.
**How to avoid:** Put all entry/exit animation wrappers in `app/template.tsx`. Reserve `layout.tsx` for persistent UI only (providers, nav, footer).
**Warning signs:** `animate` prop fires on first load, `exit` never fires at all.

### Pitfall 4: React Strict Mode Double-Fires GSAP Animations
**What goes wrong:** In development, animations run twice — you see a flash or doubled effect. ScrollTrigger may show incorrect pin behavior.
**Why it happens:** React 18 Strict Mode calls effects twice in development to surface cleanup bugs.
**How to avoid:** Always use `useGSAP()` from `@gsap/react` instead of raw `useEffect`. It uses `gsap.context()` internally and reverts correctly on the first cycle. Never call `gsap.to()` directly inside `useEffect`.
**Warning signs:** Animations that work in production but flash/stutter in development only.

### Pitfall 5: Missing `"use client"` on Animation Components
**What goes wrong:** Runtime errors referencing `window`, `document`, or browser-only APIs. Next.js will fail to render.
**Why it happens:** App Router Server Components don't have access to browser APIs. GSAP, Lenis, and Motion all require the browser.
**How to avoid:** Every file that imports GSAP, Motion, or Lenis must have `"use client"` as the first line. This includes `template.tsx`, `SmoothScrollProvider.tsx`, and any component using `useGSAP` or `motion.*`.
**Warning signs:** `ReferenceError: window is not defined` in server-side rendering output.

### Pitfall 6: Tailwind v4 Has No `tailwind.config.js`
**What goes wrong:** Spending time creating a config file that is silently ignored, or installing v3 tooling on a v4 setup.
**Why it happens:** Tailwind v3 muscle memory. Many tutorials still show the config file.
**How to avoid:** In Tailwind v4, all customization lives in `globals.css` via `@theme`. There is no `tailwind.config.js`. Content detection is automatic.
**Warning signs:** Your custom tokens don't produce utility classes, or you see v3-style `content: [...]` in a config that has no effect.

### Pitfall 7: Content Authoring as a Blocking Dependency
**What goes wrong:** Phase 1 ends without approved copy because content authoring was deferred.
**Why it happens:** Technical tasks get prioritized; writing feels "softer" and gets pushed.
**How to avoid:** Content tasks must be tracked as first-class deliverables with explicit approval gates. The data scaffold (`data/case-studies.ts`) can be populated with placeholder content for type-checking, but Phase 1 is not done until real content is filled in and approved.
**Warning signs:** `case-studies.ts` has `TODO` placeholders at the end of the phase.

---

## Code Examples

Verified patterns from official and primary sources:

### Tailwind v4 @theme with OKLCH Colors
```css
/* app/globals.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  --font-display: "Playfair Display", Georgia, ui-serif, serif;
  --font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;

  --color-ink: oklch(0.14 0.02 250);       /* near-black with slight cool cast */
  --color-canvas: oklch(0.97 0.015 75);    /* warm off-white (warm hue = ~75) */
  --color-accent: oklch(0.60 0.13 38);     /* terracotta (#E2725B equivalent in oklch) */
}
```
Terracotta (#E2725B) standard hex reference: oklch approximation is L≈0.60, C≈0.13, H≈38. Adjust L/C to taste within the burnt sienna range (hue 30–50).

### GSAP Plugin Registration (centralized)
```typescript
// providers/SmoothScrollProvider.tsx  (or lib/gsap.ts)
// Source: https://gsap.com/docs/v3/Installation/
"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
```
Register all plugins in one place. `gsap.registerPlugin` is idempotent — safe to call multiple times.

### template.tsx Minimum Viable Page Transition
```typescript
// app/template.tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/template
"use client";
import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```
This is the "test fires without errors" criterion from Phase 1 success criteria.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme` in `globals.css` | Tailwind v4 (late 2024) | No JS config file; tokens = utility classes + CSS vars automatically |
| `framer-motion` package | `motion` package + `motion/react` imports | Motion v11 (2024) | Legacy import path still works but `motion/react` is canonical |
| `@studio-freight/react-lenis` | `lenis/react` from `lenis` package | Lenis ownership move (2024) | Old package deprecated; new package is maintained by darkroomengineering |
| GSAP paid plugins (Club GreenSock) | All plugins free on npm | 2024 (Webflow sponsorship) | SplitText, MorphSVG, etc. are now `npm install gsap` |
| `useEffect` for GSAP | `useGSAP()` from `@gsap/react` | GSAP React package release | Auto-cleanup, Strict Mode safe, scoped to container |

**Deprecated/outdated:**
- `@studio-freight/lenis` and `@studio-freight/react-lenis`: deprecated, use `lenis` and `lenis/react`
- `framer-motion` import path: still works but `motion/react` is canonical
- `tailwind.config.js` for v4 projects: does not apply; use `@theme` in CSS

---

## Open Questions

1. **Font selection within editorial serif category**
   - What we know: Direction locked as editorial serif headline + clean sans body. Playfair Display + DM Sans is a well-supported, aesthetically matching pair. Alternatively: DM Serif Display + Inter.
   - What's unclear: Ida's personal preference between options within the approved category.
   - Recommendation: Implement Playfair Display + DM Sans as default (strong pairing, both on Google Fonts, widely used in editorial/portfolio work). Note in plan that font swap is a one-line change in `layout.tsx` if Ida prefers the alternative.

2. **Exact terracotta hex / oklch value**
   - What we know: Terracotta standard reference is #E2725B (oklch ≈ L:0.60 C:0.13 H:38). "Burnt sienna" reads warmer/darker at #8B4513 territory.
   - What's unclear: Whether Ida's vision is the lighter terracotta clay (#E2725B range) or deeper burnt sienna.
   - Recommendation: Implement mid-terracotta (oklch 0.60 0.13 38) as Phase 1 default with a note that the token can be adjusted in one line in `globals.css`. The semantic token name (`--color-accent`) means the actual value is easily changed without touching component code.

3. **Which specific case studies Ida is featuring**
   - What we know: 3–4 projects, some have existing decks/write-ups, some need to be written from scratch.
   - What's unclear: Project names, which have raw material, Ida's priority order.
   - Recommendation: First task in Phase 1 content track is a content audit session with Ida to inventory what exists and what needs authoring. This unblocks the case study writing tasks.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — greenfield project |
| Config file | None — see Wave 0 |
| Quick run command | `npm run test` (once configured) |
| Full suite command | `npm run test` |

### Phase Requirements → Test Map

Phase 1 is an enabling phase with no direct v1 requirement assignments. Validation is structural: the four integration artifacts must exist and be correct.

| ID | Behavior | Test Type | Automated Command | File Exists? |
|----|----------|-----------|-------------------|-------------|
| INFRA-01 | Next.js dev server starts without errors | smoke | `npm run build` | ❌ Wave 0 |
| INFRA-02 | TypeScript compiles without errors | static | `npx tsc --noEmit` | ❌ Wave 0 |
| INFRA-03 | `data/case-studies.ts` type-checks with populated data | static | `npx tsc --noEmit` | ❌ Wave 0 |
| INFRA-04 | Test page transition fires without console errors | smoke | manual in browser | manual-only |
| CONTENT-01 | Hero copy exists and is approved | manual | review session with Ida | manual-only |
| CONTENT-02 | All case study narratives complete and approved | manual | review session with Ida | manual-only |

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit` (TypeScript static check, ~5s)
- **Per wave merge:** `npm run build` (full Next.js build)
- **Phase gate:** Build green + manual review of page transition + content approval before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `package.json` with test script — install framework after scaffold
- [ ] TypeScript check as the primary automated gate (`npx tsc --noEmit` — no test framework needed for static analysis)
- [ ] `npm run build` as the integration smoke test
- [ ] No unit test framework required in Phase 1 — TypeScript + build check is sufficient for a scaffold phase

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs (`https://nextjs.org/docs/app/getting-started/installation`) — create-next-app setup, project structure, template.tsx behavior
- Next.js official docs (`https://nextjs.org/docs/app/api-reference/file-conventions/template`) — template.tsx vs layout.tsx behavioral difference, key assignment
- Tailwind CSS official docs (`https://tailwindcss.com/docs/theme`) — @theme directive, token syntax, CSS variable generation
- GSAP official docs (`https://gsap.com/docs/v3/Installation/`) — version 3.14.2, plugin registration, free plugin availability
- GSAP official docs (`https://gsap.com/resources/React/`) — useGSAP hook, Strict Mode pattern, cleanup
- Lenis GitHub README (`https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md`) — GSAP ticker integration, autoRaf: false pattern, correct import path

### Secondary (MEDIUM confidence)
- Motion docs/npm search — Motion v12.x confirmed; `motion/react` import canonical; `framer-motion` legacy
- WebSearch cross-verified: Lenis v1.3.x on npm; `@studio-freight/react-lenis` confirmed deprecated
- WebSearch cross-verified: terracotta hex #E2725B is the community standard reference value

### Tertiary (LOW confidence)
- Font pairing recommendation (Playfair Display + DM Sans) — sourced from design community articles, not authoritative docs. Reasonable recommendation but ultimately Claude's discretion per CONTEXT.md.
- OKLCH terracotta value (0.60 0.13 38) — calculated from hex conversion approximation; exact value should be adjusted visually during implementation.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against official Next.js, Tailwind, GSAP, and Lenis documentation with current versions
- Architecture patterns: HIGH — template.tsx pattern confirmed against Next.js official docs; Lenis GSAP integration from official README
- Pitfalls: HIGH — package rename (lenis), RAF conflict, layout vs template — all verified against official sources or official GitHub issues
- Font/color recommendations: MEDIUM — within the parameters set by CONTEXT.md locked decisions; specific values are Claude's discretion and easily adjusted

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (30 days — stack is stable; Lenis and Motion release frequently but breaking changes are rare)
