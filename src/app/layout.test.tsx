import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-sans" }),
}));

import RootLayout, { metadata } from "./layout";
import { siteConfig } from "@/config/site";

describe("RootLayout", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders children wrapped in a main element with flex-1", () => {
    const { container } = render(
      <RootLayout params={Promise.resolve({})}>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("flex-1");
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders Header before main and Footer after main", () => {
    const { container } = render(
      <RootLayout params={Promise.resolve({})}>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );

    const header = container.querySelector("header");
    const main = container.querySelector("main");
    const footer = container.querySelector("footer");

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    // Verify header is rendered before main and footer is rendered after main
    expect(header?.nextElementSibling).toBe(main);
    expect(main?.nextElementSibling).toBe(footer);
  });

  it("applies suppressHydrationWarning to html and min-h-svh, flex, and flex-col to body element", () => {
    const layout = RootLayout({
      children: <div data-testid="child">Test Child</div>,
      params: Promise.resolve({}),
    });

    expect(layout.type).toBe("html");
    expect(layout.props.suppressHydrationWarning).toBe(true);
    const body = layout.props.children;
    expect(body.type).toBe("body");
    expect(body.props.className).toContain("min-h-svh");
    expect(body.props.className).toContain("flex");
    expect(body.props.className).toContain("flex-col");
  });

  it("exports metadata configured with siteConfig.name and siteConfig.description", () => {
    expect(metadata.title).toBe(siteConfig.name);
    expect(metadata.description).toBe(siteConfig.description);
  });
});

