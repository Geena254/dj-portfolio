"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Instagram, Facebook, Youtube, Twitter, Radio, Cloud, SproutIcon as Spotify, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import SectionTransition from "@/components/section-transition"

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { src: "/images/dj-event.jpg", alt: "DJ Event Hero" },
    { src: "/images/tomorrowland.jpg", alt: "Tomorrowland" },
    { src: "/images/boogie.jpg", alt: "Boogie Festival" },
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const upcomingEvents = [
    {
      name: "Wira Goes To The Beach",
      location: "Fisherman's Creek Shanzu, Kenya",
      date: "Sun 28th Dec 2025",
      image: "/images/wira event latest.jpg",
      url: "https://turnapp.events/ff2591d0-e104-11f0-bb90-c1f1cf66cf9c",
    }
  ]

  const pastEvents = [
    {
      name: "Journey To The Baobab",
      location: "Beneath The Baobab, Kilifi",
      date: "16th & 17th August 2025",
      image: "/images/jtb dj.jpg",
    },
    {
      name: "Wira 9.0",
      location: "Distant Relatives Lodge, Kilifi",
      date: "2nd August 2025",
      image: "/images/wira-9.0.jpg",
    },
    {
      name: "Wira Beach Vibe",
      location: "Fishermans Creek Shanzu",
      date: "27th July 2025",
      image: "/images/wirabeach.jpg",
    },
    {
      name: "Boogie Festival",
      location: "Arusha, Tanzania",
      date: "23rd - 25th March 2025",
      image: "/images/boogie.jpg",
    },
    {
      name: "Wira Kilifi 8.0",
      location: "The Terrace, Kilifi, Kenya",
      date: "11th December 2023",
      image: "/images/wira 8.0.jpeg",
    },
    {
      name: "Beneath The Baobab Festival",
      location: "Kilifi, Kenya",
      date: "December 2023",
      image: "/images/beneath-the-baobab.jpg",
    },
    {
      name: "The Afters KE",
      location: "Nairobi, Kenya",
      date: "20th January 2024",
      image: "/images/the-afters-ke.jpg",
    },
    {
      name: "Klub House Experience",
      location: "Mombasa, Kenya",
      date: "10th February 2024",
      image: "/images/klub-house-experience.jpg",
    },
    {
      name: "Tomorrowland",
      location: "Boom, Belgium",
      date: "July 2023",
      image: "/images/tomorrowland.jpg",
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
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
            EVENTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
          >
            Catch me live at upcoming shows and relive the energy of past performances.
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

      {/* Upcoming Events Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Upcoming Events</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Don't miss out on the next electrifying performances.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors h-full">
                    <div className="relative aspect-video">
                      <div className="img-hover-zoom h-full">
                        <ImageWithLoading
                          src={event.image || "/placeholder.svg"}
                          alt={event.name}
                          width={600}
                          height={400}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-semibold text-white">{event.name}</h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="h-4 w-4 text-secondary" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="h-4 w-4 text-secondary" />
                          {event.date}
                        </div>
                        {event.url && (
                          <div className="flex items-center gap-2 text-sm text-secondary">
                            <ExternalLink className="h-4 w-4" />
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline break-all"
                            >
                              {event.url}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Past Events Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Past Events</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Relive the moments from memorable festivals and venues.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors h-full">
                    <div className="relative aspect-video">
                      <div className="img-hover-zoom h-full">
                        <ImageWithLoading
                          src={event.image || "/placeholder.svg"}
                          alt={event.name}
                          width={600}
                          height={400}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-semibold text-white">{event.name}</h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="h-4 w-4 text-secondary" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="h-4 w-4 text-secondary" />
                          {event.date}
                        </div>
                        
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary-900/20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold gradient-text">Book SHANGATATU for Your Event</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring the Sultan of Enjoyment to your next festival, club, or private party?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-700 text-white text-lg px-8"
                onClick={() => window.open("https://wa.me/254715781364", "_blank")}
              >
                Contact via WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 bg-transparent"
                onClick={() => window.open("mailto:tatushanga@gmail.com", "_blank")}
              >
                Send an Email
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

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
              <h3 className="text-2xl font-bold gradient-text mb-2">SHANGATATU EVENTS</h3>
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
