import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

vi.mock("lenis/react", () => ({
  useLenis: vi.fn(() => ({ scrollTo: vi.fn() })),
}));

vi.mock("gsap", () => ({
  default: {
    matchMedia: () => ({ add: vi.fn() }),
    from: vi.fn(),
    set: vi.fn(),
    registerPlugin: vi.fn(),
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn((cb: () => void) => cb()),
}));

// A11Y-01: nav renders its links (presence check — animation tested visually)
describe("NavBar — A11Y-01", () => {
  it("renders the site name and nav links", async () => {
    const { NavBar } = await import("../components/NavBar");
    render(<NavBar />);
    expect(screen.getByText(/ida dilfer tinker/i)).toBeInTheDocument();
    expect(screen.getByText(/work/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });
});
