// content/about.ts
// About narrative — locked before Phase 2. Do not modify after Ida approves.

export const aboutContent = {
  narrative: [
    "I'm a Lead Product Designer who thinks like a founder because I've been in the room when the stakes were real. At Magna Ventures, I designed products that had to work on day one — no runway for a second launch. At AIDA AI, I navigated the slower machinery of scaling, where the challenge isn't the blank page but the thousand constraints already in place. Twelve years of this has taught me that design is a decision-making discipline, not an aesthetic one.",
    "The work I'm proudest of is the work that was hardest to explain. The feature we killed that would have added complexity without value. The constraint that forced a cleaner solution than the unconstrained version would have been. The user flow we simplified because the team finally agreed on what we were actually trying to say. Those moments don't show up in a portfolio screenshot, but they show up in the numbers.",
    "I take on consulting engagements with founding teams and product orgs that want a designer who can hold strategic weight — someone who can move between vision and execution without losing either. If you're hiring, I bring the same founder's mentality to whatever I'm building with you.",
  ],
} as const;

export type AboutContent = typeof aboutContent;
