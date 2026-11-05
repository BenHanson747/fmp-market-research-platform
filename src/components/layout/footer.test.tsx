import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./footer";
import { Footer as ReexportedFooter } from "@/components/footer";
import { siteConfig, type SiteConfig } from "@/config/site";

describe("Footer Component", () => {
  it("is re-exported from @/components/footer", () => {
    expect(ReexportedFooter).toBe(Footer);
  });

  it("renders default brand name and description", () => {
    render(<Footer />);

    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.description)).toBeInTheDocument();
  });

  it("renders 'Open Source' badge", () => {
    render(<Footer />);

    const badge = screen.getByText(/open source/i);
    expect(badge).toBeInTheDocument();
  });

  it("renders navigation columns and their links", () => {
    render(<Footer />);

    for (const section of siteConfig.footerNav) {
      expect(screen.getByRole("heading", { name: section.title, level: 3 })).toBeInTheDocument();

      for (const item of section.items) {
        const links = screen.getAllByRole("link", { name: new RegExp(`^${item.title}$`, "i") });
        const link = links[0];
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", item.href);

        if (item.external) {
          expect(link).toHaveAttribute("target", "_blank");
          expect(link).toHaveAttribute("rel", "noopener noreferrer");
        } else {
          expect(link).not.toHaveAttribute("target");
        }
      }
    }
  });

  it("enforces rel='noopener noreferrer' on external links", () => {
    const { container } = render(<Footer />);

    const externalAnchors = container.querySelectorAll('a[target="_blank"]');
    expect(externalAnchors.length).toBeGreaterThan(0);
    externalAnchors.forEach((anchor) => {
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders the FMP compliance and zero-liability disclaimers", () => {
    render(<Footer />);

    expect(screen.getByText(siteConfig.disclaimer.fmpCompliance)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.disclaimer.zeroLiability)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.disclaimer.openSource)).toBeInTheDocument();
  });

  it("renders the copyright year and site name", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`©\\s*${currentYear}\\s*${siteConfig.name}\\.`))
    ).toBeInTheDocument();
  });

  it("renders a separator between navigation and disclaimers", () => {
    const { container } = render(<Footer />);

    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator).toBeInTheDocument();
  });

  it("respects developer customization via config prop", () => {
    const customConfig: SiteConfig = {
      name: "Custom Research Hub",
      description: "Custom platform description.",
      links: {
        github: "https://github.com/custom/repo",
        fmpDocs: "https://site.financialmodelingprep.com/developer/docs",
        fmpTerms: "https://site.financialmodelingprep.com/terms-of-service",
      },
      disclaimer: {
        text: "Custom disclaimer summary.",
        fmpCompliance: "Custom FMP Compliance Notice.",
        zeroLiability: "Custom Zero Liability Notice.",
        openSource: "Custom MIT attribution.",
      },
      footerNav: [
        {
          title: "Custom Section",
          items: [
            { title: "Custom Internal", href: "/custom-internal" },
            { title: "Custom External", href: "https://custom.example.com", external: true },
          ],
        },
      ],
    };

    render(<Footer config={customConfig} />);

    // Brand and description
    expect(screen.getByText("Custom Research Hub")).toBeInTheDocument();
    expect(screen.getByText("Custom platform description.")).toBeInTheDocument();

    // Custom nav section and links
    expect(screen.getByRole("heading", { name: "Custom Section", level: 3 })).toBeInTheDocument();
    const internalLink = screen.getByRole("link", { name: "Custom Internal" });
    expect(internalLink).toHaveAttribute("href", "/custom-internal");
    expect(internalLink).not.toHaveAttribute("target");

    const externalLink = screen.getByRole("link", { name: "Custom External" });
    expect(externalLink).toHaveAttribute("href", "https://custom.example.com");
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");

    // Custom disclaimers
    expect(screen.getByText("Custom FMP Compliance Notice.")).toBeInTheDocument();
    expect(screen.getByText("Custom Zero Liability Notice.")).toBeInTheDocument();
    expect(screen.getByText("Custom MIT attribution.")).toBeInTheDocument();
  });

  it("accepts custom className and HTML footer attributes", () => {
    const { container } = render(<Footer className="custom-footer-class" data-testid="footer-root" />);

    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("custom-footer-class");
    expect(footer).toHaveAttribute("data-testid", "footer-root");
  });
});
