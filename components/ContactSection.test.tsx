import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
vi.mock("@calcom/embed-react", () => ({ getCalApi: vi.fn(async () => vi.fn()) }));

// CONT-01: ContactSection renders a Cal.com booking button
describe("ContactSection — CONT-01", () => {
  it("renders a button with a data-cal-link attribute", async () => {
    const { ContactSection } = await import("../components/ContactSection");
    render(<ContactSection />);
    const button = screen.getByRole("button", { name: /book|schedule|cal/i });
    expect(button).toHaveAttribute("data-cal-link");
    expect(button.getAttribute("data-cal-link")).toBeTruthy();
  });
});

// CONT-02: ContactSection renders a LinkedIn link
describe("ContactSection — CONT-02", () => {
  it("renders a link with href containing linkedin.com/in/", async () => {
    const { ContactSection } = await import("../components/ContactSection");
    render(<ContactSection />);
    const links = screen.getAllByRole("link");
    const linkedInLink = links.find((l) =>
      l.getAttribute("href")?.includes("linkedin.com/in/")
    );
    expect(linkedInLink).toBeDefined();
  });

  it("LinkedIn link opens in a new tab", async () => {
    const { ContactSection } = await import("../components/ContactSection");
    render(<ContactSection />);
    const links = screen.getAllByRole("link");
    const linkedInLink = links.find((l) =>
      l.getAttribute("href")?.includes("linkedin.com/in/")
    );
    expect(linkedInLink).toHaveAttribute("target", "_blank");
  });
});
