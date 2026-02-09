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
import { categorizeEvents, parseEventDate } from "@/lib/event-utils"
import type { Event } from "@/lib/event-utils"

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // Static fallback events
  const staticFallbackEvents: Event[] = [
    {
      id: "1",
      title: "Wira Goes To The Beach",
      event_date: "Sun 28th Dec 2025",
      location: "Fisherman's Creek Shanzu, Kenya",
      image_url: "/images/wira event latest.jpg",
      link_url: "https://turnapp.events/ff2591d0-e104-11f0-bb90-c1f1cf66cf9c",
      description: "Experience the ultimate beach gathering with Shangatatu",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Journey To The Baobab",
      event_date: "16th & 17th August 2025",
      location: "Beneath The Baobab, Kilifi",
      image_url: "/images/jtb dj.jpg",
      link_url: "",
      description: "A journey to the iconic baobab tree with world-class DJs",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Wira 9.0",
      event_date: "2nd August 2025",
      location: "Distant Relatives Lodge, Kilifi",
      image_url: "/images/wira-9.0.jpg",
      link_url: "",
      description: "Ninth edition of the legendary Wira event",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Wira Beach Vibe",
      event_date: "27th July 2025",
      location: "Fishermans Creek Shanzu",
      image_url: "/images/wirabeach.jpg",
      link_url: "",
      description: "A beach gathering with vibrant energy and top-tier music",
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Boogie Festival",
      event_date: "23rd - 25th March 2025",
      location: "Arusha, Tanzania",
      image_url: "/images/boogie.jpg",
      link_url: "",
      description: "Three days of non-stop boogie and electronic music",
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Wira Kilifi 8.0",
      event_date: "11th December 2023",
      location: "The Terrace, Kilifi, Kenya",
      image_url: "/images/wira 8.0.jpeg",
      link_url: "",
      description: "The eighth edition at the beautiful Terrace venue",
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      title: "Beneath The Baobab Festival",
      event_date: "December 2023",
      location: "Kilifi, Kenya",
      image_url: "/images/beneath-the-baobab.jpg",
      link_url: "",
      description: "Festival experience under the ancient baobab",
      created_at: new Date().toISOString(),
    },
    {
      id: "8",
      title: "The Afters KE",
      event_date: "20th January 2024",
      location: "Nairobi, Kenya",
      image_url: "/images/the-afters-ke.jpg",
      link_url: "",
      description: "After-party experience in Nairobi",
      created_at: new Date().toISOString(),
    },
    {
      id: "9",
      title: "Klub House Experience",
      event_date: "10th February 2024",
      location: "Mombasa, Kenya",
      image_url: "/images/klub-house-experience.jpg",
      link_url: "",
      description: "Underground house music experience",
      created_at: new Date().toISOString(),
    },
    {
      id: "10",
      title: "Tomorrowland",
      event_date: "July 2023",
      location: "Boom, Belgium",
      image_url: "/images/tomorrowland.jpg",
      link_url: "",
      description: "World's largest electronic dance music festival",
      created_at: new Date().toISOString(),
    },
  ]

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

  // Fetch events from Supabase and categorize them
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/events")
        let eventsToUse: Event[] = []

        if (!response.ok) {
          console.warn("[v0] Failed to fetch from Supabase, using static events")
          eventsToUse = staticFallbackEvents
        } else {
          const events = await response.json()
          
          // Use static events if API returns empty array
          if (!events || events.length === 0) {
            console.log("[v0] Supabase returned no events, using static fallback")
            eventsToUse = staticFallbackEvents
          } else {
            // Transform Supabase data to match expected format
            eventsToUse = events.map((event: Event) => ({
              ...event,
              name: event.title,
              date: event.event_date,
              image: event.image_url,
              url: event.link_url,
            }))
          }
        }

        // Categorize events
        const { upcoming, past } = categorizeEvents(eventsToUse)
        setUpcomingEvents(upcoming)
        setPastEvents(past)
      } catch (error) {
        console.error("[v0] Error fetching events:", error)
        // Fallback to static events if fetch fails
        const { upcoming, past } = categorizeEvents(staticFallbackEvents)
        setUpcomingEvents(upcoming)
        setPastEvents(past)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

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

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-secondary"></div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-400">No upcoming events scheduled yet. Check back soon!</p>
              </div>
            ) : (
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
                            alt={event.name || event.title || "Event image"}
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
            )}
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

            {pastEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-400">No past events to display.</p>
              </div>
            ) : (
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
                            alt={event.name || event.title || "Event image"}
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
            )}
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
