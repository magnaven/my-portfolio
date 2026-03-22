# Phase 2: Hero + Routing - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the animated hero section and minimal site nav. All copy is locked in `content/hero.ts` — headline, credential line, and both CTA labels are final. Phase delivers: a full-viewport hero with GSAP SplitText headline animation, dual audience CTAs that scroll to different page sections, a minimal sticky nav, and `prefers-reduced-motion` compliance. No other sections (Work, About, Contact) are built in this phase — just the hero and the nav shell that wraps the full site.

</domain>

<decisions>
## Implementation Decisions

### CTA routing
- Both CTAs scroll to sections on the same page — no separate routes (/consulting, /hiring)
- "Looking for a design partner?" → smooth-scrolls to `#work`
- "Hiring?" → smooth-scrolls to `#contact`
- Visual distinction: "design partner" CTA = solid terracotta button (primary); "Hiring?" = ghost/outlined button
- Both use Lenis smooth scroll (already wired) for the scroll behavior

### Hero layout & composition
- Full viewport height (100vh)
- Text left-aligned, vertically centered within the viewport
- Pure typography — no decoration, shapes, textures, or imagery; canvas background only
- Headline very large: ~6–8rem (96–128px), expected to wrap to 2–3 lines at desktop widths
- Element order top to bottom: headline → credential line → CTAs
- Scroll-down indicator: subtle animated bouncing down-arrow/chevron at the bottom of the hero (centered or left-aligned)

### Animation sequence
- **Headline**: GSAP SplitText character reveal — sharp and quick feel (fast stagger, slight spring/overshoot), completes under 1s
- **Credential line**: fades up with a slight upward translate, short delay after headline completes
- **CTAs**: fade up immediately after credential line, as a unit
- Total sequence: ~1–1.5s from page load
- **Inline styling**: one key phrase gets the terracotta accent color — "own it." (the second sentence's kicker) — applied via `<span>` wrapping the characters within the SplitText target
- `prefers-reduced-motion`: skip all GSAP animations, render content at final visible state immediately; scroll-down indicator animation also suppressed

### Nav
- Minimal top nav included in Phase 2 (not deferred)
- Left: "Ida Dilfer Tinker" typeset in brand fonts (not an image logo)
- Right: Work · About · Contact links (smooth-scroll to page anchors)
- Scroll behavior: nav starts transparent over the hero, transitions to solid canvas-color background when visitor scrolls past the hero
- Nav is sticky (fixed to top of viewport)
- Nav fades in as part of the load sequence (after or alongside CTAs)

### Claude's Discretion
- Exact spring/overshoot easing values for SplitText stagger
- Exact pixel threshold at which nav transitions from transparent to solid
- Scroll-down indicator icon (chevron vs arrow) and exact bounce animation
- Nav link hover states and transition style
- Exact delay values between sequence steps (credential line, CTA fade-up)
- Max-width / container padding for hero content

</decisions>

<specifics>
## Specific Ideas

- "own it." in terracotta — the second sentence's final two words are the emotional punch; the color draws the eye to that phrase specifically
- Nav transparency → solid transition should feel smooth, not jarring — short CSS transition on background-color/backdrop
- The scroll-down indicator should disappear once the visitor starts scrolling (opacity 0 on scroll start)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `content/hero.ts` — `heroCopy` object with `headline`, `credentialLine`, `ctaDesignPartner`, `ctaHiring` — import directly, do not hardcode strings
- `providers/SmoothScrollProvider.tsx` — Lenis wired to GSAP ticker with `autoRaf: false`; use `lenis.scrollTo('#work')` / `lenis.scrollTo('#contact')` for CTA scroll behavior
- `app/template.tsx` — Motion-based page transition already wired; hero enters via this wrapper on load

### Established Patterns
- Tailwind v4 `@theme` tokens: `text-ink`, `bg-canvas`, `text-accent`, `bg-accent`, `font-display` (Playfair Display), `font-sans` (DM Sans) — use these throughout
- `useGSAP` hook registered in `SmoothScrollProvider.tsx` — use it for all GSAP animations to ensure proper cleanup
- `gsap.registerPlugin(ScrollTrigger, useGSAP)` already done in `SmoothScrollProvider.tsx` — do not re-register; import ScrollTrigger directly in components as needed

### Integration Points
- `app/page.tsx` — currently a placeholder `<main>` with "Foundation" text; replace with `<HeroSection />` and add section anchors for Work, About, Contact (empty sections for now as scroll targets)
- `app/layout.tsx` — nav should be added here (inside `<SmoothScrollProvider>`, outside `{children}`) so it persists across page transitions
- GSAP SplitText: available in GSAP 3.14.2 (free since 3.12) — import from `gsap/SplitText`; register with `gsap.registerPlugin(SplitText)`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-hero-routing*
*Context gathered: 2026-03-22*
