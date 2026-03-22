---
phase: 3
slug: work-section-case-studies
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 4.1.0 + @testing-library/react 16.3.2 |
| **Config file** | `vitest.config.ts` (root) |
| **Quick run command** | `npx vitest run` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-W0-01 | W0 | 0 | WORK-01, WORK-02 | unit | `npx vitest run components/WorkSection.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 3-W0-02 | W0 | 0 | WORK-03, WORK-04 | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 3-01-01 | 01 | 1 | WORK-01 | unit | `npx vitest run components/WorkSection.test.tsx` | ❌ W0 | ⬜ pending |
| 3-01-02 | 01 | 1 | WORK-01 | unit | `npx vitest run components/WorkSection.test.tsx` | ❌ W0 | ⬜ pending |
| 3-01-03 | 01 | 1 | WORK-02 | unit | `npx vitest run components/WorkSection.test.tsx` | ❌ W0 | ⬜ pending |
| 3-02-01 | 02 | 2 | WORK-03 | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ W0 | ⬜ pending |
| 3-02-02 | 02 | 2 | WORK-03 | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ W0 | ⬜ pending |
| 3-02-03 | 02 | 2 | WORK-04 | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ W0 | ⬜ pending |
| 3-02-04 | 02 | 2 | WORK-04 | unit | `npx vitest run components/CaseStudyChapters.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Note on GSAP in tests:** All GSAP imports must be mocked at `vi.mock` level — use the established pattern from `HeroSection.test.tsx` and `NavBar.test.tsx`. Mock `gsap`, `gsap/ScrollTrigger`, and `lenis/react`. Tests verify DOM structure and content only, not animation behaviour.

**Note on generateStaticParams:** Build-time server function — not tested with vitest/jsdom. Verification is `next build` succeeding.

---

## Wave 0 Requirements

- [ ] `components/WorkSection.test.tsx` — stubs for WORK-01, WORK-02
- [ ] `components/CaseStudyChapters.test.tsx` — stubs for WORK-03, WORK-04

Shared mocking pattern is established — new test files follow the `vi.mock("gsap", ...)` pattern from `HeroSection.test.tsx` verbatim.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Scroll-triggered card reveal animations on homepage | WORK-01 | GSAP ScrollTrigger requires real browser/DOM with scroll | Load homepage, scroll to Work section, verify cards animate in sequentially |
| Card hover states | WORK-01 | CSS :hover requires real browser interaction | Hover each card, verify scale/overlay transition |
| Case study page cinematic scroll sequencing | WORK-03 | GSAP pin + scrub requires real scroll context | Navigate to a case study, scroll slowly, verify chapters reveal in sequence |
| Lenis smooth scroll reset on navigation | WORK-03 | Scroll position depends on real browser state | Navigate homepage → case study → back, verify no stale scroll position |
| Page transition (template.tsx) interaction with pinned elements | WORK-03 | Edge case: `y` transform on motion.div may shift pin anchor | Enter case study page mid-transition, verify pin positions are correct |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
