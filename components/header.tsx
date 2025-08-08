"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show theme-dependent UI after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="sideloadingdotorg.jpg"
            alt="LoyahDev Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-bold text-xl">Sideloading.org</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/sideloadingdotorg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-[hsl(var(--highlight-purple))] transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="/sign-in"
            className="text-foreground hover:text-[hsl(var(--highlight-purple))] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m6-6l-6 6 6 6" />
            </svg>
            <span className="sr-only">Login</span>
          </Link>
          {/*{mounted && <ModeToggle />}*/}
        </div>
      </div>
    </header>
  )
}
