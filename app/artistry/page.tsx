"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, Instagram, Youtube, Facebook, X, Music, Headphones, AirplayIcon as Spotify } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionTransition from "@/components/section-transition"
import ImageWithLoading from "@/components/image-with-loading"

const heroImages = [
  { src: "/images/arthead.jpg", alt: "Artistic vision hero image 1" },
  { src: "/images/ravecave.jpg", alt: "Artistic vision hero image 2" },
  { src: "/images/boogie.jpg", alt: "Artistic vision hero image 3" },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/shangatatu_/" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@shangatatu" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/shangatatu" },
  { name: "X", icon: X, href: "https://twitter.com/shangatatu" },
  { name: "Mixcloud", icon: Music, href: "https://www.mixcloud.com/shangatatu/" },
  { name: "SoundCloud", icon: Headphones, href: "https://soundcloud.com/shangatatu" },
  { name: "Spotify", icon: Spotify, href: "https://open.spotify.com/artist/shangatatu" },
]

export default function ArtistryPage() {
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1))
    }, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentHeroImageIndex}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentHeroImageIndex].src || "/placeholder.svg"}
              alt={heroImages[currentHeroImageIndex].alt}
              layout="fill"
              objectFit="cover"
              quality={100}
              className="filter brightness-75"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        <div className="relative z-10 text-center p-8 bg-black bg-opacity-40 rounded-lg backdrop-filter backdrop-blur-lg border border-gray-700 shadow-xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">My Artistic Vision</h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
            Blending sound and visual art into a unique experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-2"
              >
                <link.icon size={24} />
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* My Artistic Vision & Artistic Journey Combined Section */}
      <SectionTransition>
        <section id="artistic-vision" className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-10 bg-purple-600 rounded-full"></div>
                  <h2 className="text-4xl font-bold tracking-tighter text-white">My Artistic Journey & Vision</h2>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-xl text-gray-300 leading-relaxed">
                    My artistic journey is a continuous exploration of sound and visual expression, deeply rooted in
                    African rhythms and contemporary digital art. I believe in creating immersive experiences that
                    transcend traditional boundaries, inviting audiences to connect on a deeper, more spiritual level.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    My vision is to craft sonic landscapes that evoke emotion and movement, complemented by visual
                    narratives that tell stories of heritage, freedom, and the future. Each performance and artwork is a
                    piece of my soul, shared with the world to inspire joy and connection.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Through my work, I aim to bridge cultures and generations, using art as a universal language to
                    foster understanding and celebrate diversity. It's about creating moments of pure enjoyment and
                    leaving a lasting impression that resonates long after the music fades or the canvas is viewed.
                  </p>
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative aspect-video overflow-hidden rounded-2xl glass shadow-lg"
              >
                <div className="img-hover-zoom h-full">
                  <ImageWithLoading
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Artistic Journey Video"
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
              </motion.div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Featured Artworks Section - Updated to Coming Soon */}
      <SectionTransition>
        <section id="featured-artworks" className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-purple-600 rounded-full"></div>
                <h2 className="text-4xl font-bold tracking-tighter text-white">Featured Artworks</h2>
                <div className="h-1 w-10 bg-purple-600 rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A curated selection of my most impactful visual art pieces.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center h-64 bg-white/5 rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-300 mb-4">Featured Artworks Coming Soon!</h3>
              <p className="text-lg text-gray-400 text-center max-w-md">
                I'm currently curating a new collection of visual art. Please check back soon!
              </p>
            </div>
          </div>
        </section>
      </SectionTransition>
    </div>
  )
}
