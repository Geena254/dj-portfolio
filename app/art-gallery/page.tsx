"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Palette, Lightbulb, Play, Instagram } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import SectionTransition from "@/components/section-transition"

export default function ArtGalleryPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { src: "/images/arthead.jpg", alt: "Art Gallery Hero" },
    { src: "/images/BK 7.jpg", alt: "Abstract Art" },
    { src: "/images/dj-mix.jpg", alt: "Digital Art" },
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const artworks = [
    {
      title: "Ancestral Visions",
      description: "Digital collage exploring spiritual connections and heritage.",
      image: "/placeholder.svg?height=600&width=600",
      year: "2023",
    },
    {
      title: "Coastal Rhythms",
      description: "Mixed media on canvas inspired by Swahili culture and ocean sounds.",
      image: "/placeholder.svg?height=600&width=600",
      year: "2022",
    },
    {
      title: "Techno Tribal",
      description: "Digital illustration fusing traditional African motifs with futurism.",
      image: "/placeholder.svg?height=600&width=600",
      year: "2024",
    },
    {
      title: "Desert Bloom",
      description: "Vibrant abstract piece depicting life in arid landscapes.",
      image: "/placeholder.svg?height=600&width=600",
      year: "2023",
    },
    {
      title: "Urban Echoes",
      description: "A dynamic piece reflecting the energy of city life.",
      image: "/placeholder.svg?height=600&width=600",
      year: "2024",
    },
    {
      title: "Cosmic Dance",
      description: "An ethereal artwork exploring the harmony of the universe.",
      image: "/placeholder.svg?height=600&width=600",
      year: "2024",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navbar />
      <BackToTop />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative h-full w-full overflow-hidden">
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

      {/* Video Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Artistic Journey</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A glimpse into the creative process and inspiration behind the art.
              </p>
            </div>
            <div className="relative aspect-[9/16] w-full max-w-md mx-auto rounded-2xl overflow-hidden glass shadow-xl">
              <video controls className="w-full h-full object-cover" poster="/placeholder.svg?height=1280&width=720">
                <source src="/placeholder.svg?height=1280&width=720" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                <Play className="h-16 w-16 text-white opacity-70" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: This is a placeholder video. Please replace the source with your actual video.
            </p>
          </div>
        </section>
      </SectionTransition>

      {/* Artistic Vision Section (Text Only) */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold tracking-tighter gradient-text">My Artistic Vision</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-invert max-w-none mx-auto"
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
              </motion.div>
              <div className="flex flex-wrap gap-4 pt-6 justify-center">
                <div className="flex items-center gap-2 text-secondary">
                  <Palette className="h-5 w-5" />
                  <span className="font-medium">Digital & Mixed Media</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Lightbulb className="h-5 w-5" />
                  <span className="font-medium">Cultural Storytelling</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Featured Artworks Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Featured Artworks</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A selection of my most recent and impactful visual creations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {artworks.map((artwork, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden glass shadow-lg border-white/10 hover:border-secondary/30 transition-colors h-full">
                    <div className="relative aspect-square">
                      <div className="img-hover-zoom h-full">
                        <ImageWithLoading
                          src={artwork.image || "/placeholder.svg"}
                          alt={artwork.title}
                          width={600}
                          height={600}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-secondary transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-gray-400 mb-2">{artwork.description}</p>
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <Lightbulb className="h-4 w-4" />
                        {artwork.year}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Footer */}
      <footer className="relative px-4 py-12 bg-gradient-to-b from-black to-blue-950">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">SHANGATATU ART</h3>
              <p className="text-gray-400">© 2025 SHANGATATU. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link
                href="https://www.instagram.com/shangatatu/"
                target="_blank"
                className="p-2 hover:text-secondary transition-colors duration-300"
                title="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
