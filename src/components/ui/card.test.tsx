import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card";

describe("Card component suite", () => {
  it("renders Card with default size and attributes", () => {
    render(<Card data-testid="card">Card Body</Card>);
    const card = screen.getByTestId("card");

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "default");
    expect(card).toHaveTextContent("Card Body");
  });

  it("renders Card with size='sm' and merges custom className", () => {
    render(
      <Card size="sm" className="custom-card-class" data-testid="card-sm">
        Small Card
      </Card>,
    );
    const card = screen.getByTestId("card-sm");

    expect(card).toHaveAttribute("data-size", "sm");
    expect(card).toHaveClass("custom-card-class");
  });

  it("renders all card subcomponents with data-slot and custom classes", () => {
    render(
      <Card data-testid="composed-card">
        <CardHeader className="custom-header" data-testid="header">
          <CardTitle className="custom-title" data-testid="title">
            Title
          </CardTitle>
          <CardDescription className="custom-desc" data-testid="desc">
            Description
          </CardDescription>
          <CardAction className="custom-action" data-testid="action">
            Action
          </CardAction>
        </CardHeader>
        <CardContent className="custom-content" data-testid="content">
          Content
        </CardContent>
        <CardFooter className="custom-footer" data-testid="footer">
          Footer
        </CardFooter>
      </Card>,
    );

    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-slot", "card-header");
    expect(header).toHaveClass("custom-header");

    const title = screen.getByTestId("title");
    expect(title).toHaveAttribute("data-slot", "card-title");
    expect(title).toHaveClass("custom-title");

    const desc = screen.getByTestId("desc");
    expect(desc).toHaveAttribute("data-slot", "card-description");
    expect(desc).toHaveClass("custom-desc");

    const action = screen.getByTestId("action");
    expect(action).toHaveAttribute("data-slot", "card-action");
    expect(action).toHaveClass("custom-action");

    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-slot", "card-content");
    expect(content).toHaveClass("custom-content");

    const footer = screen.getByTestId("footer");
    expect(footer).toHaveAttribute("data-slot", "card-footer");
    expect(footer).toHaveClass("custom-footer");
  });
});
