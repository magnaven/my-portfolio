# Phase 3: Work Section + Case Studies - Research

**Researched:** 2026-03-22
**Domain:** GSAP ScrollTrigger pinning, Next.js dynamic routes, React component composition for scroll-driven narratives
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Grid card design:**
- Typography-dominant — no thumbnail image, no colour block; the large Playfair Display title IS the visual
- Full-width stacked list layout: each card is a horizontal strip spanning full width, title on the left, category + one punchy outcome stat on the right
- Info shown per card: title (large, display font) + category label + first outcome stat (e.g. "32% lift in conversions")
- Hover state: subtle terracotta background tint + a → arrow or "Read case study" label appears
- Cards scroll-triggered: stagger in as the #work section enters the viewport (consistent with GSAP animation language)

**Cinematic scroll structure (case study pages):**
- Pinned sections — each chapter (Problem, Process, Key Decisions, Outcomes) pins to the viewport while its content animates in, then unpins and the next chapter takes over
- Animation within each pinned section: line-by-line fade up with short stagger — consistent with hero headline animation style, but gentler
- Progress indicator: subtle vertical progress bar on the side edge of the viewport, fills as visitor scrolls through chapters
- `prefers-reduced-motion`: skip all GSAP animations, render all content at final visible state immediately (consistent with Phase 2 pattern)

**Case study page hero (above the scroll narrative):**
- Shows: title + category + first outcome stat
- Results-first framing — visitor sees what was achieved before reading how; confident, not coy

**Case study page layout:**
- Contained narrow column: ~640–720px, centred in the viewport — editorial long-form article feel
- Key Decisions section: decision cards with ✗/✓ visual contrast
  - Each card shows: "What was weighed" as header, then ✗ Killed (muted/de-emphasised), ⚠ Constraint, ✓ Chosen (terracotta accent on the chosen path)
  - Cards stagger-animate in when the Key Decisions section pins
- Outcomes section: large stat callouts — metric as small label, result as large display-font number/statement

**Case study navigation:**
- The site NavBar (already wired in `layout.tsx`) persists on all case study pages — no new navigation component needed
- On case study pages, nav is always solid from the top (no transparent-to-solid behaviour — no hero to be transparent over)
- End of case study: "Next: [Title] →" link cycles to the next case study in the array; wraps around to first after last
- No separate floating back button — the persistent nav covers the return path

### Claude's Discretion
- Exact pinning scroll distance per chapter (how many viewport-heights of scroll each pin occupies)
- Exact stagger timing for line-by-line reveals on case study pages
- Progress bar width, colour, and position (left vs. right edge)
- Card hover transition duration and terracotta tint opacity
- Spacing and padding within decision cards
- Whether the outcome stat on the card is the first `outcomes[0].result` verbatim or a shorter derived version

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| WORK-01 | Visitor can browse a visual grid of 3–4 selected case studies (title, category, thumbnail preview) | WorkSection component renders caseStudies array as stacked card list; scroll-triggered stagger via GSAP ScrollTrigger |
| WORK-02 | Visitor can navigate from the grid to individual full case study pages | Next.js dynamic route `app/work/[slug]/page.tsx`; `generateStaticParams` pre-renders all 3 slugs at build time |
| WORK-03 | Case study pages use GSAP scroll storytelling — narrative unfolds cinematically as visitor scrolls (problem → process → decisions → outcomes) | GSAP ScrollTrigger `pin` + `scrub` on chapter sections; `useGSAP` with `gsap.matchMedia()` reduceMotion guard |
| WORK-04 | Each case study includes an explicit "Key Decisions" section showing what was weighed, what was killed, and what constraints shaped the outcome | `KeyDecision[]` interface already in `data/case-studies.ts`; decision cards rendered in the pinned Key Decisions chapter |
</phase_requirements>

---

## Summary

Phase 3 builds on a stable, well-established foundation. All animation infrastructure (GSAP, ScrollTrigger, Lenis, `useGSAP`, `gsap.matchMedia()`) is registered and working in Phase 2. The `CaseStudy` interface and data are locked and approved. The only new technical territory is: (1) GSAP ScrollTrigger `pin` behaviour for the cinematic chapter scroll, and (2) Next.js App Router dynamic routes with `generateStaticParams`.

The critical GSAP insight is that pinning works by freezing an element in `position: fixed` while the scroll distance "plays out" below it. The key rule: **never animate the pinned element itself** — only animate children within it. This is essential because ScrollTrigger pre-calculates start/end positions before animations run. Violating this causes visual glitches and measurement errors.

The Next.js side is straightforward: `app/work/[slug]/page.tsx` with `generateStaticParams` returning all 3 case study slugs from the `caseStudies` array. In Next.js 15+ (this project uses 16.2.1), `params` is typed as `Promise<{ slug: string }>` and must be `await`-ed inside the page component.

**Primary recommendation:** Use GSAP `pin: true` with `pinSpacing: true` (default) on each chapter wrapper div. Animate only child elements (text lines, cards) within the pinned section, never the pinned element itself. Set `scrub: false` on the reveal animations — they should trigger on scroll entry, not scrub. The NavBar solid-state fix is a minor prop/flag addition to `NavBar.tsx`.

---

## Standard Stack

### Core (already installed — no new dependencies needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | ScrollTrigger pinning, chapter reveals, card stagger | Already registered in SmoothScrollProvider |
| @gsap/react | 2.1.2 | `useGSAP` hook for cleanup-safe animations | Already used in HeroSection and NavBar |
| lenis | 1.3.19 | Smooth scroll — GSAP ticker already wired | Already in SmoothScrollProvider |
| next | 16.2.1 | Dynamic routes via `app/work/[slug]/page.tsx` | Project framework |
| motion | 12.38.0 | Page transition via template.tsx | Already applied to all routes automatically |

### Supporting (already installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| vitest | 4.1.0 | Component tests | WORK-01, WORK-02, WORK-04 presence/render checks |
| @testing-library/react | 16.3.2 | DOM assertions in jsdom | All component tests |

### No New Dependencies

All required tools are already installed. Do not add new packages.

**GSAP plugin already registered (in SmoothScrollProvider.tsx):**
```typescript
gsap.registerPlugin(ScrollTrigger, useGSAP);
```

`ScrollTrigger` can be imported directly in any component:
```typescript
import ScrollTrigger from "gsap/ScrollTrigger";
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── page.tsx                    # Replace #work stub with <WorkSection />
└── work/
    └── [slug]/
        └── page.tsx            # Dynamic route — async Server Component

components/
├── WorkSection.tsx             # Homepage grid of case study cards
├── CaseStudyCard.tsx           # Individual card (title, category, stat)
├── CaseStudyHero.tsx           # Above-fold hero for case study page
├── CaseStudyChapters.tsx       # "use client" — pinned scroll narrative
├── DecisionCard.tsx            # Single key decision card
└── OutcomeStat.tsx             # Large stat callout

NavBar.tsx                      # Add `alwaysSolid?: boolean` prop
```

### Pattern 1: Next.js Dynamic Route with generateStaticParams

**What:** Pre-render all 3 case study pages at build time from the locked `caseStudies` array.

**When to use:** Static content known at build time — this is exactly the scenario.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// app/work/[slug]/page.tsx

import { caseStudies } from "@/data/case-studies";
import { notFound } from "next/navigation";

// Pre-render at build time
export function generateStaticParams() {
  return caseStudies
    .filter((cs) => cs.status === "published")
    .map((cs) => ({ slug: cs.id }));
}

// In Next.js 15+, params is a Promise
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.id === slug);
  if (!study) notFound();

  return (
    <>
      <CaseStudyHero study={study} />
      <CaseStudyChapters study={study} />
      <CaseStudyNextLink currentId={slug} />
    </>
  );
}
```

**Key detail:** `params` typed as `Promise<{ slug: string }>` and `await`-ed — this is the Next.js 15/16 requirement. Sync access will cause a TypeScript error.

### Pattern 2: GSAP ScrollTrigger Pin — Chapter Pinning

**What:** Each chapter (Problem, Process, Key Decisions, Outcomes) wraps a full-viewport section. ScrollTrigger pins it while content animates in, then releases.

**When to use:** Cinematic "one chapter at a time" scroll reading — exactly the locked decision.

**Critical rule from official docs:** Never animate the pinned element itself. Animate children only. ScrollTrigger pre-calculates positions; animating the pin target throws off measurements.

```typescript
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
// components/CaseStudyChapters.tsx ("use client")

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function CaseStudyChapters({ study }: { study: CaseStudy }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { reduceMotion } = context.conditions!;

        if (reduceMotion) {
          // Render all content immediately at final visible state
          gsap.set(".chapter-content", { autoAlpha: 1, y: 0 });
          return;
        }

        // Pin each chapter, animate its children
        document.querySelectorAll<HTMLElement>(".chapter").forEach((chapter) => {
          const lines = chapter.querySelectorAll(".chapter-line");

          ScrollTrigger.create({
            trigger: chapter,
            start: "top top",
            end: "+=150%",     // pin for 1.5x viewport height of scroll
            pin: true,         // freeze chapter in place
            pinSpacing: true,  // default — adds space below to prevent overlap
            onEnter: () => {
              gsap.from(lines, {
                autoAlpha: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
              });
            },
          });
        });
      }
    );
  }, { scope: containerRef });

  return <div ref={containerRef}>{/* chapters */}</div>;
}
```

**`end: "+=150%"` meaning:** Pin persists for 150% of the viewport height worth of scroll distance. Tune this value per Claude's discretion. Typical values: 100%–250% depending on content density.

### Pattern 3: Card Stagger on Homepage Grid

**What:** WorkSection cards fade and translate in with stagger as the #work section enters the viewport.

**When to use:** Consistent with Phase 2 hero animation language.

```typescript
// components/WorkSection.tsx ("use client")
// Consistent with HeroSection pattern

useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
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
  });
}, { scope: containerRef });
```

### Pattern 4: NavBar Solid-State on Case Study Pages

**What:** NavBar is always `bg-canvas` on case study pages — no transparent phase since there is no hero to be transparent over.

**Simplest approach (no context, no prop drilling):** Read scroll position on mount. On case study pages, the window is already scrolled to 0 but there is no hero below the nav, so the transparent state is incorrect. The cleanest fix is a `data-page` attribute or a boolean prop.

```typescript
// Preferred: pass alwaysSolid prop from layout or page
// components/NavBar.tsx — add to props
interface NavBarProps {
  alwaysSolid?: boolean;
}

// In the useEffect:
const handleScroll = () => {
  setScrolled(alwaysSolid || window.scrollY > 90);
};

// Also set initial state:
useEffect(() => {
  setScrolled(alwaysSolid || window.scrollY > 90);
}, [alwaysSolid]);
```

**Alternative (zero prop drilling):** Use `usePathname()` from `next/navigation` inside NavBar to detect `/work/` routes and apply `alwaysSolid` automatically. This keeps the NavBar self-contained.

```typescript
// components/NavBar.tsx
import { usePathname } from "next/navigation";

const pathname = usePathname();
const alwaysSolid = pathname.startsWith("/work/");
```

**Recommendation (Claude's discretion):** `usePathname()` approach is cleaner — no prop threading, self-contained logic.

### Pattern 5: Scroll Progress Bar

**What:** Vertical bar fills as visitor scrolls through the case study chapters.

**Implementation:** A fixed-position thin vertical strip. Its `height` (as a percentage) is driven by a ScrollTrigger on the overall chapter container.

```typescript
// Progress bar driven by total chapter container scroll
ScrollTrigger.create({
  trigger: ".chapters-container",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    gsap.set(".progress-bar-fill", { scaleY: self.progress });
  },
});
```

Position left or right edge per Claude's discretion. Recommended: right edge (`right: 0`), 3px wide, terracotta fill (`bg-accent`), transform-origin bottom, initial `scaleY: 0`.

### Anti-Patterns to Avoid

- **Animating the pinned element:** Never `gsap.from(pinnedChapterDiv, ...)` — always target children within it. The pinned element's position is pre-calculated by ScrollTrigger.
- **`transform` on ancestor of pinned element:** Breaks `position: fixed` behaviour — a browser limitation. `template.tsx` uses `motion.div` with `y` transform; this is on the page wrapper, not an ancestor of the fixed nav. Monitor if pinning glitches occur; if so, disable the exit `y` animation on case study pages.
- **Creating ScrollTriggers out of DOM order:** Create them top-to-bottom as they appear on the page — ScrollTrigger uses sequential position calculations.
- **Missing `refreshPriority`:** If chapter ScrollTriggers are created in useEffect after a render, positions may be stale. Always create inside `useGSAP` (which runs after layout) or call `ScrollTrigger.refresh()` after.
- **`"use client"` on the page file:** The `app/work/[slug]/page.tsx` should remain a Server Component for `generateStaticParams` to work. Move all GSAP animation logic into `CaseStudyChapters.tsx` marked `"use client"`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll position pinning | Custom `position: sticky` hacks or JS scroll listeners | GSAP ScrollTrigger `pin: true` | Edge cases with Lenis scroll velocity, mobile rubber-banding, multi-browser inconsistency |
| Smooth scroll to top when navigating to `/work/[slug]` | Manual `window.scrollTo` | Lenis (already active via SmoothScrollProvider + ReactLenis root) | Lenis resets on navigation automatically when `root` is set |
| Page transition animation | Custom CSS fade | `template.tsx` motion.div | Already wired — all pages inherit it automatically |
| Slug-to-study lookup | Custom URL parsing | `caseStudies.find((cs) => cs.id === slug)` | Direct — id IS the slug by design |
| Progress tracking | Scroll event listeners + percentage math | `ScrollTrigger.onUpdate` with `self.progress` | Accounts for pinned spacing correctly; raw scroll % would be wrong |

**Key insight:** The GSAP + Lenis pairing is already wired to share a RAF loop (ticker). Do not add any additional `requestAnimationFrame` calls or scroll event listeners for animation — route all animation through the existing GSAP pipeline.

---

## Common Pitfalls

### Pitfall 1: Pinning Breaks with `transform` on Ancestor
**What goes wrong:** `position: fixed` (used internally by ScrollTrigger pin) fails when any ancestor element has a CSS `transform` applied. The pinned element appears to scroll with the page instead of staying fixed.
**Why it happens:** Browser spec — CSS `transform` creates a new stacking context that contains `position: fixed` descendants.
**How to avoid:** `template.tsx` applies `y` transform to `motion.div` which wraps the page. On case study pages, the pinned elements are descendants. If glitching occurs, set `exit={{ opacity: 0 }}` only (remove `y: -8`) for case study routes, or use `pinReparent: true` on the ScrollTrigger (expensive — try the template fix first).
**Warning signs:** Pinned chapter follows the page scroll slightly rather than staying fixed.

### Pitfall 2: `params` Not Awaited in Next.js 16
**What goes wrong:** TypeScript error, or worse — a runtime warning in dev and broken build in production.
**Why it happens:** Next.js 15+ changed `params` in page components to return `Promise<{...}>` instead of a plain object, for improved streaming/caching compatibility.
**How to avoid:** Always: `const { slug } = await params;` and type as `params: Promise<{ slug: string }>`.
**Warning signs:** TypeScript sees `params.slug` as `Promise<string>` not `string`.

### Pitfall 3: ScrollTrigger Positions Stale After Mount
**What goes wrong:** Chapter pins start at wrong scroll positions, especially after a page transition (Motion fade-in may shift layout briefly).
**Why it happens:** ScrollTrigger calculates positions when created. If DOM layout shifts after creation (due to font loading, Motion animation, or image layout), positions are wrong.
**How to avoid:** Call `ScrollTrigger.refresh()` inside a `useEffect` with no deps (runs once after mount) or use `useLayoutEffect`. Alternatively, trigger creation after a short RAF via `requestAnimationFrame(() => ScrollTrigger.refresh())`.
**Warning signs:** First chapter pins at wrong position; subsequent chapters are off by a consistent offset.

### Pitfall 4: Missing reduceMotion Guard on ScrollTrigger
**What goes wrong:** Pinning still occurs even when `prefers-reduced-motion` is enabled. Users with vestibular disorders experience the disorienting pin behaviour without animation context.
**Why it happens:** ScrollTrigger `pin` is structural, not purely visual — it must be suppressed too, not just the `gsap.from()` calls.
**How to avoid:** Wrap ALL ScrollTrigger creation (including `pin: true` instances) inside the `reduceMotion` conditional. The `reduceMotion` block should `return` early after `gsap.set()` — this prevents any ScrollTrigger creation.
**Warning signs:** A11Y-01 fails; pinning behaviour observed with OS reduce-motion enabled.

### Pitfall 5: NavBar Transparent on Case Study Pages
**What goes wrong:** Nav appears transparent on `/work/[slug]` because `scrolled` starts as `false` on mount.
**Why it happens:** The transparent-to-solid logic reads `window.scrollY` which is 0 on page load regardless of whether there's a hero below the nav.
**How to avoid:** Use `usePathname()` in NavBar to detect `/work/` routes and set `alwaysSolid = true`, overriding the scroll check.
**Warning signs:** Nav text is invisible on case study page load (text-ink on transparent background = readable but wrong aesthetic; issue appears if canvas is not white enough to provide contrast).

### Pitfall 6: Card Hover State Requires Cursor Pointer
**What goes wrong:** Cards are `<div>` or `<article>` elements with an `onClick` — missing `cursor-pointer` Tailwind class makes them feel non-interactive.
**Why it happens:** Non-native interactive elements don't inherit pointer cursor.
**How to avoid:** Wrap each card in a `<Link href={/work/${study.id}}>` (Next.js) rather than `onClick`. This is semantically correct and gets pointer cursor, keyboard navigation, and right-click "open in new tab" for free.

---

## Code Examples

### Verified: generateStaticParams for case studies

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// app/work/[slug]/page.tsx

import { caseStudies } from "@/data/case-studies";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudies
    .filter((cs) => cs.status === "published")
    .map((cs) => ({ slug: cs.id }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.id === slug);
  if (!study) notFound();
  // render...
}
```

### Verified: useGSAP with ScrollTrigger pin

```typescript
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
// Inside useGSAP(() => { ... }, { scope: containerRef })

const mm = gsap.matchMedia();
mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
  const { reduceMotion } = context.conditions!;

  if (reduceMotion) {
    gsap.set(".chapter-content", { autoAlpha: 1, y: 0 });
    return; // No ScrollTrigger created — no pinning for reduced motion
  }

  document.querySelectorAll<HTMLElement>(".chapter").forEach((chapter) => {
    const lines = chapter.querySelectorAll(".chapter-line");

    ScrollTrigger.create({
      trigger: chapter,
      start: "top top",
      end: "+=150%",
      pin: true,
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
});
```

### Verified: Next.js Link for card navigation

```typescript
// components/CaseStudyCard.tsx
import Link from "next/link";

// Wrap entire card in Link for semantic correctness + free keyboard nav
<Link
  href={`/work/${study.id}`}
  className="group block w-full px-0 py-8 border-b border-ink/10
             hover:bg-accent/8 transition-colors duration-200 cursor-pointer"
>
  <div className="flex items-baseline justify-between">
    <h3 className="font-display text-5xl text-ink group-hover:text-accent
                   transition-colors duration-200">
      {study.title}
    </h3>
    <div className="flex items-center gap-6 shrink-0 ml-8">
      <span className="font-sans text-sm text-ink/50 uppercase tracking-wide">
        {study.category}
      </span>
      <span className="font-sans text-base text-ink/70">
        {study.outcomes[0].result}
      </span>
      <span className="font-sans text-sm text-accent opacity-0 group-hover:opacity-100
                       transition-opacity duration-200">
        Read case study →
      </span>
    </div>
  </div>
</Link>
```

### Verified: Next-case-study navigation (circular)

```typescript
// End of CaseStudyPage or CaseStudyChapters
const allPublished = caseStudies.filter((cs) => cs.status === "published");
const currentIndex = allPublished.findIndex((cs) => cs.id === study.id);
const nextStudy = allPublished[(currentIndex + 1) % allPublished.length];

// Render:
<Link href={`/work/${nextStudy.id}`}>
  Next: {nextStudy.title} →
</Link>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `getStaticPaths` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13 | Different file location and API; return same shape |
| `params` as plain object | `params` as `Promise<{...}>` (must await) | Next.js 15 | TypeScript catches this; must `await params` |
| `ScrollTrigger.matchMedia()` | `gsap.matchMedia()` (global API) | GSAP 3.11 | Project already uses the current approach correctly |
| `useEffect` for GSAP cleanup | `useGSAP` from `@gsap/react` | 2023 | Project already uses the current approach correctly |

**Deprecated/outdated:**
- `ScrollTrigger.matchMedia()` (old method): Replaced by `gsap.matchMedia()`. Project uses the current form.
- Syncing params in `page.tsx` with `params.slug` (no await): Broken in Next.js 15+. Always `await params`.

---

## Open Questions

1. **template.tsx `y` transform and pin compatibility**
   - What we know: `motion.div` in template.tsx applies `y: 8 → 0` on enter and `y: 0 → -8` on exit. During the enter animation, the div has a transform applied briefly.
   - What's unclear: Whether this brief transform during page transition causes a visible pin-position glitch on first scroll.
   - Recommendation: Test in browser first. If glitching, patch template.tsx for `/work/` routes: detect pathname with `usePathname()` and set `initial={{ opacity: 0 }}` (no y) for case study pages only.

2. **Lenis scroll reset on navigate-to case study page**
   - What we know: Lenis is mounted at root via `ReactLenis root` — it persists across navigations.
   - What's unclear: Whether Lenis correctly resets the scroll position to 0 when navigating from homepage to `/work/[slug]`.
   - Recommendation: Standard Next.js App Router handles `window.scrollTo(0,0)` on navigation. Lenis wraps native scroll, so this should work. Verify in browser; if not, add `lenis?.scrollTo(0, { immediate: true })` in a `useEffect` on the case study page.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | vitest 4.1.0 + @testing-library/react 16.3.2 |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| WORK-01 | WorkSection renders list of case study cards with titles | unit | `npx vitest run components/WorkSection.test.tsx` | ❌ Wave 0 |
| WORK-01 | Each card shows title, category, and outcome stat | unit | `npx vitest run components/WorkSection.test.tsx` | ❌ Wave 0 |
| WORK-02 | Each card links to correct `/work/[slug]` route | unit | `npx vitest run components/WorkSection.test.tsx` | ❌ Wave 0 |
| WORK-03 | CaseStudyChapters renders all four chapter sections | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ Wave 0 |
| WORK-03 | With prefers-reduced-motion, all chapter content is immediately visible | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ Wave 0 |
| WORK-04 | Key Decisions section renders all keyDecisions entries | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ Wave 0 |
| WORK-04 | Each decision card shows what, killed, constraint, and chosen fields | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ Wave 0 |

**Note on GSAP in tests:** All GSAP imports must be mocked at `vi.mock` level (established pattern from HeroSection.test.tsx and NavBar.test.tsx). Mock `gsap`, `gsap/ScrollTrigger`, and `lenis/react`. Tests verify DOM structure and content, not animation behaviour — animation is verified visually in browser.

**Note on generateStaticParams:** This is a build-time server function. It is not tested with vitest/jsdom. The fact that it compiles and `next build` succeeds is the verification. No unit test needed.

### Sampling Rate
- **Per task commit:** `npx vitest run`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `components/WorkSection.test.tsx` — covers WORK-01, WORK-02
- [ ] `components/CaseStudyChapters.test.tsx` — covers WORK-03, WORK-04

Shared mocking pattern is established — new test files follow the `vi.mock("gsap", ...)` pattern from `HeroSection.test.tsx` verbatim.

---

## Sources

### Primary (HIGH confidence)
- [https://gsap.com/docs/v3/Plugins/ScrollTrigger/](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — pin, pinSpacing, scrub, onEnter, onUpdate, ordering constraints
- [https://nextjs.org/docs/app/api-reference/functions/generate-static-params](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — generateStaticParams pattern, Promise params, version 16.2.1 docs

### Secondary (MEDIUM confidence)
- GSAP community forums — [https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/) — useGSAP + ScrollTrigger in Next.js pattern confirmed consistent with docs
- Direct codebase inspection: `SmoothScrollProvider.tsx`, `HeroSection.tsx`, `NavBar.tsx`, `template.tsx`, `data/case-studies.ts`, `app/page.tsx`, `vitest.config.ts` — HIGH confidence on all integration points

### Tertiary (LOW confidence)
- None — all critical claims verified against official docs or source code.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified from installed package.json and existing source files
- Architecture patterns: HIGH — generateStaticParams from official Next.js 16.2.1 docs; ScrollTrigger pin from official GSAP docs
- Pitfalls: HIGH for pin/transform interaction (official GSAP docs), MEDIUM for Lenis scroll reset (inferred from Lenis root behaviour, recommend browser verification)

**Research date:** 2026-03-22
**Valid until:** 2026-06-22 (90 days — stable libraries, no fast-moving APIs)
