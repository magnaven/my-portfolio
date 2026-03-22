---
phase: 01-foundation
plan: "01"
subsystem: infra
tags: [nextjs, tailwind, gsap, lenis, motion, typescript, fonts, animation]

# Dependency graph
requires: []
provides:
  - Next.js 15 App Router project with TypeScript and Tailwind v4
  - "@theme tokens: --color-ink, --color-canvas, --color-accent, --color-accent-light"
  - Playfair Display and DM Sans loaded via next/font (no external requests)
  - SmoothScrollProvider with Lenis driven by GSAP ticker (one RAF loop)
  - template.tsx wired with motion.div for page-transition fade
affects: [02-hero, 03-work, 04-about-contact]

# Tech tracking
tech-stack:
  added:
    - next@16.2.1 (App Router, Turbopack)
    - react@19.2.4
    - tailwindcss@^4 with @tailwindcss/postcss
    - gsap@^3.14 + @gsap/react
    - lenis@^1.3 (lenis/react)
    - motion@^12 (motion/react)
    - typescript@^5
  patterns:
    - Tailwind v4 @theme tokens in globals.css (no tailwind.config.js)
    - Single RAF loop: Lenis driven by gsap.ticker.add(), autoRaf:false
    - GSAP plugins registered once in SmoothScrollProvider
    - next/font for zero-FOUT font loading with CSS variable assignment
    - template.tsx (not layout.tsx) for per-navigation Motion transitions

key-files:
  created:
    - app/globals.css
    - app/layout.tsx
    - app/template.tsx
    - app/page.tsx
    - providers/SmoothScrollProvider.tsx
    - next.config.ts
    - package.json
  modified: []

key-decisions:
  - "Lenis autoRaf:false driven by gsap.ticker prevents double RAF loop with ScrollTrigger"
  - "LenisRef type imported from lenis/react — matches actual exported type including wrapper/content"
  - "turbopack.root configured in next.config.ts to resolve workspace lockfile warning"
  - "template.tsx used (not layout.tsx) — Next.js remounts template on every navigation enabling exit animations"

patterns-established:
  - "GSAP plugin registration: one call to gsap.registerPlugin() in SmoothScrollProvider covers all downstream phases"
  - "Semantic color tokens: ink/canvas/accent naming (not color names) in @theme block"
  - "Font loading: next/font/google assigns CSS variables matching @theme --font-display / --font-sans"

requirements-completed: []

# Metrics
duration: 3min
completed: 2026-03-22
---

# Phase 1 Plan 01: Foundation Summary

**Next.js 15 + Tailwind v4 @theme scaffold with Lenis/GSAP single-RAF smooth scroll and Motion page transition template**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-22T05:55:35Z
- **Completed:** 2026-03-22T05:58:44Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Next.js 15 App Router project running with TypeScript, Tailwind v4, and Turbopack
- Tailwind v4 @theme tokens (ink, canvas, accent, accent-light) and font variables in globals.css
- Playfair Display and DM Sans loaded via next/font — no external Google Fonts requests
- SmoothScrollProvider: Lenis initialized with autoRaf:false, driven by gsap.ticker for one RAF loop
- template.tsx wired with motion.div fade transition (opacity + 8px y — 0.35s easeInOut)
- Build passes clean with zero TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Bootstrap repo, install dependencies, configure Tailwind v4 @theme with fonts** - `63053cc` (feat)
2. **Task 2: Create SmoothScrollProvider and template.tsx — wire animation infrastructure** - `feb4ecb` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `app/globals.css` — Tailwind v4 @import + @theme block with ink/canvas/accent/accent-light tokens and font variables
- `app/layout.tsx` — Root layout loading Playfair Display + DM Sans via next/font, wrapping children in SmoothScrollProvider
- `app/template.tsx` — Client component with motion.div initial/animate/exit for page transitions
- `app/page.tsx` — Minimal placeholder using font-display and text-ink to verify @theme tokens work
- `providers/SmoothScrollProvider.tsx` — ReactLenis with autoRaf:false, gsap.ticker integration, ScrollTrigger + useGSAP registered
- `next.config.ts` — turbopack.root set to resolve workspace lockfile warning
- `package.json` — Next.js 15 + React 19 + animation deps (gsap, @gsap/react, motion, lenis)

## Decisions Made

- Used `LenisRef` type from `lenis/react` (not a hand-rolled interface) — avoids TypeScript errors from the actual exported type shape requiring `wrapper` and `content` fields
- Set `turbopack.root` in next.config.ts — silences Next.js warning about multiple lockfiles in parent directories
- `template.tsx` (not `layout.tsx`) for transitions — only template remounts on navigation, enabling Motion exit animations

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created SmoothScrollProvider.tsx during Task 1 to unblock TypeScript compile**
- **Found during:** Task 1 (bootstrap / TypeScript verify)
- **Issue:** `app/layout.tsx` imports `@/providers/SmoothScrollProvider` — tsc fails if the file doesn't exist
- **Fix:** Created `providers/SmoothScrollProvider.tsx` with full implementation ahead of Task 2 to allow Task 1 verification to pass
- **Files modified:** `providers/SmoothScrollProvider.tsx`
- **Verification:** `npx tsc --noEmit` passed after creation
- **Committed in:** `feb4ecb` (Task 2 commit, which was the correct home for this file)

**2. [Rule 1 - Bug] Fixed LenisRef type mismatch**
- **Found during:** Task 2 (TypeScript compile check)
- **Issue:** Hand-rolled ref type `{ lenis?: { raf: ... } }` is not assignable to `LenisRef` — the real type requires `wrapper` and `content` properties
- **Fix:** Imported `LenisRef` from `lenis/react` and typed `useRef<LenisRef>(null)`
- **Files modified:** `providers/SmoothScrollProvider.tsx`
- **Verification:** `npx tsc --noEmit` passed with zero errors
- **Committed in:** `feb4ecb` (Task 2 commit)

**3. [Rule 2 - Missing Critical] Added turbopack.root to next.config.ts**
- **Found during:** Task 2 (build verification)
- **Issue:** Next.js detected parent directory lockfiles and inferred wrong workspace root — warning present on every build
- **Fix:** Set `turbopack: { root: path.resolve(__dirname) }` in next.config.ts
- **Files modified:** `next.config.ts`
- **Verification:** Build output clean with no workspace warnings
- **Committed in:** `feb4ecb` (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (1 blocking, 1 bug, 1 missing critical)
**Impact on plan:** All fixes necessary for correctness and clean developer experience. No scope creep.

## Issues Encountered

- npm cache had root-owned files (permission denied on `/Users/idadilfertinker/.npm/_cacache`). Fixed by passing `npm_config_cache=/tmp/npm-cache` to all npm commands.
- `create-next-app` refused to scaffold into the existing `.planning/`-containing directory. Scaffolded into `temp-scaffold/` and copied files manually.

## User Setup Required

None — no external services needed for foundation infrastructure.

## Next Phase Readiness

- Foundation complete: Next.js 15 running, Tailwind tokens active, fonts loaded, smooth scroll wired, transitions ready
- Phase 2 (Hero) can import `gsap`, `useGSAP`, and `ScrollTrigger` immediately — plugins already registered
- Phase 2 can use `font-display` (Playfair Display) and `font-sans` (DM Sans) utility classes directly
- Page transitions fire on navigation via template.tsx — ready for hero entrance animation to compose with

---
*Phase: 01-foundation*
*Completed: 2026-03-22*
