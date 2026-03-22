---
phase: 2
slug: hero-routing
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (Wave 0 installs) |
| **Config file** | vitest.config.ts — Wave 0 creates |
| **Quick run command** | `npx vitest run` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Visual check in `npm run dev` browser
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual inspection
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 0 | HERO-01, HERO-02, HERO-03 | unit stub | `npx vitest run components/HeroSection.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-02 | 01 | 0 | A11Y-01 | unit stub | `npx vitest run components/NavBar.test.tsx` | ❌ W0 | ⬜ pending |
| 2-02-01 | 02 | 1 | HERO-01 | unit | `npx vitest run components/HeroSection.test.tsx` | ❌ W0 | ⬜ pending |
| 2-02-02 | 02 | 1 | HERO-02 | unit (mock) | `npx vitest run components/HeroSection.test.tsx` | ❌ W0 | ⬜ pending |
| 2-02-03 | 02 | 1 | HERO-03 | unit | `npx vitest run components/HeroSection.test.tsx` | ❌ W0 | ⬜ pending |
| 2-02-04 | 02 | 1 | A11Y-01 | manual | DevTools "Emulate prefers-reduced-motion: reduce" | manual-only | ⬜ pending |
| 2-03-01 | 03 | 1 | A11Y-01 | unit | `npx vitest run components/NavBar.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event jsdom` — install test framework
- [ ] `vitest.config.ts` — configure with jsdom environment
- [ ] `components/HeroSection.test.tsx` — stubs for HERO-01, HERO-02, HERO-03
- [ ] `components/NavBar.test.tsx` — stub for A11Y-01 render check
- [ ] `__mocks__/lenis-react.ts` (or similar) — mock `useLenis` so GSAP/Lenis don't run in jsdom

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| With `prefers-reduced-motion`, all elements render at opacity:1 with no GSAP animations running | A11Y-01 | GSAP animation state cannot be reliably unit tested without full mock infrastructure | Open Chrome DevTools → Rendering tab → Emulate CSS media feature: `prefers-reduced-motion: reduce` → reload page → verify content visible immediately, no character-by-character reveal |
| Animation sequence completes within 1.5s on load | HERO-01 | Timing is visual; no reliable unit test for animation duration | Open browser with no motion override → observe headline reveal, credential fade, CTA fade — sequence should complete within 1.5s |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
