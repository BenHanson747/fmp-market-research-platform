import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { CopyrightYear } from "./copyright-year";

describe("CopyrightYear Component", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the current full year", () => {
    const currentYear = new Date().getFullYear().toString();
    render(<CopyrightYear />);

    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it("renders the mocked year when system time changes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-06-15T12:00:00Z"));

    render(<CopyrightYear />);

    expect(screen.getByText("2030")).toBeInTheDocument();
  });
});

