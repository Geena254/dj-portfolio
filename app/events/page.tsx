"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowLeft, ExternalLink, Ticket, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"

export default function EventsPage() {
  const pastEvents = [
    {
      name: "Beneath The Baobab Festival",
      location: "Kilifi, Kenya",
      date: "December 2023",
      image: "/images/beneath-the-baobab.jpg",
      description: "A magical New Year's Eve celebration under the stars",
      type: "Festival",
    },
    {
      name: "Wira Kilifi 7.0",
      location: "The Terrace, Kilifi, Kenya",
      date: "11th December 2023",
      image: "/images/wira-kilifi.jpg",
      description: "Celebrating coastal culture and electronic music",
      type: "Cultural Event",
    },
    {
      name: "TomorrowLand Music Festival",
      location: "Boom, Antwerp, Belgium",
      date: "May 2024",
      image: "/images/tomorrowland.jpg",
      description: "One of the world's biggest electronic music festivals",
      type: "International Festival",
    },
    {
      name: "Klub House Experience",
      location: "Tamasha Sports Bar & Grill, Eldoret",
      date: "22nd December 2023",
      image: "/images/klub-house-experience.jpg",
      description: "An intimate club experience with deep house vibes",
      type: "Club Night",
    },
    {
      name: "The Afters KE",
      location: "Kilifi Caves, Kenya",
      date: "3rd January 2024",
      image: "/images/the-afters-ke.jpg",
      description: "Underground vibes in a unique cave setting",
      type: "Underground Event",
    },
  ]

  const upcomingEvents = [
    {
      name: "Wira Nairobi Sessions",
      location: "Nairobi, Kenya",
      date: "March 2025",
      time: "8:00 PM",
      description: "Urban culture meets traditional rhythms in the capital",
      type: "Cultural Event",
      status: "Coming Soon",
    },
    {
      name: "Coastal Vibes Festival",
      location: "Diani Beach, Kenya",
      date: "June 2025",
      time: "All Day",
      description: "A multi-day celebration of African creativity",
      type: "Festival",
      status: "Planning Phase",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navbar />
      <BackToTop />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-primary/40 to-black" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex h-[60vh] flex-col items-center justify-center text-center px-4"
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
            From intimate club nights to international festivals, explore where the music takes us
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8"
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
      <section className="relative px-4 py-32 md:px-6 lg:px-8">
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
                <Card className="overflow-hidden glass shadow-lg border-secondary/30 hover:border-secondary/50 transition-colors">
                  <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-primary/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Ticket className="h-16 w-16 text-secondary mx-auto mb-4" />
                        <span className="text-secondary font-bold text-lg">{event.status}</span>
                      </div>
                    </div>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="relative px-4 py-32 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
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
                    <div className="mb-2">
                      <span className="text-xs text-secondary font-medium bg-secondary/20 px-2 py-1 rounded">
                        {event.type}
                      </span>
                    </div>
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
      <section className="relative px-4 py-32 md:px-6 lg:px-8">
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
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8"
                onClick={() => window.open("https://www.instagram.com/shangatatu/", "_blank")}
              >
                View Portfolio <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 px-4 py-12 bg-black">
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
