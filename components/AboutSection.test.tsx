import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { aboutContent } from "@/content/about";

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

// ABUT-01: AboutSection renders all narrative paragraphs
describe("AboutSection — ABUT-01", () => {
  it("renders the first narrative paragraph", async () => {
    const { AboutSection } = await import("../components/AboutSection");
    render(<AboutSection />);
    expect(screen.getByText(aboutContent.narrative[0])).toBeInTheDocument();
  });

  it("renders the second narrative paragraph", async () => {
    const { AboutSection } = await import("../components/AboutSection");
    render(<AboutSection />);
    expect(screen.getByText(aboutContent.narrative[1])).toBeInTheDocument();
  });

  it("renders the third narrative paragraph", async () => {
    const { AboutSection } = await import("../components/AboutSection");
    render(<AboutSection />);
    expect(screen.getByText(aboutContent.narrative[2])).toBeInTheDocument();
  });
});

// ABUT-02: AboutSection renders a CV download link
describe("AboutSection — ABUT-02", () => {
  it("renders a CV download link with href pointing to the PDF", async () => {
    const { AboutSection } = await import("../components/AboutSection");
    render(<AboutSection />);
    const link = screen.getByRole("link", { name: /cv/i });
    expect(link).toHaveAttribute("href", "/ida-dilfer-tinker-cv.pdf");
  });

  it("CV download link opens in a new tab", async () => {
    const { AboutSection } = await import("../components/AboutSection");
    render(<AboutSection />);
    const link = screen.getByRole("link", { name: /cv/i });
    expect(link).toHaveAttribute("target", "_blank");
  });
});
