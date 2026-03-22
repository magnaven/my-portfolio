---
phase: 03-work-section-case-studies
plan: "00"
subsystem: testing
tags: [vitest, react-testing-library, gsap, lenis, next/link, tdd]

# Dependency graph
requires:
  - phase: 02-hero-routing
    provides: established vi.mock pattern for gsap, lenis/react, and jsdom test infrastructure
  - phase: 01-foundation
    provides: CaseStudy interface and caseStudies data array in data/case-studies.ts
provides:
  - Failing test scaffolds for WorkSection.tsx (WORK-01, WORK-02)
  - Failing test scaffolds for CaseStudyChapters.tsx (WORK-03, WORK-04, A11Y-01)
  - RED baseline enabling Nyquist compliance for Plans 01-03 verify commands
affects: [03-work-section-case-studies plans 01-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "vi.mock at file scope for gsap, gsap/ScrollTrigger, lenis/react — identical to HeroSection.test.tsx"
    - "Dynamic import inside each test: const { Component } = await import('../components/Component')"
    - "vi.mock next/link to render plain anchor, making href inspectable in jsdom"
    - "Use real caseStudies array for assertions — avoids hardcoded strings drifting from content"
    - "vi.mocked(gsap.matchMedia).mockImplementationOnce() for per-test reduceMotion override"

key-files:
  created:
    - components/WorkSection.test.tsx
    - components/CaseStudyChapters.test.tsx
  modified: []

key-decisions:
  - "Used real caseStudies import for assertions (not hardcoded strings) so tests stay in sync with content changes"
  - "Mocked next/link as plain anchor to make href attribute inspectable in jsdom without next.js routing"
  - "testStudy = caseStudies[0] (AIDA AI) for CaseStudyChapters — 2 keyDecisions provides enough coverage for WORK-04"

patterns-established:
  - "gsap/ScrollTrigger mock: vi.mock('gsap/ScrollTrigger', () => ({ default: { create: vi.fn(), refresh: vi.fn() } }))"
  - "next/link mock with typed props to avoid JSX prop errors in strict TypeScript"

requirements-completed: [WORK-01, WORK-02, WORK-03, WORK-04]

# Metrics
duration: 2min
completed: 2026-03-22
---

# Phase 3 Plan 00: Test Scaffold Summary

**Failing vitest stubs for WorkSection and CaseStudyChapters using real caseStudies data and established gsap/lenis mock pattern — RED baseline for Nyquist compliance**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-22T16:11:29Z
- **Completed:** 2026-03-22T16:12:55Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created WorkSection.test.tsx covering WORK-01 (title/category/stat rendering) and WORK-02 (card links to /work/[id])
- Created CaseStudyChapters.test.tsx covering WORK-03 (four chapters), WORK-04 (keyDecision fields), and A11Y-01 (reduceMotion visibility)
- Confirmed both files fail RED with "Cannot find module" — not syntax errors
- Confirmed existing HeroSection and NavBar tests remain GREEN (2 pass, 2 fail as expected)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create WorkSection test scaffold (WORK-01, WORK-02)** - `362c26d` (test)
2. **Task 2: Create CaseStudyChapters test scaffold (WORK-03, WORK-04)** - `ed035ea` (test)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `components/WorkSection.test.tsx` - Failing tests for card rendering (WORK-01) and link hrefs (WORK-02)
- `components/CaseStudyChapters.test.tsx` - Failing tests for four-chapter render (WORK-03), keyDecision fields (WORK-04), and reduceMotion visibility (A11Y-01)

## Decisions Made

- Used real `caseStudies` import for assertions rather than hardcoded strings — tests stay accurate as content evolves
- Mocked `next/link` as a plain `<a>` element so `href` is directly inspectable in jsdom without Next.js routing infrastructure
- Used `caseStudies[0]` (AIDA AI, 2 keyDecisions) as the CaseStudyChapters fixture — sufficient coverage for WORK-04 with known data

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Both test scaffolds are in place — Plans 01-03 verify commands can now run (they will fail until implementation exists, which is the correct Nyquist baseline)
- WorkSection.tsx and CaseStudyChapters.tsx must be created in subsequent plans to turn these tests GREEN
- No blockers

## Self-Check: PASSED

- FOUND: components/WorkSection.test.tsx
- FOUND: components/CaseStudyChapters.test.tsx
- FOUND: .planning/phases/03-work-section-case-studies/03-00-SUMMARY.md
- FOUND: commit 362c26d (test(03-00): WorkSection scaffold)
- FOUND: commit ed035ea (test(03-00): CaseStudyChapters scaffold)

---
*Phase: 03-work-section-case-studies*
*Completed: 2026-03-22*
