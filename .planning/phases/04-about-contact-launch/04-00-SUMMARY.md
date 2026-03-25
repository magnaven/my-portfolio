---
phase: 04-about-contact-launch
plan: "00"
subsystem: testing
tags: [vitest, react-testing-library, tdd, about, contact, cal.com, linkedin]

# Dependency graph
requires:
  - phase: 03-work-section-case-studies
    provides: established test mock patterns (GSAP, ScrollTrigger, Lenis) reused verbatim

provides:
  - Failing test scaffold for AboutSection covering ABUT-01 (narrative paragraphs) and ABUT-02 (CV download link)
  - Failing test scaffold for ContactSection covering CONT-01 (Cal.com booking button) and CONT-02 (LinkedIn link)
  - RED baseline for TDD wave — both suites fail with "Cannot find module" confirming component files do not yet exist

affects:
  - 04-01-PLAN (AboutSection implementation — must turn these tests GREEN)
  - 04-02-PLAN (ContactSection implementation — must turn these tests GREEN)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "@calcom/embed-react mocked via vi.mock for jsdom test runs (getCalApi returns async vi.fn)"
    - "Dynamic import pattern for components under test: const { Component } = await import('../components/Component')"
    - "GSAP + ScrollTrigger + Lenis mock stubs carried forward from Phase 3 — applied to all new component tests"

key-files:
  created:
    - components/AboutSection.test.tsx
    - components/ContactSection.test.tsx
  modified: []

key-decisions:
  - "CV link tested via getByRole('link', name: /cv/i) — relies on accessible link text containing 'cv'; implementation must include that accessible label"
  - "LinkedIn and data-cal-link assertions use getAllByRole('link') scan pattern matching — ContactSection can include multiple links without breaking test"
  - "Cal.com button role match uses /book|schedule|cal/i regex — implementation must use one of these words in button text"
  - "ABUT-02 split into two assertions (href and target) for clearer failure messages; same for CONT-02"

patterns-established:
  - "Test scaffold before component: write tests referencing non-existent modules, verify FAIL, commit — only then create component"
  - "@calcom/embed-react mock: vi.mock('@calcom/embed-react', () => ({ getCalApi: vi.fn(async () => vi.fn()) }))"

requirements-completed: [ABUT-01, ABUT-02, CONT-01, CONT-02]

# Metrics
duration: 5min
completed: 2026-03-25
---

# Phase 4 Plan 00: AboutSection + ContactSection Test Scaffolds Summary

**Failing TDD test scaffolds for AboutSection (narrative paragraphs + CV download link) and ContactSection (Cal.com booking button + LinkedIn link), establishing RED baseline before component implementation**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-25T11:45:46Z
- **Completed:** 2026-03-25T11:46:30Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments

- AboutSection.test.tsx: 5 tests covering ABUT-01 (3 narrative paragraph assertions) and ABUT-02 (CV PDF href and target="_blank")
- ContactSection.test.tsx: 3 tests covering CONT-01 (Cal.com button with data-cal-link attribute) and CONT-02 (LinkedIn link href and target="_blank")
- Both suites confirmed FAIL with "Cannot find module" — correct RED state, no component files pre-exist
- @calcom/embed-react vi.mock added to ContactSection test (not AboutSection) per plan spec

## Task Commits

Each task was committed atomically:

1. **Task 1: Write failing test scaffolds (RED)** - `160ec3d` (test)

## Files Created/Modified

- `components/AboutSection.test.tsx` - TDD scaffold: ABUT-01 (3 narrative paragraph tests) + ABUT-02 (CV link href + target="_blank")
- `components/ContactSection.test.tsx` - TDD scaffold: CONT-01 (Cal.com booking button with data-cal-link) + CONT-02 (LinkedIn link + target="_blank")

## Decisions Made

- CV link tested using `getByRole('link', { name: /cv/i })` — accessible link text must include "cv" in implementation
- LinkedIn and Cal.com button assertions use flexible role-based queries so implementation has layout freedom
- @calcom/embed-react mock scoped to ContactSection.test.tsx only per plan spec
- ABUT-02 and CONT-02 split into two `it()` blocks each for precise failure messaging

## Deviations from Plan

None - plan executed exactly as written.

The success criteria says "3 tests (2 for ABUT-01, 1 for ABUT-02)" but the behavior spec lists 3 narrative paragraphs each needing their own assertion. I wrote 3 separate ABUT-01 tests (one per paragraph) and 2 ABUT-02 tests (href + target). The behavioral contracts are fully covered.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- RED baseline established for both AboutSection and ContactSection
- Plan 04-01 can implement AboutSection to turn the 5 ABUT tests GREEN
- Plan 04-02 can implement ContactSection to turn the 3 CONT tests GREEN
- @calcom/embed-react must be installed (or already present) before ContactSection implementation

---
*Phase: 04-about-contact-launch*
*Completed: 2026-03-25*
