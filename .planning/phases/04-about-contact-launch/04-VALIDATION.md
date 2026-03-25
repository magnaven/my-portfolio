---
phase: 4
slug: about-contact-launch
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest + @testing-library/react (jsdom) |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-W0-01 | W0 | 0 | ABUT-01, ABUT-02 | unit stub | `npx vitest run --reporter=verbose components/AboutSection.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 4-W0-02 | W0 | 0 | CONT-01, CONT-02 | unit stub | `npx vitest run --reporter=verbose components/ContactSection.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 4-01-01 | 01 | 1 | ABUT-01 | unit | `npx vitest run --reporter=verbose components/AboutSection.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 4-01-02 | 01 | 1 | ABUT-02 | unit | `npx vitest run --reporter=verbose components/AboutSection.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 4-02-01 | 02 | 1 | CONT-01 | unit | `npx vitest run --reporter=verbose components/ContactSection.test.tsx` | ❌ Wave 0 | ⬜ pending |
| 4-02-02 | 02 | 1 | CONT-02 | unit | `npx vitest run --reporter=verbose components/ContactSection.test.tsx` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `components/AboutSection.test.tsx` — stubs for ABUT-01, ABUT-02
- [ ] `components/ContactSection.test.tsx` — stubs for CONT-01, CONT-02

**Mock requirements (established pattern from WorkSection.test.tsx):**
- Mock `gsap`, `gsap/ScrollTrigger` — same vi.mock stubs as WorkSection.test.tsx
- Mock `@calcom/embed-react` — `vi.mock("@calcom/embed-react", () => ({ getCalApi: vi.fn(async () => vi.fn()) }))`

*Existing test infrastructure (vitest.config.ts) already covers this phase — only new test files needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Cal.com popup opens on "Book a call" click | CONT-01 | External service integration; jsdom cannot test popup lifecycle | Click "Book a call" button in browser, verify Cal.com popup appears |
| Resume PDF downloads/opens in new tab | ABUT-02 | File system dependency (PDF must be provided by Ida) | Click "Download CV", verify PDF opens in new tab |
| LinkedIn link opens correct profile | CONT-02 | External URL verification | Click "View LinkedIn", verify correct profile URL |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
