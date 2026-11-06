import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Header } from "./header";
import { Header as ReexportedHeader } from "@/components/header";
import { siteConfig, type SiteConfig } from "@/config/site";

const mockUsePathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("is re-exported from @/components/header", () => {
    expect(ReexportedHeader).toBe(Header);
  });

  it("renders default brand name, home link, and 'Open Source' badge", () => {
    render(<Header />);

    const homeLink = screen.getByRole("link", { name: new RegExp(siteConfig.name, "i") });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    const badge = screen.getByText(/open source/i);
    expect(badge).toBeInTheDocument();
  });

  it("renders sticky glassmorphic header classes", () => {
    const { container } = render(<Header />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("sticky", "top-0", "z-50", "backdrop-blur");
  });

  it("renders desktop navigation groups and direct links, and opens dropdown content with sub-items and descriptions", async () => {
    render(<Header />);

    // Direct link Watchlist
    const watchlistLinks = screen.getAllByRole("link", { name: /watchlist/i });
    expect(watchlistLinks.length).toBeGreaterThan(0);
    expect(watchlistLinks[0]).toHaveAttribute("href", "/watchlist");

    // Dropdown triggers Markets and Research
    const marketsTrigger = screen.getByRole("button", { name: /markets/i });
    const researchTrigger = screen.getByRole("button", { name: /research/i });
    expect(marketsTrigger).toBeInTheDocument();
    expect(researchTrigger).toBeInTheDocument();

    // Open Markets dropdown
    fireEvent.click(marketsTrigger);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument();
    });

    const overviewLink = screen.getByRole("link", { name: /overview/i });
    expect(overviewLink).toHaveAttribute("href", "/markets");

    const indicesLink = screen.getByRole("link", { name: /indices/i });
    expect(indicesLink).toHaveAttribute("href", "/markets/indices");

    const sectorsLink = screen.getByRole("link", { name: /sectors/i });
    expect(sectorsLink).toHaveAttribute("href", "/markets/sectors");

    // Verify descriptions are rendered for Markets sub-items
    const marketsGroup = siteConfig.mainNav?.find((item) => item.title === "Markets");
    for (const sub of marketsGroup?.items ?? []) {
      if (sub.description) {
        expect(screen.getByText(sub.description)).toBeInTheDocument();
      }
    }

    // Open Research dropdown
    fireEvent.click(researchTrigger);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /screener/i })).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: /financials/i })).toHaveAttribute("href", "/research/financials");
    expect(screen.getByRole("link", { name: /filings/i })).toHaveAttribute("href", "/research/filings");
  });

  it("highlights active route for direct link and grouped navigation based on usePathname()", async () => {
    mockUsePathname.mockReturnValue("/watchlist");
    const { unmount } = render(<Header />);

    const watchlistLink = screen.getByRole("link", { name: /watchlist/i });
    expect(watchlistLink).toHaveAttribute("aria-current", "page");
    unmount();

    mockUsePathname.mockReturnValue("/markets/indices");
    render(<Header />);

    const marketsTrigger = screen.getByRole("button", { name: /markets/i });
    expect(marketsTrigger).toHaveAttribute("data-active", "true");

    fireEvent.click(marketsTrigger);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /indices/i })).toHaveAttribute("aria-current", "page");
    });
  });

  it("renders the ThemeToggle button", () => {
    render(<Header />);

    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it("opens mobile Sheet drawer on trigger click, displays flattened sections and links, and closes when a link is clicked", async () => {
    mockUsePathname.mockReturnValue("/research/screener");
    render(<Header />);

    const openMenuButton = screen.getByRole("button", { name: /open navigation menu/i });
    expect(openMenuButton).toBeInTheDocument();

    fireEvent.click(openMenuButton);

    const mobileNav = await screen.findByRole("navigation", { name: /mobile navigation/i });
    expect(mobileNav).toBeInTheDocument();

    // Check flattened section headings inside mobile nav
    expect(within(mobileNav).getByRole("heading", { name: /markets/i, level: 3 })).toBeInTheDocument();
    expect(within(mobileNav).getByRole("heading", { name: /research/i, level: 3 })).toBeInTheDocument();

    // Check mobile links
    const overviewLink = within(mobileNav).getByRole("link", { name: /^overview$/i });
    expect(overviewLink).toHaveAttribute("href", "/markets");

    const screenerLink = within(mobileNav).getByRole("link", { name: /^screener$/i });
    expect(screenerLink).toHaveAttribute("href", "/research/screener");
    expect(screenerLink).toHaveAttribute("aria-current", "page");

    const watchlistLink = within(mobileNav).getByRole("link", { name: /^watchlist$/i });
    expect(watchlistLink).toHaveAttribute("href", "/watchlist");

    // Clicking a mobile link should close the Sheet drawer
    fireEvent.click(overviewLink);

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    });
  });

  it("respects custom config prop and custom className", () => {
    const customConfig: SiteConfig = {
      name: "Custom Alpha Terminal",
      description: "Custom description",
      links: {
        github: "https://github.com/custom/repo",
        fmpDocs: "https://site.financialmodelingprep.com/developer/docs",
        fmpTerms: "https://site.financialmodelingprep.com/terms-of-service",
      },
      disclaimer: {
        text: "Disclaimer",
        fmpCompliance: "Compliance",
        zeroLiability: "Zero liability",
        openSource: "MIT",
      },
      mainNav: [
        {
          title: "Portfolio",
          href: "/portfolio",
        },
      ],
      footerNav: [],
    };

    const { container } = render(
      <Header config={customConfig} className="custom-header-class" data-testid="header-root" />
    );

    const header = container.querySelector("header");
    expect(header).toHaveClass("custom-header-class");
    expect(header).toHaveAttribute("data-testid", "header-root");
    expect(screen.getByText("Custom Alpha Terminal")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute("href", "/portfolio");
  });

  it("renders desktop direct links and dropdown sub-item links using NavigationMenuLink with data-slot='navigation-menu-link'", async () => {
    render(<Header />);

    const watchlistLink = screen.getByRole("link", { name: /watchlist/i });
    expect(watchlistLink).toHaveAttribute("data-slot", "navigation-menu-link");

    const marketsTrigger = screen.getByRole("button", { name: /markets/i });
    fireEvent.click(marketsTrigger);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument();
    });

    const overviewLink = screen.getByRole("link", { name: /overview/i });
    const indicesLink = screen.getByRole("link", { name: /indices/i });
    expect(overviewLink).toHaveAttribute("data-slot", "navigation-menu-link");
    expect(indicesLink).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("matches nested active routes consistently across desktop and mobile without falsely activating parent overview sub-items", async () => {
    // 1. Nested route under direct link (/watchlist/tech) -> active on both desktop and mobile
    mockUsePathname.mockReturnValue("/watchlist/tech");
    const { unmount: unmountWatchlist } = render(<Header />);

    const desktopWatchlistLink = screen.getByRole("link", { name: /watchlist/i });
    expect(desktopWatchlistLink).toHaveAttribute("aria-current", "page");

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    const mobileNav1 = await screen.findByRole("navigation", { name: /mobile navigation/i });
    const mobileWatchlistLink = within(mobileNav1).getByRole("link", { name: /^watchlist$/i });
    expect(mobileWatchlistLink).toHaveAttribute("aria-current", "page");
    unmountWatchlist();

    // 2. Nested route under sub-item (/research/screener/saved) -> Screener active on both desktop and mobile
    mockUsePathname.mockReturnValue("/research/screener/saved");
    const { unmount: unmountScreener } = render(<Header />);

    const researchTrigger = screen.getByRole("button", { name: /research/i });
    expect(researchTrigger).toHaveAttribute("data-active", "true");
    fireEvent.click(researchTrigger);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /screener/i })).toHaveAttribute("aria-current", "page");
    });

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    const mobileNav2 = await screen.findByRole("navigation", { name: /mobile navigation/i });
    const mobileScreenerLink = within(mobileNav2).getByRole("link", { name: /^screener$/i });
    expect(mobileScreenerLink).toHaveAttribute("aria-current", "page");
    unmountScreener();

    // 3. Sibling route (/markets/indices) -> Indices active, Overview (/markets) NOT active on desktop or mobile
    mockUsePathname.mockReturnValue("/markets/indices");
    render(<Header />);

    const marketsTrigger = screen.getByRole("button", { name: /markets/i });
    fireEvent.click(marketsTrigger);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /indices/i })).toHaveAttribute("aria-current", "page");
    });
    expect(screen.getByRole("link", { name: /overview/i })).not.toHaveAttribute("aria-current");

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    const mobileNav3 = await screen.findByRole("navigation", { name: /mobile navigation/i });
    expect(within(mobileNav3).getByRole("link", { name: /^indices$/i })).toHaveAttribute("aria-current", "page");
    expect(within(mobileNav3).getByRole("link", { name: /^overview$/i })).not.toHaveAttribute("aria-current");
  });

  it("renders external target and rel attributes on external top-level and sub-item links in both desktop and mobile menus", async () => {
    const externalConfig: SiteConfig = {
      ...siteConfig,
      mainNav: [
        {
          title: "External Group",
          href: "/ext-group",
          items: [
            {
              title: "API Docs",
              href: "https://site.financialmodelingprep.com/developer/docs",
              description: "External documentation",
              external: true,
            },
          ],
        },
        {
          title: "GitHub Repo",
          href: "https://github.com/BenHanson747/fmp-market-research-platform",
          external: true,
        },
      ],
    };

    render(<Header config={externalConfig} />);

    // Desktop direct external link
    const desktopRepoLink = screen.getByRole("link", { name: /github repo/i });
    expect(desktopRepoLink).toHaveAttribute("target", "_blank");
    expect(desktopRepoLink).toHaveAttribute("rel", "noopener noreferrer");

    // Desktop sub-item external link
    fireEvent.click(screen.getByRole("button", { name: /external group/i }));
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /api docs/i })).toBeInTheDocument();
    });
    const desktopDocsLink = screen.getByRole("link", { name: /api docs/i });
    expect(desktopDocsLink).toHaveAttribute("target", "_blank");
    expect(desktopDocsLink).toHaveAttribute("rel", "noopener noreferrer");

    // Mobile external links
    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    const mobileNav = await screen.findByRole("navigation", { name: /mobile navigation/i });

    const mobileRepoLink = within(mobileNav).getByRole("link", { name: /^github repo$/i });
    expect(mobileRepoLink).toHaveAttribute("target", "_blank");
    expect(mobileRepoLink).toHaveAttribute("rel", "noopener noreferrer");

    const mobileDocsLink = within(mobileNav).getByRole("link", { name: /^api docs$/i });
    expect(mobileDocsLink).toHaveAttribute("target", "_blank");
    expect(mobileDocsLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render a redundant sr-only label inside the mobile menu trigger button", () => {
    render(<Header />);

    const openMenuButton = screen.getByRole("button", { name: /open navigation menu/i });
    expect(openMenuButton).toHaveAttribute("aria-label", "Open navigation menu");
    expect(openMenuButton.querySelector(".sr-only")).toBeNull();
  });

  it("handles empty array mainNav, fallback '#' hrefs, and closes mobile drawer when a top-level mobile link is clicked", async () => {
    // 1. Config with undefined mainNav
    const emptyNavConfig: SiteConfig = {
      ...siteConfig,
      mainNav: [],
    };
    const { unmount } = render(<Header config={emptyNavConfig} />);
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
    unmount();

    // 2. Config with top-level item without href, and clicking top-level mobile link closes menu
    const fallbackHrefConfig: SiteConfig = {
      ...siteConfig,
      mainNav: [
        {
          title: "Placeholder Link",
        },
      ],
    };
    render(<Header config={fallbackHrefConfig} />);

    const desktopLink = screen.getByRole("link", { name: "Placeholder Link" });
    expect(desktopLink).toHaveAttribute("href", "#");

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    const mobileNav = await screen.findByRole("navigation", { name: /mobile navigation/i });
    const mobileLink = within(mobileNav).getByRole("link", { name: "Placeholder Link" });
    expect(mobileLink).toHaveAttribute("href", "#");

    fireEvent.click(mobileLink);
    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    });
  });
});
