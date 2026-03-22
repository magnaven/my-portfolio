import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { caseStudies } from "@/data/case-studies";

// Mock GSAP and related plugins — they use browser APIs not available in jsdom
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: vi.fn(() => ({
      add: vi.fn((conditions, callback) => {
        callback({ conditions: { reduceMotion: false } });
      }),
    })),
    set: vi.fn(),
    from: vi.fn(),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({
  default: { create: vi.fn(), refresh: vi.fn() },
}));
vi.mock("lenis/react", () => ({
  useLenis: vi.fn(() => ({ scrollTo: vi.fn() })),
}));

// Mock next/link so href is inspectable in jsdom
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
    <a href={href} {...props}>{children}</a>,
}));

// WORK-01: WorkSection renders cards with title, category, and outcome stat
describe("WorkSection — WORK-01", () => {
  it("renders a list item for each published case study", async () => {
    const { WorkSection } = await import("../components/WorkSection");
    render(<WorkSection />);
    const publishedStudies = caseStudies.filter((s) => s.status === "published");
    expect(publishedStudies.length).toBe(3);
    // Each study should produce at least one visible element with its title
    for (const study of publishedStudies) {
      expect(screen.getByText(study.title)).toBeInTheDocument();
    }
  });

  it("renders the category for each case study card", async () => {
    const { WorkSection } = await import("../components/WorkSection");
    render(<WorkSection />);
    const publishedStudies = caseStudies.filter((s) => s.status === "published");
    for (const study of publishedStudies) {
      expect(screen.getByText(study.category)).toBeInTheDocument();
    }
  });

  it("renders the first outcome stat result for each case study card", async () => {
    const { WorkSection } = await import("../components/WorkSection");
    render(<WorkSection />);
    const publishedStudies = caseStudies.filter((s) => s.status === "published");
    for (const study of publishedStudies) {
      expect(screen.getByText(study.outcomes[0].result)).toBeInTheDocument();
    }
  });
});

// WORK-02: Each card links to /work/[slug] where slug is the case study id
describe("WorkSection — WORK-02", () => {
  it("renders a link to /work/[id] for each case study", async () => {
    const { WorkSection } = await import("../components/WorkSection");
    render(<WorkSection />);
    const publishedStudies = caseStudies.filter((s) => s.status === "published");
    for (const study of publishedStudies) {
      const link = screen.getByRole("link", { name: new RegExp(study.title, "i") });
      expect(link).toHaveAttribute("href", `/work/${study.id}`);
    }
  });
});
