export interface NavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface MainNavItem {
  title: string;
  href?: string;
  description?: string;
  external?: boolean;
  items?: NavItem[];
}

export interface FooterNavSection {
  title: string;
  items: NavItem[];
}

export interface SiteDisclaimer {
  text: string;
  fmpCompliance: string;
  zeroLiability: string;
  openSource: string;
}

export interface SiteLinks {
  github: string;
  fmpDocs: string;
  fmpTerms: string;
  [key: string]: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  links: SiteLinks;
  disclaimer: SiteDisclaimer;
  mainNav: MainNavItem[];
  footerNav: FooterNavSection[];
}

export const siteConfig: SiteConfig = {
  name: "FMP Market Research Platform",
  description:
    "An open-source financial analytics and market research dashboard powered by Financial Modeling Prep (FMP) APIs.",
  links: {
    github: "https://github.com/BenHanson747/fmp-market-research-platform",
    fmpDocs: "https://site.financialmodelingprep.com/developer/docs",
    fmpTerms: "https://site.financialmodelingprep.com/terms-of-service",
  },
  disclaimer: {
    text: "Data provided by Financial Modeling Prep. For informational and educational purposes only. Not financial advice.",
    fmpCompliance:
      "Financial data sourced via Financial Modeling Prep (FMP). Users are responsible for supplying their own valid FMP API key and adhering to FMP's Terms of Service and data redistribution policies.",
    zeroLiability:
      "This software is provided 'as is', without warranty of any kind, express or implied. In no event shall the authors or copyright holders be liable for any claim, damages, financial loss, or other liability arising from the use of this platform or reliance on its market data.",
    openSource:
      "This project is open-source software released under the MIT License.",
  },
  mainNav: [
    {
      title: "Markets",
      href: "/markets",
      items: [
        {
          title: "Overview",
          href: "/markets",
          description: "Global market snapshot, major movers, and real-time performance.",
        },
        {
          title: "Indices",
          href: "/markets/indices",
          description: "Track major world equity indices, futures, and benchmarks.",
        },
        {
          title: "Sectors",
          href: "/markets/sectors",
          description: "Sector rotation, industry heatmaps, and relative strength.",
        },
      ],
    },
    {
      title: "Research",
      href: "/research",
      items: [
        {
          title: "Screener",
          href: "/research/screener",
          description: "Filter equities by valuation, fundamentals, and technical metrics.",
        },
        {
          title: "Financials",
          href: "/research/financials",
          description: "Deep-dive income statements, balance sheets, and cash flow statements.",
        },
        {
          title: "Filings",
          href: "/research/filings",
          description: "SEC filings, 10-K/10-Q reports, and institutional transcripts.",
        },
      ],
    },
    {
      title: "Watchlist",
      href: "/watchlist",
    },
  ],
  footerNav: [
    {
      title: "Resources",
      items: [
        {
          title: "GitHub",
          href: "https://github.com/BenHanson747/fmp-market-research-platform",
          external: true,
        },
        {
          title: "FMP API docs",
          href: "https://site.financialmodelingprep.com/developer/docs",
          external: true,
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          title: "FMP Terms",
          href: "https://site.financialmodelingprep.com/terms-of-service",
          external: true,
        },
      ],
    },
  ],
};
