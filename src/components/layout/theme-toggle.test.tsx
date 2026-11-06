import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import * as nextThemes from "next-themes"
import { ThemeToggle } from "./theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"

vi.mock("next-themes", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next-themes")>()
  return {
    ...actual,
    useTheme: vi.fn(),
  }
})

describe("ThemeToggle", () => {
  const setThemeMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the toggle button with accessible name "Toggle theme"', () => {
    vi.mocked(nextThemes.useTheme).mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      setTheme: setThemeMock,
      themes: ["light", "dark"],
      forcedTheme: undefined,
      systemTheme: "light",
    })

    render(<ThemeToggle />)

    const button = screen.getByRole("button", { name: /toggle theme/i })
    expect(button).toBeDefined()
    expect(button.getAttribute("aria-label")).toBe("Toggle theme")
    expect(button.querySelector(".sr-only")).toBeNull()

    const icons = button.querySelectorAll("svg")
    expect(icons.length).toBe(2)
    icons.forEach((icon) => {
      expect(icon.getAttribute("aria-hidden")).toBe("true")
    })
  })

  it('calls setTheme("dark") when clicked while theme is "light"', () => {
    vi.mocked(nextThemes.useTheme).mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      setTheme: setThemeMock,
      themes: ["light", "dark"],
      forcedTheme: undefined,
      systemTheme: "light",
    })

    render(<ThemeToggle />)

    const button = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(button)

    expect(setThemeMock).toHaveBeenCalledTimes(1)
    expect(setThemeMock).toHaveBeenCalledWith("dark")
  })

  it('calls setTheme("light") when clicked while theme is "dark"', () => {
    vi.mocked(nextThemes.useTheme).mockReturnValue({
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: setThemeMock,
      themes: ["light", "dark"],
      forcedTheme: undefined,
      systemTheme: "dark",
    })

    render(<ThemeToggle />)

    const button = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(button)

    expect(setThemeMock).toHaveBeenCalledTimes(1)
    expect(setThemeMock).toHaveBeenCalledWith("light")
  })

  it("falls back to theme when resolvedTheme is undefined and invokes custom onClick handler", () => {
    const onClickMock = vi.fn()
    vi.mocked(nextThemes.useTheme).mockReturnValue({
      theme: "dark",
      resolvedTheme: undefined,
      setTheme: setThemeMock,
      themes: ["light", "dark"],
      forcedTheme: undefined,
      systemTheme: undefined,
    })

    render(<ThemeToggle onClick={onClickMock} />)

    const button = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(button)

    expect(setThemeMock).toHaveBeenCalledWith("light")
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it("works properly when wrapped in ThemeProvider", async () => {
    const actual = await vi.importActual<typeof import("next-themes")>("next-themes")
    vi.mocked(nextThemes.useTheme).mockImplementation(actual.useTheme)

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole("button", { name: /toggle theme/i })
    expect(document.documentElement.classList.contains("dark")).toBe(true)

    fireEvent.click(button)
    expect(document.documentElement.classList.contains("light")).toBe(true)
  })
})
