"use client"

import { motion } from "framer-motion"
import { Play, ExternalLink, ArrowLeft, Youtube, Radio, Cloud, AirplayIcon as Spotify } from "lucide-react"
import ImageWithLoading from "@/components/image-with-loading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"

export default function MixesPage() {
  const mixes = [
    {
      id: "moaLC_1fAFU",
      title: "Shangatatu's BENEATH THE BAOBAB's N.Y.E Sunrise Mix",
      views: "2.5K",
      duration: "1:45:30",
      genre: "Afro House",
    },
    {
      id: "Yg3FI1IIfZg",
      title: "Shangatatu Live at Kilifi New Year 2024",
      views: "1.8K",
      duration: "2:15:45",
      genre: "Deep House",
    },
    {
      id: "rPILNx29pVA",
      title: "Shangatatu - Deep House Mix",
      views: "3.2K",
      duration: "1:30:20",
      genre: "Deep House",
    },
    {
      id: "yAoKY0mttR0",
      title: "Sunset Sessions with Shangatatu",
      views: "2.1K",
      duration: "1:20:15",
      genre: "Melodic House",
    },
    {
      id: "Wa9pYvHimc0",
      title: "Shangatatu Beach House Mix",
      views: "4.5K",
      duration: "2:00:30",
      genre: "Progressive House",
    },
  ]

  const platforms = [
    { name: "YouTube", icon: Youtube, href: "http://www.youtube.com/@shangatatu", color: "text-red-500" },
    { name: "Mixcloud", icon: Radio, href: "https://www.mixcloud.com/shangatatu/", color: "text-blue-400" },
    { name: "SoundCloud", icon: Cloud, href: "https://www.soundcloud.com/shangatatu", color: "text-orange-500" },
    {
      name: "Spotify",
      icon: Spotify,
      href: "https://open.spotify.com/user/31dqga7isotqip5czn5j4e3vd7li?si=6e8c0096cee14bdb",
      color: "text-green-500",
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
            MIXES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
          >
            Explore my latest DJ sets, live performances, and curated mixes across multiple platforms
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

      {/* Platforms Section */}
      <section className="relative px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold gradient-text mb-4">Listen on Your Favorite Platform</h2>
            <p className="text-gray-400">Find my mixes across all major streaming platforms</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass hover:border-secondary/30 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 hover:text-secondary transition-colors"
                    >
                      <platform.icon className={`h-12 w-12 ${platform.color}`} />
                      <span className="font-medium">{platform.name}</span>
                      <ExternalLink className="h-4 w-4 opacity-60" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Mixes Section */}
      <section className="relative px-4 py-32 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
              <h2 className="text-4xl font-bold gradient-text">Latest Mixes</h2>
              <div className="h-1 w-10 bg-secondary rounded-full"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From festival sets to intimate sessions, explore my musical journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mixes.map((mix, index) => (
              <motion.div
                key={mix.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden glass shadow-lg border-secondary/10 hover:border-secondary/30 transition-colors group">
                  <div className="relative aspect-video">
                    <ImageWithLoading
                      src={`https://img.youtube.com/vi/${mix.id}/maxresdefault.jpg`}
                      alt={mix.title}
                      width={1280}
                      height={720}
                      className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-16 w-16 rounded-full border-2 bg-black/50 backdrop-blur-sm"
                        onClick={() => window.open(`https://youtu.be/${mix.id}`, "_blank")}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">{mix.duration}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-secondary font-medium bg-secondary/20 px-2 py-1 rounded">
                        {mix.genre}
                      </span>
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white line-clamp-2">{mix.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{mix.views} views</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary hover:text-secondary-400"
                        onClick={() => window.open(`https://youtu.be/${mix.id}`, "_blank")}
                      >
                        Watch <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
