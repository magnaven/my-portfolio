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
    id: "aida-ai-b2b-pivot",
    title: "From Marketplace to B2B SaaS at AIDA AI",
    category: "0-to-1 Product Design",
    thumbnailAlt: "AIDA AI coordinator dashboard showing clinic-patient interaction flows",
    problem:
      "AIDA AI launched as a patient-facing marketplace — a platform for discovering and booking healthcare services. After 10+ clinic interviews, the real problem became clear: it wasn't patients who were underserved, it was clinic coordinators. They were managing complex booking flows across WhatsApp, phone, and spreadsheets with no purpose-built tooling. The pivot to B2B SaaS meant rebuilding the product's core premise, not just its UI.",
    process:
      "I led product design from inception through the pivot — shaping the WhatsApp AI agent UX that handled patient-facing interactions, the coordinator dashboard that gave clinic staff visibility and control, and the clinic-patient interaction flows that had to work across both sides simultaneously. The challenge was designing a system where AI handled volume but humans stayed in the loop for anything consequential. Every flow was stress-tested against the coordinator's real working context: high-pressure, high-frequency, often interrupted.",
    keyDecisions: [
      {
        what: "Whether to design primarily for patients or for clinic coordinators",
        killed: "Patient-first marketplace model — research showed patients were already finding their way to clinics; coordinators were the bottleneck",
        constraint: "Existing patient-facing product had been built and was live; pivot needed to preserve patient UX while adding a parallel coordinator layer",
        chosen: "B2B SaaS with coordinators as the primary user — AI agent handles patient-side WhatsApp interactions, coordinator dashboard surfaces everything that needs human attention",
      },
      {
        what: "How to design the AI agent UX so patients trusted it without knowing it was AI",
        killed: "Explicit AI disclosure at every touchpoint — it broke conversational flow and reduced booking completion in early testing",
        constraint: "Healthcare context demands clarity; deception was not an option, but friction wasn't either",
        chosen: "Transparent AI framing at conversation start, then natural interaction without repeated reminders — patients opted in knowingly and then used it as they would any messaging interface",
      },
    ],
    outcomes: [
      { metric: "Booking conversions", result: "32% increase post-launch of redesigned coordinator + AI agent system" },
      { metric: "Clinic operational costs", result: "15% projected reduction based on coordinator time-on-task data" },
    ],
    status: "published",
  },
  {
    id: "connectd-three-sided-platform",
    title: "Designing a Three-Sided B2B Platform at Connectd",
    category: "Platform Design",
    thumbnailAlt: "Connectd platform showing the matching interface for startups, investors, and NEDs",
    problem:
      "Connectd connects startups, investors, and NEDs (non-executive directors) — three user types with fundamentally different goals, mental models, and definitions of value. As the sole lead designer, I inherited a product where onboarding drop-off was high and matching quality was low. The core problem wasn't technical; it was that the product treated three distinct jobs-to-be-done as one.",
    process:
      "I built the design system from scratch to create consistency across all three surfaces, then redesigned onboarding and matching UX for each user type independently before reconnecting them at the platform level. Accessibility was a core requirement throughout — not a post-launch consideration. WCAG 2.1 AA compliance was built into the design system's token structure so it couldn't be accidentally removed as the product evolved.",
    keyDecisions: [
      {
        what: "Whether to build one unified onboarding flow or three separate flows",
        killed: "Unified onboarding — it required too many conditional branches and the result satisfied nobody fully",
        constraint: "Engineering capacity was limited; three full flows meant each had to be tight, not comprehensive",
        chosen: "Three distinct flows with a shared design system — each user type got an experience built around their specific first-session goal",
      },
      {
        what: "How to improve match quality without adding more matching criteria",
        killed: "More filters — users were already overwhelmed by existing options; adding more increased abandonment in testing",
        constraint: "Match algorithm was a black box; design couldn't change the underlying logic, only how it was surfaced",
        chosen: "Redesigned match card to surface the most relevant signal for each user type — startups see traction fit, investors see thesis alignment, NEDs see sector relevance — rather than a generic profile dump",
      },
    ],
    outcomes: [
      { metric: "NED-startup matching", result: "40% improvement in match acceptance rate" },
      { metric: "Onboarding drop-off", result: "21% reduction across all three user types" },
      { metric: "Accessibility", result: "WCAG 2.1 AA delivered — built into design system tokens, not retrofitted" },
    ],
    status: "published",
  },
  {
    id: "vccp-healthcare-design",
    title: "Healthcare Design Strategy at VCCP",
    category: "Design Strategy",
    thumbnailAlt: "Healthcare digital experience showing accessible interface design for Vitality",
    problem:
      "Healthcare and financial services are two of the hardest domains to design for: high stakes, regulated, emotionally loaded, and used by people across a vast range of technical literacy and physical capability. At VCCP, I led design strategy for Vitality, Pension Buddy, and Fidelity — products used by millions — where getting the experience wrong wasn't an edge case, it was a liability.",
    process:
      "My approach across all three clients was the same: accessibility and emotional design as core requirements, not afterthoughts. For Vitality, that meant translating complex clinical workflows into experiences that worked for someone managing a chronic condition under stress. For Pension Buddy and Fidelity, it meant making financial complexity legible without dumbing it down — respecting user intelligence while removing unnecessary cognitive load. In each case, I worked directly with clinical and compliance stakeholders to make sure design decisions held up under regulatory scrutiny as well as user testing.",
    keyDecisions: [
      {
        what: "Whether to simplify clinical and financial content or design better scaffolding around it",
        killed: "Aggressive simplification — in regulated domains, precision matters; oversimplified copy created compliance risk and eroded user trust with more sophisticated audiences",
        constraint: "Dual audience across all products: high-literacy users who needed full detail, lower-literacy users who needed clear entry points",
        chosen: "Progressive disclosure with plain-language summaries as the default and full clinical/financial detail always accessible — both audiences get what they need without compromise",
      },
      {
        what: "How to treat accessibility given client pressure to prioritise visual design",
        killed: "Accessibility as a late-stage QA pass — it consistently failed to meet standards and required expensive rework",
        constraint: "Enterprise clients had legal obligations; WCAG compliance wasn't optional, but design timelines were tight",
        chosen: "Accessibility embedded in the design system from the start — contrast ratios, focus states, and touch targets were non-negotiable constraints, not style decisions",
      },
    ],
    outcomes: [
      { metric: "Reach", result: "Digital experiences designed for millions of users across Vitality, Pension Buddy, and Fidelity" },
      { metric: "Accessibility", result: "WCAG compliance delivered as a built-in requirement across all three clients" },
      { metric: "Approach", result: "Established accessibility and emotional design as default requirements, not optional enhancements — adopted as a working model across the VCCP healthcare practice" },
    ],
    status: "published",
  },
];
