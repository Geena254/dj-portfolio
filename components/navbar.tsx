"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Home, Calendar, Music, GalleryVertical, Menu, X, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAdminLink, setShowAdminLink] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/wira", label: "Wira", icon: Users },
    { href: "/mixes", label: "Mixes", icon: Music },
    { href: "/art-gallery", label: "Artistry", icon: GalleryVertical },
  ]

  const handleLogoMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      setShowAdminLink(true)
    }, 5000) // 5 seconds
  }

  const handleLogoMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    setShowAdminLink(false)
  }

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
      }
    }
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    // Removed overflow manipulation
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-blur backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:justify-center lg:gap-[286px] lg:pl-[86px] lg:pr-[86px]" style={{ boxSizing: 'content-box' }}>
        <div className="flex items-center space-x-2 relative">
          <Link 
            href="/" 
            className="flex items-center space-x-2 relative"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <Image src="/images/favicon.ico" alt="Shangatatu Logo" width={28} height={28} />
            <span className="font-bold">SHANGATATU</span>
          </Link>
          {showAdminLink && (
            <Link
              href="/admin"
              className="absolute left-0 top-full mt-2 flex items-center space-x-2 px-3 py-2 bg-black/90 backdrop-blur-sm border border-white/10 rounded-md text-xs text-white/80 hover:text-white transition-all animate-in fade-in slide-in-from-top-2 z-[100]"
              onClick={(e) => {
                e.preventDefault()
                router.push("/admin")
              }}
            >
              <Settings className="h-3 w-3" />
              <span>Admin</span>
            </Link>
          )}
        </div>

        {/* Desktop Navigation - Hidden on mobile and tablet */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {routes.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center space-x-2 transition-colors hover:text-foreground/80",
                pathname === href ? "text-foreground" : "text-foreground/60"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Hamburger Menu Button - Visible on mobile and tablet */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden px-7 py-2 text-foreground hover:text-foreground/80 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 z-50 bg-black/70 backdrop-blur-lg p-6 animate-in slide-in-from-top-2 lg:hidden border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <Link 
                href="/" 
                className="flex items-center space-x-2 relative" 
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={handleLogoMouseEnter}
                onMouseLeave={handleLogoMouseLeave}
              >
                <Image src="/images/favicon.ico" alt="Shangatatu Logo" width={28} height={28} />
                <span className="font-bold">SHANGATATU</span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-foreground hover:text-foreground/80 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {showAdminLink && (
              <Link
                href="/admin"
                className="mb-6 flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-md text-sm text-white/80 hover:text-white transition-all"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMenuOpen(false)
                  router.push("/admin")
                }}
              >
                <Settings className="h-4 w-4" />
                <span>Admin Portal</span>
              </Link>
            )}
            <nav className="flex flex-col space-y-2">
              {routes.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-md p-3 transition-colors hover:bg-accent/50",
                    pathname === href ? "bg-accent/30 text-foreground" : "text-foreground/70"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  )
}

