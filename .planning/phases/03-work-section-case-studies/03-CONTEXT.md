# Phase 3: Work Section + Case Studies - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Case study grid section on the homepage + individual full-page scroll narratives at `/work/[slug]`. This is the primary conversion moment for both consulting clients and hiring managers. Phase delivers: a full-width stacked list of case study cards with scroll-triggered reveals, and per-case-study pages with GSAP pinned-section scroll storytelling, decision cards, and large stat outcome callouts. No About or Contact sections in this phase.

</domain>

<decisions>
## Implementation Decisions

### Grid card design
- Typography-dominant — no thumbnail image, no colour block; the large Playfair Display title IS the visual
- Full-width stacked list layout: each card is a horizontal strip spanning full width, title on the left, category + one punchy outcome stat on the right
- Info shown per card: title (large, display font) + category label + first outcome stat (e.g. "32% lift in conversions")
- Hover state: subtle terracotta background tint + a → arrow or "Read case study" label appears
- Cards scroll-triggered: stagger in as the #work section enters the viewport (consistent with GSAP animation language)

### Cinematic scroll structure (case study pages)
- Pinned sections — each chapter (Problem, Process, Key Decisions, Outcomes) pins to the viewport while its content animates in, then unpins and the next chapter takes over
- Animation within each pinned section: line-by-line fade up with short stagger — consistent with hero headline animation style, but gentler
- Progress indicator: subtle vertical progress bar on the side edge of the viewport, fills as visitor scrolls through chapters
- `prefers-reduced-motion`: skip all GSAP animations, render all content at final visible state immediately (consistent with Phase 2 pattern)

### Case study page hero (above the scroll narrative)
- Shows: title + category + first outcome stat
- Results-first framing — visitor sees what was achieved before reading how; confident, not coy

### Case study page layout
- Contained narrow column: ~640–720px, centred in the viewport — editorial long-form article feel
- Key Decisions section: decision cards with ✗/✓ visual contrast
  - Each card shows: "What was weighed" as header, then ✗ Killed (muted/de-emphasised), ⚠ Constraint, ✓ Chosen (terracotta accent on the chosen path)
  - Cards stagger-animate in when the Key Decisions section pins
- Outcomes section: large stat callouts — metric as small label, result as large display-font number/statement

### Case study navigation
- The site NavBar (already wired in `layout.tsx`) persists on all case study pages — no new navigation component needed
- On case study pages, nav is always solid from the top (no transparent-to-solid behaviour — no hero to be transparent over)
- End of case study: "Next: [Title] →" link cycles to the next case study in the array; wraps around to first after last
- No separate floating back button — the persistent nav covers the return path

### Claude's Discretion
- Exact pinning scroll distance per chapter (how many viewport-heights of scroll each pin occupies)
- Exact stagger timing for line-by-line reveals on case study pages
- Progress bar width, colour, and position (left vs. right edge)
- Card hover transition duration and terracotta tint opacity
- Spacing and padding within decision cards
- Whether the outcome stat on the card is the first `outcomes[0].result` verbatim or a shorter derived version

</decisions>

<specifics>
## Specific Ideas

- Typography-dominant cards should feel confident, not sparse — the title should be large enough to fill the card area meaningfully; the category + outcome line at the bottom grounds it
- Decision cards: the contrast between "killed" (muted, perhaps strikethrough) and "chosen" (terracotta) should make the judgment visible at a glance — this is the section that differentiates Ida from a typical design portfolio
- Pinned sections: each chapter should feel like a deliberate beat, not a gimmick — the pin duration should be long enough to read comfortably, short enough not to feel slow
- The scroll narrative should feel like reading a well-structured case interview answer: context → approach → tradeoffs → outcome

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `data/case-studies.ts` — `caseStudies: CaseStudy[]` array with 3 studies (AIDA AI, Connectd, VCCP); interface locked with `id`, `title`, `category`, `problem`, `process`, `keyDecisions[]`, `outcomes[]`, `status` — import directly, do not restructure
- `components/NavBar.tsx` — already wired in `layout.tsx` inside `SmoothScrollProvider`; persists across all pages including case study routes; handles solid state automatically when not over a hero
- `providers/SmoothScrollProvider.tsx` — Lenis + GSAP ticker wired; `gsap.registerPlugin(ScrollTrigger, useGSAP)` already done — import `ScrollTrigger` directly in case study components
- `content/hero.ts` — pattern for content separation; case study data is already in `data/` not `content/` (correct — it's structured data, not authored prose)

### Established Patterns
- Tailwind v4 `@theme` tokens: `text-ink`, `bg-canvas`, `text-accent`, `bg-accent`, `font-display` (Playfair Display), `font-sans` (DM Sans) — use throughout; do not hardcode colours
- `useGSAP` hook from `@gsap/react` for all GSAP animations — ensures proper cleanup on unmount
- `gsap.matchMedia()` with `prefers-reduced-motion` guard — established in HeroSection and NavBar; replicate this pattern on all case study page animations
- `app/template.tsx` — Motion-based page transition wraps all pages; case study pages benefit from this automatically

### Integration Points
- `app/page.tsx` — `#work` section anchor already exists as a stub (`min-h-screen`); replace the stub with the `<WorkSection />` component containing the case study grid
- New route needed: `app/work/[slug]/page.tsx` — dynamic route for case study pages; `slug` maps to `CaseStudy.id` in `caseStudies` array
- `NavBar.tsx` — currently has transparent-to-solid logic tied to scroll position; on case study pages the nav should always be solid. Handle this by checking if the page has a hero section (or pass a prop/context flag); simplest approach is a `data-page` attribute or checking scroll position on mount

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-work-section-case-studies*
*Context gathered: 2026-03-22*
