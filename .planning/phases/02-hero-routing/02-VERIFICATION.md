---
phase: 02-hero-routing
verified: 2026-03-22T00:00:00Z
status: human_needed
score: 12/12 automated checks verified
re_verification: false
human_verification:
  - test: "Animation sequence — headline character reveal, credential line fade-up, CTA fade-up, nav fade-in, scroll indicator bounce"
    expected: "Full sequence completes within 1.5s; each element animates in the correct order; scroll indicator bounces continuously"
    why_human: "GSAP animation timing and visual sequencing cannot be verified in jsdom — requires live browser observation"
  - test: "CTA scroll routing — click 'Looking for a design partner?' and 'Hiring?'"
    expected: "Each click triggers Lenis smooth-scroll (fluid deceleration) to #work and #contact sections respectively"
    why_human: "Lenis smooth-scroll physics and actual scroll destination require browser interaction to verify; jsdom has no scroll engine"
  - test: "Nav transparent-to-solid transition on scroll"
    expected: "Nav starts transparent over the hero, transitions smoothly to bg-canvas with CSS transition when scrollY > 90px"
    why_human: "CSS transition on scroll requires a real viewport and scroll event — not testable in jsdom"
  - test: "prefers-reduced-motion compliance (A11Y-01)"
    expected: "With prefers-reduced-motion: reduce enabled in DevTools, all content (headline, credential line, CTAs, nav) appears immediately at full opacity — no character reveal, no fades, scroll indicator visible but not bouncing"
    why_human: "matchMedia media query emulation must be tested in a real browser with DevTools; jsdom matchMedia is a stub"
  - test: "'own it.' renders in terracotta accent color"
    expected: "The phrase 'own it.' is visually distinct in the accent/terracotta color inside the Playfair Display headline"
    why_human: "CSS token rendering (text-accent Tailwind class resolving to the actual terracotta color) cannot be confirmed without a rendered browser view"
---

# Phase 2: Hero + Routing Verification Report

**Phase Goal:** Visitors land on a site that immediately communicates who Ida is and routes them to their relevant path — with animation that signals craft from the first second
**Verified:** 2026-03-22
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

Phase 2 success criteria from ROADMAP.md:

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visitor sees the founder-lens POV headline animate in on load (GSAP SplitText character reveal, completes within 1.5s) | ? HUMAN NEEDED | HeroSection.tsx implements SplitText.create + GSAP timeline with 0.45s stagger; matchMedia guard exists; requires browser to confirm visual timing |
| 2 | Visitor sees two explicit audience CTAs ("Looking for a design partner?" and "Hiring?") and can click either to route to path-specific content | ? HUMAN NEEDED | Both buttons render confirmed by vitest (HERO-02 green); lenis?.scrollTo("#work") and lenis?.scrollTo("#contact") wired on click handlers; actual smooth-scroll behavior needs browser |
| 3 | Visitor sees the role/credential line (Magna Ventures, AIDA AI, 12 years experience) as an authority signal beneath the headline | ✓ VERIFIED | heroCopy.credentialLine = "Lead Product Designer · Magna Ventures · AIDA AI · 12 years" rendered; vitest HERO-03 confirms getByText(/magna ventures/i) passes green |
| 4 | Visitor with prefers-reduced-motion enabled sees the same content with animations skipped or reduced — nothing is hidden, only motion is suppressed | ? HUMAN NEEDED | gsap.matchMedia() guard in both HeroSection and NavBar: `if (reduceMotion)` branch calls `gsap.set(..., { autoAlpha: 1, y: 0 })` for all elements; separate useEffect checks window.matchMedia; requires real browser A11Y emulation to confirm |

**Score:** 1/4 truths fully verifiable programmatically (SC3); 3/4 truths have correct implementation but require human browser verification

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `vitest.config.ts` | Vitest configured with jsdom environment and React plugin | ✓ VERIFIED | environment: 'jsdom', globals: true, setupFiles: ['./vitest.setup.ts'], @ alias to project root |
| `components/HeroSection.tsx` | Hero section with GSAP SplitText animation, dual CTA buttons, credential line, scroll indicator | ✓ VERIFIED | 180 lines, exports HeroSection, contains SplitText.create, heroCopy import, lenis.scrollTo, data-testid='scroll-indicator', prefers-reduced-motion guard |
| `components/NavBar.tsx` | Sticky nav with transparent-to-solid scroll behavior | ✓ VERIFIED | 76 lines, exports NavBar, scrolled state, useLenis, bg-canvas/bg-transparent conditional class, reduceMotion guard |
| `components/HeroSection.test.tsx` | 4 stub tests for HERO-01, HERO-02, HERO-03, A11Y-01 | ✓ VERIFIED | All 4 tests pass green in actual vitest run |
| `components/NavBar.test.tsx` | A11Y-01 render test | ✓ VERIFIED | Test passes green in actual vitest run |
| `app/page.tsx` | Home page with HeroSection and section anchor stubs | ✓ VERIFIED | Imports and renders <HeroSection />, sections id="work", id="about", id="contact" all present |
| `app/layout.tsx` | Root layout with NavBar inside SmoothScrollProvider | ✓ VERIFIED | NavBar imported and rendered as sibling to {children} inside <SmoothScrollProvider> |
| `content/hero.ts` | Locked hero copy | ✓ VERIFIED | headline, credentialLine, ctaDesignPartner ("Looking for a design partner?"), ctaHiring ("Hiring?") all defined |

**All 8 artifacts: VERIFIED (exist + substantive + wired)**

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `components/HeroSection.tsx` | `content/hero.ts` | import heroCopy | ✓ WIRED | `import { heroCopy } from "@/content/hero"` — heroCopy.credentialLine, ctaDesignPartner, ctaHiring all used in JSX |
| `components/HeroSection.tsx` | `lenis/react` | useLenis() for scrollTo | ✓ WIRED | `const lenis = useLenis()` called; `lenis?.scrollTo("#work", { offset: -80 })` and `lenis?.scrollTo("#contact", { offset: -80 })` on CTA button onClick handlers |
| `app/page.tsx` | `components/HeroSection.tsx` | import and render | ✓ WIRED | `import { HeroSection } from "@/components/HeroSection"` — `<HeroSection />` rendered in <main> |
| `components/NavBar.tsx` | `lenis/react` | useLenis() for smooth-scroll nav links | ✓ WIRED | `const lenis = useLenis()` called; `lenis?.scrollTo(target, { offset: -80 })` on each nav link onClick; `lenis?.scrollTo("body", { offset: 0 })` on name button |
| `app/layout.tsx` | `components/NavBar.tsx` | import and render inside SmoothScrollProvider | ✓ WIRED | `import { NavBar } from "@/components/NavBar"` — `<NavBar />` rendered inside `<SmoothScrollProvider>` before `{children}` |
| `vitest.config.ts` | `components/*.test.tsx` | include glob (default) | ✓ WIRED | 5 tests discovered and passing; vitest picks up all .test.tsx files under project root |

**All 6 key links: WIRED**

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| HERO-01 | 02-01, 02-02, 02-04 | Visitor sees an animated POV headline on landing that expresses the founder lens | ? HUMAN NEEDED | h1 renders (vitest green); SplitText.create wired with character stagger; visual animation timing requires browser |
| HERO-02 | 02-01, 02-02, 02-04 | Visitor can choose one of two explicit audience paths in the hero | ? HUMAN NEEDED | Both buttons render (vitest green); lenis.scrollTo("#work") and lenis.scrollTo("#contact") wired; actual Lenis routing requires browser |
| HERO-03 | 02-01, 02-02, 02-04 | Hero includes a role/credential line (Magna Ventures, AIDA AI, 12 years) | ✓ SATISFIED | heroCopy.credentialLine = "Lead Product Designer · Magna Ventures · AIDA AI · 12 years" renders; vitest HERO-03 green |
| A11Y-01 | 02-01, 02-02, 02-03, 02-04 | All animations respect prefers-reduced-motion OS preference | ? HUMAN NEEDED | gsap.matchMedia() with reduceMotion guard in both HeroSection and NavBar; gsap.set autoAlpha:1 for immediate render path; requires browser DevTools emulation to confirm |

**Orphaned requirements check:** REQUIREMENTS.md maps HERO-01, HERO-02, HERO-03, and A11Y-01 to Phase 2. All four appear in plan frontmatter. No orphaned requirements.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None found | — | — | — | — |

Scanned: HeroSection.tsx, NavBar.tsx, HeroSection.test.tsx, NavBar.test.tsx, vitest.config.ts, app/page.tsx, app/layout.tsx
No TODOs, FIXMEs, placeholder comments, empty return values, or stub implementations found.

### Human Verification Required

#### 1. GSAP SplitText Animation Sequence

**Test:** Open http://localhost:3000 in a fresh browser tab (cleared cache). Watch the page load.
**Expected:** Headline characters animate in one by one in ~0.45s; credential line fades up; CTA buttons fade up; nav fades in at ~1.4s delay; total sequence under 1.5s; scroll indicator chevron is visible at the bottom and bounces gently.
**Why human:** GSAP animation timing and visual sequencing run in the browser animation engine — jsdom executes none of it. The vitest mock stubs out the entire GSAP timeline.

#### 2. CTA Scroll Routing

**Test:** Click "Looking for a design partner?" — then scroll back up and click "Hiring?".
**Expected:** Each click triggers Lenis smooth-scroll with fluid deceleration (not an instant jump) to the #work section and #contact section respectively.
**Why human:** Lenis smooth-scroll requires a real viewport and scroll container. jsdom has no scroll physics. The wiring (lenis?.scrollTo calls) is confirmed in code, but the actual behavior is browser-only.

#### 3. Nav Transparent-to-Solid Transition

**Test:** On http://localhost:3000, observe the nav on load, then scroll down past 90px.
**Expected:** Nav starts transparent over the hero background; as soon as scrollY > 90, nav transitions to solid bg-canvas (the cream/off-white canvas color) with a smooth 300ms CSS transition. Nav remains fixed at the top throughout.
**Why human:** CSS transition triggered by a scroll event sets a className; the visual result (correct color, smooth transition duration) can only be judged in a browser render.

#### 4. prefers-reduced-motion Compliance (A11Y-01)

**Test:** Open Chrome DevTools → Rendering tab → set "Emulate CSS media feature prefers-reduced-motion: reduce" → reload http://localhost:3000.
**Expected:** Headline, credential line, CTA buttons, and nav all appear immediately at full opacity. No character-by-character reveal, no fades-in. Scroll indicator is visible but stationary (no bounce). No content is hidden.
**Why human:** The jsdom matchMedia mock always returns false for reduceMotion in tests. The actual `gsap.matchMedia()` + `gsap.set({ autoAlpha: 1 })` path must be verified with real OS/DevTools emulation.

#### 5. "own it." Accent Color and Typography

**Test:** Inspect the h1 headline at http://localhost:3000.
**Expected:** "own it." is visually distinct in the terracotta/accent color (the @theme `--color-accent` token) within the Playfair Display headline. The headline font is clearly serif and at a large display size (~96–128px).
**Why human:** Tailwind CSS class `text-accent` resolving to the correct token value requires a browser to parse and render the CSS. The `<span className="text-accent">own it.</span>` structure is confirmed in code, but visual correctness requires a rendered stylesheet.

### Gaps Summary

No automated gaps. All implementation artifacts are substantive, fully wired, and test-verified. The 5 human verification items above are the standard UI-phase gate that cannot be resolved programmatically — they cover animation timing, scroll physics, CSS rendering, and A11Y media query behavior.

The SUMMARY.md for plan 02-04 documents that a human already approved all 5 visual checks on 2026-03-22. If that approval is accepted, all 4 success criteria are satisfied and the phase goal is achieved.

---

_Verified: 2026-03-22_
_Verifier: Claude (gsd-verifier)_
