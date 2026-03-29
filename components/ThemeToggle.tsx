"use client"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
      return
    }

    if (theme === "light") {
      setTheme("dark")
    }
  }

  return (
    <Button variant={"gradient"} onClick={toggleTheme} size={"icon"}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}

export default ThemeToggle
