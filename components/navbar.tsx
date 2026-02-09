"use client"

import { useState, useEffect, useRef } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Home, Calendar, Music, GalleryVertical, Menu, X, Users, Settings, Upload, Link2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminModal } from "./admin-portal-modals"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAdminPortal, setShowAdminPortal] = useState(false)
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const adminHoverRef = useRef<NodeJS.Timeout | null>(null)
  const adminRef = useRef<HTMLDivElement>(null)
  const [showAdminLink, setShowAdminLink] = useState(false)


  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/wira", label: "Wira", icon: Users },
    { href: "/mixes", label: "Mixes", icon: Music },
    { href: "/art-gallery", label: "Artistry", icon: GalleryVertical },
    { href: "/admin", icon: Settings },
  ]

  const handleAdminHoverStart = () => {
    if (adminHoverRef.current) clearTimeout(adminHoverRef.current)
    adminHoverRef.current = setTimeout(() => {
      setShowAdminPortal(true)
    }, 3500)
  }

  const handleAdminHoverEnd = () => {
    if (adminHoverRef.current) clearTimeout(adminHoverRef.current)
    setShowAdminPortal(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setShowAdminPortal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleLogoMouseEnter(event: React.MouseEvent<HTMLAnchorElement>): void {
    setShowAdminLink(true)
  }

  function handleLogoMouseLeave(event: React.MouseEvent<HTMLAnchorElement>): void {
    setShowAdminLink(false)
  }

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
          <div
            ref={adminRef}
            className="relative"
            onMouseEnter={handleAdminHoverStart}
            onMouseLeave={handleAdminHoverEnd}
          >
            {showAdminPortal && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-black/95 border border-secondary/30 rounded-lg shadow-lg backdrop-blur-md z-50 overflow-hidden">
                <div className="p-4 border-b border-secondary/20">
                  <h3 className="text-sm font-bold text-secondary">Admin Portal</h3>
                </div>
                <div className="p-2 space-y-1">
                  <Link href="/admin" className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/10 rounded transition-colors">
                    <Settings className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden py-6">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
