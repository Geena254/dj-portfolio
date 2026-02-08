"use client"

import { motion } from "framer-motion"
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Radio,
  Cloud,
  AirplayIcon as Spotify,
  ExternalLink,
} from "lucide-react"

export default function AdminFooter() {
  const socialLinks = [
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
  ]

  return (
    <footer className="relative px-4 py-12 bg-gradient-to-b from-primary-900/20 to-blue-950">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">ADMIN PORTAL</h3>
            <p className="text-gray-400">© 2026 SHANGATATU. All rights reserved.</p>
          </div>
          <div className="space-y-4 text-center md:text-right">
            <h3 className="text-lg font-medium text-white">Connect with me</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 hover:text-secondary transition-colors duration-300"
                  title={social.label}
                >
                  <social.icon className="h-6 w-6" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
  )
}
