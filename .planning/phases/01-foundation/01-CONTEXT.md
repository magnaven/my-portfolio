# Phase 1: Foundation - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Content authored, project scaffolded, animation infrastructure initialized. No visible UI ships from this phase. Phase delivers: (1) all copy locked and ready to drop into markup, and (2) a running Next.js 15 repo with Tailwind v4, TypeScript, App Router, typed case study data, and animation infrastructure (GSAP + Motion + Lenis + template.tsx) initialized.

</domain>

<decisions>
## Implementation Decisions

### Hero copy direction
- Register: declarative statement — confident, no hedging
- Core claim: founder perspective — lived experience building products, leading teams, moving metrics, understanding 0-to-1
- Structure: states Ida's identity (not visitor's outcome) — visitor projects their need onto it
- Headline direction: something in the register of "I've built products from zero. I design like I still own it."
- Credential line format: Role → Company → Tenure (scannable, signal-dense)
  - Pattern: "Lead Product Designer · Magna Ventures · AIDA AI · 12 years"

### Case study selection and structure
- Projects: Ida has already decided which 3–4 projects to feature
- Template: consistent narrative structure across all studies (problem → process → key decisions → outcomes)
- Depth in Phase 1: full draft — complete narrative written and approved before build starts; Phases 3+ can drop it straight in
- Raw material: mixed — some projects have existing decks/screenshots/write-ups, others need to be written from scratch

### Visual foundation
- Typography: editorial serif headline + clean sans body
  - Headline: something in the register of Freight Display, Playfair Display, or equivalent high-quality serif
  - Body: Inter, DM Sans, or equivalent clean geometric sans
- Color palette: near-black + warm white + one accent (terracotta / burnt sienna)
  - Background: light primary — white or warm off-white
  - Accent: terracotta / burnt sienna — creative, distinctive, human, stands out from blue/grey portfolio sea
- These token decisions go into Tailwind v4 @theme in Phase 1 scaffolding — locked before any component work

### About narrative angle
- Structure: current state + belief — who Ida is now, what she believes about design, forward-looking not retrospective
- Personal/professional balance: balanced — person and professional woven together equally
- Audience handling: one voice, both read it — single narrative that consulting clients and hiring managers each find what they need in

### Claude's Discretion
- Exact headline wording (direction is locked: declarative, founder-perspective, Ida's identity — Claude writes the actual line)
- Specific font selection within the agreed category (editorial serif headline + clean sans body)
- Exact color values for terracotta accent and off-white background (within the agreed palette direction)
- Tailwind @theme token naming conventions
- Animation infrastructure specifics (Lenis config, GSAP plugin registration order)

</decisions>

<specifics>
## Specific Ideas

- Hero headline register reference: "I've built products from zero. I design like I still own it." — not final copy, directional
- Credential line: "Lead Product Designer · Magna Ventures · AIDA AI · 12 years" — use dot separators, not slashes or pipes
- Case study content: Ida has existing decks and materials for some projects (mixed readiness) — content authoring task should account for varying levels of raw material
- Typography feel: "authoritative but warm" — the serif should feel editorial and confident, not academic or decorative
- Terracotta accent: signals creative design sensibility, distinctly human — contrasts against a sea of blue/grey/black portfolios

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None yet — patterns will be established in this phase

### Integration Points
- Phase 1 scaffold must produce:
  - `data/case-studies.ts` — typed CaseStudy interface, populated with Phase 1 content
  - `app/template.tsx` (not layout.tsx) — required for animated page transitions in App Router
  - `providers/SmoothScrollProvider.tsx` — Lenis initialized and wired to GSAP ticker
  - `app/globals.css` — Tailwind v4 @theme with typography and color tokens
  - All subsequent phases consume these artifacts; no structural refactoring expected

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-21*
