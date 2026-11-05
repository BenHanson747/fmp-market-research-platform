import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-sans" }),
}));

import RootLayout from "./layout";

describe("RootLayout", () => {
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

  it("renders the Footer component after main", () => {
    const { container } = render(
      <RootLayout params={Promise.resolve({})}>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );

    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();

    // Verify footer is rendered after main
    expect(main?.nextElementSibling).toBe(footer);
  });

  it("applies min-h-svh, flex, and flex-col to body element", () => {
    const layout = RootLayout({
      children: <div data-testid="child">Test Child</div>,
      params: Promise.resolve({}),
    });

    expect(layout.type).toBe("html");
    const body = layout.props.children;
    expect(body.type).toBe("body");
    expect(body.props.className).toContain("min-h-svh");
    expect(body.props.className).toContain("flex");
    expect(body.props.className).toContain("flex-col");
  });
});
