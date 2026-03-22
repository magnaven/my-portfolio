---
phase: 03-work-section-case-studies
plan: "01"
subsystem: ui
tags: [react, nextjs, gsap, tailwind, typescript, vitest]

# Dependency graph
requires:
  - phase: 02-hero-routing
    provides: GSAP/Lenis infrastructure, useGSAP pattern, gsap.matchMedia() reduceMotion guard
  - phase: 01-foundation
    provides: CaseStudy interface in data/case-studies.ts, Tailwind v4 @theme tokens
provides:
  - WorkSection component with GSAP stagger scroll reveal
  - CaseStudyCard component with hover state and Link navigation
  - app/work/[slug]/page.tsx dynamic route with generateStaticParams
  - Homepage #work section wired with real case study data
affects: [03-work-section-case-studies-plan-03, future work page content]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - gsap.matchMedia() with reduceMotion guard (reused from Phase 2)
    - Next.js async params pattern (await params for Next.js 15+ compliance)
    - generateStaticParams for pre-rendering dynamic routes
    - CSS group-hover pattern for hover states without JS

key-files:
  created:
    - components/CaseStudyCard.tsx
    - components/WorkSection.tsx
    - app/work/[slug]/page.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "CaseStudyCard uses CSS group-hover (not JS state) for hover — pure presentational, no 'use client' needed"
  - "WorkSection is 'use client' (needs useRef + useGSAP); CaseStudyCard stays server-side"
  - "app/work/[slug]/page.tsx uses temporary placeholder body — Plan 03 replaces with cinematic scroll content"
  - "Pre-existing CaseStudyChapters.test.tsx TypeScript errors are out of scope (Plan 03 stub, not caused by this plan)"

patterns-established:
  - "Card layout: horizontal flex, title left (flex-1), meta right (shrink-0) — consistent with design context doc"
  - "case-study-card className on outermost element for GSAP targeting"

requirements-completed: [WORK-01, WORK-02]

# Metrics
duration: 15min
completed: 2026-03-22
---

# Phase 3 Plan 01: Work Section Case Studies Summary

**Homepage case study grid with scroll-triggered stagger reveal (WorkSection + CaseStudyCard) and /work/[slug] dynamic route shell using Next.js 15+ async params pattern**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-22T16:00:00Z
- **Completed:** 2026-03-22T16:15:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- WorkSection renders all 3 published case studies with GSAP stagger reveal and gsap.matchMedia() reduceMotion guard
- CaseStudyCard shows title (Playfair Display), category, first outcome stat, and hover state (terracotta tint + "Read case study →") via CSS group-hover
- /work/[slug]/page.tsx dynamic route with generateStaticParams for all 3 published slugs and proper Next.js 15+ async params
- WorkSection test suite fully GREEN (4 tests passing)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build CaseStudyCard and WorkSection components** - `dd7ca11` (feat)
2. **Task 2: Wire WorkSection into page.tsx and create /work/[slug] dynamic route** - `9557b7d` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `components/CaseStudyCard.tsx` - Individual card with title, category, outcome stat, hover state, Link wrapper
- `components/WorkSection.tsx` - 'use client' component filtering published studies, GSAP stagger animation
- `app/work/[slug]/page.tsx` - Server Component dynamic route, generateStaticParams, temporary placeholder body
- `app/page.tsx` - Replaced #work stub with `<WorkSection />`

## Decisions Made
- CaseStudyCard uses CSS `group-hover` pattern (no "use client") — hover state handled entirely in Tailwind, keeping it a pure Server Component
- WorkSection containerRef scopes useGSAP to avoid GSAP selector leaking outside the section
- Dynamic route uses `await params` as required by Next.js 15+

## Deviations from Plan

None — plan executed exactly as written.

Pre-existing `CaseStudyChapters.test.tsx` TypeScript errors noted but out of scope (Plan 03 stub already present in repo, not caused by this plan's changes).

## Issues Encountered
- `CaseStudyChapters.test.tsx` was already in the repo as a Plan 03 stub and causes TypeScript errors. These are pre-existing and out of scope per deviation Rule SCOPE BOUNDARY. No fix applied. Will be resolved when Plan 03 creates the component.

## Next Phase Readiness
- WorkSection and CaseStudyCard ready for visual QA in browser
- /work/[slug]/page.tsx ready for Plan 03 to replace placeholder with cinematic scroll content
- All 3 published case study routes pre-rendered via generateStaticParams

---
*Phase: 03-work-section-case-studies*
*Completed: 2026-03-22*
