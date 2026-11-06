import { describe, it, expect } from "vitest";
import { siteConfig } from "./site";

describe("siteConfig", () => {
  it("should have basic metadata (name, description)", () => {
    expect(siteConfig).toBeDefined();
    expect(siteConfig.name).toBe("FMP Market Research Platform");
    expect(typeof siteConfig.name).toBe("string");
    expect(siteConfig.description).toBeTruthy();
    expect(typeof siteConfig.description).toBe("string");
  });

  it("should have links containing github, fmpDocs, and fmpTerms", () => {
    expect(siteConfig.links).toBeDefined();
    expect(siteConfig.links.github).toBeDefined();
    expect(siteConfig.links.github).toMatch(/^https?:\/\//);
    expect(siteConfig.links.fmpDocs).toBeDefined();
    expect(siteConfig.links.fmpDocs).toMatch(/^https?:\/\//);
    expect(siteConfig.links.fmpTerms).toBeDefined();
    expect(siteConfig.links.fmpTerms).toMatch(/^https?:\/\//);
  });

  it("should have disclaimer containing legal copy with FMP compliance, zero-liability notice, and open-source terms", () => {
    expect(siteConfig.disclaimer).toBeDefined();
    expect(siteConfig.disclaimer.fmpCompliance).toBeDefined();
    expect(siteConfig.disclaimer.fmpCompliance.toLowerCase()).toContain("financial modeling prep");
    expect(siteConfig.disclaimer.zeroLiability).toBeDefined();
    expect(siteConfig.disclaimer.zeroLiability.toLowerCase()).toContain("liability");
    expect(siteConfig.disclaimer.openSource).toBeDefined();
    expect(siteConfig.disclaimer.openSource.toLowerCase()).toContain("open-source");
    expect(siteConfig.disclaimer.text).toBeDefined();
  });

  it("should have footerNav containing 2 sections: Resources and Legal", () => {
    expect(siteConfig.footerNav).toBeDefined();
    expect(Array.isArray(siteConfig.footerNav)).toBe(true);
    expect(siteConfig.footerNav).toHaveLength(2);

    const sectionTitles = siteConfig.footerNav.map((s) => s.title);
    expect(sectionTitles).toEqual(["Resources", "Legal"]);
  });

  it("should have correct links in Resources section", () => {
    const resourcesSection = siteConfig.footerNav.find((s) => s.title === "Resources");
    expect(resourcesSection).toBeDefined();
    const linkTitles = resourcesSection?.items.map((item) => item.title);
    expect(linkTitles).toContain("GitHub");
    expect(linkTitles).toContain("FMP API docs");
  });

  it("should have correct links in Legal section", () => {
    const legalSection = siteConfig.footerNav.find((s) => s.title === "Legal");
    expect(legalSection).toBeDefined();
    const linkTitles = legalSection?.items.map((item) => item.title);
    expect(linkTitles).toContain("FMP Terms");
  });

  it("should have mainNav with 3 top-level items: Markets, Research, and Watchlist", () => {
    expect(siteConfig.mainNav).toBeDefined();
    expect(Array.isArray(siteConfig.mainNav)).toBe(true);
    expect(siteConfig.mainNav).toHaveLength(3);

    const topLevelTitles = siteConfig.mainNav.map((item) => item.title);
    expect(topLevelTitles).toEqual(["Markets", "Research", "Watchlist"]);
  });

  it("should have Markets top-level item with Overview, Indices, and Sectors sub-items and descriptions", () => {
    const markets = siteConfig.mainNav.find((item) => item.title === "Markets");
    expect(markets).toBeDefined();
    expect(markets?.href).toBe("/markets");
    expect(markets?.items).toBeDefined();
    expect(markets?.items).toHaveLength(3);

    expect(markets?.items?.map((sub) => ({ title: sub.title, href: sub.href }))).toEqual([
      { title: "Overview", href: "/markets" },
      { title: "Indices", href: "/markets/indices" },
      { title: "Sectors", href: "/markets/sectors" },
    ]);

    for (const subItem of markets?.items ?? []) {
      expect(subItem.description).toBeDefined();
      expect(typeof subItem.description).toBe("string");
      expect(subItem.description!.trim().length).toBeGreaterThan(0);
    }
  });

  it("should have Research top-level item with Screener, Financials, and Filings sub-items and descriptions", () => {
    const research = siteConfig.mainNav.find((item) => item.title === "Research");
    expect(research).toBeDefined();
    expect(research?.href).toBe("/research");
    expect(research?.items).toBeDefined();
    expect(research?.items).toHaveLength(3);

    expect(research?.items?.map((sub) => ({ title: sub.title, href: sub.href }))).toEqual([
      { title: "Screener", href: "/research/screener" },
      { title: "Financials", href: "/research/financials" },
      { title: "Filings", href: "/research/filings" },
    ]);

    for (const subItem of research?.items ?? []) {
      expect(subItem.description).toBeDefined();
      expect(typeof subItem.description).toBe("string");
      expect(subItem.description!.trim().length).toBeGreaterThan(0);
    }
  });

  it("should have Watchlist top-level item as a direct link with no sub-items", () => {
    const watchlist = siteConfig.mainNav.find((item) => item.title === "Watchlist");
    expect(watchlist).toBeDefined();
    expect(watchlist?.href).toBe("/watchlist");
    expect(watchlist?.items).toBeUndefined();
  });
});
