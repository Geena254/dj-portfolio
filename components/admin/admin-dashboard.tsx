"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LogOut, Image as ImageIcon, Calendar, Music, GalleryVertical, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventsManager from "./events-manager"
import MixesManager from "@/components/admin/mixes-manager"
import GalleryManager from "@/components/admin/gallery-manager"
import HeroSlidesManager from "@/components/admin/hero-slides-manager"
import SiteContentManager from "@/components/admin/site-content-manager"

interface AdminDashboardProps {
  onLogout: () => void
}

type TabType = "events" | "mixes" | "gallery" | "hero" | "content"

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("events")

  const tabs = [
    { id: "events" as TabType, label: "Events", icon: Calendar },
    { id: "mixes" as TabType, label: "Mixes", icon: Music },
    { id: "gallery" as TabType, label: "Gallery", icon: GalleryVertical },
    { id: "hero" as TabType, label: "Hero Slides", icon: ImageIcon },
    { id: "content" as TabType, label: "Site Content", icon: Settings },
  ]

  return (
    <div className="px-4 py-4 sm:px-6 md:px-8 relative bg-gradient-to-b from-black to-primary-900/20 w-full">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-orange-600/20 via-purple-600/40 to-black -z-10" />
      <div className="fixed inset-0 bg-black/80 -z-10" />
      
      <div className="container mx-auto max-w-7xl w-full relative z-10 flex-1 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Admin Dashboard</h1>
            <p className="text-white/60">Manage your portfolio content</p>
          </div>
          <Button
            onClick={onLogout}
            className="mt-4 md:mt-0 bg-white/10 border border-white/20 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 w-full"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2.5 rounded-md transition-all relative flex-shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-secondary/20 to-primary/20 text-white border border-secondary/30 shadow-lg shadow-secondary/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium whitespace-nowrap">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-md -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 w-full"
        >
          {activeTab === "events" && <EventsManager />}
          {activeTab === "mixes" && <MixesManager />}
          {activeTab === "gallery" && <GalleryManager />}
          {activeTab === "hero" && <HeroSlidesManager />}
          {activeTab === "content" && <SiteContentManager />}
        </motion.div>
      </div>
    </div>
  )
}
