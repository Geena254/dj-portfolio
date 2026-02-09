"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Palette, Lightbulb, Instagram, Youtube, Facebook, Twitter, Radio, Cloud, SproutIcon as Spotify, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import SectionTransition from "@/components/section-transition"
import { createClient } from "@/lib/supabase/client"

export default function ArtGalleryPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [galleryImages, setGalleryImages] = useState<Array<{
    id: string
    image_url: string
    alt: string
    section: string | null
    order_index: number
  }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const slides = [
    { src: "/images/artistdj.jpg", alt: "Art Gallery Hero" },
    { src: "/images/djartist.jpg", alt: "Abstract Art" },
    { src: "/images/dj-mix.jpg", alt: "Digital Art" },
  ]

  // Fetch gallery images from database
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery_images")
          .select("*")
          .order("order_index", { ascending: true })

        if (error) throw error
        setGalleryImages(data || [])
      } catch (error) {
        console.error("Error fetching gallery images:", error)
        // Set fallback data on error
        setGalleryImages([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryImages()
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

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
            ARTISTRY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
          >
            Explore the visual art creations that blend traditional African motifs with contemporary digital expression.
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

      {/* Combined Artistic Journey & Vision Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">My Artistic Journey & Vision</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-xl text-gray-300 leading-relaxed">
                  My visual art is an extension of my musical journey, exploring themes of identity, spirituality, and
                  the human connection to nature. I blend traditional African patterns and symbolism with modern digital
                  techniques to create vibrant, thought-provoking pieces.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Each artwork tells a story, inviting viewers to delve deeper into the rich tapestry of African
                  heritage and its contemporary interpretations. It's a dialogue between the past and the future,
                  expressed through color, form, and texture.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Through my art, I aim to bridge cultures and create visual experiences that resonate with the same
                  energy and emotion found in my music. It's about creating a complete sensory journey that speaks to
                  the soul.
                </p>
                <div className="flex flex-wrap gap-4 pt-6">
                  <div className="flex items-center gap-2 text-secondary">
                    <Palette className="h-5 w-5" />
                    <span className="font-medium">Digital & Mixed Media</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <Lightbulb className="h-5 w-5" />
                    <span className="font-medium">Cultural Storytelling</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[14/12] w-full max-w-md mx-auto rounded-2xl glass shadow-xl">
                  <video
                    controls={true}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                    poster="/images/placeholder.jpg"
                  >
                    <source src="/art gallery.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Featured Artworks Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Featured Artworks</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore the visual art creations that blend traditional African motifs with contemporary digital expression.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                <p className="mt-4 text-white/60">Loading gallery...</p>
              </div>
            ) : galleryImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl glass shadow-lg overflow-hidden">
                      <div className="img-hover-zoom h-full">
                        <ImageWithLoading
                          src={image.image_url}
                          alt={image.alt}
                          width={400}
                          height={300}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="absolute bottom-0 w-full p-6">
                          <h3 className="text-lg font-semibold text-white mb-2">{image.alt}</h3>
                          {image.section && (
                            <p className="text-sm text-secondary">Collection: {image.section}</p>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white/5 rounded-2xl border border-white/10 shadow-lg">
                <Palette className="h-24 w-24 text-secondary mb-6" />
                <h3 className="text-3xl font-bold text-gray-300 mb-4 text-center">Featured Artworks Coming Soon!</h3>
                <p className="text-lg text-gray-400 text-center max-w-2xl">
                  Stay tuned for an exclusive showcase of Shangatatu's most impactful visual creations, where traditional
                  African artistry meets contemporary digital expression.
                </p>
              </div>
            )}
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
              <h3 className="text-2xl font-bold gradient-text mb-2">SHANGATATU ART</h3>
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
