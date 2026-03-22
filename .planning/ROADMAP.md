# Roadmap: Ida Dilfer Tinker Portfolio

## Overview

Four phases: lock the content and build the foundation, then deliver the site from top to bottom — hero first (it validates the animation stack and establishes audience routing), work section second (the core conversion mechanism), About and Contact last (simpler sections that complete the experience). Content authoring and infrastructure setup are bundled into Phase 1 because the entire visual build depends on both being done before any component is touched.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Content authored, project scaffolded, animation infrastructure in place — nothing visual ships but everything that follows depends on this (completed 2026-03-22)
- [ ] **Phase 2: Hero + Routing** - Animated hero live with locked copy and dual audience CTAs — the first craft signal visitors see
- [ ] **Phase 3: Work Section + Case Studies** - Browsable case study grid and full scroll-storytelling case study pages — the core conversion mechanism for both audiences
- [ ] **Phase 4: About + Contact + Launch** - About narrative and contact CTAs complete the site; both conversion paths walkable end-to-end

## Phase Details

### Phase 1: Foundation
**Goal**: The build environment is ready and all content decisions are locked — copy cannot change after this phase without triggering rework
**Depends on**: Nothing (first phase)
**Requirements**: None directly — enabling phase for all requirements
**Success Criteria** (what must be TRUE):
  1. Hero POV headline, credential line, and both audience CTA labels are written and approved — any developer could drop them into markup verbatim
  2. All three case study narratives are structured: problem, key decisions, and measurable outcomes are written for each
  3. About founder narrative is drafted in Ida's voice and approved
  4. Next.js 15 repo runs locally with TypeScript, Tailwind v4, and App Router; `data/case-studies.ts` is typed and populated with Phase 1 content
  5. Animation infrastructure is initialized: GSAP registered, Lenis SmoothScrollProvider mounted, `template.tsx` wired with AnimatePresence — a test page transition fires without errors
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js 15, configure Tailwind v4 @theme tokens, wire animation infrastructure (Lenis + GSAP + Motion + template.tsx)
- [ ] 01-02-PLAN.md — Author and approve all Phase 1 copy: hero, About narrative, and case study narratives in data/case-studies.ts

### Phase 2: Hero + Routing
**Goal**: Visitors land on a site that immediately communicates who Ida is and routes them to their relevant path — with animation that signals craft from the first second
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, A11Y-01
**Success Criteria** (what must be TRUE):
  1. Visitor sees the founder-lens POV headline animate in on load (GSAP SplitText character reveal, completes within 1.5s)
  2. Visitor sees two explicit audience CTAs in the hero ("Looking for a design partner?" and "Hiring?") and can click either to route to path-specific content
  3. Visitor sees the role/credential line (Magna Ventures, AIDA AI, 12 years experience) as an authority signal beneath the headline
  4. Visitor with `prefers-reduced-motion` enabled sees the same content with animations skipped or reduced — nothing is hidden, only motion is suppressed
**Plans**: TBD

### Phase 3: Work Section + Case Studies
**Goal**: Visitors can browse and read richly crafted case studies that demonstrate judgment, not just execution — the primary conversion moment for both consulting clients and hiring managers
**Depends on**: Phase 2
**Requirements**: WORK-01, WORK-02, WORK-03, WORK-04
**Success Criteria** (what must be TRUE):
  1. Visitor sees a visual grid of 3–4 case study cards on the homepage (title, category, thumbnail) with scroll-triggered reveal and hover states
  2. Visitor can click a card and navigate to the full case study page at `/work/[slug]`
  3. On a case study page, the narrative unfolds cinematically as the visitor scrolls — problem, process, and outcomes are revealed through GSAP ScrollTrigger sequencing
  4. Each case study page contains an explicit "Key Decisions" section that shows what was weighed, what was killed, and what constraints shaped the outcome
**Plans**: TBD

### Phase 4: About + Contact + Launch
**Goal**: Both conversion paths are complete — a consulting client can understand Ida's POV and book a call; a hiring manager can read her story and reach out — the site is ready to share
**Depends on**: Phase 3
**Requirements**: ABUT-01, ABUT-02, CONT-01, CONT-02
**Success Criteria** (what must be TRUE):
  1. Visitor reads a founder-lens narrative in the About section written in Ida's own voice (not a credential list or resume bio)
  2. Visitor can download Ida's resume/CV as a PDF from the About section
  3. Consulting-path visitor can book a call via an embedded calendar (Calendly or Cal.com) — reachable from the "design partner" CTA path without hunting
  4. Visitor can navigate to Ida's LinkedIn profile from the site
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-03-22 |
| 2. Hero + Routing | 0/TBD | Not started | - |
| 3. Work Section + Case Studies | 0/TBD | Not started | - |
| 4. About + Contact + Launch | 0/TBD | Not started | - |

