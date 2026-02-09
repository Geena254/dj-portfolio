"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, ExternalLink, Youtube, Radio, Cloud, Instagram, Facebook, Twitter, SproutIcon as Spotify } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import SectionTransition from "@/components/section-transition"
import { createClient } from "@/lib/supabase/client"

export default function MixesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mixes, setMixes] = useState<Array<{
    id: string
    title: string
    platform: string
    platform_id: string
    views: string | null
  }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const slides = [
    { src: "/images/mixes.jpg", alt: "DJ Mixes Hero" },
    { src: "/images/dj-mix.jpg", alt: "Live Performance" },
    { src: "/images/dj-event.jpg", alt: "Event Performance" },
  ]

  // Fetch mixes from database
  useEffect(() => {
    const fetchMixes = async () => {
      try {
        const { data, error } = await supabase
          .from("mixes")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error
        setMixes(data || [])
      } catch (error) {
        console.error("Error fetching mixes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMixes()
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  // Function to get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return Youtube
      case "Spotify":
        return Spotify
      case "Mixcloud":
        return Radio
      case "SoundCloud":
        return Cloud
      default:
        return Youtube
    }
  }

  // Function to get platform URL
  const getPlatformUrl = (platform: string, platformId: string) => {
    switch (platform) {
      case "YouTube":
        return `https://youtu.be/${platformId}`
      case "Spotify":
        return `https://open.spotify.com/track/${platformId}`
      case "Mixcloud":
        return `https://www.mixcloud.com/shangatatu/${platformId}`
      case "SoundCloud":
        return `https://soundcloud.com/shangatatu/${platformId}`
      default:
        return `https://youtu.be/${platformId}`
    }
  }

  // Static fallback mixes
  const staticMixes = [
    {
      id: "static-1",
      title: "Shangatatu Live at Salty's Kite Village",
      views: "0.8K",
      platform: "YouTube",
      platform_id: "pKNEODiRdEk"
    },
    {
      id: "static-2",
      title: "Shangatatu's BENEATH THE BAOBAB's N.Y.E Sunrise Mix",
      views: "2.5K",
      platform: "YouTube",
      platform_id: "moaLC_1fAFU"
    },
    {
      id: "static-3",
      title: "Shangatatu Live at Kilifi New Year 2024",
      views: "1.8K",
      platform: "YouTube",
      platform_id: "Yg3FI1IIfZg"
    },
    {
      id: "static-4",
      title: "Deep House Sessions Vol. 1",
      views: "3.2K",
      platform: "YouTube",
      platform_id: "pKNEODiRdEk"
    },
    {
      id: "static-5",
      title: "Wira Festival 2023 Closing Set",
      views: "4.1K",
      platform: "YouTube",
      platform_id: "moaLC_1fAFU"
    },
    {
      id: "static-6",
      title: "Afro Tech Rhythms Mix",
      views: "2.8K",
      platform: "YouTube",
      platform_id: "Yg3FI1IIfZg"
    }
  ]

  // Use database data if available, otherwise use static fallback
  const displayMixes = mixes.length > 0 ? mixes : staticMixes

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navbar />
      <BackToTop />

      {/* Hero Section */}
      <section className="relative max-h-screen overflow-hidden lg:h-screen">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <ImageWithLoading
                  src={slides[currentSlide].src || "/placeholder.svg"}
                  alt={slides[currentSlide].alt}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex h-screen flex-col items-center justify-center text-center px-4"
        >
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-6xl md:text-8xl font-bold tracking-tighter gradient-text"
          >
            MIXES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
          >
            Dive into the sonic journey with curated mixes from festivals, clubs, and exclusive sessions around the
            world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 bg-transparent"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Latest Mixes Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Latest Mixes</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the energy and rhythm through these carefully crafted mixes from live performances and studio
                sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayMixes.map((mix, index) => {
                const PlatformIcon = getPlatformIcon(mix.platform)
                return (
                  <motion.div
                    key={mix.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <a href={getPlatformUrl(mix.platform, mix.platform_id)} target="_blank" rel="noopener noreferrer" className="block">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="relative aspect-video rounded-2xl glass shadow-lg"
                      >
                        <div className="img-hover-zoom h-full">
                          <ImageWithLoading
                            src={
                              mix.platform === "YouTube"
                                ? `https://img.youtube.com/vi/${mix.platform_id}/maxresdefault.jpg`
                                : "/images/mix-placeholder.jpg"
                            }
                            alt={mix.title}
                            width={1280}
                            height={720}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-16 w-16 rounded-full border-2 bg-black/50 backdrop-blur-sm"
                            >
                              <Play className="h-8 w-8" />
                            </Button>
                          </div>
                        </motion.div>
                        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                          <h3 className="text-lg font-semibold text-white mb-2">{mix.title}</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <PlatformIcon className="h-4 w-4 text-secondary" />
                              <p className="text-sm text-secondary">{mix.platform}</p>
                            </div>
                            {mix.views && (
                              <p className="text-sm text-secondary">{mix.views} views</p>
                            )}
                            <ExternalLink className="h-4 w-4 text-secondary" />
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  </motion.div>
                )
              })}
              {displayMixes.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No mixes available yet.</p>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-6">
                Want to hear more? Follow me on my music platforms for the latest releases and exclusive content.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                  onClick={() => window.open("http://www.youtube.com/@shangatatu", "_blank")}
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </Button>
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                  onClick={() => window.open("https://www.mixcloud.com/shangatatu/", "_blank")}
                >
                  <Radio className="mr-2 h-4 w-4" />
                  Mixcloud
                </Button>
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                  onClick={() => window.open("https://www.soundcloud.com/shangatatu", "_blank")}
                >
                  <Cloud className="mr-2 h-4 w-4" />
                  SoundCloud
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Footer */}
      <footer className="relative px-4 py-12 bg-gradient-to-b from-primary-900/20 to-blue-950">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">SHANGATATU MUSIC</h3>
              <p className="text-gray-400">© 2026 SHANGATATU. All rights reserved.</p>
            </div>
            <div className="space-y-4 text-center md:text-right">
              <h3 className="text-lg font-medium text-white">Connect with me</h3>
              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/shangatatu/", label: "Instagram" },
                  { icon: Youtube, href: "http://www.youtube.com/@shangatatu", label: "YouTube" },
                  { icon: Facebook, href: "https://www.facebook.com/shangatatu3", label: "Facebook" },
                  { icon: Twitter, href: "https://x.com/shangatatu", label: "Twitter/X" },
                  { icon: Radio, href: "https://www.mixcloud.com/shangatatu/", label: "Mixcloud" },
                  { icon: Cloud, href: "https://www.soundcloud.com/shangatatu", label: "SoundCloud" },
                  {
                    icon: Spotify,
                    href: "https://open.spotify.com/user/31dqga7isotqip5czn5j4e3vd7li?si=6e8c0096cee14bdb",
                    label: "Spotify",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 hover:text-secondary transition-colors duration-300"
                    title={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Website designed by{" "}
              <a
                href="https://georginadev.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline inline-flex items-center"
              >
                Georgina <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}
