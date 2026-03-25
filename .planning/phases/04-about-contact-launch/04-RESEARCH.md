# Phase 4: About + Contact + Launch - Research

**Researched:** 2026-03-25
**Domain:** Cal.com popup embed, Next.js metadata, GSAP scroll animation (extension), resume PDF serving
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Calendar tool + embed style**
- Cal.com (not Calendly) — no forced branding on free tier; cleaner aesthetic match
- Popup/modal on button click — not an inline embed; inline calendar widgets break the generous whitespace aesthetic
- Button label: "Book a call" — terracotta accent styling (primary button, consistent with hero CTA)
- Cal.com popup embed via their standard `<script>` + `data-cal-link` pattern

**About section layout**
- Section label: small uppercase "About" — matches WorkSection's "Selected Work" label pattern exactly
- Narrative: 2–3 flowing prose paragraphs — no sub-headers; the narrative was written as continuous voice, headers would fragment it
- Animation: scroll-triggered fade-up (consistent with WorkSection card reveal pattern; uses same gsap.matchMedia + reduceMotion guard)
- Resume download: ghost/border button below the narrative — "Download CV" label; opens PDF in a new tab (not force-download); secondary visual weight, does not compete with booking CTA
- Container: max-w-5xl mx-auto px-8 — consistent with HeroSection and WorkSection

**Contact section composition**
- Section label: "Get in touch"
- Two-column layout (lg: side-by-side, stacked on smaller viewports): left = consulting path, right = hiring path
  - Left: "Looking for a design partner?" heading + 1-line framing + "Book a call" Cal.com popup button
  - Right: "Hiring?" heading + 1-line framing + "View LinkedIn" button (opens linkedin.com/in/... in new tab)
- No contact form (CONT-v2-01 deferred to v2)
- No email address exposed (deferred; avoids spam)

**Resume PDF**
- File placed at `public/ida-dilfer-tinker-cv.pdf`
- Linked via standard `<a href="/ida-dilfer-tinker-cv.pdf" target="_blank">` — no API route needed
- Ida provides the PDF file; build includes it in `public/`

**Launch meta**
- `app/layout.tsx` — add Next.js `metadata` export with `title`, `description`, `openGraph.title`, `openGraph.description`, `openGraph.type: "website"`
- No OG image generation — plain text OG data is sufficient for v1; image is a v2 nice-to-have
- Favicon already present at `app/favicon.ico` — no changes needed

### Claude's Discretion
- Exact prose for the 1-line framing under each contact column heading
- Cal.com popup initialization (script placement, data attributes)
- Exact animation timing for About section fade-up
- Column gap and padding within the contact section
- Whether contact section uses a subtle top border or whitespace alone to separate from Work section

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope. Mobile responsiveness (TECH-v2-01), performance budget (TECH-v2-02), contact form (CONT-v2-01), headshot (ABUT-v2-01), and OG image generation are all tracked in REQUIREMENTS.md v2 section.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABUT-01 | Visitor reads a founder lens narrative in the About section — Ida's POV in her own voice, not a resume bio | `content/about.ts` already exists with approved narrative (3 paragraphs). Render directly from `aboutContent.narrative`. |
| ABUT-02 | Visitor can download Ida's resume/CV as a PDF from the About section | Static file at `public/ida-dilfer-tinker-cv.pdf` served via standard anchor tag with `target="_blank"`. No API route needed. |
| CONT-01 | Consulting-path visitor can book a call via embedded calendar routed from the "design partner" entry point | Cal.com popup via `@calcom/embed-react` `getCalApi` pattern (React 19 support confirmed fixed April 2025). Component is "use client". |
| CONT-02 | Visitor can navigate to Ida's LinkedIn profile from the site | Standard `<a href="https://linkedin.com/in/..." target="_blank" rel="noopener noreferrer">`. No library needed. |
</phase_requirements>

---

## Summary

Phase 4 is a composition phase, not an infrastructure phase. Every technical pattern has been established in prior phases — the work is implementing two new sections (AboutSection, ContactSection) using exact copies of existing patterns, then updating two existing files (app/page.tsx to wire sections in, app/layout.tsx to extend metadata).

The only genuinely new technical surface is the Cal.com popup embed. The `@calcom/embed-react` package is the standard approach: a `"use client"` component with a `useEffect` calling `getCalApi()` for UI configuration, and a button element carrying `data-cal-link` and `data-cal-config` data attributes. The package had a React 19 peer dependency conflict that was resolved and published on April 30, 2025 — it is safe to install on this project's React 19 + Next.js 16 stack.

The `content/about.ts` file already exists with the approved narrative. The resume PDF is a static file dropped into `public/` — nothing to build. The metadata export in `app/layout.tsx` is already partially present (title and description) and needs only the `openGraph` fields added.

**Primary recommendation:** Use `@calcom/embed-react` for the Cal.com popup. Create a thin `BookCallButton` client component that initializes the Cal API in a `useEffect` and renders a button with `data-cal-link`. Everything else in this phase is pattern replication from WorkSection and HeroSection.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@calcom/embed-react` | latest (>=1.5.3, post April 2025) | Cal.com popup modal triggered by button click | Official Cal.com React integration; React 19 support confirmed fixed; avoids raw `<script>` tag management in Next.js |
| Next.js `Metadata` API | built-in (next 16) | OG tags, title, description | Zero-dep; already imported in `app/layout.tsx`; server-side rendered into `<head>` |
| GSAP `ScrollTrigger` | already installed | Scroll-triggered fade-up for About section | Already registered in `SmoothScrollProvider.tsx`; same pattern as WorkSection |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `useGSAP` from `@gsap/react` | already installed | Scoped GSAP animation in React | Every GSAP animation component in this project — already established pattern |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@calcom/embed-react` | Raw `<script>` + `data-cal-link` HTML embed | Script tag approach works but requires manual `useEffect` to inject the script and window namespace management; the React package wraps this cleanly. Given React 19 fix is confirmed released, the package is the right choice. |
| `@calcom/embed-react` | Calendly embed | User locked decision: Cal.com chosen for no forced branding. Not reconsidered. |

**Installation:**
```bash
npm install @calcom/embed-react
```

---

## Architecture Patterns

### Recommended Project Structure

```
components/
├── AboutSection.tsx       # new — "use client" for GSAP animation
├── ContactSection.tsx     # new — "use client" for Cal.com button + layout
└── BookCallButton.tsx     # new — isolated "use client" Cal.com initializer
content/
└── about.ts               # EXISTS — aboutContent.narrative array (3 paragraphs)
public/
└── ida-dilfer-tinker-cv.pdf  # provided by Ida — drop-in, no build step
app/
├── page.tsx               # UPDATE — replace placeholder stubs with components
└── layout.tsx             # UPDATE — extend metadata with openGraph fields
```

### Pattern 1: Cal.com Popup Button (Client Component)

**What:** A "use client" component that calls `getCalApi()` once in `useEffect` to register UI preferences, then renders a button element with `data-cal-link`. Cal.com's embed script (loaded by the package) intercepts clicks on any element carrying `data-cal-link`.

**When to use:** Any button that should open a Cal.com booking modal.

**Example:**
```typescript
// Source: https://github.com/calcom/cal.com/issues/16806 + official embed-react pattern
"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function BookCallButton({ className }: { className?: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#c4714a" } }, // terracotta accent
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <button
      data-cal-link="YOUR-USERNAME/30min"
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      Book a call
    </button>
  );
}
```

**Note:** Replace `YOUR-USERNAME/30min` with Ida's actual Cal.com link once she creates the event type. The `data-cal-link` value must match the slug from her Cal.com account.

### Pattern 2: About Section (mirrors WorkSection exactly)

**What:** "use client" component with `useGSAP` + `gsap.matchMedia()` + `reduceMotion` guard. Fades up the narrative text block on scroll.

**When to use:** Any section requiring scroll-triggered entrance animation.

**Example:**
```typescript
// Source: Established pattern from components/WorkSection.tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { aboutContent } from "@/content/about";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduceMotion } = context.conditions!;
          if (reduceMotion) {
            gsap.set(".about-content", { autoAlpha: 1, y: 0 });
            return;
          }
          gsap.from(".about-content", {
            autoAlpha: 0,
            y: 32,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#about",
              start: "top 75%",
            },
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" className="bg-canvas py-24">
      <div ref={containerRef} className="max-w-5xl mx-auto px-8">
        <p className="font-sans text-sm uppercase tracking-widest text-ink/40 mb-16">
          About
        </p>
        <div className="about-content">
          {aboutContent.narrative.map((paragraph, i) => (
            <p key={i} className="font-display text-xl text-ink/80 mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <a
            href="/ida-dilfer-tinker-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-accent text-accent font-sans px-6 py-3 rounded-sm hover:bg-accent/10 transition-colors inline-block mt-4"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
```

### Pattern 3: Next.js Metadata Export (OG extension)

**What:** Extend the existing `metadata` object in `app/layout.tsx` with `openGraph` fields.

**When to use:** Any Next.js app-router page/layout needing social sharing metadata.

**Example:**
```typescript
// Source: Next.js App Router Metadata API — built into next 16
// app/layout.tsx (existing file — extend, do not replace)
export const metadata: Metadata = {
  title: "Ida Dilfer Tinker — Product Designer",
  description: "Lead Product Designer with a founder's lens. 12 years building products at Magna Ventures, AIDA AI, and beyond.",
  openGraph: {
    title: "Ida Dilfer Tinker — Product Designer",
    description: "Lead Product Designer with a founder's lens. 12 years building products at Magna Ventures, AIDA AI, and beyond.",
    type: "website",
  },
};
```

**Note:** `description` in the existing metadata is a stub — update it to match the OG description for consistency.

### Pattern 4: Contact Two-Column Layout

**What:** Tailwind responsive grid — single column on mobile, two columns at `lg:` breakpoint. Uses the same container pattern as other sections.

```typescript
// Contact section layout skeleton
<section id="contact" className="bg-canvas py-24">
  <div className="max-w-5xl mx-auto px-8">
    <p className="font-sans text-sm uppercase tracking-widest text-ink/40 mb-16">
      Get in touch
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left: consulting path */}
      <div>
        <h2 className="font-display text-3xl text-ink mb-3">
          Looking for a design partner?
        </h2>
        <p className="font-sans text-ink/70 mb-6">{/* 1-line framing — Claude discretion */}</p>
        <BookCallButton className="bg-accent text-canvas font-sans px-6 py-3 rounded-sm hover:opacity-90 transition-opacity" />
      </div>
      {/* Right: hiring path */}
      <div>
        <h2 className="font-display text-3xl text-ink mb-3">Hiring?</h2>
        <p className="font-sans text-ink/70 mb-6">{/* 1-line framing — Claude discretion */}</p>
        <a
          href="https://linkedin.com/in/idadilfer"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-accent text-accent font-sans px-6 py-3 rounded-sm hover:bg-accent/10 transition-colors inline-block"
        >
          View LinkedIn
        </a>
      </div>
    </div>
  </div>
</section>
```

### Anti-Patterns to Avoid

- **Inline `<script>` tag for Cal.com in JSX:** Next.js `<Script>` component or raw `<script>` injection via `useEffect` is unnecessary complexity when `@calcom/embed-react` handles it. React 19 fix is published.
- **`npm install --force` or `--legacy-peer-deps`:** With the April 2025 patch, standard `npm install` should work. If peer dep errors appear, check the installed version is post-April 2025.
- **Animating the BookCallButton with GSAP:** The Cal.com modal hijacks the click event via data attributes. GSAP animations on the button element itself are fine; don't wrap the `data-cal-link` button in a gsap-animated overlay that would intercept the click.
- **Force-downloading the PDF:** `<a href="..." target="_blank">` is correct. Adding `download` attribute forces download rather than browser PDF preview — counter to the user decision.
- **Hardcoding colours:** Use `bg-accent`, `text-accent`, `text-ink`, `bg-canvas` Tailwind tokens throughout. No hex values.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cal.com modal open/close | Custom modal, iframe management, script injection | `@calcom/embed-react` `getCalApi` | Cal.com's embed handles iframe lifecycle, cross-origin messaging, mobile viewport, keyboard trap — all edge cases |
| Social/OG meta tags | Custom `<head>` manipulation | Next.js `metadata` export | App Router's built-in metadata API handles deduplication, SSR injection, and type safety |
| PDF file serving | API route, Next.js route handler | Static file in `public/` | Next.js serves `public/` at root with correct MIME types and caching headers automatically |

---

## Common Pitfalls

### Pitfall 1: Cal.com `data-cal-link` value not yet known

**What goes wrong:** The plan creates `BookCallButton` with a placeholder link. The component renders but clicking opens a "not found" booking page if the placeholder is left in.
**Why it happens:** Ida must create a Cal.com account and event type before the link slug is known.
**How to avoid:** Create a placeholder constant in `content/about.ts` or a new `content/contact.ts` file (e.g., `export const calLink = "ida-dilfer-tinker/intro"`) so the placeholder is in one place. Document clearly that Ida must replace it.
**Warning signs:** Clicking "Book a call" opens a Cal.com 404 page.

### Pitfall 2: `getCalApi` called outside "use client" context

**What goes wrong:** Build error — `useEffect` is not available in Server Components.
**Why it happens:** `ContactSection.tsx` might be left as a Server Component when `BookCallButton` is extracted into a separate file. If `ContactSection` imports `BookCallButton` (a client component) but is not itself marked "use client", it works fine. But if anyone puts `useEffect` directly in `ContactSection`, it fails.
**How to avoid:** Isolate `getCalApi` + `useEffect` exclusively inside `BookCallButton.tsx` ("use client"). `ContactSection.tsx` can be either a Server Component (no animation needed) or "use client" — keep the Cal.com initialization inside `BookCallButton` only.
**Warning signs:** Next.js build error mentioning "useState/useEffect cannot be called from a server component."

### Pitfall 3: Duplicate `gsap.registerPlugin(ScrollTrigger)` conflict

**What goes wrong:** If `AboutSection` registers `ScrollTrigger` and `WorkSection` already registered it, no error occurs — GSAP deduplicates registrations. But forgetting to import ScrollTrigger in `AboutSection` causes scroll animations to silently fail.
**Why it happens:** Developer assumes "it's registered globally so I don't need to import." The `gsap.registerPlugin` call is module-scoped, not global in bundled environments.
**How to avoid:** Mirror WorkSection exactly — include `import ScrollTrigger from "gsap/ScrollTrigger"` and `gsap.registerPlugin(ScrollTrigger)` at the top of `AboutSection.tsx`.

### Pitfall 4: Resume PDF 404 before file is placed

**What goes wrong:** "Download CV" link 404s in production if Ida hasn't provided the PDF yet.
**Why it happens:** The `<a href="/ida-dilfer-tinker-cv.pdf">` is static — Next.js will serve whatever is in `public/`. If the file is absent, the browser gets a 404.
**How to avoid:** This is an external dependency — Ida must provide the file before the plan can be considered complete. The plan should flag this explicitly. A placeholder PDF can stand in during development.
**Warning signs:** Browser navigates to `/ida-dilfer-tinker-cv.pdf` and returns a blank page or 404.

### Pitfall 5: `metadata` export added to both layout.tsx and page.tsx

**What goes wrong:** If someone adds a `metadata` export to `app/page.tsx` as well as `app/layout.tsx`, Next.js merges them — but duplicate `openGraph` keys in page.tsx would override layout.tsx values, potentially blanking the description.
**Why it happens:** Phase instruction says "add to layout.tsx" but a developer might add to page.tsx instead.
**How to avoid:** Metadata belongs in `app/layout.tsx` only for site-wide defaults. The existing partial export is in `layout.tsx` — extend it there, do not create a new export in `page.tsx`.

---

## Code Examples

### Cal.com `getCalApi` initialization

```typescript
// Source: https://github.com/calcom/cal.com/issues/16806 (confirmed live pattern)
// Minimal initialization — configure once per page load via useEffect
useEffect(() => {
  (async function () {
    const cal = await getCalApi();
    cal("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  })();
}, []);
```

### Resume download link (static public file)

```typescript
// Source: Next.js static file serving (official docs — public/ directory)
// No force-download: target="_blank" opens PDF in new browser tab
<a
  href="/ida-dilfer-tinker-cv.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-accent text-accent font-sans px-6 py-3 rounded-sm hover:bg-accent/10 transition-colors inline-block"
>
  Download CV
</a>
```

### Next.js metadata with openGraph

```typescript
// Source: Next.js App Router Metadata API (built into next 16)
// app/layout.tsx — extend existing export
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ida Dilfer Tinker — Product Designer",
  description: "Lead Product Designer with a founder's lens. 12 years building products at Magna Ventures, AIDA AI, and beyond.",
  openGraph: {
    title: "Ida Dilfer Tinker — Product Designer",
    description: "Lead Product Designer with a founder's lens. 12 years building products at Magna Ventures, AIDA AI, and beyond.",
    type: "website",
  },
};
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@calcom/embed-react` required React 18.2 peer dep | React 19 peer dep support released | April 30, 2025 | Safe to install without `--legacy-peer-deps` on this project (React 19.2.4) |
| Cal.com `<Cal>` inline component | `getCalApi()` + `data-cal-link` button pattern | Ongoing — both still supported | Popup pattern is cleaner for one-button use cases; inline `<Cal>` adds iframe directly to DOM |
| Next.js metadata via `<Head>` (Pages Router) | `export const metadata` in layout/page (App Router) | Next.js 13+ | Already used in this project — `layout.tsx` has the import. Just extend the object. |

**Deprecated/outdated:**
- `next/head` `<Head>`: Pages Router pattern — irrelevant, this project uses App Router.
- Calendly: Replaced by Cal.com per user locked decision.

---

## Open Questions

1. **Ida's Cal.com account and event type slug**
   - What we know: Cal.com popup will be implemented; button label is "Book a call"
   - What's unclear: Ida's actual Cal.com username and event type URL slug (e.g., `ida-dilfer-tinker/intro`)
   - Recommendation: Use a placeholder constant in a content file. Mark as a required pre-launch step for Ida to fill in. Plan should include a task note that the button is non-functional until replaced.

2. **Ida's LinkedIn URL slug**
   - What we know: A "View LinkedIn" link will point to her profile
   - What's unclear: The exact URL (e.g., `linkedin.com/in/idadilfer` vs `linkedin.com/in/ida-dilfer-tinker`)
   - Recommendation: Same approach — placeholder constant in content file, flagged for replacement.

3. **Resume PDF availability**
   - What we know: File goes at `public/ida-dilfer-tinker-cv.pdf`
   - What's unclear: Whether Ida has the file ready to drop in
   - Recommendation: Plan explicitly gates "Download CV is functional" on Ida providing the file. Development can proceed with a placeholder PDF.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | vitest + @testing-library/react (jsdom) |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ABUT-01 | AboutSection renders all 3 narrative paragraphs from `aboutContent.narrative` | unit | `npx vitest run --reporter=verbose components/AboutSection.test.tsx` | ❌ Wave 0 |
| ABUT-02 | AboutSection renders a link to `/ida-dilfer-tinker-cv.pdf` with `target="_blank"` | unit | `npx vitest run --reporter=verbose components/AboutSection.test.tsx` | ❌ Wave 0 |
| CONT-01 | ContactSection renders a button with `data-cal-link` attribute | unit | `npx vitest run --reporter=verbose components/ContactSection.test.tsx` | ❌ Wave 0 |
| CONT-02 | ContactSection renders a link to `linkedin.com/in/...` with `target="_blank"` | unit | `npx vitest run --reporter=verbose components/ContactSection.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `components/AboutSection.test.tsx` — covers ABUT-01, ABUT-02
- [ ] `components/ContactSection.test.tsx` — covers CONT-01, CONT-02

**Mock requirements for new test files (established pattern from WorkSection.test.tsx):**
- Mock `gsap`, `gsap/ScrollTrigger` — same vi.mock stubs as WorkSection.test.tsx
- Mock `@calcom/embed-react` — `vi.mock("@calcom/embed-react", () => ({ getCalApi: vi.fn(async () => vi.fn()) }))`

---

## Sources

### Primary (HIGH confidence)
- `components/WorkSection.tsx` — section label pattern, container sizing, GSAP matchMedia + reduceMotion guard pattern (local file, verified)
- `components/HeroSection.tsx` — CTA button Tailwind classes, solid + ghost button styles (local file, verified)
- `content/about.ts` — narrative already authored and approved (local file, verified)
- `app/layout.tsx` — existing metadata export structure (local file, verified)
- Next.js Metadata API — built into next 16, `Metadata` type already imported in `layout.tsx`
- Next.js `public/` directory static serving — documented behavior, zero configuration required

### Secondary (MEDIUM confidence)
- [Cal.com GitHub Issue #16806](https://github.com/calcom/cal.com/issues/16806) — confirmed live `CalEmbedButton` component pattern using `getCalApi` + `useEffect` + `data-cal-link`
- [Cal.com GitHub Issue #20814](https://github.com/calcom/cal.com/issues/20814) — React 19 peer dep fix confirmed published April 30, 2025
- [Cal.com embed docs](https://cal.com/help/embedding/adding-embed) — confirms popup-on-click pattern; exact snippet generated per account in Cal.com dashboard
- [Cal.com embed page](https://cal.com/embed) — confirms `@calcom/embed-react` as the React integration path

### Tertiary (LOW confidence)
- [Next.js Discussion #71995](https://github.com/vercel/next.js/discussions/71995) — Cal.com + Next.js 15 issue thread; largely superseded by April 2025 fix

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Cal.com React 19 fix confirmed; all other stack pieces already in project
- Architecture: HIGH — all patterns directly copied from existing WorkSection/HeroSection; no new patterns introduced
- Pitfalls: HIGH — cal-link placeholder and PDF dependency are observable risks; GSAP registration is empirically known pattern
- Cal.com data-cal-link exact attribute pattern: MEDIUM — confirmed from GitHub issue code, not official docs

**Research date:** 2026-03-25
**Valid until:** 2026-04-25 (stable stack; Cal.com embed API does not change frequently)
