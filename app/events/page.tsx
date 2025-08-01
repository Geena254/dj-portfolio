"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, ArrowLeft, Ticket, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Events-specific slides with zoom effect
  const slides = [
    { src: "/images/dj-back.jpg", alt: "DJ Events" },
    { src: "/images/boogie.jpg", alt: "Boogie Festival" },
    { src: "/images/beneath-the-baobab.jpg", alt: "Beneath The Baobab" },
    { src: "/images/tomorrowland.jpg", alt: "Tomorrowland" },
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const pastEvents = [
    {
      name: "Boogie Festival",
      location: "Arusha, Tanzania",
      date: "23rd - 25th March 2025",
      image: "/images/boogie.jpg",
      description: "Boogie in the Bushes",
    },
    {
      name: "RaveCave Nights",
      location: "Nyali behind Naivas Mall",
      date: "21st June 2025",
      image: "/images/ravecave.jpg",
      description: "Heavy SPACE NIGHTS edition",
    },
    {
      name: "Wira Kilifi 8.0",
      location: "The Terrace, Kilifi, Kenya",
      date: "11th April 2025",
      image: "/images/wira-post.jpg",
      description: "Celebrating coastal culture and electronic music",
    },
    {
      name: "Beneath The Baobab Festival",
      location: "Kilifi, Kenya",
      date: "December 2023",
      image: "/images/beneath-the-baobab.jpg",
      description: "A magical New Year's Eve celebration under the stars",
    },
    {
      name: "Wira Kilifi 7.0",
      location: "The Terrace, Kilifi, Kenya",
      date: "11th December 2024",
      image: "/images/wira-kilifi.jpg",
      description: "Celebrating coastal culture and electronic music",
    },
    {
      name: "TomorrowLand Music Festival",
      location: "Boom, Antwerp, Belgium",
      date: "May 2024",
      image: "/images/tomorrowland.jpg",
      description: "One of the world's biggest electronic music festivals",
    },
    {
      name: "Klub House Experience",
      location: "Tamasha Sports Bar & Grill, Eldoret",
      date: "22nd December 2023",
      image: "/images/klub-house-experience.jpg",
      description: "An intimate club experience with deep house vibes",
    },
    {
      name: "The Afters KE",
      location: "Kilifi Caves, Kenya",
      date: "3rd January 2024",
      image: "/images/the-afters-ke.jpg",
      description: "Underground vibes in a unique cave setting",
    },
  ]

  const upcomingEvents = [
    {
      name: "Wira 9.0",
      location: "Distant Relatives, Kilifi",
      date: "August 1st, 2025",
      time: "8:00 PM",
      description: "Urban culture meets traditional rhythms in the capital",
      type: "Cultural Event",
      image: "/images/wira-9.0.jpg",
      status: "Tap to purchase tickets",
      link: "https://turnapp.events/events/parties/shangatatu/wira-90/477a2d80-478a-11f0-99cc-bf0630b4dc0b?fbclid=PAZXh0bgNhZW0CMTEAAacR8PM5RV2qlS0U3RrLqoYjbyLrL1iS08Br8pXfY7-f5zws3EGBSm-cOgS51Q_aem_EJrOGsDUjls1j27V9pk9nQ",
    },
    {
      name: "Sun. Sand. Sound.",
      location: "Nyali International Beach Hotel",
      date: "August 2nd, 2025",
      time: "3PM – 6AM",
      description: "This is where African rhythm meets beach luxury.",
      type: "Beach Luxury Event",
      image: "/images/sunsand.webp",
      status: "Tap to purchase tickets",
      link: "https://sunsandandsound.hustlesasa.shop/?fbclid=PAZXh0bgNhZW0CMTEAAaebLzj4d18DehCTQWeUaJKWzTs1GtCwhkNDdVEywstFRkaFGnerUTnUxlcmng_aem_WP9CN3FZMA51LfJYQWFipw",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navbar />
      <BackToTop />

      {/* Hero Section with Zoom Effect */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <ImageWithLoading
                  src={slides[currentSlide].src || "/placeholder.svg"}
                  alt={slides[currentSlide].alt}
                  width={1920}
                  height={1080}
                  className="object-cover h-full w-full"
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
            From intimate club nights to international festivals, explore where the music takes us.
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
      <section className="py-14 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
              <h2 className="text-4xl font-bold gradient-text">Upcoming Events</h2>
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay tuned for upcoming performances and cultural celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={event.link} target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden glass shadow-lg border-secondary/30 hover:border-secondary/50 transition-colors group">
                    <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-primary/20">
                      <ImageWithLoading
                        src={event.image || "/placeholder.svg"}
                        alt={event.name}
                        width={600}
                        height={400}
                        className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2">
                        <span className="text-xs text-secondary font-medium bg-secondary/20 px-2 py-1 rounded">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-white">{event.name}</h3>
                      <p className="text-gray-400 mb-4">{event.description}</p>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Ticket className="h-4 w-4 text-secondary" />
                          {event.status}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="h-4 w-4 text-secondary" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="h-4 w-4 text-secondary" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="h-4 w-4 text-secondary" />
                          {event.time}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-10 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
              <h2 className="text-4xl font-bold gradient-text">Past Events</h2>
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Relive the magic of past performances and celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors group">
                  <div className="relative aspect-video">
                    <ImageWithLoading
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      width={600}
                      height={400}
                      className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-white">{event.name}</h3>
                    <p className="text-gray-400 mb-4">{event.description}</p>
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

      {/* Booking Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold gradient-text">Book Shangatatu</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring the energy to your event? Get in touch to discuss bookings for festivals, clubs, private
              events, and cultural celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-700 text-white text-lg px-8"
                onClick={() => (window.location.href = "mailto:tatushanga@gmail.com")}
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-12 bg-black">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">SHANGATATU</h3>
              <p className="text-gray-400">© 2025 SHANGATATU THE DJ. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
