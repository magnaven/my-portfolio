// data/case-studies.ts
// Source of truth for all case study content.
// Interface locked in Phase 1 — do not restructure after.

export interface KeyDecision {
  what: string;       // what was weighed
  killed: string;     // what was rejected and why
  constraint: string; // what shaped the final decision
  chosen: string;     // the actual decision made
}

export interface Outcome {
  metric: string;     // e.g. "Activation rate"
  result: string;     // e.g. "42% lift in 6 weeks"
}

export interface CaseStudy {
  id: string;                    // URL slug — used in /work/[id] routing
  title: string;
  category: string;              // e.g. "Product Design", "0-to-1", "Growth"
  thumbnailAlt: string;          // alt text for thumbnail image
  problem: string;               // full paragraph(s) — the situation and stakes
  process: string;               // full paragraph(s) — how it was approached
  keyDecisions: KeyDecision[];   // structured for WORK-04 Key Decisions section
  outcomes: Outcome[];           // measurable, specific — no vague claims
  status: "published" | "draft";
}

export const caseStudies: CaseStudy[] = [
  {
    id: "magna-ventures-core-product",
    title: "Designing the 0-to-1 at Magna Ventures",
    category: "0-to-1 Product Design",
    thumbnailAlt: "Magna Ventures product interface showing the core onboarding flow",
    problem:
      "Magna Ventures needed a product that could ship and retain users within weeks of founding — no runway for iteration cycles or research sprints. The core challenge wasn't finding the right answer; it was making defensible decisions fast enough to matter, with a team that had strong technical talent but limited product experience.",
    process:
      "I embedded with the founding team from day one, using a constraint-first design approach: instead of starting with an ideal state and working backward, we started with what we couldn't change (timeline, team, existing technical commitments) and designed forward into that box. This produced a much narrower scope than anyone was comfortable with at first, but it also produced something shippable. Each design decision was framed as a hypothesis with a clear success metric — activation rate, day-7 retention, time-to-value — so we could move fast without losing accountability.",
    keyDecisions: [
      {
        what: "Whether to build a full feature set at launch vs. a focused core",
        killed: "The comprehensive v1 — users would have had too many paths, none of them clear",
        constraint: "8-week launch timeline with a 3-person technical team",
        chosen: "Single-path onboarding with one primary action at each step; all secondary features deferred to v1.1",
      },
      {
        what: "How to handle user confusion without a help center or support staff",
        killed: "In-app tooltips — they were being dismissed without being read",
        constraint: "No budget for customer support tooling; founders handled all support personally",
        chosen: "Inline contextual copy that anticipated the question before the user asked it; reduced support volume by rewording three key UI labels",
      },
    ],
    outcomes: [
      { metric: "Day-7 retention", result: "38% at launch — above industry baseline for the category" },
      { metric: "Time-to-first-value", result: "Reduced from 14 minutes to 4 minutes in first two weeks post-launch" },
      { metric: "Support ticket volume", result: "Dropped 60% after inline copy revision in week 3" },
    ],
    status: "published",
  },
  {
    id: "aida-ai-activation",
    title: "Redesigning Activation at AIDA AI",
    category: "Growth Design",
    thumbnailAlt: "AIDA AI dashboard showing the redesigned first-run experience",
    problem:
      "AIDA AI had strong top-of-funnel metrics but a significant drop-off between sign-up and first meaningful use. Users were arriving with high expectations set by marketing, then hitting a complex setup flow that required technical configuration before they could see any value. Activation rate was below 30% at 48 hours post-sign-up.",
    process:
      "I started with a two-week research sprint — moderated sessions with new users and analysis of session recordings for the sign-up to activation window. The pattern was consistent: users didn't fail at the hard parts; they abandoned at moments of uncertainty. They didn't know if they were doing it right. The redesign focused entirely on confidence signals — progress indicators, contextual explanations, and an early 'aha moment' that was previously buried three steps too deep in the flow.",
    keyDecisions: [
      {
        what: "Whether to simplify the setup flow or add more guidance to the existing one",
        killed: "Adding a guided walkthrough overlay — users skipped it immediately in testing",
        constraint: "Engineering could only ship one significant change per sprint; had to pick the highest-leverage intervention",
        chosen: "Restructured the flow to lead with the aha moment (first AI-generated output) before any configuration — moved setup to post-activation",
      },
      {
        what: "How to handle the technical configuration requirement without alienating non-technical users",
        killed: "Hiding configuration entirely — power users needed it and would churn without it",
        constraint: "Dual audience: technical integrators and non-technical business users both had legitimate needs",
        chosen: "Progressive disclosure — default path skips configuration with sensible defaults; advanced settings accessible but not required",
      },
    ],
    outcomes: [
      { metric: "48-hour activation rate", result: "Lifted from 28% to 51% over 6 weeks post-launch" },
      { metric: "Setup completion rate", result: "Increased from 44% to 79% — users who started setup now finished it" },
      { metric: "Support tickets: onboarding category", result: "Reduced 42% in first month" },
    ],
    status: "published",
  },
  {
    id: "design-system-scaling",
    title: "Building a Design System That Survived Scaling",
    category: "Systems Design",
    thumbnailAlt: "Component library showing the token structure and component hierarchy",
    problem:
      "As AIDA AI's product team grew from 2 designers to 6, inconsistency compounded. Each designer was making slightly different decisions about spacing, type, and interaction patterns. Engineers were implementing the same component in multiple ways across different surfaces. Shipping speed had slowed because alignment was happening in review rather than at the source.",
    process:
      "Rather than building a design system top-down, I ran a two-week audit: every component across the product, every token in use, every place where a decision had been made locally that should have been global. The audit revealed that 80% of our inconsistency came from 20% of our components — the most-used, most-touched ones. We prioritized those first, established the governance model in parallel, and shipped incrementally so engineers could adopt without a big-bang migration.",
    keyDecisions: [
      {
        what: "Whether to build the design system in Figma-first or code-first",
        killed: "Code-first — designers couldn't work ahead of engineering without a Figma source of truth",
        constraint: "Small team; couldn't maintain two separate systems in parallel; one had to be canonical",
        chosen: "Figma as canonical source with automated token export to code — tokens stay in sync, design leads, code follows",
      },
      {
        what: "How to handle adoption by engineers who had their own component patterns",
        killed: "Mandating migration on a deadline — it created resentment and workarounds",
        constraint: "No capacity to do a full rewrite; engineers had feature commitments",
        chosen: "Opt-in migration with a shared understanding of 'no new inconsistencies' — new components used the system, existing components migrated opportunistically",
      },
    ],
    outcomes: [
      { metric: "Design handoff time", result: "Reduced from average 3 days to less than 1 day per feature" },
      { metric: "Component inconsistencies in QA", result: "Down 70% in first quarter post-adoption" },
      { metric: "New designer onboarding", result: "Reduced from 3 weeks to 1 week to first independent feature delivery" },
    ],
    status: "published",
  },
];
