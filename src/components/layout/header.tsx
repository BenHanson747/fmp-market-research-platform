"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, TrendingUp } from "lucide-react";
import { siteConfig as defaultSiteConfig, type SiteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  config?: SiteConfig;
}

function isNavLinkActive(pathname: string | null, href?: string): boolean {
  if (!pathname || !href) return false;
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
}

function isSubNavLinkActive(
  pathname: string | null,
  subHref: string,
  parentHref?: string
): boolean {
  if (!pathname) return false;
  return (
    pathname === subHref ||
    (subHref !== "/" &&
      subHref !== parentHref &&
      pathname.startsWith(subHref + "/"))
  );
}

export function Header({
  config = defaultSiteConfig,
  className,
  ...props
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { name } = config;
  const mainNav = config.mainNav;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5">
              <TrendingUp className="size-5 text-primary" aria-hidden="true" />
              <span className="text-lg font-semibold tracking-tight">{name}</span>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex font-normal text-xs">
              Open Source
            </Badge>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNav.map((item) => {
                  if (item.items && item.items.length > 0) {
                    const isGroupActive =
                      isNavLinkActive(pathname, item.href) ||
                      item.items.some((sub) =>
                        isSubNavLinkActive(pathname, sub.href, item.href)
                      );

                    return (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuTrigger
                          data-active={isGroupActive ? "true" : undefined}
                          className={cn(
                            isGroupActive &&
                            "bg-accent/50 text-accent-foreground font-medium"
                          )}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items.map((subItem) => {
                              const isSubActive = isSubNavLinkActive(
                                pathname,
                                subItem.href,
                                item.href
                              );

                              return (
                                <li key={subItem.title}>
                                  <NavigationMenuLink
                                    render={
                                      <Link
                                        href={subItem.href}
                                        target={
                                          subItem.external ? "_blank" : undefined
                                        }
                                        rel={
                                          subItem.external
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                      />
                                    }
                                    active={isSubActive}
                                    aria-current={
                                      isSubActive ? "page" : undefined
                                    }
                                    className={cn(
                                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                      isSubActive &&
                                      "bg-accent/50 text-accent-foreground font-medium"
                                    )}
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {subItem.title}
                                    </div>
                                    {subItem.description && (
                                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    )}
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }

                  const isActive = isNavLinkActive(pathname, item.href);

                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        render={
                          <Link
                            href={item.href ?? "#"}
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                          />
                        }
                        active={isActive}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive &&
                          "bg-accent/50 text-accent-foreground font-medium"
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden"
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-sm overflow-y-auto"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-primary" aria-hidden="true" />
                  <span>{name}</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile navigation menu
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="mt-6 flex flex-col gap-6 px-4"
              >
                {mainNav.map((item) => {
                  if (item.items && item.items.length > 0) {
                    return (
                      <div key={item.title} className="space-y-3">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                          {item.title}
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                          {item.items.map((sub) => {
                            const isSubActive = isSubNavLinkActive(
                              pathname,
                              sub.href,
                              item.href
                            );

                            return (
                              <li key={`${item.title}-${sub.title}`}>
                                <Link
                                  href={sub.href}
                                  target={sub.external ? "_blank" : undefined}
                                  rel={
                                    sub.external
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  onClick={() => setMobileMenuOpen(false)}
                                  aria-current={
                                    isSubActive ? "page" : undefined
                                  }
                                  className={cn(
                                    "block transition-colors hover:text-foreground",
                                    isSubActive
                                      ? "font-medium text-foreground"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }

                  const isActive = isNavLinkActive(pathname, item.href);

                  return (
                    <div key={item.title}>
                      <Link
                        href={item.href ?? "#"}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "block text-sm font-semibold tracking-wider uppercase transition-colors hover:text-foreground",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
