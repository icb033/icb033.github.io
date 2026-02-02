"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlueprintBackground } from "@/components/blueprint-background"

export function HeroSection() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.remove("dark")
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      <BlueprintBackground />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,transparent_0%,var(--background)_100%)] pointer-events-none opacity-70" />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full border border-border/20 bg-background/40 backdrop-blur-sm hover:bg-background/60 transition-all duration-300"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-foreground/50" />
          ) : (
            <Moon className="h-4 w-4 text-foreground/50" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="text-center max-w-3xl mx-auto">

          {/* Top accent */}
          <div className="opacity-0 animate-fade-in-up flex justify-center mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-steel/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-steel/40" />
              <div className="w-12 h-px bg-steel/30" />
            </div>
          </div>

          {/* Company Name */}
          <div className="opacity-0 animate-fade-in-up animation-delay-200">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">
              Infrastructure Consultant Bureau
            </p>
          </div>

          {/* ICB Logo */}
          <div className="opacity-0 animate-fade-in-up animation-delay-400 my-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-foreground">
              ICB
            </h1>
          </div>

          {/* Divider */}
          <div className="opacity-0 animate-fade-in-up animation-delay-400 flex justify-center mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Tagline */}
          <div className="opacity-0 animate-fade-in-up animation-delay-600">
            <p className="text-base sm:text-lg md:text-xl font-light text-foreground/85 tracking-wide leading-relaxed">
              Engineering the frameworks that carry tomorrow
            </p>
          </div>

          {/* Services */}
          <div className="opacity-0 animate-fade-in-up animation-delay-800 mt-5">
            <p className="text-xs sm:text-sm text-muted-foreground/60 tracking-widest uppercase">
              Bridges &nbsp;&middot;&nbsp; Roads &nbsp;&middot;&nbsp; Flyovers &nbsp;&middot;&nbsp; Structures
            </p>
          </div>

          {/* Status */}
          <div className="opacity-0 animate-fade-in-up animation-delay-1000 mt-16">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-border/40" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber/70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber" />
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70">
                  Site Under Construction
                </span>
              </div>
              <div className="w-8 h-px bg-border/40" />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-3">
        <p className="text-center text-[9px] tracking-[0.2em] uppercase text-muted-foreground/35 font-medium">
          Founded & Led by Supriyolal Bandyopadhyay
        </p>
        <a
          href="mailto:icb033@gmail.com"
          className="text-[9px] tracking-[0.2em] lowercase text-muted-foreground/35 font-medium hover:text-foreground/60 transition-colors duration-300"
        >
          icb033@gmail.com
        </a>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
    </section>
  )
}
