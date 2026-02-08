"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink,
  Instagram,
  Facebook,
  Users,
  Lightbulb,
  Music,
  Youtube,
  Twitter,
  Radio,
  Cloud,
  AirplayIcon as Spotify,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import SectionTransition from "@/components/section-transition"

export default function WiraPage() {
  const wiraEvents = [
    {
      name: "Wira Kilifi 9.0",
      location: "The Terrace, Kilifi, Kenya",
      date: "10th December 2024",
      image: "/images/wira-9.0.jpg",
      description: "The latest edition of Wira, celebrating African dance music by the coast.",
    },
    {
      name: "Wira Nairobi Takeover",
      location: "The Alchemist, Nairobi, Kenya",
      date: "25th October 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Bringing the Wira energy to the capital city for an unforgettable night.",
    },
    {
      name: "Wira Beach Vibe",
      location: "Diani Beach, Kenya",
      date: "12th July 2024",
      image: "/images/wira beach vibe.jpg",
      description: "A special daytime session with deep house and afro beats by the ocean.",
    },
    {
      name: "Wira Kilifi 9.0",
      location: "The Terrace, Kilifi, Kenya",
      date: "10th December 2024",
      image: "/images/wira-9.0.jpg",
      description: "The latest edition of Wira, celebrating African dance music by the coast.",
    },
  ]

  const wiraPhilosophy = [
    {
      title: "Community & Connection",
      description: "Fostering a vibrant community around African dance music and alternative art.",
      icon: "Users",
    },
    {
      title: "Cultural Elevation",
      description: "Promoting and celebrating the rich cultural heritage of Africa through music and art.",
      icon: "Lightbulb",
    },
    {
      title: "Movement & Expression",
      description: "Creating spaces where individuals can freely express themselves through dance and creativity.",
      icon: "Music",
    },
  ]

  const wiraGalleryImages = [
    { src: "/images/079A2965.jpg", alt: "Wira 9.0" },
    { src: "/images/079A2980.jpg", alt: "Wira 9.0" },
    { src: "/images/079A2985.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3040.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3046.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3021.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3023.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3039.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3032.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3051.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3052.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3056.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3057.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3060.jpg", alt: "Wira 9.0" },
    { src: "/images/079A3061.jpg", alt: "Wira 9.0" },
  ]

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-6 w-6 text-secondary" />
      case "Lightbulb":
        return <Lightbulb className="h-6 w-6 text-secondary" />
      case "Music":
        return <Music className="h-6 w-6 text-secondary" />
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
      <section className="relative max-h-screen overflow-hidden lg:h-screen">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={"Wira Kilifi"}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <ImageWithLoading
                  src={"/images/dj-mix.jpg"}
                  alt={"Wira Kilifi"}
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
            WIRA INTERNATIONAL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
          >
            A festival series celebrating African dance music and alternative art.
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

      {/* About Wira Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-2xl glass"
              >
                <ImageWithLoading
                  src="/images/wira-kilifi.jpg"
                  alt="Wira Festival Crowd"
                  width={800}
                  height={450}
                  className="object-cover h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <div className="h-1 w-10 bg-secondary rounded-full"></div>
                  <h2 className="text-4xl font-bold tracking-tighter gradient-text">About Wira International</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Wira International is more than just a festival; it's a movement. Founded by SHANGATATU, it's a
                    celebration of African dance music, alternative art, and human connection. We curate immersive
                    experiences that blend hypnotic tribal soundscapes with vibrant visual artistry.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Our mission is to create a space for movement, connection, and cultural elevation, fostering a
                    community that resonates with both ancient rhythms and modern freedom. Each event is a unique
                    journey, designed to ignite the senses and uplift the spirit.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button
                    variant="outline"
                    className="group border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent"
                    onClick={() => window.open("https://www.instagram.com/wirainternational/", "_blank")}
                  >
                    <Instagram className="mr-2 h-4 w-4" />
                    Follow Wira on Instagram
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionTransition>
      
      {/* Wira Event Gallery - Scrolling Images */}
      <section className="relative py-16 bg-gradient-to-b from-black to-primary-900/10">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-10 bg-secondary rounded-full"></div>
            <h2 className="text-4xl font-bold gradient-text">Wira Moments</h2>
            <div className="h-1 w-10 bg-secondary rounded-full"></div>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Capturing the energy and spirit of Wira International events
          </p>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -100 * wiraGalleryImages.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            style={{ width: `${wiraGalleryImages.length * 2 * 320}px` }}
          >
            {[...wiraGalleryImages, ...wiraGalleryImages].map((image, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 w-80 h-90 rounded-2xl group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithLoading
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={320}
                  height={360}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-sm">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wira Philosophy Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Our Philosophy</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                The core values that drive the Wira International experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wiraPhilosophy.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass p-8 rounded-2xl shadow-xl text-center h-full flex flex-col items-center justify-center">
                    <div className="mb-4">{getIconComponent(item.icon)}</div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text-accent">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Wira Events Section */}
      <SectionTransition>
        <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-t from-black to-primary-900/20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Wira Events</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover past and upcoming Wira International gatherings.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
              {wiraEvents.map((event, index) => (
                <motion.div
                  key={index}
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
                          src={event.image || "/placeholder.svg"}
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
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-semibold text-white">{event.name}</h3>
                      <p className="text-gray-400 mb-2">{event.description}</p>
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
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold gradient-text">Join the Wira Movement</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay connected and be part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-700 text-white text-lg px-8"
                onClick={() => window.open("https://www.instagram.com/wirainternational/", "_blank")}
              >
                Follow on Instagram
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 bg-transparent"
                onClick={() => window.open("mailto:info@wirainternational.com", "_blank")}
              >
                Contact Wira
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
              <h3 className="text-2xl font-bold gradient-text mb-2">WIRA INTERNATIONAL</h3>
              <p className="text-gray-400">© 2026 WIRA. All rights reserved.</p>
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
