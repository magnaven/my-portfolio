# Pitfalls Research

**Domain:** Designer portfolio site (consulting clients + hiring managers)
**Researched:** 2026-03-21
**Confidence:** HIGH — multiple current sources (2025–2026) from hiring managers, design community, and performance engineering agree on core patterns

---

## Critical Pitfalls

### Pitfall 1: Positioning So Generic It Says Nothing

**What goes wrong:**
The hero or about section reads like a mad-lib: "I create meaningful experiences that delight users and drive business value through human-centered design thinking." Every word is technically true, none of them are distinguishing. Hiring managers and consulting clients read dozens of these. The portfolio is skipped.

**Why it happens:**
Designers fear alienating an audience by being specific. The result is a statement that alienates everyone by resonating with no one. Templates and portfolio advice sites reinforce generic frameworks rather than genuine point of view.

**How to avoid:**
Ida's advantage — founder lens, sat on both sides, designs like someone who ships — is the POV. State it directly in the hero. "I design like someone who ships" is more effective than "I create user-centered experiences." Every sentence should pass the "could someone else say this?" test. If yes, rewrite it.

**Warning signs:**
- Hero copy includes the phrases "passionate," "user-centric," "meaningful experiences," or "driven by data"
- The About section describes what Ida does but not what she believes
- A consulting client reading it cannot tell whether Ida would fit their business or is a pure craft-focused executor

**Phase to address:**
Content authoring phase (before any visual development). Positioning copy must be locked before building around it.

---

### Pitfall 2: Trying to Serve Both Audiences From One Voice

**What goes wrong:**
The portfolio tries to be everything to everyone. Consulting clients want to assess strategic value and working style. Hiring managers want craft, range, and cultural fit. Without explicit routing, both audiences feel underserved — the copy is too enterprise for the hiring manager, too junior-role for the consulting client.

**Why it happens:**
Designers want to maximize reach. The path-of-least-resistance is one homepage that vaguely mentions both. This kills conversion for both paths.

**How to avoid:**
Ida's design calls for two explicit entry points — "Looking for a design partner?" and "Hiring?" — from the hero. These must lead to meaningfully different content or CTAs. The consulting path should emphasize strategic value, working style, and Magna Ventures context. The hiring path should emphasize craft, range, and fit. The routing must be visible and obvious, not buried.

**Warning signs:**
- Both paths lead to the same case studies without any framing difference
- The hero asks no question and just presents work
- Contact section has only one CTA (email only, or only a booking link)
- First-time visitors do not self-route within the first scroll

**Phase to address:**
Information architecture / hero phase. The routing logic must be defined before visual design decisions are made around it.

---

### Pitfall 3: Case Studies That Are a Tour of Deliverables, Not a Story of Decisions

**What goes wrong:**
The case study lists deliverables in sequence: discovery, wireframes, prototype, final design. The hiring manager sees process theater, not judgment. There is no evidence of what trade-offs were made, what was cut, what the designer pushed back on, or what changed because of their work.

**Why it happens:**
Designers document what they did (the safe, observable output) rather than why (which requires admitting uncertainty, conflict, and constraint). The process list feels comprehensive and defensible.

**How to avoid:**
Each case study should answer: What was the real problem (not just the brief)? What decisions did Ida personally own? What was her reasoning? What did she fight for or against? What was the outcome — in numbers or behavior change, not "improved UX"? Keep each case study under a 5-minute read. Hiring managers spend ~60 seconds per case study initially — if they cannot grasp the story in that time, the study fails.

**Warning signs:**
- Case study sections are labeled "Research → Wireframes → Prototype → Final" without context for why each step happened
- No specific numbers, percentages, or behavioral outcomes anywhere
- No mention of constraints, trade-offs, or decisions pushed back on
- Each case study is 15+ minutes to read

**Phase to address:**
Case study content authoring phase. Structure and story must be validated before visual treatment begins. A content review pass specifically checking for "decisions made" vs "activities done" is required.

---

### Pitfall 4: Animation That Signals Effort Instead of Craft

**What goes wrong:**
The site has animations everywhere — every card fades in, every section slides, the hero text scrambles, the cursor has a custom trail. On a slow device or mid-tier mobile, it stutters. The message sent is the opposite of the intent: instead of "this person has taste," the visitor reads "this person over-engineered a portfolio." Worse, the animation distracts from the work.

**Why it happens:**
Animation is the easiest signal of "I made this" for a designer who can code. More is felt to mean more craft. In practice, animation that calls attention to itself rather than guiding attention is a failure of UX judgment — which is precisely what the portfolio is supposed to demonstrate.

**How to avoid:**
Limit hero animation to one intentional statement-level moment. Micro-interactions should be subtle — hover states, smooth transitions — not choreographed sequences on every element. The rule: if removing the animation makes the content clearer, remove the animation. Test on a mid-range Android device and on a laptop with DevTools CPU throttled to 4x. If it drops below 60 FPS, it ships broken.

Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` — these trigger layout reflow on every frame. Use `will-change` sparingly (one or two elements maximum) and remove it after animation completes.

**Warning signs:**
- More than 3 distinct animation patterns visible in the above-the-fold area
- Any animation running on scroll that touches layout properties
- No `prefers-reduced-motion` media query in the stylesheet
- Animation feels like it's competing with the content for attention
- First meaningful paint is delayed by animation initialization

**Phase to address:**
Animation implementation phase. A performance budget should be set before animations are built: LCP under 2.5 seconds, no layout shifts during animation, all scroll animations using IntersectionObserver or scroll-timeline with transform/opacity only.

---

### Pitfall 5: Ignoring prefers-reduced-motion

**What goes wrong:**
The portfolio is built with animations throughout and no reduced-motion handling. Users with vestibular disorders, photosensitivity, or motion sensitivity experience nausea or disorientation. The portfolio also fails WCAG 2.3.3. A hiring manager at an accessibility-conscious company immediately loses trust.

**Why it happens:**
Reduced motion is treated as an edge case. Designers building their own portfolio skip it because they test on their own machine.

**How to avoid:**
Every animation must have a `@media (prefers-reduced-motion: reduce)` counterpart. At minimum: remove or freeze animations, retain fade-in opacity transitions at 0 duration. For JavaScript animations (Framer Motion / GSAP), check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip or reduce animation. In Framer Motion, use `useReducedMotion()` hook.

**Warning signs:**
- No `prefers-reduced-motion` media query in the codebase at launch
- Animations are added through a library without verifying its reduced-motion support
- The hero animation still runs at full speed in macOS Accessibility settings with Reduce Motion enabled

**Phase to address:**
Animation implementation phase, verified before launch.

---

### Pitfall 6: Slow Load Killing the First Impression

**What goes wrong:**
The portfolio hero takes 4+ seconds to load on a mobile connection. The visitor — a hiring manager checking portfolios on their phone between meetings — bounces before the animation even starts. The site that was supposed to signal craft signals sloppiness instead.

**Why it happens:**
Case study images are exported at full resolution. Hero images are not in modern formats. No image lazy-loading strategy. JavaScript bundle includes the entire animation library when only the hero needs it.

**How to avoid:**
Use AVIF or WebP for all images (AVIF compresses up to 50% smaller than WebP for complex photos with no visible quality degradation). Never lazy-load the LCP image — it must be eagerly loaded and ideally `<link rel="preload">`-ed. All below-fold images should lazy-load. Target LCP under 2.5 seconds on a mid-range mobile device on a 4G connection (use Lighthouse mobile simulation). Over 50% of hiring managers review portfolios on phones — mobile performance is not optional.

**Warning signs:**
- Lighthouse mobile score below 80
- LCP image is not preloaded
- Case study images are PNG or JPEG without compression
- Total page weight above 3MB on the homepage
- JavaScript bundle above 200KB gzipped

**Phase to address:**
Final performance pass before launch. Also set image format and export standards at the beginning of the asset pipeline so it is never an afterthought.

---

### Pitfall 7: Mobile Layout That Breaks the Visual Argument

**What goes wrong:**
The portfolio looks stunning on a 1440px desktop. On mobile, case study images overflow their containers, the hero typography is too small to read, and the navigation is impossible to use. The dual audience entry points that looked elegant on desktop now look like broken text links.

**Why it happens:**
Portfolio sites are designed at desktop size first (or exclusively). Mobile is tested late, after all layout decisions are locked.

**How to avoid:**
Design mobile breakpoints explicitly, not as a shrink-wrapping afterthought. Typography must be readable (minimum 16px body, 32px+ hero) on a 375px viewport without zooming. Navigation must be accessible on touch (44px minimum tap targets). Test every case study layout at 390px (iPhone 14) and 360px (common Android) before any stakeholder review.

**Warning signs:**
- Case study images have fixed pixel widths
- Hero font size is set in `px` rather than fluid `clamp()` units
- Navigation requires a horizontal scroll on mobile
- The booking link and email CTA are not visible above the fold on a 667px tall mobile screen

**Phase to address:**
Responsive layout implementation phase. Mobile must be tested at every layout milestone, not just at the end.

---

### Pitfall 8: Contact/CTA Friction That Kills Conversions

**What goes wrong:**
A consulting client reaches the end of a case study ready to engage and cannot find how to contact Ida. The contact section is buried in the footer. The booking link is three clicks away. The email address is not visible without submitting a form. They leave.

**Why it happens:**
Designers focus on the showcase (the work) and treat conversion (the contact) as a secondary concern. Portfolio advice focuses on content quality, not conversion architecture.

**How to avoid:**
The consulting path should surface a calendar booking link (Calendly or Cal.com) as a primary CTA, reachable from the hero and from the end of each case study. The hiring path should surface a direct email and/or a link to a downloadable resume. Both CTAs must exist above the fold on the homepage (in the hero or immediately below it). The contact section should not be the only place these exist.

**Warning signs:**
- The hero has no CTA at all — only scrolls to work
- "Contact" only appears in the footer
- The booking link requires navigating to a separate page before the calendar appears
- No CTA exists at the bottom of case studies (the highest-intent moment)

**Phase to address:**
Information architecture / hero phase. CTA placement must be decided before visual development.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding case study content in JSX | Faster initial build, no CMS setup | Every content update requires a developer and a deploy | Acceptable for v1 if content is stable |
| Using Framer Motion for all animations without reviewing bundle impact | Faster animation development | 32KB gzipped baseline even for simple effects; can't tree-shake unused features | Acceptable if animation scope justifies the cost |
| Using `will-change: transform` on every animated element | Prevents jank on initial test | Memory bloat; browser over-allocates compositor layers | Never acceptable — apply only to elements that are actively animating |
| PNG/JPEG exports for case study screenshots | Easy to export | 3–5x file size vs AVIF/WebP; directly hurts LCP | Never acceptable — convert images at asset creation time |
| Single contact form as the only conversion path | Simple to build | Kills the consulting conversion funnel which needs a direct booking link | Never acceptable — dual CTAs are a stated requirement |
| Skipping `prefers-reduced-motion` | Saves time in animation build | Accessibility failure; WCAG 2.3.3 non-compliance | Never acceptable |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Calendly / Cal.com embed | Embedding the full Calendly widget inline increases page weight and can cause layout shifts | Use a lightweight "popup" trigger or direct link; avoid inline iframes on the homepage |
| Analytics (Plausible / Fathom / GA4) | Adding analytics without verifying it doesn't block rendering or add significant JS weight | Use async/defer; prefer privacy-first analytics (Plausible) which adds ~1KB vs GA4's ~45KB |
| Video in case studies | Autoplaying video in case studies causes layout shift and can autoplay on mobile without user intent | Use the `playsinline`, `muted`, `loop` attributes; never autoplay video with sound; provide a poster image |
| Web fonts | Loading 4+ font weights via Google Fonts delays LCP | Use `font-display: swap`; preload only the weights used in above-fold content; self-host if possible |
| Hosting / CDN | Deploying to a host without edge CDN means assets are served from a single region | Use Vercel, Netlify, or Cloudflare Pages — all include global CDN by default |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Animating layout properties (`width`, `height`, `top`, `left`) | Scroll jank, frame drops on mid-range devices | Use `transform: translate()` and `opacity` exclusively for animation | Immediately visible on any device during scroll |
| Scroll event listeners without debouncing | Extreme CPU usage during scroll, battery drain on mobile | Use IntersectionObserver for scroll-triggered reveals; use passive scroll event listeners if scroll position is needed | Immediate on mobile, subtle on desktop |
| Loading all case study images at page load | High initial page weight, slow LCP | Lazy-load all below-fold images with `loading="lazy"`; eager-load only the LCP image | Immediately on slower connections |
| CSS scroll-driven animations (`animation-timeline: scroll()`) without a fallback | Animation missing in Firefox and Safari (limited support in 2026) | Use JavaScript-based scroll animation with IntersectionObserver as the primary implementation; use CSS scroll-driven animations only as progressive enhancement | Any non-Chrome browser visit |
| Large JS animation bundle blocking interactivity | Site loads visually but is unresponsive to clicks for several seconds (high TTI) | Code-split animation libraries; load GSAP/Framer Motion only after first user interaction or when the animated component is in view | On mobile with slower CPUs; measurable with Lighthouse TTI metric |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Navigation disappears on scroll | User cannot navigate mid-page; must scroll to top to access links | Sticky navigation with low visual weight that does not compete with content |
| Case studies with no scannable structure | Hiring manager spending 60 seconds cannot find the core story; moves on | Use bold headers, pull quotes, and metric callouts so the case study is scannable before it is readable |
| No visual hierarchy between the two audience entry points | Consulting clients and hiring managers both hesitate, unsure which path is for them | Primary/secondary button treatment on the two CTAs in the hero; label them with direct language ("Work with me" vs "View my work") |
| About section that lists credentials but reveals no personality | Consulting clients in particular want to assess working style; a resume-formatted About loses them | Write the About in first person, past tense for context and present tense for belief — not a LinkedIn summary |
| Dark/low-contrast text on animation or image backgrounds | Reading the hero copy becomes difficult in ambient light; accessibility failure | Ensure 4.5:1 contrast ratio for all body text against any background the text appears over, including during animations |

---

## "Looks Done But Isn't" Checklist

- [ ] **Hero animation:** Verify it runs at 60 FPS on a CPU-throttled (4x) browser DevTools simulation, not just on the development machine
- [ ] **prefers-reduced-motion:** Verify in macOS Accessibility settings with Reduce Motion enabled — all animations should be removed or reduced to instant transitions
- [ ] **Mobile layout:** Verify at 390px and 360px viewport widths — all text readable, all CTAs tappable at 44px minimum, no horizontal scroll
- [ ] **LCP image:** Verify the hero image or hero text is the identified LCP element and is preloaded (check Lighthouse "Preload LCP image" opportunity)
- [ ] **Dual CTA:** Verify both "consulting" and "hiring" paths have distinct CTAs that are visible without scrolling on a 667px tall mobile viewport
- [ ] **Case study outcomes:** Verify every case study contains at least one specific, quantified outcome (percentage, user count, revenue impact, time saved) — not "improved the experience"
- [ ] **Contact friction:** Verify the booking link works end-to-end (Calendly loads, time slots appear, confirmation sends)
- [ ] **Image formats:** Verify all case study images and hero images are AVIF or WebP (check Network tab in DevTools for image MIME types)
- [ ] **Font loading:** Verify no flash of invisible text (FOIT) in the hero — use Lighthouse "Ensure text remains visible during webfont load" check
- [ ] **Both entry point paths:** Walk through the consulting path end-to-end and the hiring path end-to-end as if you were each persona — every step should feel intentional

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Generic positioning copy | LOW | Rewrite hero and about copy; no technical changes required; can be done post-launch |
| Over-animation causing jank | MEDIUM | Audit all animations with DevTools Performance tab; replace layout-property animations with transform/opacity equivalents; may require significant refactor of animation implementation |
| Slow LCP from unoptimized images | LOW | Recompress all images to AVIF/WebP; update `<img>` src attributes; add preload for LCP image; measurable improvement within one deploy |
| Missing prefers-reduced-motion | LOW | Add `@media (prefers-reduced-motion: reduce)` blocks; add `useReducedMotion()` hook in JS animations; one focused pass across the codebase |
| Case studies that don't convert | HIGH | Requires content rethink, rewrite, and potentially new visual treatment; cannot be fixed by adjusting layout |
| Missing dual CTA routing | MEDIUM | Add explicit entry point logic to hero; create two distinct landing content sections or page paths; requires information architecture decision before implementation |
| Mobile layout broken | MEDIUM | Requires responsive CSS audit and targeted fixes; can be isolated but is time-consuming if layout was never designed responsively |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Generic positioning | Phase 1: Content + Positioning | Read hero copy aloud and ask "Could anyone else say this?" |
| Dual audience confusion | Phase 1: Information Architecture | User-test with one person from each audience — can they self-route in under 10 seconds? |
| Case study as deliverable tour | Phase 2: Case Study Content | Each case study reviewed against "decisions made" checklist, not "activities listed" |
| Over-animation | Phase 3: Animation Implementation | DevTools CPU throttle test at 4x; no frame drops during scroll |
| Missing prefers-reduced-motion | Phase 3: Animation Implementation | Test with system Reduce Motion enabled before any animation ships |
| Slow LCP | Phase 4: Performance Pass | Lighthouse mobile score 90+; LCP under 2.5 seconds |
| Mobile layout failures | Phase 3 and Phase 4 | Manual device testing at 390px and 360px at every layout milestone |
| CTA / contact friction | Phase 1: Information Architecture | Walk through both conversion paths end-to-end as each persona |

---

## Sources

- [Portfolio Mistakes Designers Still Make in 2026 — Muzli Blog](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)
- [How to Design Portfolio Homepages That Land You Job in 2025 — UX Playbook](https://uxplaybook.org/articles/6-ux-portfolio-homepage-mistakes-2025)
- [5 Design Portfolio Mistakes That'll Send Clients Running — Dribbble](https://dribbble.com/resources/portfolio-mistakes-send-clients-running)
- [You Don't Need a Portfolio — You Need a Point of View — Muzli / Medium](https://medium.muz.li/you-dont-need-a-portfolio-you-need-a-point-of-view-37489f191157)
- [The UX Portfolio Trap: Why 90% of Designers Struggle to Stand Out — Medium](https://medium.com/design-bootcamp/the-ux-portfolio-trap-why-90-of-designers-struggle-to-stand-out-f5d23f1b456d)
- [7 Case Study Mistakes You Are Making in Your UX Portfolio — UXfolio Blog](https://blog.uxfol.io/case-study-mistakes/)
- [Smooth, Jank-Free Animations with CSS and JavaScript — DEV Community](https://dev.to/anisubhra_sarkar/smooth-jank-free-animations-with-css-and-javascript-performance-best-practices-46ff)
- [Optimizing Performance in CSS Animations — DEV Community](https://dev.to/nasehbadalov/optimizing-performance-in-css-animations-what-to-avoid-and-how-to-improve-it-bfa)
- [JavaScript Mobile Animations — Why They're Failing and How to Fix Them](https://blog.developerareeb.com/dkE17NcM7kreX5qdPy4F)
- [Design Accessible Animation and Movement — Pope Tech](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)
- [prefers-reduced-motion — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [How to Create Performant Scroll Animations in React — nray.dev](https://www.nray.dev/blog/how-to-create-performant-scroll-animations-in-react/)
- [Largest Contentful Paint (LCP) — web.dev](https://web.dev/articles/lcp)
- [Core Web Vitals 2025 Guide — Uxify](https://uxify.com/blog/post/core-web-vitals)
- [CSS Scroll-Driven Animations — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Only 30 Seconds to Reject Your Portfolio — UX Collective](https://uxdesign.cc/only-30-seconds-to-reject-your-portfolio-8cb14ac70674)

---

*Pitfalls research for: Designer portfolio site — consulting clients and hiring managers*
*Researched: 2026-03-21*
