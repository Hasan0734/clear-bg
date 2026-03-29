"use client"

import { useState } from "react"
import { Sparkles, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = ["Features", "Pricing", "API", "Login"]
  return (
    <nav className="glass fixed top-0 right-0 left-0 z-50 px-4">
      <div className="max-w-5xl mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <div className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-foreground">ClearBg</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </Link>
          ))}

          <div className="flex gap-2">
            <ThemeToggle />

            <Button variant={"gradient"}>Start Free</Button>
          </div>
        </div>

        {/* Mobile */}

        <div className="flex gap-2 md:hidden">
          <ThemeToggle />
          <Button
            size={"icon"}
            variant={"gradient"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="glass animate-fade-in border-t border-border px-4 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l}
              href={`#${l.toLowerCase()}`}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <Button size={"lg"} className="h-10 flex-1 rounded-full">
              Start Free
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
