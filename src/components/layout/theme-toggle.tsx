"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const handleToggle = (event: Parameters<NonNullable<React.ComponentProps<typeof Button>["onClick"]>>[0]) => {
    const currentTheme = resolvedTheme ?? theme
    setTheme(currentTheme === "dark" ? "light" : "dark")
    onClick?.(event)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={className}
      onClick={handleToggle}
      {...props}
    >
      <Sun
        aria-hidden="true"
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  )
}
