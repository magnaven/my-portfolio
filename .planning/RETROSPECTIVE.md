# Retrospective

Living retrospective — one section per milestone.

---

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-31
**Phases:** 4 | **Plans:** 16 | **Commits:** 73
**Timeline:** 10 days (2026-03-21 → 2026-03-31)

### What Was Built

- **Phase 1 (Foundation):** Next.js 15 App Router scaffold with Tailwind v4 @theme tokens, GSAP + Lenis single-RAF loop animation infrastructure, and all site copy authored upfront (hero, About narrative, 3 case studies)
- **Phase 2 (Hero + Routing):** GSAP SplitText character-reveal hero with dual audience entry points, sticky transparent→solid NavBar with smooth-scroll links, prefers-reduced-motion compliance
- **Phase 3 (Work + Case Studies):** WorkSection stagger grid, `/work/[slug]` dynamic routes, cinematic pinned-scroll CaseStudyChapters with DecisionCard and OutcomeStat, NavBar solid-state fix for case study pages
- **Phase 4 (About + Contact):** AboutSection (founder narrative + CV download + GSAP fade-up), ContactSection (two-column, Cal.com popup + LinkedIn), wired into homepage with openGraph metadata

### What Worked

- **TDD wave-0 pattern** — writing failing stubs before components kept tests honest and prevented scope drift. Zero regressions across 4 phases.
- **content/ vs data/ split** — clean separation between authored copy and structured data. Made content edits obvious and type-safe.
- **Single RAF loop architecture** — deciding GSAP drives Lenis (not the other way around) in Phase 1 paid off: no jank, no double-tick issues throughout the build.
- **Wave-based parallel execution** — Phases 3 and 4 had independent plans that ran in parallel, cutting wall-clock time.
- **Visual verification checkpoints** — human eye checks (02-04, 03-04, 04-04) caught interaction issues (nav solid-state bug, reduced-motion edge cases) that automated tests couldn't.

### What Was Inefficient

- **NavBar solid-state bug** — discovered in Phase 3 visual verification after the NavBar was built in Phase 2. A cross-route behavior test in 02-01 would have caught this earlier.
- **Phase 4 TDD scaffold delayed** — 04-00 (failing stubs) was written days after the implementation phase was planned rather than immediately after Phase 3 shipped. Minor, but the rhythm worked better when stubs were written immediately.
- **Content placeholder pattern** — `// BEFORE LAUNCH:` comments in `content/contact.ts` are easy to miss. A startup check or README note would make them more visible.

### Patterns Established

- **Wave-0 TDD:** Every new section phase starts with a failing-stubs plan (00) before any implementation plan
- **content/ separation:** Authored text lives in `content/`, typed structured data in `data/`, components only consume
- **Lenis + GSAP single-ticker:** `gsap.ticker.add(time => lenis.raf(time * 1000))`, `autoRaf: false` — copy this exact pattern for all future animation work
- **matchMedia for reduced-motion:** All GSAP animations wrapped in `gsap.matchMedia()` with `prefers-reduced-motion` branch — skip animation, show content immediately
- **alwaysSolid pattern:** `usePathname()` check for route-conditional component rendering — NavBar uses this for case study pages

### Key Lessons

1. **Lock content before any component work** — Phase 1's content-first approach prevented copy churn during build. Worth the upfront investment.
2. **Visual checkpoints are not optional** — the NavBar bug and reduced-motion edge cases were only caught by human eye. Automate what you can, but screen time is irreplaceable for animation.
3. **Cross-route component behavior needs explicit tests** — NavBar's solid-state behavior on `/work/` wasn't tested because it was a routing concern, not a component concern. Worth adding a route-behavior test alongside component tests.
4. **Cal.com popup over embed** — eliminates iframe z-index and sizing problems. Default to popup approach for all calendar integrations.

### Cost Observations

- Model mix: 100% sonnet
- Sessions: ~6 (plan sessions + 4 execute-phase sessions)
- Notable: Parallel wave-2 execution (04-01 + 04-02) completed in ~3 min combined — significant time saving vs sequential

---

## Cross-Milestone Trends

| Metric | v1.0 |
|--------|------|
| Phases | 4 |
| Plans | 16 |
| Timeline | 10 days |
| Tests at ship | 26 |
| Regressions | 0 |
| Visual checkpoints | 3 |
| Bugs caught in checkpoints | 1 (NavBar solid-state) |
