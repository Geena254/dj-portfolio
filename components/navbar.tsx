"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/wira", label: "Wira", icon: Users },
    { href: "/mixes", label: "Mixes", icon: Music },
    { href: "/art-gallery", label: "Artistry", icon: GalleryVertical },
  ]

  const adminOptions = [
    { label: "Upload Images to Gallery", icon: Upload, action: () => setOpenModal("gallery") },
    { label: "Add Videos to Wira", icon: Plus, action: () => setOpenModal("video") },
    { label: "Add Mix Links", icon: Link2, action: () => setOpenModal("mix") },
    { label: "Add Events", icon: Calendar, action: () => setOpenModal("event") },
    { label: "General Updates", icon: Settings, action: () => setOpenModal("update") },
  ]

  const handleModalSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    try {
      let endpoint = ""
      let payload = data

      if (openModal === "gallery") {
        endpoint = "/api/gallery"
      } else if (openModal === "video") {
        endpoint = "/api/wira-videos"
      } else if (openModal === "mix") {
        endpoint = "/api/mixes"
      } else if (openModal === "event") {
        endpoint = "/api/events"
      } else if (openModal === "update") {
        endpoint = "/api/updates"
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to save data")
      }

      alert("Data saved successfully!")
      setOpenModal(null)
    } catch (error) {
      console.error("[v0] Error saving data:", error)
      alert("Failed to save data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
            <button className="flex items-center space-x-2 text-sm font-medium text-foreground/60 hover:text-foreground/80 transition-colors px-3 py-2">
              <Settings className="h-5 w-5" />
            </button>
            {showAdminPortal && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-black/95 border border-secondary/30 rounded-lg shadow-lg backdrop-blur-md z-50 overflow-hidden">
                <div className="p-4 border-b border-secondary/20">
                  <h3 className="text-sm font-bold text-secondary">Admin Portal</h3>
                </div>
                <div className="p-2 space-y-1">
                  {adminOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        option.action()
                        setShowAdminPortal(false)
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/10 rounded transition-colors"
                    >
                      <option.icon className="h-4 w-4 text-secondary" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <AdminModal
          isOpen={openModal === "gallery"}
          onClose={() => setOpenModal(null)}
          title="Upload Images to Gallery"
          onSubmit={handleModalSubmit}
          loading={loading}
        />
        <AdminModal
          isOpen={openModal === "video"}
          onClose={() => setOpenModal(null)}
          title="Add Videos to Wira"
          onSubmit={handleModalSubmit}
          loading={loading}
        />
        <AdminModal
          isOpen={openModal === "mix"}
          onClose={() => setOpenModal(null)}
          title="Add Mix Links"
          onSubmit={handleModalSubmit}
          loading={loading}
        />
        <AdminModal
          isOpen={openModal === "event"}
          onClose={() => setOpenModal(null)}
          title="Add Events"
          onSubmit={handleModalSubmit}
          loading={loading}
        />
        <AdminModal
          isOpen={openModal === "update"}
          onClose={() => setOpenModal(null)}
          title="General Updates"
          onSubmit={handleModalSubmit}
          loading={loading}
        />
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
