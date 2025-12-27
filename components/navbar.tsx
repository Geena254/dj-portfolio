"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Calendar, Music, GalleryVertical, Menu, X, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/wira", label: "Wira", icon: Users },
    { href: "/mixes", label: "Mixes", icon: Music },
    { href: "/art-gallery", label: "Artistry", icon: GalleryVertical },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-blur backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2 px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/favicon.ico" alt="Shangatatu Logo" width={28} height={28} />
            <span className="font-bold">SHANGATATU</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 px-6">
            <nav className="flex items-center space-x-6 text-sm font-medium">
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
        </div>

        <div className="md:hidden py-6">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
            >
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden py-6">
            <div className="fixed inset-0 z-40 bg-blur" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm bg-black/80 p-6 animate-in slide-in-from-right-80">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                        <Image src="/images/favicon.ico" alt="Shangatatu Logo" width={28} height={28} />
                        <span className="font-bold">SHANGATATU</span>
                    </Link>
                    <button onClick={() => setIsMenuOpen(false)}><X /></button>
                </div>
                <nav className="mt-8 flex flex-col space-y-4">
                    {routes.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                                "flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-accent",
                                pathname === href ? "bg-accent" : ""
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
      )}
    </header>
  )
}

