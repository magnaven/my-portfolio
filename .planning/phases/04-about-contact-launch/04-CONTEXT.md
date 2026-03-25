# Phase 4: About + Contact + Launch - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

About section (founder narrative + resume download) and Contact section (calendar booking for consulting path + LinkedIn for hiring path) complete both conversion paths on the homepage. The site becomes shippable: basic meta tags and OG data are added for launch. Mobile responsiveness, full performance budget, and a contact form are v2.

</domain>

<decisions>
## Implementation Decisions

### Calendar tool + embed style
- Cal.com (not Calendly) — no forced branding on free tier; cleaner aesthetic match
- Popup/modal on button click — not an inline embed; inline calendar widgets break the generous whitespace aesthetic
- Button label: "Book a call" — terracotta accent styling (primary button, consistent with hero CTA)
- Cal.com popup embed via their standard `<script>` + `data-cal-link` pattern

### About section layout
- Section label: small uppercase "About" — matches WorkSection's "Selected Work" label pattern exactly
- Narrative: 2–3 flowing prose paragraphs — no sub-headers; the narrative was written as continuous voice, headers would fragment it
- Animation: scroll-triggered fade-up (consistent with WorkSection card reveal pattern; uses same gsap.matchMedia + reduceMotion guard)
- Resume download: ghost/border button below the narrative — "Download CV" label; opens PDF in a new tab (not force-download); secondary visual weight, does not compete with booking CTA
- Container: max-w-5xl mx-auto px-8 — consistent with HeroSection and WorkSection

### Contact section composition
- Section label: "Get in touch"
- Two-column layout (lg: side-by-side, stacked on smaller viewports): left = consulting path, right = hiring path
  - Left: "Looking for a design partner?" heading + 1-line framing + "Book a call" Cal.com popup button
  - Right: "Hiring?" heading + 1-line framing + "View LinkedIn" button (opens linkedin.com/in/... in new tab)
- No contact form (CONT-v2-01 deferred to v2)
- No email address exposed (deferred; avoids spam)

### Resume PDF
- File placed at `public/ida-dilfer-tinker-cv.pdf`
- Linked via standard `<a href="/ida-dilfer-tinker-cv.pdf" target="_blank">` — no API route needed
- Ida provides the PDF file; build includes it in `public/`

### Launch meta
- `app/layout.tsx` — add Next.js `metadata` export with `title`, `description`, `openGraph.title`, `openGraph.description`, `openGraph.type: "website"`
- No OG image generation — plain text OG data is sufficient for v1; image is a v2 nice-to-have
- Favicon already present at `app/favicon.ico` — no changes needed

### Claude's Discretion
- Exact prose for the 1-line framing under each contact column heading
- Cal.com popup initialization (script placement, data attributes)
- Exact animation timing for About section fade-up
- Column gap and padding within the contact section
- Whether contact section uses a subtle top border or whitespace alone to separate from Work section

</decisions>

<specifics>
## Specific Ideas

- About and Contact sections replace the existing `min-h-screen` placeholder stubs in `page.tsx` (`#about` and `#contact`)
- The two-column contact layout mirrors the dual-audience framing from the hero (consulting left, hiring right) — consistent mental model for visitors who've scrolled through the whole page
- Resume PDF must be provided by Ida before the plan can be fully executed — this is the one external dependency

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `WorkSection.tsx` — section label pattern (`font-sans text-sm uppercase tracking-widest text-ink/40 mb-16`), container sizing, scroll-triggered fade-up with gsap.matchMedia reduceMotion guard — replicate directly for About section
- `HeroSection.tsx` — CTA button styles: solid terracotta (`bg-accent text-canvas`) for primary, ghost (`border border-accent text-accent`) for secondary — use same classes for contact buttons
- `content/hero.ts` — pattern for authored copy separation; About section narrative is already in `data/case-studies.ts`... actually the About narrative was authored in Phase 1 and should be in a content file. Check `content/` for an `about.ts` file; if absent, create it following the `content/hero.ts` pattern

### Established Patterns
- Tailwind v4 `@theme` tokens: `text-ink`, `bg-canvas`, `text-accent`, `bg-accent`, `font-display`, `font-sans` — use throughout, no hardcoded colours
- `useGSAP` + `gsap.matchMedia()` with `prefers-reduced-motion` guard — established in HeroSection, WorkSection, and CaseStudyChapters; replicate for About scroll animation
- `ScrollTrigger` — already registered in `SmoothScrollProvider.tsx`; import directly in About component if needed

### Integration Points
- `app/page.tsx` — replace `<section id="about" className="min-h-screen bg-canvas" />` with `<AboutSection />` and `<section id="contact" .../>` with `<ContactSection />`
- `app/layout.tsx` — add `export const metadata: Metadata = { ... }` for launch meta tags
- `public/` — Ida's CV PDF goes here as `ida-dilfer-tinker-cv.pdf`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. Mobile responsiveness (TECH-v2-01), performance budget (TECH-v2-02), contact form (CONT-v2-01), headshot (ABUT-v2-01), and OG image generation are all tracked in REQUIREMENTS.md v2 section.

</deferred>

---

*Phase: 04-about-contact-launch*
*Context gathered: 2026-03-25*
