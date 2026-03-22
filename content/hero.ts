// content/hero.ts
// All hero copy — locked before Phase 2. Do not modify after Ida approves.

export const heroCopy = {
  headline: "I've built products from zero. I design like I still own it.",
  credentialLine: "Lead Product Designer · Magna Ventures · AIDA AI · 12 years",
  ctaDesignPartner: "Looking for a design partner?",
  ctaHiring: "Hiring?",
} as const;

export type HeroCopy = typeof heroCopy;
