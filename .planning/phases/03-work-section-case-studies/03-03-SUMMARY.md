---
phase: 03-work-section-case-studies
plan: "03"
subsystem: case-study-pages
tags: [gsap, scroll-animation, case-study, tdd, components]
dependency_graph:
  requires: [03-01, 03-02]
  provides: [case-study-cinematic-scroll, decision-card, outcome-stat, case-study-hero]
  affects: [app/work/[slug]/page.tsx]
tech_stack:
  added: []
  patterns: [gsap-matchMedia-reduceMotion-guard, ScrollTrigger-pin-per-chapter, ScrollTrigger-refresh-rAF]
key_files:
  created:
    - components/DecisionCard.tsx
    - components/OutcomeStat.tsx
    - components/CaseStudyHero.tsx
    - components/CaseStudyChapters.tsx
  modified:
    - app/work/[slug]/page.tsx
    - components/CaseStudyChapters.test.tsx
decisions:
  - "Pre-existing TS type error in test mock (vi.mocked matchMedia not satisfying MatchMedia return type) fixed with 'as any' cast — runtime behaviour unchanged, all 9 tests pass"
metrics:
  duration: "~2 min"
  completed_date: "2026-03-22"
  tasks_completed: 2
  files_created: 4
  files_modified: 2
---

# Phase 03 Plan 03: Cinematic Case Study Scroll Narrative Summary

**One-liner:** GSAP pinned chapter scroll narrative (Problem, Process, Key Decisions, Outcomes) with vertical progress bar, DecisionCard (✗/⚠/✓ contrast), OutcomeStat (display font stat callouts), and CaseStudyHero (results-first above-fold) wired into all three published case study pages.

## What Was Built

### Task 1: DecisionCard, OutcomeStat, CaseStudyHero (commit: 9a8b24b)

Three pure-presentational components:

- **DecisionCard** (`components/DecisionCard.tsx`) — Props: `{ decision: KeyDecision }`. Card with border/rounded/p-6. Three rows with prefix icons: ✗ Killed (text-ink/30, line-through), ⚠ Constraint (text-ink/50), ✓ Chosen (text-accent font-semibold, dominant). `chapter-line` on each row for GSAP stagger targeting.
- **OutcomeStat** (`components/OutcomeStat.tsx`) — Props: `{ outcome: Outcome }`. metric in font-sans text-xs uppercase tracking-widest text-ink/40, result in font-display text-4xl. Both have `chapter-line`.
- **CaseStudyHero** (`components/CaseStudyHero.tsx`) — Props: `{ study: CaseStudy }`. Not `"use client"` — server component. min-h-[60vh] flex items-end pb-24. category (text-sm uppercase), title (text-7xl font-display), outcomes[0].result in text-accent text-3xl, outcomes[0].metric in text-ink/50.

### Task 2: CaseStudyChapters + /work/[slug] page (commit: 7500eb4)

- **CaseStudyChapters** (`components/CaseStudyChapters.tsx`) — `"use client"`. Uses `useGSAP` + `gsap.matchMedia()` with `reduceMotion` guard. In motion mode: `ScrollTrigger.create` per `.chapter` element (pin:true, end:"+=200%", onEnter stagger `.chapter-line` children autoAlpha/y). Progress bar `ScrollTrigger` on `.chapters-container` (`onUpdate: scaleY`). Separate `useEffect` with `requestAnimationFrame(() => ScrollTrigger.refresh())` for Pitfall 3 fix.
- Fixed pre-existing TypeScript error in test file mock (type cast to `any` for `vi.mocked(gsap.matchMedia).mockImplementationOnce`).
- **app/work/[slug]/page.tsx** — Replaced temporary placeholder with `<CaseStudyHero study={study} />` + `<CaseStudyChapters study={study} />`. `generateStaticParams` and `await params` pattern preserved.

## Verification

- All 18 tests GREEN (4 test files: NavBar, HeroSection, WorkSection, CaseStudyChapters)
- TypeScript clean (`npx tsc --noEmit` no errors)
- CaseStudyChapters.test.tsx: 9 tests covering WORK-03 (4 chapters render), WORK-04 (decision card fields), A11Y-01 (reduceMotion renders content visibly)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed pre-existing TypeScript mock type error in CaseStudyChapters.test.tsx**
- **Found during:** Task 2 verification (TypeScript clean check)
- **Issue:** `vi.mocked(gsap.matchMedia).mockImplementationOnce(...)` — the mock's `add()` returning `void` doesn't satisfy GSAP's `MatchMedia` return type. This was a pre-existing error in the test file written during Plan 02 — it just became visible once `CaseStudyChapters.tsx` existed.
- **Fix:** Added `as any` type cast and typed the callback parameter explicitly
- **Files modified:** `components/CaseStudyChapters.test.tsx`
- **Commit:** 7500eb4

## Self-Check: PASSED

All created files exist on disk. Both task commits (9a8b24b, 7500eb4) confirmed in git log. 18/18 tests pass. TypeScript clean.
