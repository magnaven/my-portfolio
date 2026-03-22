---
phase: 03-work-section-case-studies
plan: "02"
subsystem: ui
tags: [react, next.js, usePathname, navbar, routing]

# Dependency graph
requires:
  - phase: 02-hero-routing
    provides: NavBar component with scroll-based transparent-to-solid transition
provides:
  - NavBar that renders with solid bg-canvas background on /work/[slug] pages from initial load
  - usePathname-based alwaysSolid detection for case study routes
affects: [03-work-section-case-studies, 04-about-contact]

# Tech tracking
tech-stack:
  added: []
  patterns: [usePathname for route-conditional rendering, alwaysSolid computed before useEffect]

key-files:
  created: []
  modified:
    - components/NavBar.tsx
    - components/NavBar.test.tsx

key-decisions:
  - "usePathname().startsWith('/work/') sets alwaysSolid — no prop threading from parent layout needed"
  - "alwaysSolid injected into both initial setScrolled call and scroll handler — ensures solid state at page load not just after first scroll"

patterns-established:
  - "Route-conditional UI state: usePathname() inside component to detect page context without prop threading"

requirements-completed: [WORK-02, WORK-03]

# Metrics
duration: 5min
completed: 2026-03-22
---

# Phase 3 Plan 02: NavBar alwaysSolid for /work/ Routes Summary

**NavBar renders solid bg-canvas from initial load on /work/[slug] case study pages via usePathname().startsWith('/work/') guard injected into the scrolled useEffect**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-22T16:11:29Z
- **Completed:** 2026-03-22T16:16:00Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments

- Added `usePathname` import and `alwaysSolid` computed variable to NavBar component
- Updated scrolled useEffect to set initial state and scroll handler using `alwaysSolid || window.scrollY > 90`
- Added `next/navigation` mock to NavBar.test.tsx returning "/" so all existing tests continue to test homepage (non-solid) behaviour
- NavBar.test.tsx GREEN with no regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Add usePathname solid-state guard to NavBar** - `42d4f3e` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `components/NavBar.tsx` - Added usePathname import, alwaysSolid variable, and updated useEffect to honour alwaysSolid on /work/ pages
- `components/NavBar.test.tsx` - Added next/navigation mock (usePathname returning "/") to prevent test breakage

## Decisions Made

- usePathname used inside the component rather than threading a prop from the layout — self-contained, no parent changes required
- alwaysSolid wired into both the initial `setScrolled` call (for page-load solid state) and the scroll handler (consistency) — avoids a flash of transparent state before first scroll event

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Pre-existing `WorkSection.test.tsx` failure (missing WorkSection component — to be built in Plan 03) was verified as out-of-scope and not caused by this plan's changes.

## Next Phase Readiness

- NavBar solid-state guard is complete and tested
- Plan 03 (WorkSection component + case study grid) can now assume NavBar will render correctly on /work/[slug] pages
- No blockers

---
*Phase: 03-work-section-case-studies*
*Completed: 2026-03-22*
