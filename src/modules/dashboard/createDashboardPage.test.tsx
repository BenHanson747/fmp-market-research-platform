import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createDashboardPage } from "./createDashboardPage";

describe("createDashboardPage", () => {
  describe("Page Title", () => {
    it("should render the default H1 title if the no custom title string is provided in the config", () => {
      const Page = createDashboardPage({
        title: undefined,
      });

      render(<Page />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        /^Financial Dashboard$/,
      );
    });

    it("should render the custom H1 title if a custom title string is provided in the config", () => {
      const Page = createDashboardPage({
        title: "Some Custom String",
      });

      render(<Page />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        /^Some Custom String$/,
      );
    });
  });

  describe("Major Indicies Cards", () => {
    it("should render the Major Indicies Cards by default if no config is provided", () => {
      const Page = createDashboardPage({
        majorIndices: undefined,
      });

      render(<Page />);
      expect(
        screen.getByRole("region", { name: "Major Index Performance" }),
      ).toBeInTheDocument();
    });

    it("should not render the Major Indicies Cards if toggled off in the config (undefined)", () => {
      const Page = createDashboardPage({
        majorIndices: undefined,
      });

      render(<Page />);
      expect(
        screen.queryByRole("region", { name: "Major Index Performance" }),
      ).not.toBeInTheDocument();
    });

    it("should not render the Major Indicies Cards if toggled off in the config (false)", () => {
      const Page = createDashboardPage({
        majorIndices: false,
      });

      render(<Page />);
      expect(
        screen.queryByRole("region", { name: "Major Index Performance" }),
      ).not.toBeInTheDocument();
    });

    it("should not render the Major Indicies Cards if toggled off in the config (false)", () => {
      const Page = createDashboardPage({
        majorIndices: false,
      });

      render(<Page />);
      expect(
        screen.queryByRole("region", { name: "Major Index Performance" }),
      ).not.toBeInTheDocument();
    });
  });
});
