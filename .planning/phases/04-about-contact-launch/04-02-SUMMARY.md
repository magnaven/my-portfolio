---
phase: 04-about-contact-launch
plan: "02"
subsystem: ui
tags: [react, calcom, cal.com, contact, linkedin, tailwind, vitest]

# Dependency graph
requires:
  - phase: 04-about-contact-launch
    provides: ContactSection test scaffold (04-00) with CONT-01 and CONT-02 failing tests

provides:
  - content/contact.ts — single source of truth for Cal.com event slug and LinkedIn URL (placeholder values with BEFORE LAUNCH comments)
  - components/BookCallButton.tsx — "use client" component that initializes Cal.com popup via getCalApi in useEffect
  - components/ContactSection.tsx — two-column grid section with consulting path (BookCallButton) and hiring path (LinkedIn anchor)

affects:
  - 04-about-contact-launch (04-03 integration plan wires ContactSection into page layout)

# Tech tracking
tech-stack:
  added:
    - "@calcom/embed-react — Cal.com popup embed library"
  patterns:
    - "Cal.com popup via getCalApi in useEffect inside a 'use client' BookCallButton component"
    - "content/ file for URL constants with BEFORE LAUNCH comments for placeholder values"
    - "Server Component (ContactSection) imports Client Component (BookCallButton) — client boundary isolated to BookCallButton"

key-files:
  created:
    - content/contact.ts
    - components/BookCallButton.tsx
    - components/ContactSection.tsx
  modified:
    - package.json (added @calcom/embed-react)

key-decisions:
  - "BookCallButton is a standalone 'use client' component isolating the Cal.com getCalApi browser dependency — ContactSection stays a Server Component"
  - "contactContent.calLink and contactContent.linkedInUrl are placeholder values with BEFORE LAUNCH inline comments — Ida replaces them before launch"
  - "@calcom/embed-react installed with --cache /tmp workaround due to npm cache permission issue on this machine"

patterns-established:
  - "Cal.com: getCalApi called in useEffect, data-cal-link attribute on button carries the event slug from contactContent"
  - "Contact URLs: extracted to content/contact.ts (single source of truth) — not inlined in JSX"

requirements-completed:
  - CONT-01
  - CONT-02

# Metrics
duration: 8min
completed: 2026-03-30
---

# Phase 4 Plan 02: ContactSection Summary

**Cal.com popup button and LinkedIn anchor in a two-column ContactSection, backed by content/contact.ts placeholder URL constants, with all 3 tests GREEN**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-30T13:02:00Z
- **Completed:** 2026-03-30T13:03:40Z
- **Tasks:** 2
- **Files modified:** 4 (3 created, 1 package.json)

## Accomplishments

- Created content/contact.ts with calLink and linkedInUrl placeholder constants and BEFORE LAUNCH comments
- Built BookCallButton as isolated "use client" component using getCalApi from @calcom/embed-react
- Built ContactSection two-column grid with consulting path (BookCallButton) and hiring path (LinkedIn anchor)
- All 3 ContactSection tests pass GREEN: CONT-01 (data-cal-link button), CONT-02 (LinkedIn href + target="_blank")
- Installed @calcom/embed-react package

## Task Commits

Each task was committed atomically:

1. **Task 1: Create content/contact.ts** - `5917588` (feat)
2. **Task 2: Build BookCallButton + ContactSection** - `90f6349` (feat)

## Files Created/Modified

- `content/contact.ts` — Cal.com event slug and LinkedIn URL constants with BEFORE LAUNCH placeholder comments
- `components/BookCallButton.tsx` — "use client" Cal.com popup button component using getCalApi in useEffect
- `components/ContactSection.tsx` — Two-column contact section: consulting path (BookCallButton) + hiring path (LinkedIn anchor)
- `package.json` / `package-lock.json` — Added @calcom/embed-react dependency

## Decisions Made

- BookCallButton keeps the "use client" boundary isolated so ContactSection stays a pure Server Component — this follows the anti-pattern warning in 04-RESEARCH.md about not putting getCalApi logic in ContactSection directly.
- Cal.com calLink and LinkedIn URL are sourced from content/contact.ts, not hardcoded in JSX. This makes them easy to update before launch without touching component code.

## Deviations from Plan

None - plan executed exactly as written. The only minor wrinkle was an npm cache permission error on install, resolved by using a temp cache path (`--cache /tmp`). No code changes required.

## Issues Encountered

- npm cache permission error (`EACCES`) when installing @calcom/embed-react. Resolved by: `npm install @calcom/embed-react --cache /tmp/npm-cache-$(whoami)`. No impact on installed package.

## User Setup Required

**Ida must replace placeholders in `content/contact.ts` before launch:**

1. `calLink` — currently `"your-username/intro"`. Replace with Ida's actual Cal.com event link (e.g. `"ida/30min"`).
2. `linkedInUrl` — currently `"https://linkedin.com/in/your-profile"`. Replace with Ida's actual LinkedIn profile URL.

Both fields have inline `// BEFORE LAUNCH:` comments as reminders.

## Next Phase Readiness

- ContactSection is ready to be wired into the page layout (Plan 04-03)
- Both CONT-01 and CONT-02 requirements delivered
- Ida needs to fill in placeholder URL values before launch

---
*Phase: 04-about-contact-launch*
*Completed: 2026-03-30*

## Self-Check: PASSED

- content/contact.ts: FOUND
- components/BookCallButton.tsx: FOUND
- components/ContactSection.tsx: FOUND
- Commit 5917588: FOUND
- Commit 90f6349: FOUND
