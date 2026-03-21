# Project Research Summary

**Project:** Ida Dilfer Tinker — Senior Product Designer Portfolio
**Domain:** Animation-rich personal portfolio site (dual audience: consulting clients + hiring managers)
**Researched:** 2026-03-21
**Confidence:** HIGH

## Executive Summary

This is a senior product designer portfolio built to serve two distinct audiences simultaneously: consulting clients evaluating a design partner and hiring managers assessing a senior/lead hire. Research consistently shows that most designer portfolios fail both audiences by trying to serve neither explicitly. Ida's competitive advantage is concrete: 12 years of experience, a founder lens (Magna Ventures, AIDA AI), and a dual consulting + employment track record that most portfolios cannot authentically claim. The recommended approach is a Next.js 15 static site with purposeful motion (GSAP for hero and scroll sequences, Motion for component-level micro-interactions), an explicit dual-audience routing structure from the hero, and 3–4 deeply crafted case studies instead of a shallow gallery.

The animation strategy is the most consequential technical decision. Research confirms that animation on a designer's portfolio functions as a demonstration of craft judgment — but only when implemented with restraint. A dual-library approach (GSAP + Motion) is strongly recommended over either alone: GSAP's ScrollTrigger handles timeline-sequenced scroll animations and the hero reveal with precision; Motion's declarative API handles hover states, page transitions, and staggered reveals cleanly in React. Lenis provides the smooth scroll inertia that separates premium-feeling designer portfolios from standard ones. All three are free and well-documented.

The primary risks are non-technical: generic positioning copy that says nothing about Ida specifically, case studies that document activities instead of decisions, and CTA architecture that fails to convert either audience. These must be addressed in content authoring before any visual development begins. Animation over-engineering — adding motion for its own sake — is the main technical risk and must be governed by a performance budget (LCP under 2.5s, 60 FPS on CPU-throttled devices) before any animation ships. `prefers-reduced-motion` support is non-negotiable.

---

## Key Findings

### Recommended Stack

The recommended stack is Next.js 15 (App Router, SSG) + React 19 + TypeScript + Tailwind CSS v4, deployed to Vercel. This is a static site — no server, no CMS, no database. Case study content lives in typed TypeScript files (`data/case-studies.ts`). This avoids infrastructure complexity, keeps deploy times fast, and enforces content shape at compile time. Tailwind v4's CSS-first theme configuration pairs cleanly with Ida's typographic design system.

Animation requires a dual-library strategy. Single-library approaches were evaluated and rejected: GSAP alone creates friction in React component trees; Motion alone lacks ScrollTrigger's pinning and timeline precision for the hero and case study scroll sequences. The combination is well-documented and the performance characteristics are complementary (~23KB GSAP + ~32KB Motion, both gzipped).

**Core technologies:**
- **Next.js 15 (App Router, SSG):** File-based routing maps cleanly to the dual-audience path structure; pre-rendered pages mean zero server overhead and excellent Lighthouse scores — see `.planning/research/STACK.md`
- **Tailwind CSS v4:** CSS-first config (no tailwind.config.js), up to 5x faster builds, pairs cleanly with design token declaration in `@theme` — see `.planning/research/STACK.md`
- **GSAP 3 + ScrollTrigger:** Hero text animation (SplitText), scroll-sequenced case study reveals, pinned sections; now 100% free including Club plugins after Webflow acquisition
- **Motion 12 (formerly Framer Motion):** Page transitions via `template.tsx` + AnimatePresence, hover states, staggered list reveals — declarative API keeps micro-interactions co-located with components
- **Lenis 1.x:** Smooth scroll inertia; synced to GSAP ticker via `lenis.on('scroll', ScrollTrigger.update)`
- **Vercel:** Zero-config deployment for Next.js; global CDN edge network; free tier sufficient for a personal portfolio

**What to avoid:** Three.js/WebGL (adds 600KB+, wrong aesthetic), CSS-in-JS (runtime overhead not needed), Next.js Pages Router (legacy), any CMS (out of scope per project brief).

### Expected Features

**Must have (table stakes) — v1 launch:**
- Hero with bold, specific positioning statement and explicit dual-audience routing (two distinct CTAs, not anchor links)
- 3 rich case studies: problem, role clarity, key decisions, process artifacts, and quantified outcomes
- About section written as founder narrative, not a credential list or tools inventory
- Contact section with calendar booking embed (consulting path) and email/form (hiring path)
- Animated hero — craft signal on arrival; non-negotiable for the positioning being claimed
- Mobile-responsive layout — portfolios are screened on mobile first
- Fast load / Core Web Vitals — LCP under 2.5s; slow load contradicts any performance metric claimed inside the case studies
- No password gate — active rejection signal for recruiters

**Should have (differentiators) — v1 or v1.x:**
- Micro-interactions throughout (hover states, scroll reveals, page transitions) — evidence of attention to interaction quality at every layer
- "Key decisions" narrative section within each case study — the primary signal of judgment vs. execution
- Leadership and collaboration evidence woven into case studies (not a separate section)
- Testimonial from at least one consulting client — fastest trust-builder for the consulting path
- Post-launch / long-term impact in case studies — demonstrates ownership through completion, not just handoff
- Reduced-motion support — both a WCAG requirement and a craft signal for accessibility-conscious hiring managers
- Calendar booking embedded inline for consulting path (not a separate page)

**Defer (v2+):**
- Blog / writing section — creates content debt; dilutes v1 focus; use Substack/LinkedIn and link if desired
- Case study CMS — hardcoded TypeScript works for v1; add only when self-updating without a developer matters
- Video walkthroughs — high production effort; adds value for async consulting pitches but overkill for v1

**Anti-features to avoid:** Skills/tools list, embedded timeline/resume section, contact forms with 5+ fields, password protection, 8–15 project gallery, generic hero copy.

### Architecture Approach

The architecture is a multi-page Next.js App Router site with a single scrolling homepage (Hero → WorkGrid → About → Contact) and individual case study routes (`/work/[slug]`). The critical architectural insight for animation in App Router is using `template.tsx` rather than `layout.tsx` as the animation gate: `layout.tsx` persists across routes (never unmounts, so exit animations never fire), while `template.tsx` re-mounts on every navigation, giving `AnimatePresence` the unmount event it needs for exit animations.

The animation layer is divided strictly by purpose: Framer Motion owns page transitions, hover states, and staggered reveals; GSAP owns all scroll-triggered animations and the hero text sequence. Each section component owns its own GSAP animations via `useGSAP()` scoped to a container ref (not raw `useEffect`) to prevent React 18 Strict Mode double-fire and memory leaks. Lenis is initialized once in a root-level `SmoothScrollProvider` and synced to the GSAP ticker — sections do not need to know Lenis exists.

**Major components:**
1. **RootLayout + template.tsx** — shell (nav, footer) persists; template re-mounts per route for exit animation support
2. **SmoothScrollProvider** — single Lenis instance + GSAP ticker sync; mounted once at root
3. **HeroSection** — animated headline (GSAP SplitText), dual audience CTAs; the first craft signal
4. **WorkGrid + WorkCard** — case study card grid with hover states (Motion) and scroll reveals (GSAP)
5. **CaseStudyPage** — dynamic route `/work/[slug]`; static generation via `generateStaticParams`; GSAP scroll storytelling
6. **data/case-studies.ts** — typed static content replacing a CMS; TypeScript interface enforces content shape at build time
7. **animation/** directory — centralized GSAP plugin registration, Lenis init, and shared Motion variants; prevents duplicate initialization

**Build order (dependency-driven):** Data types → Global styles → Layout shell → Animation infrastructure → SmoothScrollProvider → template.tsx transitions → Hero → WorkGrid → Case study routes → About → Contact → Scroll reveal polish pass → Micro-interactions → Performance audit.

### Critical Pitfalls

1. **Generic positioning copy** — "passionate about meaningful experiences" is indistinguishable from thousands of other portfolios. Every sentence must pass the "could someone else say this?" test. Ida's founder lens and dual-side experience are the POV — they belong in the hero, not buried in the About page. Address before any visual development.

2. **Case studies as deliverable tours** — listing Research → Wireframes → Prototype → Final without explaining why signals execution, not judgment. Each case study must answer: what was the real problem, what decisions did Ida personally own, what did she push back on, and what changed in measurable terms? Hiring managers spend ~60 seconds per case study initially — if the story isn't graspable in that time, the case study fails. Address in content authoring phase.

3. **Dual audience confusion** — one voice for both paths optimizes for neither. Entry points that lead to the same content with different anchor text are a navigation illusion. Each path needs a meaningfully different primary CTA and framing. Address in information architecture phase before visual design.

4. **Animation that signals effort instead of craft** — over-animation reads as junior. The rule: if removing an animation makes the content clearer, remove it. Only animate `transform` and `opacity`. Test at 4x CPU throttle in DevTools. Limit to one intentional hero moment plus subtle micro-interactions. Always implement `prefers-reduced-motion` support (WCAG 2.3.3; also a craft signal).

5. **CTA friction killing conversions** — consulting clients ready to engage must find the booking link without hunting. The calendar link must exist in the hero and at the end of each case study (the highest-intent moment). A contact form buried in the footer is not a conversion mechanism.

6. **Slow LCP from unoptimized images** — all case study images must be AVIF or WebP. Never lazy-load the LCP image. Target Lighthouse mobile score 90+. PNG/JPEG exports from Figma are never acceptable for production.

---

## Implications for Roadmap

Based on combined research, the content and information architecture decisions must be locked before any visual development begins. Technical phases have clear dependency ordering. Animation is a polish layer, not a foundation.

### Phase 1: Content + Positioning Foundation

**Rationale:** Positioning copy and case study structure must be established before any visual or technical decisions are built around them. Generic copy is the highest-risk pitfall (low recovery cost but high strategic cost) and cannot be fixed by better design. This is the only phase with no technical prerequisites.

**Delivers:** Locked hero copy, About narrative, case study outlines (3 studies with problem/decisions/outcomes confirmed), and audience routing logic defined.

**Addresses:** Table stakes (hero positioning, case study depth, About POV), differentiators (founder framing, key decisions narrative)

**Avoids:** Generic positioning pitfall, case-study-as-deliverable-tour pitfall, dual-audience confusion pitfall

**Research flag:** No deeper research needed — this is a content authoring phase. The PITFALLS.md and FEATURES.md sections on content quality are the guide.

---

### Phase 2: Project Setup + Design Foundation

**Rationale:** Technical scaffold and visual system must exist before any component is built. Tailwind v4 CSS-first theming means design tokens are established in `globals.css` before Tailwind classes are used anywhere. This phase has no content dependencies (locked in Phase 1) and no animation dependencies.

**Delivers:** Initialized Next.js 15 repo (TypeScript, Tailwind v4, ESLint, App Router), global CSS custom properties and typography scale, `data/case-studies.ts` with typed content from Phase 1, RootLayout + NavBar + Footer shell.

**Uses:** `create-next-app`, Tailwind v4 PostCSS config, `next/font` for self-hosted typeface, TypeScript interfaces from `types/index.ts`

**Implements:** Data layer + Layout shell (architecture steps 1–3)

**Avoids:** Starting visual development before content is locked; adding CMS complexity out of scope

**Research flag:** Standard patterns — well-documented Next.js setup. Skip research-phase.

---

### Phase 3: Animation Infrastructure + Core Navigation

**Rationale:** Animation infrastructure (GSAP registration, Lenis init, shared Motion variants, template.tsx) must be established before any animated section is built. The `template.tsx` page transition pattern is the critical architectural decision — getting it right early prevents retrofitting later.

**Delivers:** Functional page transitions (fade in/out via template.tsx + AnimatePresence), SmoothScrollProvider (Lenis + GSAP ticker sync), centralized `animation/` directory, basic NavBar scroll behavior.

**Uses:** Motion 12, GSAP 3 + ScrollTrigger, Lenis 1.x, `useGSAP` from `@gsap/react`

**Implements:** Animation layer infrastructure (architecture steps 4–6)

**Avoids:** GSAP in raw `useEffect` (React 18 Strict Mode double-fire), using `layout.tsx` for exit animations (never unmounts), duplicate Lenis initialization

**Research flag:** `template.tsx` + AnimatePresence pattern is well-documented in architecture research. Standard — skip research-phase.

---

### Phase 4: Hero + Dual Audience Routing

**Rationale:** The hero is the first impression and the most animation-intensive component. It validates the entire animation system end-to-end. The dual-audience routing logic established here flows through every subsequent section. Building hero before WorkGrid ensures routing decisions are made once, correctly.

**Delivers:** Animated hero (GSAP SplitText character reveal, under 1.5s), bold positioning statement from Phase 1 content, two explicit audience CTAs ("Looking for a design partner?" / "Hiring?"), `prefers-reduced-motion` support from day one.

**Uses:** GSAP SplitText, `useReducedMotion()` from Motion, Lenis scroll-out feel

**Implements:** HeroSection + AudienceCTA components

**Avoids:** Blocking hero animation (must complete or be skippable within 1.5s), generic hero copy (locked in Phase 1), animation that delays LCP

**Research flag:** GSAP SplitText implementation is well-documented. Hero animation timing and restraint require design judgment, not additional research. Skip research-phase.

---

### Phase 5: Work Grid + Case Study Pages

**Rationale:** The case studies are the core conversion mechanism for both audiences. WorkGrid and case study routes are built together because they share the same data layer and routing. WorkCard hover states (Motion) and scroll reveals (GSAP ScrollTrigger) complete the animation system validation.

**Delivers:** WorkGrid with 3 case study cards, hover states, scroll-triggered reveals; dynamic `/work/[slug]` routes generated statically; CaseStudyHero + CaseStudyBody components with GSAP scroll storytelling; CaseStudyNav (previous/next); audience-aware card ordering/filtering.

**Uses:** `generateStaticParams`, `getCaseStudy(slug)`, GSAP ScrollTrigger scrub, Motion `whileHover`, `next/image` for all case study images (AVIF/WebP)

**Implements:** WorkGrid, CaseStudyPage, audience path routing via `CaseStudy.audience` field

**Avoids:** Case study images as PNG/JPEG, lazy-loading LCP images, animating layout properties (width/height/top)

**Research flag:** GSAP scroll storytelling for case studies may benefit from research-phase for specific scroll narrative patterns. Flag for planning.

---

### Phase 6: About + Contact Sections

**Rationale:** About and Contact are simpler sections that validate scroll reveals work at page mid-point and bottom. Contact section requires Calendly integration decision (inline embed vs. popup vs. direct link) — the lightest integration option is recommended to avoid iframe layout shifts.

**Delivers:** About section with founder narrative (animated text reveals via Motion viewport), Contact section with path-specific CTAs (calendar booking for consulting, email/form for hiring), React Hook Form for the contact form, Calendly/Cal.com integration.

**Uses:** Motion `viewport` prop for entrance animations, React Hook Form 7.x, ShadCN form primitives (stripped of opinionated styles), `react-calendly` popup embed

**Implements:** AboutSection, ContactSection, external Calendly integration

**Avoids:** Contact form with more than 3 fields, burying the booking link in the footer only, a single CTA for both audiences

**Research flag:** Calendly popup embed pattern is documented in architecture research. Standard — skip research-phase.

---

### Phase 7: Polish + Micro-interactions

**Rationale:** Micro-interactions are a refinement layer added after all layout is stable. Adding them before layout is finalized means fighting animations during layout shifts. This is also when the animation system is stress-tested for over-animation.

**Delivers:** Hover states on all interactive elements (WorkCard, NavBar links, CTAs), smooth page transition tuning, staggered list reveals, cursor refinements if warranted, visual identity polish pass.

**Uses:** Motion `whileHover`, `whileTap`, `AnimatePresence`, stagger variants from `animation/variants.ts`

**Implements:** Micro-interactions across all section components

**Avoids:** More than 3 distinct animation patterns above the fold, any animation competing with content for attention, `will-change` on every animated element

**Research flag:** Standard Motion patterns. Skip research-phase.

---

### Phase 8: Performance Audit + Mobile QA + Launch Prep

**Rationale:** Performance validation is its own phase, not a checklist item. Lighthouse mobile score 90+, LCP under 2.5s, and 60 FPS on CPU-throttled devices are non-negotiable for a designer's portfolio — a slow site directly contradicts the craft claim.

**Delivers:** Lighthouse mobile score 90+, verified LCP under 2.5s, verified 60 FPS on 4x CPU throttle, mobile layout validated at 390px and 360px, `prefers-reduced-motion` verified, both conversion paths walked end-to-end as each persona, image formats confirmed as AVIF/WebP, FOIT eliminated.

**Uses:** Chrome DevTools Performance panel, Lighthouse CI, `next/image` optimization audit

**Implements:** Final performance fixes, image optimization pass, font loading optimization

**Avoids:** Shipping with Lighthouse mobile below 80, unoptimized images, missing reduced-motion support, mobile layout issues discovered post-launch

**Research flag:** Performance optimization patterns are well-documented. Standard — skip research-phase.

---

### Phase Ordering Rationale

- **Content before code:** Positioning copy and case study structure (Phase 1) must be locked before visual design decisions are made around them. Retrofitting generic copy into a built site is low technical cost but high strategic cost.
- **Infrastructure before components:** Animation infrastructure (Phase 3) before Hero (Phase 4) before Work (Phase 5) follows strict dependency ordering — each layer depends on the previous.
- **Hero before WorkGrid:** The hero validates the animation system end-to-end and establishes the audience routing logic that WorkGrid relies on.
- **Layout stable before polish:** Micro-interactions (Phase 7) added last prevents fighting animations during layout development.
- **Performance as a phase, not a checklist:** Phase 8 is a dedicated pass, not an afterthought. Image format decisions should be established at asset creation time (Phase 5 onwards) so Phase 8 is verification, not remediation.

### Research Flags

Phases likely needing `/gsd:research-phase` during planning:
- **Phase 5 (Case Study scroll storytelling):** The specific GSAP ScrollTrigger scroll narrative patterns for case study pages (pinned sections, image sequences, scrub behavior) may benefit from deeper research on real-world portfolio implementations.

Phases with standard patterns (skip `/gsd:research-phase`):
- **Phase 2 (Project Setup):** Standard Next.js 15 scaffold — well-documented.
- **Phase 3 (Animation Infrastructure):** `template.tsx` + AnimatePresence + Lenis/GSAP sync patterns fully documented in architecture research.
- **Phase 4 (Hero):** GSAP SplitText patterns well-documented; timing decisions are design judgment.
- **Phase 6 (About + Contact):** Motion viewport animations and Calendly popup embed are standard.
- **Phase 7 (Micro-interactions):** Standard Motion declarative patterns.
- **Phase 8 (Performance):** Standard Lighthouse + DevTools audit workflow.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core technologies verified against official docs (Next.js 15 release notes, Tailwind v4 announcement, Motion docs, GSAP docs). Version compatibility table cross-checked. |
| Features | HIGH | Multiple corroborating sources including direct hiring manager perspectives and recruiter research. Feature priority matrix is well-grounded. Anti-features are validated by community consensus. |
| Architecture | HIGH | Patterns sourced from official GSAP React docs, real-world portfolio case studies (Codrops), and Next.js App Router documentation. `template.tsx` pattern is the established solution for App Router transitions. |
| Pitfalls | HIGH | Current sources (2025–2026) from hiring managers, design community, and performance engineering. All critical pitfalls have cross-validated prevention strategies. |

**Overall confidence:** HIGH

### Gaps to Address

- **Calendly vs. Cal.com selection:** Research recommends either but does not dictate. Ida's existing tooling preference should drive this decision during Phase 6 planning. Both work with the popup embed pattern.
- **Specific case study scroll narrative design:** The architecture research defines the technical pattern (GSAP ScrollTrigger with scrub); the actual scroll storytelling design (which images pin, how long, what the reveal sequence is) requires Ida's creative input during Phase 5. This is a design decision, not a research gap.
- **Color palette and typeface selection:** Research confirms these matter enormously (spare, editorial visual identity is a differentiator) but does not prescribe specific choices. These are Ida's design decisions, not research findings.
- **Analytics tool selection:** PITFALLS.md flags Plausible (~1KB) as preferable to GA4 (~45KB) for performance. If analytics are desired, this decision should be made before Phase 8 to ensure it's included in the performance audit.

---

## Sources

### Primary (HIGH confidence)
- [Next.js 15.5 release notes](https://nextjs.org/blog/next-15-5) — version confirmation, Turbopack, React 19 support
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, Oxide engine, stable release date
- [Motion for React docs](https://motion.dev/docs/react-quick-start) — import path `motion/react`, v12 status
- [GSAP React docs](https://gsap.com/resources/React/) — `useGSAP` hook, contextSafe, cleanup patterns
- [GSAP joins Webflow announcement](https://gsap.com/blog/webflow-GSAP/) — free license including Club plugins
- [React 19 versions page](https://react.dev/versions) — 19.2.x stable
- [UX Portfolio Guide: Senior Designers in 2026](https://uxplaybook.org/articles/senior-ux-designer-portfolio-get-hired-2026) — feature expectations, hiring manager perspectives
- [How Recruiters Actually Look at Your Portfolio](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio) — recruiter behavior research
- [Largest Contentful Paint — web.dev](https://web.dev/articles/lcp) — performance standards
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — accessibility implementation

### Secondary (MEDIUM confidence)
- [GSAP vs Motion comparison (Motion docs)](https://motion.dev/docs/gsap-vs-motion) — library division of labor rationale
- [Lenis npm](https://www.npmjs.com/package/lenis) — canonical package name, version
- [Case Study: Stefan Vitasović Portfolio — Codrops](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/) — real-world animation architecture
- [Next.js App Router page transitions — imcorfitz.com](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) — `template.tsx` as animation gate
- [Smooth scrolling in Next.js with Lenis and GSAP — devdreaming.com](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — Lenis + GSAP ticker sync
- [14 UX Portfolio Mistakes — Designlab](https://designlab.com/blog/ux-portfolio-mistakes-to-avoid) — anti-feature validation
- [7 Case Study Mistakes — UXfolio](https://blog.uxfol.io/case-study-mistakes/) — case study pitfall validation
- [Portfolio Mistakes in 2026 — Muzli](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/) — current pitfall landscape
- [Design Accessible Animation — Pope Tech](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) — prefers-reduced-motion implementation

---

*Research completed: 2026-03-21*
*Ready for roadmap: yes*
