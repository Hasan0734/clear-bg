"use client"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])
  return (
    <Button
    variant={'gradient'}
      onClick={() => setDarkMode(!darkMode)}
      size={"icon"}
    >
      {darkMode ? <Sun /> : <Moon />}
    </Button>
  )
}

export default ThemeToggle
