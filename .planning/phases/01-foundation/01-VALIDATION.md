---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-21
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript static analysis + Next.js build (no unit test framework required for scaffold phase) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~5 seconds (tsc) / ~30 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green + manual content review with Ida completed
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | INFRA-01 | smoke | `npm run build` | ❌ Wave 0 | ⬜ pending |
| 1-01-02 | 01 | 0 | INFRA-02 | static | `npx tsc --noEmit` | ❌ Wave 0 | ⬜ pending |
| 1-01-03 | 01 | 1 | INFRA-03 | static | `npx tsc --noEmit` | ❌ Wave 0 | ⬜ pending |
| 1-01-04 | 01 | 1 | INFRA-04 | manual | browser smoke test | manual-only | ⬜ pending |
| 1-02-01 | 02 | 1 | CONTENT-01 | manual | review session with Ida | manual-only | ⬜ pending |
| 1-02-02 | 02 | 1 | CONTENT-02 | manual | review session with Ida | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Scaffold Next.js 15 repo with TypeScript — enables `npx tsc --noEmit` gate
- [ ] `package.json` build script — enables `npm run build` gate
- [ ] No separate test framework needed — TypeScript + build check covers Phase 1 requirements

*Existing infrastructure: none (greenfield project). Wave 0 creates all infrastructure.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Page transition fires without errors | INFRA-04 | Requires browser; no headless browser configured in Phase 1 | Navigate between pages in `npm run dev`, confirm fade animation fires, check console for errors |
| Hero copy written and approved | CONTENT-01 | Approval requires Ida's sign-off; cannot be automated | Review hero copy doc with Ida; confirm headline, credential line, and CTA labels are final |
| All case study narratives complete | CONTENT-02 | Content approval requires Ida's sign-off | Review all three case studies for problem/decisions/outcomes; confirm no TODO placeholders |
| About narrative drafted and approved | CONTENT-03 | Voice/tone approval requires Ida's judgment | Review about narrative with Ida; confirm it serves both consulting clients and hiring managers |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
