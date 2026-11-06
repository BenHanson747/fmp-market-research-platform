import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

describe("NavigationMenu component", () => {
  it("renders NavigationMenu, List, Item, Trigger, and Link with appropriate data-slot attributes", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("data-slot", "navigation-menu");

    const trigger = screen.getByRole("button", { name: /getting started/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-slot", "navigation-menu-trigger");

    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("reveals NavigationMenuContent when NavigationMenuTrigger is clicked", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/guide">Market Guide</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const trigger = screen.getByRole("button", { name: /resources/i });
    fireEvent.click(trigger);

    const contentLink = await screen.findByText("Market Guide");
    expect(contentLink).toBeInTheDocument();
    expect(contentLink.closest('[data-slot="navigation-menu-content"]')).toBeInTheDocument();
  });

  it("exports navigationMenuTriggerStyle helper and renders Indicator/Viewport primitives", () => {
    const classes = navigationMenuTriggerStyle();
    expect(typeof classes).toBe("string");
    expect(classes.length).toBeGreaterThan(0);
    expect(NavigationMenuIndicator).toBeDefined();
    expect(NavigationMenuViewport).toBeDefined();

    // Verify NavigationMenuIndicator function executes and returns valid element
    const indicatorElement = NavigationMenuIndicator({ className: "custom-indicator" });
    expect(indicatorElement).toBeTruthy();
  });
});
