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
import { createClient } from "@/lib/supabase/client"

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [events, setEvents] = useState<Array<{
    id: string
    name: string
    location: string
    date: string
    image_url: string | null
    url: string | null
    is_upcoming: boolean
  }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const slides = [
    { src: "/images/dj-event.jpg", alt: "DJ Event Hero" },
    { src: "/images/tomorrowland.jpg", alt: "Tomorrowland" },
    { src: "/images/boogie.jpg", alt: "Boogie Festival" },
  ]

  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error
        setEvents(data || [])
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  // Function to parse date strings and compare with current date
  const parseEventDate = (dateString: string) => {
    // Handle various date formats
    const cleanDate = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1') // Remove ordinal suffixes
    
    // Try different date formats
    const formats = [
      /\b(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})\b/i,
      /\b(\d{4})\b/,
      /\b(\d{1,2})\s*-\s*(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})\b/i,
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})\b/i
    ]
    
    for (const format of formats) {
      const match = cleanDate.match(format)
      if (match) {
        if (format === formats[0]) {
          // "28 Dec 2025" format
          return new Date(`${match[2]} ${match[1]}, ${match[3]}`)
        } else if (format === formats[1]) {
          // "2025" format - assume middle of year
          return new Date(`${match[1]}-06-15`)
        } else if (format === formats[2]) {
          // "23-25 March 2025" format - use start date
          return new Date(`${match[3]} ${match[1]}, ${match[4]}`)
        } else if (format === formats[3]) {
          // "December 2025" format
          return new Date(`${match[1]} 1, ${match[2]}`)
        }
      }
    }
    
    // Fallback to current date if parsing fails
    return new Date()
  }

  // Function to check if an event date has passed
  const isEventPast = (dateString: string) => {
    const eventDate = parseEventDate(dateString)
    const currentDate = new Date()
    return eventDate < currentDate
  }

  // Static fallback data
  const staticPastEvents = [
    {
      id: "static-1",
      name: "Tamarind Dhow Sunset Cruises",
      location: "Mombasa, Kenya",
      date: "Past Event",
      image_url: "/images/placeholder-event.jpg"
    },
    {
      id: "static-2", 
      name: "Muze Open Air (Lost Malindi)",
      location: "Malindi, Kenya",
      date: "Past Event",
      image_url: "/images/placeholder-event.jpg"
    },
    {
      id: "static-3",
      name: "TurnApp Parties & Festivals",
      location: "Various locations",
      date: "Past Event",
      image_url: "/images/placeholder-event.jpg"
    },
    {
      id: "static-4",
      name: "Lantana Galu Diani hotel N.Y.E galas",
      location: "Diani, Kenya",
      date: "Past Event",
      image_url: "/images/placeholder-event.jpg"
    },
    {
      id: "static-5",
      name: "The Backyard Soiree Eldoret",
      location: "Eldoret, Kenya",
      date: "Past Event",
      image_url: "/images/placeholder-event.jpg"
    }
  ]

  const staticUpcomingEvents = [
    {
      id: "static-upcoming-1",
      name: "Wira Goes To The Beach",
      location: "Fisherman's Creek Shanzu, Kenya",
      date: "Sun 28th Dec 2025",
      image_url: "/images/wira event latest.jpg",
      url: "https://turnapp.events/ff2591d0-e104-11f0-bb90-c1f1cf66cf9c",
      is_upcoming: true
    }
  ]

  // Separate events into upcoming and past with fallbacks
  const upcomingEvents = events.length > 0 
    ? events.filter(event => event.is_upcoming && !isEventPast(event.date))
    : staticUpcomingEvents
  
  const pastEvents = events.length > 0
    ? events.filter(event => !event.is_upcoming || isEventPast(event.date))
    : staticPastEvents

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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.03 }}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors h-full">
                    <div className="relative aspect-[4/3] z-0 overflow-hidden rounded-t-2xl">
                      <div className="img-hover-zoom h-full">
                        <ImageWithLoading
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.name}
                          width={263}
                          height={143}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-4">
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
              {upcomingEvents.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No upcoming events scheduled.</p>
                </div>
              )}
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

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-colors bg-black/30"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-1">{event.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="h-3 w-3 text-secondary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <Calendar className="h-3 w-3 text-secondary" />
                        {event.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {pastEvents.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No past events to display.</p>
                  </div>
                )}
              </div>
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
