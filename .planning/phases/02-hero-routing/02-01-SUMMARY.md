---
phase: 02-hero-routing
plan: "01"
subsystem: testing
tags: [vitest, react-testing-library, jsdom, gsap, lenis, tdd]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js + GSAP + Lenis infrastructure that tests will exercise
provides:
  - vitest configured with jsdom environment and React plugin
  - Failing stub tests for HeroSection (HERO-01, HERO-02, HERO-03, A11Y-01)
  - Failing stub test for NavBar (A11Y-01)
  - GSAP and Lenis mocks for jsdom compatibility
affects: [02-hero-routing, 02-02, 02-03]

# Tech tracking
tech-stack:
  added: [vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/user-event, jsdom]
  patterns: [vi.mock for browser-API-dependent libraries, dynamic import in tests for lazy module loading]

key-files:
  created:
    - vitest.config.ts
    - components/HeroSection.test.tsx
    - components/NavBar.test.tsx
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "vitest with jsdom chosen over jest — matches Vite ecosystem and works natively with vitejs/plugin-react"
  - "GSAP and Lenis mocked at vi.mock level to prevent canvas/RAF errors in jsdom"
  - "Dynamic imports in test files (await import('../components/HeroSection')) — allows stubs to fail on missing module before component exists"

patterns-established:
  - "Test files live in components/ directory alongside source files"
  - "GSAP mock pattern: mock default export with all used methods (registerPlugin, matchMedia, set, timeline)"
  - "Lenis mock pattern: mock useLenis from lenis/react returning scrollTo fn"

requirements-completed: [HERO-01, HERO-02, HERO-03, A11Y-01]

# Metrics
duration: 5min
completed: 2026-03-22
---

# Phase 2 Plan 01: Hero Routing — Vitest Infrastructure + Failing Test Stubs Summary

**Vitest configured with jsdom environment, 5 failing stub tests covering HERO-01/02/03 and A11Y-01, with GSAP and Lenis mocked for browser-API-free test runs**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-22T14:53:17Z
- **Completed:** 2026-03-22T14:58:00Z
- **Tasks:** 1
- **Files modified:** 5

## Accomplishments
- vitest.config.ts installed with jsdom environment and @vitejs/plugin-react
- HeroSection.test.tsx has 4 stub tests covering all hero requirements (HERO-01, HERO-02, HERO-03, A11Y-01)
- NavBar.test.tsx has 1 stub test for nav render check (A11Y-01)
- GSAP and Lenis mocked — no canvas or missing DOM API errors in jsdom
- Tests confirmed red: "Failed to resolve import" errors for both missing component files

## Task Commits

Each task was committed atomically:

1. **Task 1: Install vitest and write failing test stubs** - `7f73665` (test)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified
- `vitest.config.ts` - Vitest config with jsdom environment, React plugin, and @ path alias
- `components/HeroSection.test.tsx` - 4 stub tests: heading, CTA buttons, credential line, scroll indicator
- `components/NavBar.test.tsx` - 1 stub test: site name and nav link presence
- `package.json` - Added vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/user-event, jsdom to devDependencies
- `package-lock.json` - Updated lockfile

## Decisions Made
- Used `vi.mock("gsap")` with a full mock of the default export so the GSAP matchMedia + timeline chain used in animations doesn't trigger DOM errors in jsdom
- Dynamic imports (`await import(...)`) in test bodies allow stubs to reference components that don't exist yet — the test file is valid but the test itself fails at import time
- Test files placed in `components/` alongside source files for co-location

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Test infrastructure is ready; `npx vitest run` executes without config errors
- 5 stub tests are failing red — exactly the TDD baseline needed before Wave 1 component implementation
- Wave 1 (02-02) can now implement HeroSection and NavBar against these stubs and turn them green

## Self-Check: PASSED

All created files verified present on disk. Task commit `7f73665` confirmed in git log.

---
*Phase: 02-hero-routing*
*Completed: 2026-03-22*
