// content/contact.ts
// Contact section URLs — update placeholders before launch.

export const contactContent = {
  // BEFORE LAUNCH: Replace with Ida's Cal.com event link (e.g. 'ida/30min')
  calLink: "your-username/intro",

  // BEFORE LAUNCH: Replace with Ida's actual LinkedIn URL
  linkedInUrl: "https://linkedin.com/in/your-profile",
} as const;

export type ContactContent = typeof contactContent;
