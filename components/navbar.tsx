"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Music, ImageIcon, User } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Wira", href: "/wira", icon: User },
    { name: "Mixes", href: "/mixes", icon: Music },
    { name: "Artistry", href: "/art-gallery", icon: ImageIcon },
  ]

  return (
    <>
      {/* Top Header - Desktop Only */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 text-2xl font-bold gradient-text">
                SHANGATATU
              </Link>
            </div>
            <nav>
              <ul className="ml-10 flex items-baseline space-x-8">
                {navLinks.slice(1).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                        pathname === link.href ? "text-secondary bg-secondary/10" : "text-gray-300 hover:text-secondary"
                      }`}
                    >
                      <link.icon className="h-4 w-4" /> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Bottom Navigation - Mobile and Tablet */}
      <nav className="relative bottom-0 left-0 right-0 z-10 md:hidden bg-black/90 backdrop-blur-md border-t border-secondary/20">
        <div className="flex justify-around items-center py-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px] ${
                pathname === link.href ? "text-secondary bg-secondary/10" : "text-gray-400 hover:text-secondary"
              }`}
            >
              <link.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Header - Shows brand name */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-black/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-center px-4">
          <Link href="/" className="text-xl font-bold gradient-text">
            SHANGATATU
          </Link>
        </div>
      </header>
    </>
  )
}
