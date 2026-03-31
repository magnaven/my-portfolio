# Ida Dilfer Tinker Portfolio

## What This Is

A personal portfolio site for Ida Dilfer Tinker — lead product designer and founder with 12 years of experience across B2C and B2B products. The site serves two distinct audiences (consulting clients and hiring managers) through explicit entry points, and positions Ida through a founder lens: someone who has sat on both sides of the table and designs like someone who ships and scales. It is not a gallery of work — it is a statement of craft and judgment.

v1.0 shipped 2026-03-31. The full homepage is live: hero, work grid (3 case studies), case study pages (cinematic scroll), About (founder narrative + CV download), and Contact (Cal.com popup + LinkedIn link).

## Core Value

Visitors immediately understand who Ida is, what she believes, and how to engage with her — and self-route to the path most relevant to them (design partner or hire).

## Requirements

### Validated

- ✓ Animated POV headline hero with dual audience entry points — v1.0
- ✓ Role/credential line (Magna Ventures, AIDA AI, 12 years) as authority signal — v1.0
- ✓ Visual work grid with 3 case studies, scroll-triggered reveal — v1.0
- ✓ Individual case study pages at /work/[slug] with cinematic scroll narrative — v1.0
- ✓ Key Decisions sections on case study pages — v1.0
- ✓ About section with founder-lens narrative (Ida's own voice) — v1.0
- ✓ CV/resume PDF download from About section — v1.0
- ✓ Cal.com booking button for consulting path — v1.0
- ✓ LinkedIn link for hiring path — v1.0
- ✓ prefers-reduced-motion respected across all animations — v1.0
- ✓ openGraph title + description metadata — v1.0

### Active (v2 candidates)

- [ ] Mobile-responsive layout — full fidelity on mobile and tablet (TECH-v2-01) ⚠️ Recommended before sharing widely
- [ ] Portrait photo in About section (ABUT-v2-01)
- [ ] Scannable career highlights in About (ABUT-v2-02)
- [ ] General contact email or form for non-consulting inquiries (CONT-v2-01)
- [ ] Lighthouse mobile 90+, LCP under 2.5s, 60 FPS at 4x CPU throttle (TECH-v2-02)
- [ ] OG image for social sharing (TECH-v2-03)
- [ ] Sitemap and structured SEO (TECH-v2-03)

### Out of Scope

- Blog / writing section — dilutes focus; not core to either audience's decision
- CMS for case study updates — content is stable; developer updates are fine
- Mobile app — web-first; mobile is a v2 consideration
- Multi-language / localization — English only
- Analytics integration — nice-to-have, not a current priority
- Skills / tools list — active anti-feature for senior roles; omitted intentionally
- Password protection — blocks both audiences; explicitly excluded

## Context

- Ida is a founding member of Magna Ventures, a product design consultancy
- Currently working at AIDA AI, an AI-powered patient coordination platform
- 12 years of experience across B2C and B2B products
- Two target audiences with different intents:
  - **Consulting clients**: Startups and scale-ups needing a senior design partner — assess strategic value and working style
  - **Hiring managers**: Product-led companies — assess craft, range, and cultural fit
- Tone: Authoritative but warm — sharp point of view, not a gallery

**Current codebase state (v1.0):**
- 1,420 LOC TypeScript/TSX
- Stack: Next.js 15 (App Router, Turbopack), React 19, Tailwind v4, GSAP 3.14, Lenis, Motion, vitest
- 26 tests passing, TypeScript clean
- 3 case studies: all real content authored in Phase 1

**Before-launch content actions (outstanding):**
- Update `content/contact.ts` calLink with real Cal.com event slug
- Update `content/contact.ts` linkedInUrl with real LinkedIn URL
- Place CV PDF at `public/ida-dilfer-tinker-cv.pdf`

## Constraints

- **No tech preference**: Stack chosen for what best serves design and animation goals
- **No CMS required**: Ida does not need to self-update case studies without a developer
- **Content**: All case study content authored in Phase 1 — stable

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Founder lens POV (not pure design-craft or strategy-consultant framing) | Most authentic to Ida's dual role as designer + founder/consultant | ✓ Good — distinctive positioning |
| Two explicit audience entry points (not one-voice-fits-all) | Consulting clients and hiring managers have meaningfully different intents | ✓ Good — clear paths, no ambiguity |
| 3 rich case studies over quantity | Depth signals judgment and strategic thinking better than breadth | ✓ Good — each study is substantial |
| Bold animated hero + micro-interactions | Portfolio sites compete visually; animation signals craft immediately | ✓ Good — strong first impression |
| Single RAF loop: Lenis driven by gsap.ticker | Prevents double-tick jank; one animation loop for the whole page | ✓ Good — smooth throughout |
| Tailwind v4 @theme tokens (no config file) | v4 convention; keeps tokens in CSS where they belong | ✓ Good — clean setup |
| TDD wave-0 pattern: failing stubs before components | Enforced discipline; tests stayed honest across all phases | ✓ Good — 0 test regressions |
| Cal.com popup over Calendly embed | Avoids iframe sizing and z-index issues | ✓ Good — cleaner UX |
| content/ vs data/ directory split | content/ = authored copy; data/ = typed structured data | ✓ Good — clear mental model |

---
*Last updated: 2026-03-31 after v1.0 milestone*
