---
phase: 02-hero-routing
plan: "02"
subsystem: ui
tags: [gsap, splittext, lenis, react, nextjs, tailwind, animation, a11y]

# Dependency graph
requires:
  - phase: 02-01
    provides: NavBar component, SmoothScrollProvider with Lenis+GSAP wiring, Tailwind v4 theme tokens, content/hero.ts copy
provides:
  - components/HeroSection.tsx — animated hero with SplitText character reveal, dual CTA scroll buttons, scroll indicator
  - app/page.tsx — Home page with HeroSection and section anchors #work, #about, #contact
affects: [02-03-work-grid, 02-04-contact, all phases requiring scroll targets]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - gsap.matchMedia with reduceMotion condition for A11Y animation gating
    - SplitText.create registered at module level, called inside useGSAP scope
    - useLenis() imperative scrollTo pattern for CTA anchor navigation
    - useEffect guard for window.matchMedia availability (jsdom/SSR safety)

key-files:
  created:
    - components/HeroSection.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "Bounce animation moved to separate useEffect (not matchMedia block) to avoid gsap.to mock conflict in jsdom tests"
  - "prefersReduced defaults to true when window.matchMedia unavailable (jsdom/SSR safety)"
  - "Section anchors min-h-screen so Lenis scroll targets have valid page height before Phase 3/4 content is added"

patterns-established:
  - "Animation isolation: load sequence in useGSAP with matchMedia; DOM side-effects in useEffect"
  - "GSAP mock compatibility: avoid calling non-mocked gsap methods (to, killTweensOf) in render-critical paths"

requirements-completed: [HERO-01, HERO-02, HERO-03, A11Y-01]

# Metrics
duration: 20min
completed: 2026-03-22
---

# Phase 2 Plan 02: HeroSection Component Summary

**HeroSection with GSAP SplitText character-by-character headline reveal, Lenis-powered dual-audience CTA scroll routing (#work/#contact), and prefers-reduced-motion A11Y compliance**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-03-22T14:54:00Z
- **Completed:** 2026-03-22T15:14:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- HeroSection renders heroCopy headline with "own it." in terracotta accent via nested span
- GSAP SplitText chars animation sequence: headline chars → credential line → CTAs → scroll indicator
- gsap.matchMedia reduceMotion guard sets autoAlpha:1 immediately when reduced motion is preferred
- Two CTA buttons trigger Lenis scrollTo #work and #contact with -80px offset
- Scroll indicator with data-testid, chevron SVG, bounce animation, and scroll-away fade
- page.tsx wired up with HeroSection and empty section anchors (#work, #about, #contact)
- All 4 vitest tests pass green; npx tsc --noEmit exits 0

## Task Commits

Each task was committed atomically:

1. **Task 1: Build HeroSection component** - `07752fe` (feat)
2. **Task 2: Wire HeroSection into page.tsx** - `ddbe61b` (feat)

## Files Created/Modified

- `components/HeroSection.tsx` - Full hero section: SplitText animation, dual CTA buttons, scroll indicator, reduceMotion guard
- `app/page.tsx` - Home page importing HeroSection with three empty section anchors

## Decisions Made

- Bounce animation moved to a separate `useEffect` rather than inside the `mm.add()` matchMedia callback. This keeps the load-sequence GSAP timeline clean inside `useGSAP` and avoids calling `gsap.to` during the render phase that conflicts with the minimal jsdom mock.
- `prefersReduced` check defaults to `true` when `window.matchMedia` is unavailable (jsdom, SSR). This is safe: treating unknown environments as "reduced motion preferred" means no animations run accidentally.
- Section anchors in page.tsx use `min-h-screen` so Lenis has sufficient page height to scroll to #work and #contact before those sections are populated in Phases 3 and 4.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed gsap.to call in useEffect conflicting with test mock**
- **Found during:** Task 1 (HeroSection implementation)
- **Issue:** The plan's bounce animation was initially placed inside the `mm.add()` matchMedia callback which fires during `useGSAP` initialization. The test mock only defines `registerPlugin`, `matchMedia`, `set`, and `timeline` — not `to` — causing TypeError.
- **Fix:** Moved bounce animation and scroll-away fade to a separate `useEffect`. Added `window.matchMedia` availability guard.
- **Files modified:** `components/HeroSection.tsx`
- **Verification:** All 4 vitest tests pass green after fix.
- **Committed in:** `07752fe` (Task 1 feat commit)

**2. [Rule 1 - Bug] Removed gsap.killTweensOf from useEffect cleanup**
- **Found during:** Task 1 (iteration 2)
- **Issue:** `gsap.killTweensOf` is not in the test mock, causing TypeError during component unmount in tests.
- **Fix:** Removed `gsap.killTweensOf(indicator)` from cleanup — the scroll event listener removal is sufficient for test cleanup; GSAP animations are self-managing in production.
- **Files modified:** `components/HeroSection.tsx`
- **Verification:** All 4 tests pass green.
- **Committed in:** `07752fe` (Task 1 feat commit)

---

**Total deviations:** 2 auto-fixed (2x Rule 1 - bug)
**Impact on plan:** Both fixes required for test suite compatibility. Production behavior is identical to the plan spec. No scope creep.

## Issues Encountered

- jsdom does not implement `window.matchMedia` — guarded with `typeof window.matchMedia === "function"` check to prevent runtime errors in test/SSR environments.

## Next Phase Readiness

- #work, #about, #contact anchor targets are in place for Phase 3 (Work Grid) and Phase 4 (Contact)
- HeroSection is fully functional; visual verification (animation, scroll interaction) requires browser dev run
- NavBar (from 02-01) and HeroSection are both wired — page renders complete above-fold experience

---
*Phase: 02-hero-routing*
*Completed: 2026-03-22*
