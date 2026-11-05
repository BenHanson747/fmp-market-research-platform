import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { siteConfig as defaultSiteConfig, type SiteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyrightYear } from "@/components/layout/copyright-year";
import { cn } from "@/lib/utils";


export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  config?: SiteConfig;
}

export function Footer({
  config = defaultSiteConfig,
  className,
  ...props
}: FooterProps) {
  const { name, description, disclaimer, footerNav } = config;

  return (
    <footer
      className={cn("border-t bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-semibold tracking-tight">{name}</span>
              <Badge variant="secondary" className="font-normal text-xs">
                Open Source
              </Badge>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2">
            {footerNav?.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.title}`}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="size-3.5 opacity-70" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="space-y-4 text-xs text-muted-foreground leading-normal">
          {disclaimer?.fmpCompliance && <p>{disclaimer.fmpCompliance}</p>}
          {disclaimer?.zeroLiability && <p>{disclaimer.zeroLiability}</p>}
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between border-t border-border/40">
            {disclaimer?.openSource && <p>{disclaimer.openSource}</p>}
            <p className="text-muted-foreground/80" suppressHydrationWarning>
              &copy;{" "}
              <Suspense fallback={null}>
                <CopyrightYear />
              </Suspense>{" "}
              {name}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
