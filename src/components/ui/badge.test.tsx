import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./badge";

describe("Badge component", () => {
  it("renders children with default slot and styles", () => {
    render(<Badge>New Feature</Badge>);

    const badge = screen.getByText("New Feature");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("supports variants (default, secondary, outline, destructive)", () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>);
    let badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-primary");

    rerender(<Badge variant="secondary">Secondary</Badge>);
    badge = screen.getByText("Secondary");
    expect(badge).toHaveClass("bg-secondary");

    rerender(<Badge variant="outline">Outline</Badge>);
    badge = screen.getByText("Outline");
    expect(badge).toHaveClass("text-foreground");

    rerender(<Badge variant="destructive">Destructive</Badge>);
    badge = screen.getByText("Destructive");
    expect(badge).toHaveClass("bg-destructive");
  });

  it("supports custom className", () => {
    render(<Badge className="custom-badge-class">Custom</Badge>);

    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("custom-badge-class");
  });
});
