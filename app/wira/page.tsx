"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Users,
  Music,
  ArrowLeft,
  ExternalLink,
  Instagram,
  Ticket,
  Share2,
  Camera,
  Hash,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import LoadingSpinner from "@/components/loading-spinner"

export default function WiraPage() {
  const [isTicketLoading, setIsTicketLoading] = useState(false)
  const [copiedText, setCopiedText] = useState("")

  const handleTicketPurchase = () => {
    setIsTicketLoading(true)
    // Open ticket purchase link in new tab
    window.open('https://turnapp.events/events/parties/shangatatu/wira-90/477a2d80-478a-11f0-99cc-bf0630b4dc0b', '_blank')
    // Simulate loading state for better UX
    setTimeout(() => {
      setIsTicketLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const shareContent = [
    {
      platform: "Instagram Stories",
      hashtag: "#wiraafrika #shangatatu",
      handle: "@_wira_afrika @shangatatu",
    },
    {
      platform: "Instagram Posts",
      hashtag: "wWiraAfrika #shangatatu",
      handle: "@_wira_afrika @shangatatu",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navbar />
      <BackToTop />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithLoading
            src="/images/wira-face.jpg"
            alt="Wira Afrika Event"
            width={1920}
            height={1080}
            className="object-cover h-full w-full"
            priority
          />
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
            WIRA AFRIKA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
          >
            A movement celebrating African culture, music, and community through immersive experiences
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white text-lg px-8 relative overflow-hidden"
              onClick={handleTicketPurchase}
              disabled={isTicketLoading}
            >
              {isTicketLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Redirecting...
                </>
              ) : (
                <>
                  <Ticket className="mr-2 h-4 w-4" />
                  Buy Tickets
                  <ExternalLink className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Button
              size="lg"
              className="group bg-secondary hover:bg-secondary-700 text-white text-lg px-8"
              onClick={() => window.open("https://www.instagram.com/wirainternational/", "_blank")}
            >
              <Instagram className="mr-2 h-4 w-4" />
              Follow Wira Afrika
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
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

      {/* About Wira Section */}
      <section className="relative px-4 py-20 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold tracking-tighter gradient-text">About Wira Afrika</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Wira Afrika is more than just an event series - it's a cultural movement founded by Shangatatu that
                  celebrates the rich heritage of African music, art, and community. Through carefully curated
                  experiences, we create spaces for connection, creativity, and cultural elevation.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  From intimate gatherings to large-scale festivals, Wira Afrika brings together artists, musicians, and
                  culture enthusiasts to celebrate the diversity and beauty of African creativity in all its forms.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-2 text-secondary">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Community Focused</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Music className="h-5 w-5" />
                  <span className="font-medium">Cultural Celebration</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-2xl glass"
            >
              <ImageWithLoading
                src="/images/BK 7.jpg"
                alt="Wira Afrika Community"
                width={600}
                height={600}
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Wira Events */}
      <section className="relative px-4 py-20 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
              <h2 className="text-4xl font-bold gradient-text">Wira Events</h2>
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Celebrating African culture through music, art, and community gatherings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Wira Kilifi 9.0",
                location: "The Terrace, Kilifi, Kenya",
                date: "Coming Soon",
                image: "/images/wira 8.0.jpeg",
                description: "The next chapter in the Wira Afrika journey",
                ticketLink: "https://turnapp.events/events/parties/shangatatu/wira-90/477a2d80-478a-11f0-99cc-bf0630b4dc0b"
              },
              {
                name: "Wira Kilifi 8.0",
                location: "The Terrace, Kilifi, Kenya",
                date: "17th April 2025",
                image: "/images/wira-kilifi.jpg",
                description: "A celebration of coastal culture and electronic music"
              },
              {
                name: "Wira Beach Vibes",
                location: "Fisherman's Creek, Shanzu",
                date: "30th March 2025",
                image: "/images/wira beach vibe.jpg",
                description: "Sunday afternoon vibes by the beach"
              },
              {
                name: "Wira 6.0 Hello Summer Edition",
                location: "Nairobi, Kenya",
                date: "17th August 2024",
                image: "/images/wira-hello.jpg",
                description: "Urban culture meets traditional rhythms"
              },
              {
                name: "Wira Beach Festival",
                location: "Diani Beach, Kenya",
                date: "Planning Phase",
                image: "/placeholder.svg?height=400&width=600",
                description: "A multi-day celebration of African creativity"
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors h-full flex flex-col">
                  <div className="relative aspect-video group">
                    <ImageWithLoading
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      width={600}
                      height={400}
                      className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="mb-2 text-xl font-semibold text-white">{event.name}</h3>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <div className="flex flex-col space-y-2 mt-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="h-4 w-4 text-secondary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4 text-secondary" />
                        {event.date}
                      </div>
                      {event.ticketLink && (
                        <Button
                          size="sm"
                          className="mt-4 bg-secondary hover:bg-secondary-700"
                          onClick={() => window.open(event.ticketLink, '_blank')}
                        >
                          <Ticket className="mr-2 h-4 w-4" />
                          Get Tickets
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Wira Sessions Section */}
      <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
              <h2 className="text-4xl font-bold gradient-text">Share Wira Sessions</h2>
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Help us spread the Wira Afrika movement! Share your experiences and tag us in your posts
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Share Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="glass p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="h-6 w-6 text-secondary" />
                  <h3 className="text-xl font-bold text-white">Share Your Moments</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>📸 Capture the energy and culture of Wira Afrika events</p>
                  <p>🎵 Share your favorite moments from the sets</p>
                  <p>🌍 Show the world African culture in motion</p>
                  <p>🤝 Tag friends who love the movement</p>
                </div>
              </Card>
              <Card className="glass p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Share2 className="h-6 w-6 text-secondary" />
                  <h3 className="text-xl font-bold text-white">How to Share</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-secondary font-bold">1.</span>
                    <span>Post your photos/videos on Instagram or Twitter</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary font-bold">2.</span>
                    <span>Use our hashtags and tag our accounts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary font-bold">3.</span>
                    <span>We'll reshare the best content on our stories!</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Hashtags and Handles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {shareContent.map((content, index) => (
                <Card key={index} className="glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Hash className="h-5 w-5 text-secondary" />
                    <h4 className="text-lg font-semibold text-white">{content.platform}</h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Hashtags:</p>
                      <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
                        <code className="text-secondary text-sm flex-1">{content.hashtag}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(content.hashtag)}
                          className="text-secondary hover:bg-secondary/20"
                        >
                          {copiedText === content.hashtag ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-2">Tag us:</p>
                      <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
                        <code className="text-secondary text-sm flex-1">{content.handle}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(content.handle)}
                          className="text-secondary hover:bg-secondary/20"
                        >
                          {copiedText === content.handle ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Featured Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="glass p-8">
              <h3 className="text-2xl font-bold gradient-text mb-4">Get Featured!</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                The best posts using our hashtags and tags will be featured on our official Instagram stories and posts.
                Show us your Wira Afrika experience and become part of our community showcase!
              </p>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-700 text-white"
                onClick={() => window.open("https://www.instagram.com/_wira_afrika/", "_blank")}
              >
                <Instagram className="mr-2 h-4 w-4" />
                Follow for Features
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold gradient-text">Join the Movement</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Be part of Wira Afrika's journey to celebrate and elevate African culture through music, art, and
              community. Follow us for updates on upcoming events and experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white text-lg px-8"
                onClick={handleTicketPurchase}
                disabled={isTicketLoading}
              >
                {isTicketLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <Ticket className="mr-2 h-4 w-4" />
                    Buy Tickets Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-700 text-white text-lg px-8"
                onClick={() => window.open("https://www.instagram.com/_wira_afrika/", "_blank")}
              >
                <Instagram className="mr-2 h-4 w-4" />
                Follow @_wira_afrika
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8"
                onClick={() => (window.location.href = "mailto:tatushanga@gmail.com")}
              >
                Get Involved
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
              <h3 className="text-2xl font-bold gradient-text mb-2">WIRA AFRIKA</h3>
              <p className="text-gray-400">© 2025 Wira Afrika. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link
                href="https://www.instagram.com/wirainternational/"
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
