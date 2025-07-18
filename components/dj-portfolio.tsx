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
  Play,
  ArrowRight,
  ChevronDown,
  Calendar,
  MapPin,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import SectionTransition from "@/components/section-transition"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"

export default function DJPortfolio() {
  const containerRef = useRef(null)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const musicPlatforms = [
    { name: "YouTube", icon: Youtube, href: "http://www.youtube.com/@shangatatu" },
    {
      name: "Spotify",
      icon: Spotify,
      href: "https://open.spotify.com/user/31dqga7isotqip5czn5j4e3vd7li?si=6e8c0096cee14bdb",
    },
    { name: "Mixcloud", icon: Radio, href: "https://www.mixcloud.com/shangatatu/" },
    { name: "SoundCloud", icon: Cloud, href: "https://www.soundcloud.com/shangatatu" },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navbar />
      <BackToTop />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-orange-600/20 via-purple-600/40 to-black"
        />
        <div className="absolute inset-0 img-hover-zoom">
          <ImageWithLoading
            src="/images/dj-mix.jpg"
            alt="SHANGATATU performing on the beach at sunset"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-10000 ease-in-out hover:scale-110"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
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
            SHANGATATU
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-2xl"
          >
            Elevating the electronic music scene with cutting-edge house and techno beats from Kenya to the world
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="group bg-secondary hover:bg-secondary-700 text-white text-lg px-8 relative overflow-hidden btn-hover-slide"
              onClick={() => window.open('https://drive.google.com/file/d/11z_7bjNUXb1b05TaNNbzIMcuVspwFEDu/view', '_blank')}
            >
              <span className="relative z-10">View Rate Card</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="relative" ref={dropdownRef}>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Listen Now
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>

              {isDropdownOpen && (
                <div className="fixed sm:absolute top-full left-0 mt-2 w-56 p-2 bg-black/90 border-2 border-secondary rounded-md shadow-lg shadow-secondary/50 z-[999] backdrop-blur-md">
                  <div className="grid gap-1">
                    {musicPlatforms.map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 hover:bg-secondary/20 transition-colors rounded-md"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <platform.icon className="h-5 w-5 text-secondary" />
                        <span>{platform.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <a href="#about" aria-label="Scroll down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white opacity-70"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Bio Section */}
      <SectionTransition>
        <section id="about" className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-[300px_1fr] items-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square overflow-hidden rounded-2xl w-full max-w-[300px] mx-auto glass"
              >
                <div className="img-hover-zoom h-full">
                  <ImageWithLoading
                    src="/images/BK 9.jpg"
                    alt="SHANGATATU at the beach"
                    width={600}
                    height={600}
                    className="object-cover h-full w-full"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-10 bg-secondary rounded-full"></div>
                  <h2 className="text-4xl font-bold tracking-tighter gradient-text">About SHANGATATU</h2>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-xl text-gray-300 leading-relaxed">
                  Shangatatu is a vibrant creative born and rooted on Kenya's coast
                  channeling positive frequencies through African dance music,
                  merchandise and art into hypnotic, tribal soundscapes that speak to
                  both ancient rhythm and modern freedom. With now 13 years behind
                  the decks, Shangatatu's energy is raw, spiritual and deeply connected to
                  nature. He is a three-in-one artist: DJ/Producer, visual Artist and human
                  experience. Drawing inspiration from African ancestry, coastal life and
                  street-art culture, Shangatatu creates immersive sets that go beyond
                  music and regularly he blends his shows with live painting, body art
                  and storytelling, forming a unique aesthetic that's both palpable and
                  abstract like his art.
                  Whether spinning at a festival,wedding,beach session or guest mixing
                  on radio and podcasts, Shangatatu continues to redefine artistry on his
                  own terms - one beat, one brushstroke and one spirit at a time.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    As the founder of{" "}
                    <a
                      href="https://www.instagram.com/wirainternational/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-secondary-400 transition-colors"
                    >
                      @wirainternational
                    </a>
                    , a festival series celebrating
                    African dance music and alternative art, he curates space for movement,
                    connection and cultural elevation.
                  </p>
                </motion.div>
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button
                    variant="outline"
                    className="group border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
                    onClick={() => window.open('https://drive.google.com/file/d/11z_7bjNUXb1b05TaNNbzIMcuVspwFEDu/view', '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    VIEW RATE CARD
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    className="group bg-secondary text-white hover:bg-secondary-700 transition-all duration-300"
                    onClick={() => window.open('https://wa.me/254715781364', '_blank')}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp Me
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Stats Section */}
      <SectionTransition>
        <section className="relative px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
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
        <section id="mixes" className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Latest Mixes</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Check out my latest performances and mixes from festivals and events around the world
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  id: "pKNEODiRdEk",
                  title: "Shangatatu Live at Salty's Kite Village",
                  views: "0.8K",
                },
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
              ].map((mix) => (
                <div key={mix.id} className="group">
                  <a href={`https://youtu.be/${mix.id}`} target="_blank" rel="noopener noreferrer" className="block">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="relative aspect-video overflow-hidden rounded-2xl glass shadow-lg"
                    >
                      <div className="img-hover-zoom h-full">
                        <ImageWithLoading
                          src={`https://img.youtube.com/vi/${mix.id}/maxresdefault.jpg`}
                          alt={mix.title}
                          width={1280}
                          height={720}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-16 w-16 rounded-full border-2 bg-black/50 backdrop-blur-sm"
                          >
                            <Play className="h-8 w-8" />
                          </Button>
                        </div>
                      </motion.div>
                      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                        <h3 className="text-lg font-semibold text-white mb-2">{mix.title}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-secondary">{mix.views} views</p>
                          <ExternalLink className="h-4 w-4 text-secondary" />
                        </div>
                      </div>
                    </motion.div>
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/mixes">
                <Button
                  size="lg"
                  className="group bg-secondary hover:bg-secondary-700 text-white text-lg px-8 relative overflow-hidden btn-hover-slide"
                >
                  <span className="relative z-10">Explore More Mixes</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Past Events Section */}
      <SectionTransition>
        <section id="events" className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Past Events</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore the festivals and venues where I've performed around the globe
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
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
              ].map((event, index) => (
                <div key={index} className="group">
                  <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors h-full">
                    <motion.div whileHover={{ scale: 1.03 }} className="relative aspect-video">
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
                    </motion.div>
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
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/events">
                <Button
                  size="lg"
                  className="group bg-secondary hover:bg-secondary-700 text-white text-lg px-8 relative overflow-hidden btn-hover-slide"
                >
                  <span className="relative z-10">Explore More Events</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionTransition>

      <SectionTransition>
        <section id="art" className="relative px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Visual Art Gallery</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore SHANGATATU's visual art creations that blend traditional African motifs with contemporary digital expression
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Ancestral Visions",
                  description: "Digital collage exploring spiritual connections",
                  image: "/images/art-1.jpg",
                  year: "2023",
                },
                {
                  title: "Coastal Rhythms",
                  description: "Mixed media on canvas inspired by Swahili culture",
                  image: "/images/art-2.jpg",
                  year: "2022",
                },
                {
                  title: "Techno Tribal",
                  description: "Digital illustration fusing tradition and futurism",
                  image: "/images/art-3.jpg",
                  year: "2024",
                },
              ].map((artwork, index) => (
                <Link href="/art-gallery" key={index}>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="group cursor-pointer"
                  >
                    <Card className="overflow-hidden glass shadow-lg border-white/10 hover:border-secondary/30 transition-colors h-full">
                      <div className="relative aspect-square">
                        <div className="img-hover-zoom h-full">
                          <ImageWithLoading
                            src={artwork.image}
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
                          <Calendar className="h-4 w-4" />
                          {artwork.year}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/art-gallery" prefetch={true}>
                <Button
                  size="lg"
                  className="group bg-secondary hover:bg-secondary-700 text-white text-lg px-8 relative overflow-hidden btn-hover-slide"
                >
                  <span className="relative z-10">View Full Art Gallery</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Contact Section */}
      <SectionTransition>
        <section
          id="contact"
          className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
                <h2 className="text-4xl font-bold gradient-text">Get In Touch</h2>
                <div className="h-1 w-10 bg-secondary rounded-full"></div>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Ready to book SHANGATATU for your next event? Reach out directly or connect on social media.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 gradient-text-accent">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-secondary mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white">Email</h4>
                      <a
                        href="mailto:tatushanga@gmail.com"
                        className="text-gray-400 hover:text-secondary transition-colors"
                      >
                        tatushanga@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-secondary mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white">Phone</h4>
                      <p className="text-gray-400">+254 (0) 715 781 364</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-secondary mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white">Based In</h4>
                      <p className="text-gray-400">Mombasa, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 gradient-text-accent">Follow Me</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { icon: Instagram, href: "https://www.instagram.com/shangatatu/", label: "Instagram" },
                    { icon: Youtube, href: "http://www.youtube.com/@shangatatu", label: "YouTube" },
                    { icon: Facebook, href: "https://www.facebook.com/shangatatu3", label: "Facebook" },
                    { icon: Twitter, href: "https://x.com/shangatatu", label: "Twitter/X" },
                    { icon: Radio, href: "https://www.mixcloud.com/shangatatu/", label: "Mixcloud" },
                    { icon: Cloud, href: "https://www.soundcloud.com/shangatatu", label: "SoundCloud" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 hover:bg-white/5 rounded-lg transition-colors text-center"
                    >
                      <social.icon className="h-8 w-8 text-secondary" />
                      <span className="text-sm text-gray-300">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Footer */}
      <footer className="relative border-t border-white/10 px-4 py-12 bg-black">
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
              Website designed with ❤️ by{" "}
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
