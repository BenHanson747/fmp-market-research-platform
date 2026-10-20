import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./button";

describe("Button component", () => {
  it("renders with default props and forwards standard HTML attributes", () => {
    render(<Button id="custom-button-id">Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("id", "custom-button-id");
  });

  it("appends custom className via class merging", () => {
    render(<Button className="custom-test-class">Styled</Button>);

    const button = screen.getByRole("button", { name: /styled/i });
    expect(button).toHaveClass("custom-test-class");
  });
});
