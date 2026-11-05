import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "./separator";

describe("Separator component", () => {
  it("renders horizontal separator by default", () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-slot", "separator");
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("supports vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="vertical-separator" />);

    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("supports custom className", () => {
    render(<Separator className="my-custom-separator" />);

    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass("my-custom-separator");
  });
});
