---
phase: 02-hero-routing
plan: "03"
subsystem: ui
tags: [navbar, gsap, lenis, react, next, tailwind, a11y, animation, scroll]

# Dependency graph
requires:
  - phase: 02-hero-routing
    provides: SmoothScrollProvider with lenis/react and GSAP registered
provides:
  - Sticky NavBar component with transparent-to-solid scroll transition
  - GSAP fade-in load animation with prefers-reduced-motion guard
  - Lenis smooth-scroll nav links for Work, About, Contact anchors
  - NavBar mounted in root layout persisting across all pages
affects:
  - 02-hero-routing (layout now has persistent nav)
  - 03-case-studies (nav will link to #work anchor)
  - 04-contact (nav will link to #contact anchor)

# Tech tracking
tech-stack:
  added: [vitest, @vitejs/plugin-react, jsdom, @testing-library/react, @testing-library/jest-dom]
  patterns:
    - "NavBar as use client component with useRef for GSAP scope"
    - "gsap.matchMedia() for prefers-reduced-motion guards in components"
    - "Lenis useLenis() hook for imperative smooth-scroll in nav links"
    - "scrolled state via window.scroll event for transparent-to-solid transition"

key-files:
  created:
    - components/NavBar.tsx
    - components/NavBar.test.tsx
    - vitest.setup.ts
  modified:
    - app/layout.tsx
    - vitest.config.ts

key-decisions:
  - "Nav links use <button> elements not <a href> — avoids hash-URL pollution and janky default scroll, Lenis handles imperatively"
  - "lenis?.scrollTo('body', { offset: 0 }) for name/logo click — returns to very top"
  - "autoAlpha: 0 in gsap.from() sets initial opacity:0 visibility:hidden — prevents flash of nav before animation"
  - "90px scroll threshold for transparent-to-solid transition — just past nav's own height"

patterns-established:
  - "gsap.matchMedia() reduceMotion pattern: gsap.set(..., autoAlpha:1) in reduceMotion branch, gsap.from() in standard branch"
  - "NavBar as sibling of {children} inside SmoothScrollProvider — persists across Next.js page transitions"

requirements-completed: [A11Y-01]

# Metrics
duration: 12min
completed: 2026-03-22
---

# Phase 2 Plan 03: NavBar Component Summary

**Sticky NavBar with GSAP fade-in (1.4s delay), prefers-reduced-motion guard, and Lenis-driven smooth-scroll links mounted persistently in root layout**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-22T14:43:00Z
- **Completed:** 2026-03-22T14:55:47Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- NavBar component with fixed positioning, transparent-to-bg-canvas scroll transition, and font-display name on left / nav links on right
- GSAP load animation with 1.4s delay synchronized with hero sequence; gsap.matchMedia() reduces motion immediately to full opacity
- Lenis useLenis() scroll for Work/About/Contact anchors with -80px offset and back-to-top on site name click
- NavBar mounted in app/layout.tsx inside SmoothScrollProvider as sibling of {children} — persists across all pages
- Vitest + @testing-library/react test infrastructure installed; NavBar test green

## Task Commits

Each task was committed atomically:

1. **Failing test (RED)** - `7b96cd6` (test)
2. **Task 1: Build NavBar component (GREEN)** - `52bbd3d` (feat)
3. **Task 2: Mount NavBar in layout.tsx** - `526f7f9` (feat)

_Note: TDD task had test → feat commits_

## Files Created/Modified

- `components/NavBar.tsx` - Sticky nav with scroll behavior, GSAP animation, Lenis links
- `components/NavBar.test.tsx` - Unit tests: site name and nav links rendered (A11Y-01)
- `app/layout.tsx` - Added NavBar import and placement inside SmoothScrollProvider
- `vitest.config.ts` - Added setup file reference
- `vitest.setup.ts` - @testing-library/jest-dom import for toBeInTheDocument matchers

## Decisions Made

- Nav links are `<button>` elements not `<a href="#">` — avoids hash-URL pollution and janky browser-native scroll; Lenis handles scrolling imperatively
- `autoAlpha: 0` on the `gsap.from()` sets `opacity: 0; visibility: hidden` initially — prevents a brief flash of visible nav before animation plays
- 90px scroll threshold — just past the nav's own height, so the transition happens when content first appears under the nav
- `shadow-sm` added on scroll to create subtle separator between nav and content

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] npm cache permission error prevented package install**
- **Found during:** Task 1 setup (TDD infrastructure)
- **Issue:** npm cache owned by root caused EACCES on `@testing-library/react` install
- **Fix:** Used `--cache /tmp/npm-cache-temp` flag to bypass root-owned cache directory
- **Files modified:** package.json, package-lock.json (indirect: vitest.config.ts, vitest.setup.ts)
- **Verification:** All packages installed, test ran successfully
- **Committed in:** 7b96cd6 (test commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Unrelated to code — npm cache permissions issue. Resolved without scope creep.

## Issues Encountered

- npm cache root-owned directory blocked testing library install. Fixed by using temp cache path (`--cache /tmp/npm-cache-temp`). No code impact.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- NavBar is live and persists across all pages
- Work, About, Contact smooth-scroll links are wired — target sections (#work, #about, #contact) will be built in subsequent phases
- Phase 2 hero + nav stack is complete and ready for visual verification
- A11Y-01 requirement fulfilled: prefers-reduced-motion guard renders nav at full opacity immediately

---
*Phase: 02-hero-routing*
*Completed: 2026-03-22*
