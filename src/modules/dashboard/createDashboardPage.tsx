import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DashboardConfig } from "./types";
import { INDICES } from "./mockData";

export function createDashboardPage(userConfig: DashboardConfig) {
  const pageTitle = userConfig.title ?? "Financial Dashboard";

  const indicesConfig =
    typeof userConfig.majorIndices === "boolean"
      ? {
          enabled: userConfig.majorIndices,
          title: "Major Index Performance",
        }
      : {
          enabled: userConfig.majorIndices ?? true,
          title: userConfig.majorIndices?.title ?? "Major Index Performance",
        };

  return function DashboardPage() {
    return (
      <main className="container mx-auto p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
        </header>

        {indicesConfig.enabled && (
          <section
            aria-labelledby="major-indices-heading"
            className="space-y-4"
          >
            <h2
              id="major-indices-heading"
              className="text-lg font-semibold tracking-tight"
            >
              {indicesConfig.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {INDICES.map((index) => (
                <Card key={index.ticker}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {index.name}
                      </CardTitle>
                      <CardDescription className="text-xs uppercase">
                        {index.ticker}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{index.price}</div>
                    <p
                      className={`text-xs font-medium ${
                        index.isPositive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {index.changePercent}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    );
  };
}
