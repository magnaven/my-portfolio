# Stack Research

**Domain:** Animation-rich personal portfolio site (senior product designer, dual-audience)
**Researched:** 2026-03-21
**Confidence:** HIGH (core stack verified via multiple official/authoritative sources)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x (15.5+) | React framework, routing, SSG | Industry standard for React-based portfolio sites. App Router provides file-system routing that maps cleanly to the two-audience path structure (/consulting, /hiring). SSG means pages are pre-rendered at build time — zero server overhead, Lighthouse-friendly, ideal for static content. Next.js 16 exists but is new enough that ecosystem tooling (ShadCN, some Tailwind plugins) is still catching up; 15.5 is the safer choice for a greenfield project starting now. |
| React | 19.x (19.2) | UI component model | Shipped stable Dec 2024. Next.js 15 ships with React 19 support built in. Required for Motion (formerly Framer Motion). No reason to pin to 18 for this project. |
| TypeScript | 5.x | Type safety | Standard for any serious Next.js project. Catches bugs in animation prop types and route param types early. `create-next-app` scaffolds it by default. |
| Tailwind CSS | 4.x (4.0+) | Utility-first styling | Released stable January 2025. v4 eliminates `tailwind.config.js` — themes are declared in CSS via `@theme`. Up to 5x faster full builds, 100x faster incremental. Zero-config auto-detection of content files. First-party `@tailwindcss/postcss` plugin integrates natively with Next.js's PostCSS pipeline. The CSS-first approach pairs well with custom design tokens for Ida's typographic system. |

### Animation Libraries

This is the most consequential stack decision for this project. The recommendation is a **dual-library strategy**: Motion for component-level UI animations, GSAP for the hero and scroll-driven sequences.

| Library | Version | Purpose | Why / When |
|---------|---------|---------|------------|
| Motion (formerly Framer Motion) | 12.x | Component-level micro-interactions, layout animations, page transitions | Import from `motion/react`. React-native declarative API — animations are co-located with components as JSX props. Best for: hover states, button feedback, staggered list reveals, modal enter/exit, route transitions. 30M+ npm downloads/month. Hybrid engine uses Web Animations API at 120fps, falls back to JS for spring physics and gesture tracking. ~32KB gzipped. No breaking changes in v12. |
| GSAP + ScrollTrigger | 3.x | Hero statement animation, scroll-driven narrative reveals in case studies, pinned sections | Since Webflow's acquisition (Oct 2024), GSAP is now 100% free including all previously paid Club plugins (ScrollSmoother, SplitText). Use for: the animated hero text sequence, scroll-triggered case study reveals, any timeline-sequenced animation where precise timing control over multiple elements matters. GSAP's timeline API is unmatched for orchestrating multi-step sequences. ~23KB gzipped for core. |
| Lenis | 1.x | Smooth scroll inertia | Lightweight (the canonical choice; Locomotive Scroll is now a thin wrapper around Lenis). Pairs with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. Gives the premium "designer portfolio" scroll feel. Import from `lenis` (not deprecated `@studio-freight/lenis`). |

**Why not CSS-only animations?** CSS transitions are sufficient for hover states but can't orchestrate the multi-step, timeline-controlled hero animation or scroll-sequenced case study reveals that signal "craft" to portfolio visitors. This site competes visually — CSS alone won't clear the bar.

**Why not GSAP alone?** GSAP's imperative API creates friction for React component-level animations. Motion's declarative `<motion.div animate={{ opacity: 1 }}>` pattern keeps micro-interactions maintainable and co-located with their components.

**Why not Motion alone?** Motion's scroll-driven capabilities (useScroll, useTransform) are solid for parallax effects but lack GSAP ScrollTrigger's pinning, scrubbing, and timeline-sequencing precision. For the hero and rich case study narratives, GSAP's ScrollTrigger is the better tool.

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| ShadCN UI | Latest | Accessible, unstyled-first component primitives | Use for form elements in contact section and any dialog/modal patterns. Do NOT use ShadCN's opinionated styles wholesale — strip to primitives and apply Ida's design tokens. Avoids reinventing accessible keyboard navigation. |
| React Hook Form | 7.x | Contact form state and validation | Lightweight (9KB), no unnecessary re-renders. Only needed for the contact section form. |
| next/font | built-in | Self-hosted web fonts with zero layout shift | Next.js built-in. Use for the primary typeface. Eliminates external font network requests and prevents FOUT. |
| next/image | built-in | Optimized case study images | Automatic WebP conversion, lazy loading, intrinsic sizing. Critical for case study pages with heavy image content. |
| next/link | built-in | Client-side routing between audience paths | Prefetches linked pages automatically. Use for all internal navigation including the audience entry point buttons. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + `eslint-config-next` | Linting | Ships with `create-next-app`. Catches common Next.js patterns and React rules. |
| Prettier | Code formatting | Add `prettier-plugin-tailwindcss` to auto-sort Tailwind class names — essential with v4's larger class surface area. |
| Turbopack | Dev server bundler | Default in Next.js 16, opt-in in 15. Enable with `next dev --turbo`. 10x faster Fast Refresh vs Webpack. |

---

## Installation

```bash
# Scaffold Next.js 15 with TypeScript, Tailwind, ESLint, App Router
npx create-next-app@latest ida-portfolio --typescript --tailwind --eslint --app --src-dir

# Animation core
npm install motion gsap lenis

# Form handling
npm install react-hook-form

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

**Note:** `next/font`, `next/image`, and `next/link` are built into Next.js — no separate install.

**Tailwind v4 PostCSS config** (`postcss.config.mjs`):
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js 15 | Astro | If the site were truly static with zero client-side interactivity. Astro's zero-JS-by-default shines for blogs and docs. But Motion animations require a React runtime, and Astro's React islands pattern adds complexity without benefit here. |
| Next.js 15 | Next.js 16 | When the ecosystem has caught up (6–12 months). Next.js 16 ships React Compiler stable, Turbopack by default, and removes synchronous Request APIs. Migrate once ShadCN and other tooling explicitly support it. |
| Motion (motion/react) | React Spring | Motion has broader adoption, better React 19 compatibility, and the hybrid Web Animations API engine is a genuine performance advantage at 120fps. React Spring is solid but Motion is the clearer standard. |
| GSAP ScrollTrigger | Motion useScroll | Motion's useScroll + useTransform is good for simple parallax. ScrollTrigger wins for pinned sections, multi-element timelines, and the kind of narrative scroll sequencing that makes case studies feel premium. |
| Lenis | Locomotive Scroll | Locomotive Scroll v2 is now a wrapper around Lenis — use the source directly. |
| Tailwind CSS v4 | Tailwind CSS v3 | v3 is in maintenance mode. v4 is stable, faster, and the direction the ecosystem is moving. No reason to start a greenfield project on v3. |
| ShadCN UI | Radix UI (direct) | ShadCN is Radix wrapped with sane defaults and a CLI for copying components. Easier starting point — strip the styles, keep the accessibility primitives. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Framer (the design tool's site builder) | Ida is a designer who likely uses Framer as a design tool — conflating the site builder with the portfolio creates maintenance friction and vendor lock-in. The site needs a developer-owned codebase. | Next.js + Motion |
| Create React App | Deprecated. No longer maintained by Meta. No SSG, no file-based routing, poor build performance. | Next.js |
| Three.js / WebGL | 3D adds significant bundle weight (~600KB+) and is notoriously difficult to get right on mobile. The aesthetic goal is "clean minimal" not "3D creative agency." Visual quality here comes from typography, animation timing, and whitespace — not 3D scenes. | GSAP + Motion for 2D animation sophistication |
| Styled Components / Emotion | CSS-in-JS with runtime overhead. Tailwind v4 with CSS custom properties covers all dynamic theming needs without JS-in-CSS costs. | Tailwind CSS v4 |
| Next.js Pages Router | App Router is the current standard, supports React Server Components, and will receive all new Next.js features going forward. Pages Router is legacy. | App Router |
| Contentful / Sanity / any CMS | Explicitly out of scope per PROJECT.md. Adds infrastructure complexity and recurring cost for content that will be hardcoded. | Hardcoded TypeScript content files |
| jQuery | Would be pulled in by some older GSAP tutorials — not needed. Modern GSAP 3 is framework-agnostic vanilla JS. | GSAP 3 directly |

---

## Stack Patterns by Variant

**For the hero animation (the statement-level animation that signals craft immediately):**
- Use GSAP + SplitText (now free via Club GSAP) for character/word-level text animation
- Sequence: staggered character reveal → hold → secondary CTA fade in
- Pair with Lenis for scroll-into-next-section feel

**For micro-interactions (hover states, button feedback, nav transitions):**
- Use Motion exclusively
- `whileHover`, `whileTap` props on interactive elements
- `AnimatePresence` for route transitions between audience paths

**For case study scroll reveals:**
- Use GSAP ScrollTrigger with `scrub: true` for scroll-linked progress
- Use Motion `viewport` prop for simpler "animate when element enters viewport" reveals
- Rule of thumb: if it needs a timeline or scrubbing, use GSAP; if it's a one-shot entrance animation, use Motion

**For the two-audience routing:**
- Use Next.js App Router with route groups: `/(consulting)` and `/(hiring)` directories
- Both share the same root layout but can have tailored CTAs and case study ordering
- No client-side state needed — URL is the source of truth

**For fonts:**
- Use `next/font/google` or `next/font/local` for self-hosting
- Declare as CSS custom properties and reference in Tailwind `@theme` block
- Avoid loading fonts from Google's CDN at runtime (GDPR consideration for EU visitors)

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `motion@12.x` | React 19.x, Next.js 15.x | Import from `motion/react`. No breaking changes in v12 vs v11. |
| `gsap@3.x` | Vanilla JS — framework-agnostic | Works in any React/Next.js version. Use `useEffect` or GSAP's React utilities for cleanup. |
| `lenis@1.x` | GSAP ScrollTrigger 3.x | Connect via `lenis.on('scroll', ScrollTrigger.update)` and disable ScrollTrigger's native scroller. |
| `tailwindcss@4.x` | Next.js 15.x | Use `@tailwindcss/postcss` plugin. No `tailwind.config.js` needed. CSS-first config in `globals.css`. |
| `react-hook-form@7.x` | React 19.x | Fully compatible. Uses uncontrolled inputs — no conflicts with React 19 concurrent mode. |

---

## Deployment Recommendation

**Vercel** — strongly recommended.

- Zero-config deployment for Next.js (same company, co-developed)
- Global Edge Network CDN for static assets — critical for fast first paint
- Automatic image optimization via next/image on Vercel's infrastructure
- Preview deployments per branch — useful for reviewing animation changes before shipping
- Free tier is sufficient for a personal portfolio site
- Custom domain with automatic HTTPS

**No server required.** This site is entirely statically generated (SSG). All pages are pre-rendered at build time. Vercel serves them from its CDN with no cold starts.

---

## Sources

- [Next.js 15.5 release notes](https://nextjs.org/blog/next-15-5) — version confirmation, Turbopack beta, React 19
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — breaking changes, migration path
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) — stable release date, CSS-first config, Oxide engine
- [Motion for React docs](https://motion.dev/docs/react-quick-start) — import path `motion/react`, v12 status
- [GSAP vs Motion comparison (Motion official docs)](https://motion.dev/docs/gsap-vs-motion) — authoritative breakdown of when to use each
- [GSAP joins Webflow announcement](https://gsap.com/blog/webflow-GSAP/) — free license confirmation including Club plugins
- [Lenis npm](https://www.npmjs.com/package/lenis) — canonical package name (not deprecated @studio-freight/lenis)
- [React 19 versions page](https://react.dev/versions) — 19.2.x stable as of Oct 2025
- WebSearch: Next.js portfolio + animation stack patterns (MEDIUM confidence — corroborated by official docs)

---

*Stack research for: Ida Dilfer Tinker portfolio — animation-rich designer portfolio site*
*Researched: 2026-03-21*
