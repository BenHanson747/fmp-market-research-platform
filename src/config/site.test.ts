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
});
