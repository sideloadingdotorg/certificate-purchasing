"use client"
import Link from "next/link"
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py=12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[hsl(var(--highlight-white))]" />
            <Link href="mailto:loyahdevapp@icloud.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-1">
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} <span className="text-gradient font-medium">Sideloading.org</span>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
