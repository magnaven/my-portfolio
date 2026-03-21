# Architecture Research

**Domain:** Animation-rich designer portfolio site (Next.js, static content, no CMS)
**Researched:** 2026-03-21
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Page Layer                            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  /       │  │/work/    │  │/work/    │  │  /about  │    │
│  │(homepage)│  │[slug]    │  │[slug]    │  │(section) │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │             │             │              │           │
├───────┴─────────────┴─────────────┴──────────────┴──────────┤
│                     Layout / Shell Layer                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  RootLayout: Nav + Footer + Page Transition Wrapper  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  SmoothScrollProvider (Lenis) + ScrollTrigger sync   │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     Section Components                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Hero    │  │  Work    │  │  About   │  │ Contact  │    │
│  │ Section  │  │ Grid     │  │ Section  │  │ Section  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
├─────────────────────────────────────────────────────────────┤
│                     Animation Layer                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Framer Motion│  │ GSAP +       │  │ Lenis Smooth    │   │
│  │ (transitions,│  │ ScrollTrigger│  │ Scroll (global  │   │
│  │  entry anim) │  │ (scroll anim)│  │  scroll engine) │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     Data Layer                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /data/case-studies.ts  — typed static content       │   │
│  │  /data/meta.ts          — site-level copy            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| RootLayout | Nav, footer, page transition wrapper, AnimatePresence | All pages |
| SmoothScrollProvider | Lenis instance, GSAP ticker sync, ScrollTrigger bridge | All sections that use scroll animations |
| HeroSection | Animated headline, dual audience CTAs, enter animation | SmoothScrollProvider (scroll-out), data/meta.ts |
| WorkGrid | Case study card grid, hover states, scroll reveals | data/case-studies.ts |
| CaseStudyPage | Full case study detail layout, image sequence, scroll story | data/case-studies.ts |
| AboutSection | Founder bio, animated text reveals | data/meta.ts |
| ContactSection | Booking CTA (consulting), email/form (general) | External: Calendly embed |
| NavBar | Audience path links, scroll-aware show/hide | SmoothScrollProvider |
| AnimationVariants | Shared Framer Motion variants (enter, exit, stagger) | Consumed by all section components |

---

## Recommended Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # RootLayout: Nav, Footer, AnimatePresence shell
│   ├── template.tsx            # Page transition trigger (re-mounts on route change)
│   ├── page.tsx                # Homepage (all homepage sections assembled here)
│   ├── work/
│   │   └── [slug]/
│   │       └── page.tsx        # Case study detail page (dynamic route)
│   └── globals.css             # Global resets, CSS custom properties
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # Navigation bar, audience path entry points
│   │   ├── Footer.tsx          # Minimal footer
│   │   └── PageTransition.tsx  # Framer Motion wrapper for route transitions
│   │
│   ├── sections/               # Full-width homepage sections
│   │   ├── Hero.tsx            # Animated hero statement + dual CTAs
│   │   ├── WorkGrid.tsx        # Case study cards grid
│   │   ├── About.tsx           # Founder lens bio
│   │   └── Contact.tsx         # Booking + email CTAs
│   │
│   ├── case-study/             # Case study detail page components
│   │   ├── CaseStudyHero.tsx   # Title, role, year, headline
│   │   ├── CaseStudyBody.tsx   # Problem / process / outcome sections
│   │   └── CaseStudyNav.tsx    # Previous / next case study navigation
│   │
│   └── ui/                     # Atomic, reusable UI components
│       ├── AnimatedText.tsx    # Text-split reveal (characters/words)
│       ├── ScrollReveal.tsx    # Generic scroll-triggered fade/slide wrapper
│       ├── WorkCard.tsx        # Individual case study card (hover, preview)
│       └── AudienceCTA.tsx     # Styled dual audience button pair
│
├── animation/
│   ├── variants.ts             # Shared Framer Motion variant objects
│   ├── gsap.ts                 # GSAP registration (plugins + ScrollTrigger)
│   └── scroll.ts               # Lenis initialization + GSAP ticker sync
│
├── data/
│   ├── case-studies.ts         # All case study content (typed, static)
│   └── meta.ts                 # Site copy: bio, headlines, contact info
│
├── types/
│   └── index.ts                # CaseStudy, MetaContent, etc.
│
└── lib/
    └── utils.ts                # Slug generation, class merging helpers
```

### Structure Rationale

- **components/sections/ vs components/case-study/**: Homepage sections are full-width narrative blocks; case study components are detail-page-specific. Keeping them separate makes the build order clear and prevents prop leakage.
- **animation/**: Centralizing GSAP plugin registration and Lenis setup prevents duplicate initialization across the component tree. Variants file keeps Framer Motion configs DRY.
- **data/**: Typed static files replace a CMS. TypeScript interfaces enforce content shape and catch missing fields at build time — far safer than loose JSON.
- **app/template.tsx**: In Next.js App Router, `layout.tsx` persists across routes (no re-render). `template.tsx` creates a new instance on every route change, which is required for exit animations to fire. This is the critical architectural choice for animation-rich App Router sites.

---

## Architectural Patterns

### Pattern 1: template.tsx as Animation Gate (App Router)

**What:** Use `template.tsx` instead of relying solely on `layout.tsx` for page transitions. `layout.tsx` wraps the shell (nav, footer). `template.tsx` wraps page content and re-mounts on every navigation, allowing Framer Motion's `AnimatePresence` to detect unmounts and fire exit animations.

**When to use:** Always — for any multi-page Next.js App Router site with animated transitions.

**Trade-offs:** Adds one extra component in the hierarchy, but is the only clean way to get reliable exit animations in the App Router. Pages Router with `_app.tsx` is simpler, but App Router is the current standard and this pattern solves the transition problem.

**Example:**
```typescript
// app/template.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { pageVariants } from '@/animation/variants'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 2: useGSAP + Scoped Ref for Scroll Animations

**What:** All GSAP ScrollTrigger animations live inside `useGSAP()` from `@gsap/react`, scoped to a container ref. This handles automatic cleanup on unmount, preventing the double-fire issue in React 18 Strict Mode and memory leaks from stale ScrollTrigger instances.

**When to use:** Every component that uses GSAP (scroll reveals, text animations, parallax). Never use raw `useEffect` with GSAP.

**Trade-offs:** Requires `"use client"` directive. Components with GSAP cannot be React Server Components.

**Example:**
```typescript
// components/ui/ScrollReveal.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(container.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: container })

  return <div ref={container}>{children}</div>
}
```

### Pattern 3: Lenis + GSAP Ticker Sync (Single Provider)

**What:** One `SmoothScrollProvider` component initializes Lenis and wires it to GSAP's ticker. This lives at the root layout level. All child components use GSAP ScrollTrigger normally — they do not need to know Lenis exists.

**When to use:** As soon as smooth scroll is added to the project. Must be initialized once at root level, not per-section.

**Trade-offs:** Lenis runs on every frame; keep scroll event handlers lightweight. On mobile, consider disabling Lenis (it can conflict with native momentum scrolling on some iOS versions).

**Example:**
```typescript
// animation/scroll.ts — called once in SmoothScrollProvider
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function initSmoothScroll() {
  const lenis = new Lenis()

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}
```

### Pattern 4: Typed Static Data for Case Studies

**What:** Case study content lives in a single TypeScript file with a strict `CaseStudy` type. Each case study is an object literal. Next.js generates static pages via `generateStaticParams`. No database, no API calls, no CMS.

**When to use:** This project. No need for a CMS when content updates require a developer anyway.

**Trade-offs:** Content changes require a code deploy. This is the explicit constraint from the project brief and is acceptable.

**Example:**
```typescript
// types/index.ts
export interface CaseStudy {
  slug: string
  title: string
  client: string
  year: number
  role: string
  headline: string
  problem: string
  process: string[]        // ordered sections
  outcome: string
  metrics: { label: string; value: string }[]
  coverImage: string
  images: string[]
  tags: string[]
  audience: 'consulting' | 'hiring' | 'both'
}

// data/case-studies.ts
import { CaseStudy } from '@/types'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'aida-patient-coordination',
    title: 'AIDA AI: Designing for Clinical Urgency',
    // ...
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
```

---

## Data Flow

### Homepage Render Flow

```
Next.js Build
    ↓
app/page.tsx (Server Component, no animation)
    ↓
<Hero /> <WorkGrid /> <About /> <Contact /> (assembled in order)
    ↓
Each section is 'use client' where animation needed
    ↓
SmoothScrollProvider initializes Lenis + GSAP on mount
    ↓
ScrollTrigger fires per-section animations as user scrolls
```

### Case Study Route Flow

```
User clicks WorkCard → /work/[slug]
    ↓
template.tsx exit animation fires on current page
    ↓
Next.js navigates to /work/[slug]/page.tsx
    ↓
generateStaticParams() → slug list from data/case-studies.ts
    ↓
getCaseStudy(slug) → typed CaseStudy object
    ↓
CaseStudyHero + CaseStudyBody render with static data
    ↓
template.tsx enter animation fires
    ↓
GSAP ScrollTrigger activates for scroll storytelling
```

### Animation Initialization Flow

```
RootLayout mounts (layout.tsx — once, persists)
    ↓
template.tsx mounts (every page change)
    ↓
SmoothScrollProvider mounts → Lenis init → GSAP ticker sync
    ↓
Section components mount → useGSAP() runs → ScrollTrigger registered
    ↓
User scrolls → Lenis normalizes scroll → ScrollTrigger fires → animations play
```

### Audience Path Routing

```
User lands on homepage Hero
    ↓
Two CTA paths:
  "Looking for a design partner?" → scrolls to / anchors consulting-focused work
  "Hiring?"                       → scrolls to / anchors hiring-focused work
    ↓
WorkGrid filters or highlights by CaseStudy.audience field
    ↓
Contact section shows appropriate primary CTA (booking vs email)
```

---

## Animation Architecture

### Division of Labor: Framer Motion vs GSAP

These two libraries are used together, each for what it does best. Do not use both for the same animation type.

| Animation Type | Library | Reason |
|---------------|---------|--------|
| Page enter/exit transitions | Framer Motion | AnimatePresence handles unmount lifecycle cleanly |
| Hover states, micro-interactions | Framer Motion | Declarative, low-friction for simple state-driven animation |
| Scroll-triggered section reveals | GSAP ScrollTrigger | Precise scroll position control, scrub support |
| Hero headline text animation | GSAP (SplitText) | Timeline-based character/word sequencing |
| Smooth scroll physics | Lenis | Lightweight, works alongside ScrollTrigger without conflict |
| Staggered card appearances | Framer Motion variants | Simple, readable stagger config |

### Scroll Animation Decision Tree

```
Does the animation fire on scroll position?
  YES → GSAP ScrollTrigger
    Is it scrubbed (tied to scroll progress)?
      YES → ScrollTrigger { scrub: true }
      NO  → ScrollTrigger { toggleActions: 'play none none reverse' }
  NO → Is it triggered by user interaction (hover, click)?
    YES → Framer Motion (motion.div with whileHover / whileTap)
    NO → Is it a page-level transition?
      YES → Framer Motion (template.tsx variants)
      NO → Framer Motion (component mount with initial/animate)
```

### Performance Constraints

- Animate only `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, or `margin`.
- Target 60 FPS. Audit with Chrome DevTools Performance panel before shipping.
- Hero animation must complete or be skippable within 2 seconds — hiring managers landing for the first time should not be blocked.
- Disable Lenis on mobile if iOS scroll conflicts arise; GSAP ScrollTrigger works with native scroll.
- Lazy-load case study images with Next.js `<Image>` — they are the heaviest assets.

---

## Page Structure: Single Page vs Multi-Page

**Decision: Multi-page with smooth transitions.**

The homepage is a single scrolling narrative (Hero → Work → About → Contact). Each case study is a separate route (`/work/[slug]`). This is the standard pattern for portfolios with rich case studies.

**Why not pure single-page (SPA with hash routing):** Case study pages need their own URLs for sharing, SEO, and deep-linking. A pure SPA approach would require client-side routing with hash fragments, which is fragile for complex scroll animations.

**Why not separate pages for each homepage section:** The scroll narrative between Hero, Work, About, and Contact is load-bearing — it is part of the story. Breaking these into separate routes destroys the intended reading flow.

---

## Suggested Build Order

Dependencies drive this order — each layer must exist before the next.

| Step | What to Build | Why This Order |
|------|--------------|----------------|
| 1 | Data types + static data files (`types/`, `data/`) | Everything else depends on typed content shape |
| 2 | Global styles, CSS custom properties, typography scale | Visual foundation; sections need to exist inside this |
| 3 | RootLayout + NavBar + Footer | Shell must exist before pages render inside it |
| 4 | `animation/` setup: GSAP register, Lenis init, Framer variants | Shared infrastructure before any animated components |
| 5 | SmoothScrollProvider (Lenis + GSAP sync) wired into layout | Scroll engine must be running before scroll animations |
| 6 | `template.tsx` with basic page transition (fade in/out) | Navigation must feel right before content is heavy |
| 7 | Hero section (static layout first, then animate) | First impression; validates animation system end-to-end |
| 8 | WorkGrid + WorkCard components | Depends on case study data types; feeds into routing |
| 9 | Case study dynamic route + detail page layout | Depends on WorkCard links and data layer |
| 10 | About section | Simpler section; validates scroll reveals work at page mid-point |
| 11 | Contact section + Calendly embed | Depends on audience path logic being established |
| 12 | Scroll-triggered reveals across all sections (polish pass) | Add only after layout is stable — avoids fighting animations during layout shifts |
| 13 | Micro-interactions (hover states, cursor effects, card transitions) | Last — refinement layer on top of working functionality |
| 14 | Performance audit + mobile QA | Validate 60 FPS, Lighthouse score, mobile scroll behavior |

---

## Anti-Patterns

### Anti-Pattern 1: Animating Layout Properties

**What people do:** Animate `height`, `width`, `top`, `left`, or `margin` with GSAP or CSS transitions to create reveals and movements.

**Why it's wrong:** These properties trigger layout recalculation on every frame, causing jank and dropping below 60 FPS. Especially damaging on scroll-triggered animations firing rapidly.

**Do this instead:** Animate `transform: translateY()`, `transform: scaleX()`, and `opacity` exclusively. Use `clip-path` animations for reveal effects — they are GPU-composited.

### Anti-Pattern 2: Initializing GSAP in useEffect

**What people do:** Register ScrollTrigger and create tweens inside a raw `useEffect()` hook.

**Why it's wrong:** React 18 Strict Mode runs Effects twice in development. This creates duplicate ScrollTrigger instances that conflict with each other and persist after the component unmounts (memory leak). The double-fire can cause `from()` tweens to snap to end state immediately.

**Do this instead:** Use `useGSAP()` from `@gsap/react` with a scoped container ref. Automatic cleanup, React 18 safe, and contextSafe handles event-triggered animations.

### Anti-Pattern 3: One Giant Animated Component

**What people do:** Build the entire homepage as one component and add all GSAP ScrollTrigger instances in one `useEffect`/`useGSAP` call.

**Why it's wrong:** Impossible to isolate animation bugs. ScrollTrigger cleanup on unmount kills all animations. No code splitting.

**Do this instead:** Each section (`HeroSection`, `WorkGrid`, `AboutSection`, `ContactSection`) owns its own animations via `useGSAP()` scoped to a ref. Sections are independently testable and their animations clean up independently.

### Anti-Pattern 4: Blocking Hero Animation

**What people do:** Build a hero animation sequence that must complete before the user can scroll or interact.

**Why it's wrong:** Hiring managers will leave. Consulting clients will leave. A 3-second blocked intro on a portfolio is never worth it, regardless of how good the animation is.

**Do this instead:** Keep the hero animation under 1.5 seconds, run it in parallel with page readiness (not as a gate), or make it skippable. Design the animation to be beautiful at any point in its timeline, not only at completion.

### Anti-Pattern 5: Using layout.tsx for Page Transitions

**What people do:** In Next.js App Router, attempt to add AnimatePresence or exit animations inside `layout.tsx`.

**Why it's wrong:** `layout.tsx` does not re-render on navigation. The component never unmounts, so exit animations never fire.

**Do this instead:** Use `template.tsx` for the animated page wrapper. It re-mounts on every route change, giving AnimatePresence the unmount event it needs.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Calendly | Embed via `<InlineWidget>` from `react-calendly`, or direct link | Use popup embed to avoid iframe layout issues on mobile |
| Vercel | Deploy target; zero-config for Next.js | Static generation for all routes; no server runtime needed |
| Next.js Image CDN | `<Image>` component with automatic optimization | All case study images must go through this — never raw `<img>` |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Data layer → Page components | Direct import, typed function call (`getCaseStudy(slug)`) | No prop drilling through layout; data fetched at page level |
| Animation layer → Section components | useGSAP() hook in each section; Lenis via context or provider | SmoothScrollProvider exposes Lenis instance via React context if sections need direct access |
| Audience path state → WorkGrid / Contact | URL param or lightweight React state in RootLayout | Avoid global state management (Zustand, Redux) — a simple `useState` at layout level is sufficient for two audience paths |
| HeroSection → WorkGrid | Scroll anchor (`#work`) or router push with query param | Prefer scroll anchor for the homepage; query param for cross-page linking |

---

## Scaling Considerations

This is a personal portfolio site. Scaling is irrelevant in the traditional sense. The relevant "scaling" considerations are:

| Concern | Approach |
|---------|----------|
| Adding more case studies | Append to `data/case-studies.ts`; routes auto-generate via `generateStaticParams` |
| Future blog / writing section | Add `/writing/[slug]` route with its own data file; no architectural change needed |
| CMS adoption later | Replace `data/case-studies.ts` with API calls to a headless CMS; component interfaces stay the same because the data shape is already typed |
| Performance at scale | Moot — it is a static site on Vercel's CDN. Lighthouse score, not traffic, is the bottleneck to optimize for |

---

## Sources

- [Case Study: Stefan Vitasović Portfolio 2025 — Codrops](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/) — page architecture, AnimatePresence pattern, SCSS modules
- [React & GSAP — Official GSAP Docs](https://gsap.com/resources/React/) — useGSAP hook, contextSafe, cleanup patterns
- [How to Make Creative Page Transitions using Next.js and Framer Motion — Olivier Larose](https://blog.olivierlarose.com/articles/nextjs-page-transition-guide) — AnimatePresence + template.tsx patterns
- [How to implement smooth scrolling in Next.js with Lenis and GSAP — devdreaming.com](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — Lenis + GSAP ticker sync
- [Framer vs GSAP — Pentaclay](https://pentaclay.com/blog/framer-vs-gsap-which-animation-library-should-you-choose) — library division of labor
- [Solving Framer Motion Page Transitions in Next.js App Router — imcorfitz.com](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) — template.tsx as animation gate
- [Built to Move: Eduard Bodak Portfolio — Codrops](https://tympanus.net/codrops/2025/07/29/built-to-move-a-closer-look-at-the-animations-behind-eduard-bodaks-portfolio/) — real-world GSAP animation architecture decisions
- [Best React Scroll Animation Libraries 2025 — zoer.ai](https://zoer.ai/posts/zoer/best-react-scroll-animation-libraries-2025) — performance benchmarks and library selection

---

*Architecture research for: animation-rich designer portfolio site (Ida Dilfer Tinker)*
*Researched: 2026-03-21*
