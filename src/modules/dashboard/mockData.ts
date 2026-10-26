interface MarketIndex {
  name: string;
  ticker: string;
  price: string;
  changePercent: string;
  isPositive: boolean;
}

export const INDICES: MarketIndex[] = [
  {
    name: "S&P 500",
    ticker: "^GSPC",
    price: "5,864.67",
    changePercent: "+0.45%",
    isPositive: true,
  },
  {
    name: "Nasdaq-100",
    ticker: "^NDX",
    price: "20,387.25",
    changePercent: "+0.82%",
    isPositive: true,
  },
  {
    name: "Dow Jones Industrial Average",
    ticker: "^DJI",
    price: "42,114.40",
    changePercent: "-0.33%",
    isPositive: false,
  },
];
