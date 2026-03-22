import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock GSAP and Lenis — they use browser APIs not available in jsdom
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: vi.fn(() => ({
      add: vi.fn((conditions, callback) => {
        callback({ conditions: { reduceMotion: false } });
      }),
    })),
    set: vi.fn(),
    timeline: vi.fn(() => ({ from: vi.fn().mockReturnThis() })),
  },
}));
vi.mock("gsap/SplitText", () => ({
  SplitText: { create: vi.fn(() => ({ chars: [] })) },
}));
vi.mock("lenis/react", () => ({
  useLenis: vi.fn(() => ({ scrollTo: vi.fn() })),
}));

// HERO-01: animated headline renders with the founder-lens copy
describe("HeroSection — HERO-01", () => {
  it("renders the headline from heroCopy", async () => {
    const { HeroSection } = await import("../components/HeroSection");
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toBeInTheDocument();
  });
});

// HERO-02: two CTA buttons are present
describe("HeroSection — HERO-02", () => {
  it("renders design partner and hiring CTA buttons", async () => {
    const { HeroSection } = await import("../components/HeroSection");
    render(<HeroSection />);
    expect(
      screen.getByText(/design partner/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/hiring/i)
    ).toBeInTheDocument();
  });
});

// HERO-03: credential line renders
describe("HeroSection — HERO-03", () => {
  it("renders the credential line", async () => {
    const { HeroSection } = await import("../components/HeroSection");
    render(<HeroSection />);
    expect(
      screen.getByText(/magna ventures/i)
    ).toBeInTheDocument();
  });
});

// A11Y-01: scroll-down indicator renders (its animation is suppressed via prefers-reduced-motion)
describe("HeroSection — A11Y-01", () => {
  it("renders scroll-down indicator element", async () => {
    const { HeroSection } = await import("../components/HeroSection");
    render(<HeroSection />);
    expect(
      document.querySelector("[data-testid='scroll-indicator']")
    ).toBeInTheDocument();
  });
});
