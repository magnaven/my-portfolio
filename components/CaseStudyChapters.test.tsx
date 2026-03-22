import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import gsap from "gsap";
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

// Use the AIDA AI case study as the test fixture (2 keyDecisions)
const testStudy = caseStudies[0]; // "aida-ai-b2b-pivot"

// WORK-03: All four chapters render with their content
describe("CaseStudyChapters — WORK-03", () => {
  it("renders a Problem chapter containing the study problem text", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    expect(screen.getByText(testStudy.problem)).toBeInTheDocument();
  });

  it("renders a Process chapter containing the study process text", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    expect(screen.getByText(testStudy.process)).toBeInTheDocument();
  });

  it("renders a Key Decisions chapter section", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    expect(screen.getByText(/key decisions/i)).toBeInTheDocument();
  });

  it("renders an Outcomes chapter section", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    expect(screen.getByText(/outcomes/i)).toBeInTheDocument();
  });
});

// WORK-04: Key decisions render with all four fields (what, killed, constraint, chosen)
describe("CaseStudyChapters — WORK-04", () => {
  it("renders one card per keyDecision entry (2 for AIDA AI)", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    // Each decision has a unique "what" field — assert both are present
    for (const decision of testStudy.keyDecisions) {
      expect(screen.getByText(decision.what)).toBeInTheDocument();
    }
  });

  it("renders the 'killed' field for each decision card", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    for (const decision of testStudy.keyDecisions) {
      expect(screen.getByText(decision.killed)).toBeInTheDocument();
    }
  });

  it("renders the 'constraint' field for each decision card", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    for (const decision of testStudy.keyDecisions) {
      expect(screen.getByText(decision.constraint)).toBeInTheDocument();
    }
  });

  it("renders the 'chosen' field for each decision card", async () => {
    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    for (const decision of testStudy.keyDecisions) {
      expect(screen.getByText(decision.chosen)).toBeInTheDocument();
    }
  });
});

// A11Y-01 / reduceMotion: chapter content renders visibly when prefers-reduced-motion is active
describe("CaseStudyChapters — A11Y-01 / reduceMotion", () => {
  it("renders chapter content at full visibility with reduceMotion=true", async () => {
    vi.mocked(gsap.matchMedia).mockImplementationOnce(() => ({
      add: vi.fn((conditions, callback) => {
        callback({ conditions: { reduceMotion: true } });
      }),
    }));

    const { CaseStudyChapters } = await import("../components/CaseStudyChapters");
    render(<CaseStudyChapters study={testStudy} />);
    // All content must be present — not hidden by animation
    expect(screen.getByText(testStudy.problem)).toBeInTheDocument();
    expect(screen.getByText(testStudy.process)).toBeInTheDocument();
    for (const decision of testStudy.keyDecisions) {
      expect(screen.getByText(decision.what)).toBeInTheDocument();
    }
  });
});
