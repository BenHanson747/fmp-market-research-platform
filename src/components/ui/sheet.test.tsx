import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";

describe("Sheet component", () => {
  it("opens SheetContent when SheetTrigger is clicked and closes via close button", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Navigation</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Mobile Menu</SheetTitle>
            <SheetDescription>Navigate across platform sections</SheetDescription>
          </SheetHeader>
          <div>Menu Body</div>
          <SheetFooter>
            <SheetClose>Done</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole("button", { name: /open navigation/i });
    expect(trigger).toHaveAttribute("data-slot", "sheet-trigger");

    fireEvent.click(trigger);

    const title = await screen.findByText("Mobile Menu");
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("data-slot", "sheet-title");

    const description = screen.getByText("Navigate across platform sections");
    expect(description).toHaveAttribute("data-slot", "sheet-description");

    const content = title.closest('[data-slot="sheet-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-side", "right");

    const srCloseButton = screen.getByRole("button", { name: /close/i });
    expect(srCloseButton).toBeInTheDocument();

    fireEvent.click(srCloseButton);

    await waitFor(() => {
      expect(screen.queryByText("Mobile Menu")).not.toBeInTheDocument();
    });
  });

  it("supports custom side prop on SheetContent and closing via SheetClose", async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Drawer</SheetTitle>
            <SheetDescription>Left side drawer</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Dismiss Drawer</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const title = await screen.findByText("Left Drawer");
    const content = title.closest('[data-slot="sheet-content"]');
    expect(content).toHaveAttribute("data-side", "left");

    const closeBtn = screen.getByRole("button", { name: /dismiss drawer/i });
    expect(closeBtn).toHaveAttribute("data-slot", "sheet-close");
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText("Left Drawer")).not.toBeInTheDocument();
    });
  });
});
