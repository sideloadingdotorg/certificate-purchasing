"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeTest() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show this component after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-card p-2 rounded-md shadow-md text-xs z-50">Current theme: {theme}</div>
  )
}
