"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Youtube, Radio, Cloud, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import SectionTransition from "@/components/section-transition"

export default function MixesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { src: "/images/mixes.jpg", alt: "DJ Mixes Hero" },
    { src: "/images/dj-mix.jpg", alt: "Live Mix" },
    { src: "/images/ravecave.jpg", alt: "Rave Cave Mix" },
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const latestMixes = [
    {
      id: "pKNEODiRdEk",
      title: "Shangatatu Live at Salty's Kite Village",
      views: "0.8K",
      platform: "YouTube",
      description: "An energetic set from the beautiful Salty's Kite Village.",
    },
    {
      id: "moaLC_1fAFU",
      title: "Shangatatu's BENEATH THE BAOBAB's N.Y.E Sunrise Mix",
      views: "2.5K",
      platform: "YouTube",
      description: "A special sunrise mix recorded live at Beneath The Baobab Festival.",
    },
    {
      id: "Yg3FI1IIfZg",
      title: "Shangatatu Live at Kilifi New Year 2024",
      views: "1.8K",
      platform: "YouTube",
      description: "Relive the magic of Kilifi New Year with this live recording.",
    },
  ]

  const mixSeries = [
    {
      title: "Deep House Sessions Vol. 1",
      platform: "Mixcloud",
      href: "https://www.mixcloud.com/shangatatu/deep-house-sessions-vol-1/",
      image: "/placeholder.svg?height=400&width=600",
      description: "A journey into soulful and melodic deep house.",
    },
    {
      title: "Afro Tech Rhythms",
      platform: "SoundCloud",
      href: "https://www.soundcloud.com/shangatatu/afro-tech-rhythms",
      image: "/placeholder.svg?height=400&width=600",
      description: "Driving beats and tribal sounds from the heart of Africa.",
    },
    {
      title: "Chillout Sunset Vibes",
      platform: "Mixcloud",
      href: "https://www.mixcloud.com/shangatatu/chillout-sunset-vibes/",
      image: "/placeholder.svg?height=400&width=600",
      description: "Perfect for winding down and enjoying the golden hour.",
    },
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return <Youtube className="h-5 w-5 text-secondary" />
      case "Mixcloud":
        return <Radio className="h-5 w-5 text-secondary" />
      case "SoundCloud":
        return <Cloud className="h-5 w-5 text-secondary" />
      default:
        return null
    }
  }

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
            MIXES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
          >
            Dive into my world of sound with live sets, studio mixes, and exclusive tracks.
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
        <section className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Latest Mixes</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Catch up on my most recent live performances and studio sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {latestMixes.map((mix, index) => (
                <div key={mix.id} className="group">
                  <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors h-full flex flex-col">
                    <div className="relative aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${mix.id}?autoplay=0&modestbranding=1&rel=0`}
                        title={mix.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="mb-2 text-xl font-semibold text-white">{mix.title}</h3>
                      <p className="text-gray-400 mb-4 flex-1">{mix.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          {getPlatformIcon(mix.platform)}
                          <span>{mix.platform}</span>
                        </div>
                        <a
                          href={`https://youtu.be/${mix.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-secondary-400 transition-colors flex items-center gap-1"
                        >
                          Watch on YouTube
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Mix Series & Archives Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Mix Series & Archives</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore curated mix series and delve into the archives of my sound.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mixSeries.map((series, index) => (
                <div key={index} className="group">
                  <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors h-full flex flex-col">
                    <div className="relative aspect-video">
                      <ImageWithLoading
                        src={series.image || "/placeholder.svg"}
                        alt={series.title}
                        width={600}
                        height={400}
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="mb-2 text-xl font-semibold text-white">{series.title}</h3>
                      <p className="text-gray-400 mb-4 flex-1">{series.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          {getPlatformIcon(series.platform)}
                          <span>{series.platform}</span>
                        </div>
                        <a
                          href={series.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-secondary-400 transition-colors flex items-center gap-1"
                        >
                          Listen Now
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold gradient-text">Explore More Music</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover my full discography and stay updated with new releases on all major platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-700 text-white text-lg px-8"
                onClick={() => window.open("https://www.mixcloud.com/shangatatu/", "_blank")}
              >
                <Radio className="mr-2 h-4 w-4" />
                Mixcloud
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 bg-transparent"
                onClick={() => window.open("https://www.soundcloud.com/shangatatu", "_blank")}
              >
                <Cloud className="mr-2 h-4 w-4" />
                SoundCloud
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 py-12 bg-gradient-to-b from-black to-blue-950">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">SHANGATATU MUSIC</h3>
              <p className="text-gray-400">© 2025 SHANGATATU. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link
                href="https://www.mixcloud.com/shangatatu/"
                target="_blank"
                className="p-2 hover:text-secondary transition-colors duration-300"
                title="Mixcloud"
              >
                <Radio className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.soundcloud.com/shangatatu"
                target="_blank"
                className="p-2 hover:text-secondary transition-colors duration-300"
                title="SoundCloud"
              >
                <Cloud className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
