"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import {
  Cloud,
  Facebook,
  Instagram,
  Radio,
  AirplayIcon as Spotify,
  Twitter,
  Youtube,
  Music2,
  Play,
  ShoppingBag,
  Ticket,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CustomCursor from "@/components/custom-cursor"
import SectionTransition from "@/components/section-transition"

export default function DJPortfolio() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-primary/40 to-black"
        />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="DJ performing"
          width={1920}
          height={1080}
          className="absolute inset-0 object-cover brightness-40"
          priority
        />
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
            className="mb-6 text-8xl font-bold tracking-tighter gradient-text"
          >
            SHANGATATU
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-2xl font-light text-gray-300"
          >
            Electronic & House Music DJ
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="group bg-secondary text-white hover:bg-secondary/90 text-lg px-8 relative overflow-hidden"
            >
              <span className="relative z-10">Book Now</span>
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8"
            >
              Listen Now
              <Play className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Bio Section */}
      <SectionTransition>
        <section className="relative px-4 py-32 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-[300px_1fr] items-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square overflow-hidden rounded-2xl w-full max-w-[300px] mx-auto glass"
              >
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="SHANGATATU Portrait"
                  width={600}
                  height={600}
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tighter gradient-text">About SHANGATATU</h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-xl text-gray-300 leading-relaxed">
                    With over a decade of experience behind the decks, SHANGATATU has become synonymous with
                    cutting-edge electronic music and unforgettable performances. Blending genres from deep house to
                    techno, his unique style has captivated audiences worldwide.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Based in Kenya but performing globally, SHANGATATU has headlined major festivals and collaborated
                    with industry giants. His productions have topped Beatport charts and received support from leading
                    artists in the house music scene.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button
                    variant="outline"
                    asChild
                    className="group border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
                  >
                    <Link href="mailto:tatushanga@gmail.com">
                      EMAIL ME
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button className="group bg-secondary text-white hover:bg-secondary/90 transition-all duration-300">
                    Call Me
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      <SectionTransition>
        <section className="relative px-4 py-32 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <div className="space-y-2 text-center">
                <h3 className="text-4xl font-bold gradient-text">200+</h3>
                <p className="text-sm text-gray-400">Shows Performed</p>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-4xl font-bold gradient-text">20+</h3>
                <p className="text-sm text-gray-400">Countries Visited</p>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-4xl font-bold gradient-text">100k+</h3>
                <p className="text-sm text-gray-400">Monthly Listeners</p>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-4xl font-bold gradient-text">100+</h3>
                <p className="text-sm text-gray-400">Released Mix Tracks</p>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* YouTube Mixes Section */}
      <SectionTransition>
        <section className="relative px-4 py-32 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold gradient-text">Latest Mixes</h2>
              <p className="text-xl text-gray-400">Check out my latest performances and mixes</p>
            </div>
            <Carousel className="mx-auto max-w-6xl">
              <CarouselContent>
                {[
                  {
                    id: "moaLC_1fAFU",
                    title: "Shangatatu's BENEATH THE BAOBAB's N.Y.E Sunrise Mix",
                    views: "2.5K",
                  },
                  {
                    id: "Yg3FI1IIfZg",
                    title: "Shangatatu Live at Kilifi New Year 2024",
                    views: "1.8K",
                  },
                  {
                    id: "rPILNx29pVA",
                    title: "Shangatatu - Deep House Mix",
                    views: "3.2K",
                  },
                  {
                    id: "yAoKY0mttR0",
                    title: "Sunset Sessions with Shangatatu",
                    views: "2.1K",
                  },
                  {
                    id: "Wa9pYvHimc0",
                    title: "Shangatatu Beach House Mix",
                    views: "4.5K",
                  },
                ].map((mix) => (
                  <CarouselItem key={mix.id} className="md:basis-1/2 lg:basis-1/3">
                    <Link href={`https://youtu.be/${mix.id}`} target="_blank" className="block">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="group relative aspect-video overflow-hidden rounded-2xl mx-2 glass"
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${mix.id}/maxresdefault.jpg`}
                          alt={mix.title}
                          width={1280}
                          height={720}
                          className="object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button variant="outline" size="icon" className="h-16 w-16 rounded-full border-2">
                              <Play className="h-8 w-8" />
                            </Button>
                          </div>
                        </motion.div>
                        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                          <h3 className="text-lg font-semibold text-white mb-2">{mix.title}</h3>
                          <p className="text-sm text-secondary">{mix.views} views</p>
                        </div>
                      </motion.div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      </SectionTransition>

      {/* Merchandise Section */}
      <SectionTransition>
        <section className="relative px-4 py-32 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold gradient-text">Shop Merch</h2>
              <p className="text-xl text-gray-400">Official SHANGATATU merchandise</p>
            </div>
            <Carousel className="mx-auto max-w-6xl">
              <CarouselContent>
                {[
                  { name: "Limited Edition T-Shirt", price: 29.99 },
                  { name: "SHANGATATU Hoodie", price: 59.99 },
                  { name: "Vinyl Collection", price: 89.99 },
                  { name: "LED Festival Mask", price: 39.99 },
                  { name: "Signed Poster", price: 24.99 },
                ].map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="mx-2 overflow-hidden glass">
                      <CardHeader className="p-0">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative aspect-square overflow-hidden group"
                        >
                          <Image
                            src="/placeholder.svg?height=400&width=400"
                            alt={item.name}
                            width={400}
                            height={400}
                            className="object-cover"
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="mb-2 text-xl text-white">{item.name}</CardTitle>
                        <p className="text-secondary font-bold">${item.price}</p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button className="w-full bg-secondary text-white hover:bg-secondary/90 group relative overflow-hidden">
                          <span className="relative z-10">Add to Cart</span>
                          <motion.div
                            className="absolute inset-0 bg-primary"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          <ShoppingBag className="mr-2 h-4 w-4 relative z-10" />
                          <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      </SectionTransition>

      {/* Past Events Section */}
      <SectionTransition>
        <section className="relative px-4 py-32 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold gradient-text">Past Events</h2>
              <p className="text-xl text-gray-400">Where I've performed</p>
            </div>
            <Carousel className="mx-auto max-w-6xl">
              <CarouselContent>
                {[
                  {
                    name: "Beneath The Baobab Festival",
                    location: "Kilifi, Kenya",
                    date: "December 2024",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    name: "Tomorrowland",
                    location: "Boom, Belgium",
                    date: "July 2023",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    name: "EDC Las Vegas",
                    location: "Las Vegas, NV",
                    date: "May 2023",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    name: "Creamfields",
                    location: "Daresbury, UK",
                    date: "August 2023",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    name: "Amsterdam Dance Event",
                    location: "Amsterdam, NL",
                    date: "October 2023",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                ].map((event, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden glass mx-2">
                      <motion.div whileHover={{ scale: 1.05 }} className="relative aspect-video group">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.name}
                          width={600}
                          height={400}
                          className="object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-xl font-semibold text-white">{event.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Music2 className="mr-2 h-4 w-4 text-secondary" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Ticket className="mr-2 h-4 w-4 text-secondary" />
                            {event.date}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      </SectionTransition>

      {/* Footer */}
      <footer className="relative border-t border-white/10 px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">SHANGATATU</h3>
              <p className="text-gray-400">© 2025 SHANGATATU THE DJ. All rights reserved.</p>
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
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="group relative p-2 hover:text-secondary transition-colors duration-300"
                    title={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {social.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}
