"use client"

import { motion } from "framer-motion"
import { 
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Expand,
    Cloud,
    Facebook,
    Instagram,
    Radio,
    AirplayIcon as Spotify,
    Twitter,
    Youtube, } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SectionTransition from "@/components/section-transition"
import Navbar from "@/components/navbar"
import BackToTop from "@/components/back-to-top"
import ImageWithLoading from "@/components/image-with-loading"
import CustomCursor from "@/components/custom-cursor"

export default function ArtGallery() {
    const [selectedArt, setSelectedArt] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState("All")

    const artCategories = ["All", "Digital", "Mixed Media", "Photography", "Installations"]

    const artworks = [
        {
        id: 1,
        title: "Ancestral Visions",
        description: "Digital collage exploring spiritual connections through geometric patterns and ancestral portraiture. This piece reflects on the continuum between past and present consciousness.",
        category: "Digital",
        year: "2023",
        size: "120cm x 90cm",
        materials: "Digital print on archival paper",
        image: "/images/art-1.jpg",
        series: "Spiritual Geometries"
        },
        {
        id: 2,
        title: "Coastal Rhythms",
        description: "Mixed media on canvas capturing the pulse of Swahili coastal life. Incorporating found objects from Kenyan beaches, the work layers texture and cultural symbolism.",
        category: "Mixed Media",
        year: "2022",
        size: "150cm x 120cm",
        materials: "Acrylic, sand, driftwood on canvas",
        image: "/images/art-2.jpg",
        series: "Swahili Tides"
        },
        {
        id: 3,
        title: "Techno Tribal",
        description: "Digital illustration merging traditional Maasai adornment with cyberpunk aesthetics. The work questions how cultural identity evolves in technological futures.",
        category: "Digital",
        year: "2024",
        size: "100cm x 100cm",
        materials: "Digital illustration, limited edition print",
        image: "/images/art-3.jpg",
        series: "AfroFutures"
        },
        {
        id: 4,
        title: "Memory Fragments",
        description: "Photographic series documenting abandoned spaces along the Kenyan coast. The images are treated with natural dyes to create a weathered, timeless quality.",
        category: "Photography",
        year: "2021",
        size: "Variable dimensions",
        materials: "Archival pigment print with plant-based dyes",
        image: "/images/art-4.jpg",
        series: "Coastal Memories"
        },
        {
        id: 5,
        title: "Resonance Chamber",
        description: "Interactive sound installation using recycled metal objects to create a playable sound sculpture. Visitors are encouraged to interact with the piece to complete the artwork.",
        category: "Installations",
        year: "2023",
        size: "300cm x 200cm x 200cm",
        materials: "Recycled metal, contact microphones, sound system",
        image: "/images/art-5.jpg",
        series: "Sonic Architectures"
        },
        {
        id: 6,
        title: "Dhow Light",
        description: "Projection mapping on traditional Swahili sailing vessels. This temporary installation transformed the boats into floating canvases of light during the Lamu Art Festival.",
        category: "Installations",
        year: "2022",
        size: "Site-specific",
        materials: "Projectors, custom software, dhows",
        image: "/images/art-6.jpg",
        series: "Luminous Traditions"
        }
    ]

    const filteredArtworks = currentCategory === "All" 
        ? artworks 
        : artworks.filter(art => art.category === currentCategory)

    const handleNext = () => {
        if (selectedArt === null) return
        setSelectedArt(prev => (prev === artworks.length - 1 ? 0 : (prev || 0) + 1)
    )}

    const handlePrev = () => {
        if (selectedArt === null) return
        setSelectedArt(prev => (prev === 0 ? artworks.length - 1 : (prev || 0) - 1)
    )}

    return (
        <div className="relative min-h-screen bg-black text-white">
        <CustomCursor />
        <Navbar />
        <BackToTop />

        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
            <ImageWithLoading
                src="/images/arthead.jpg"
                alt="ShangaTatu's Art"
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
                    VISUAL ART GALLERY
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8 text-xl md:text-2xl font-light text-gray-300 max-w-3xl"
                >
                    Where rhythm meets visual expression - SHANGATATU's multidisciplinary art practice
                </motion.p>
            </motion.div>
        </section>

        {/* Art Gallery Section */}
        <SectionTransition>
            <section className="relative px-4 py-20 md:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                {artCategories.map(category => (
                    <Button
                    key={category}
                    variant={currentCategory === category ? "default" : "outline"}
                    className={`${
                        currentCategory === category 
                        ? "bg-secondary text-white" 
                        : "border-secondary text-secondary hover:bg-secondary/10"
                    } rounded-full px-6`}
                    onClick={() => setCurrentCategory(category)}
                    >
                    {category}
                    </Button>
                ))}
                </div>

                {/* Art Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArtworks.map(artwork => (
                    <motion.div 
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group"
                    >
                    <Card 
                        className="overflow-hidden glass shadow-lg border-white/10 hover:border-secondary/30 transition-colors h-full cursor-pointer"
                        onClick={() => setSelectedArt(artwork.id - 1)}
                    >
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
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-16 w-16 rounded-full border-2 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Expand className="h-6 w-6" />
                            </Button>
                            </div>
                        </motion.div>
                        </div>
                        <CardContent className="p-6">
                        <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-secondary transition-colors">
                            {artwork.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{artwork.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-secondary">{artwork.year}</span>
                            <span className="text-xs text-gray-500">{artwork.category}</span>
                        </div>
                        </CardContent>
                    </Card>
                    </motion.div>
                ))}
                </div>
            </div>
            </section>
        </SectionTransition>

        {/* Art Detail Modal */}
        {selectedArt !== null && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 rounded-full"
                onClick={() => setSelectedArt(null)}
                >
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
                    className="h-6 w-6"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
                </Button>

                <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 z-10 bg-black/50 rounded-full -translate-y-1/2"
                onClick={handlePrev}
                >
                <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 z-10 bg-black/50 rounded-full -translate-y-1/2"
                onClick={handleNext}
                >
                <ChevronRight className="h-8 w-8" />
                </Button>

                <div className="grid md:grid-cols-2 gap-8 bg-black/70 p-8 rounded-xl">
                <div className="relative aspect-square">
                    <ImageWithLoading
                    src={artworks[selectedArt].image}
                    alt={artworks[selectedArt].title}
                    width={800}
                    height={800}
                    className="object-contain w-full h-full"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold gradient-text">
                    {artworks[selectedArt].title}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-sm text-gray-400">Year</h4>
                        <p className="text-secondary">{artworks[selectedArt].year}</p>
                    </div>
                    <div>
                        <h4 className="text-sm text-gray-400">Category</h4>
                        <p className="text-secondary">{artworks[selectedArt].category}</p>
                    </div>
                    <div>
                        <h4 className="text-sm text-gray-400">Dimensions</h4>
                        <p className="text-secondary">{artworks[selectedArt].size}</p>
                    </div>
                    <div>
                        <h4 className="text-sm text-gray-400">Materials</h4>
                        <p className="text-secondary">{artworks[selectedArt].materials}</p>
                    </div>
                    <div className="col-span-2">
                        <h4 className="text-sm text-gray-400">Series</h4>
                        <p className="text-secondary">{artworks[selectedArt].series}</p>
                    </div>
                    </div>
                    <div>
                    <h4 className="text-sm text-gray-400 mb-2">Description</h4>
                    <p className="text-gray-300 leading-relaxed">
                        {artworks[selectedArt].description}
                    </p>
                    </div>
                    <Button
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary/10 mt-6"
                    onClick={() => window.open(artworks[selectedArt].image, '_blank')}
                    >
                    <Expand className="mr-2 h-4 w-4" />
                    View Full Resolution
                    </Button>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Artist Statement */}
        <SectionTransition>
            <section className="relative px-4 py-20 md:px-6 lg:px-8 bg-gradient-to-b from-black to-primary-900/20">
            <div className="mx-auto max-w-4xl">
                <div className="glass p-8 md:p-12 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-8 gradient-text text-center">Artist Statement</h2>
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-gray-300 mb-6">
                    My visual art practice is an extension of my musical journey - both are rooted in rhythm, pattern, and the exploration of African identity in contemporary spaces. Each piece begins as an improvisation, much like a DJ set, responding to the materials and the moment.
                    </p>
                    <p className="text-lg text-gray-300 mb-6">
                    I work across digital and physical mediums, often combining traditional techniques with modern technology. The recurring motifs in my work - geometric patterns, fragmented memories, and spiritual symbols - speak to the duality of my coastal Swahili heritage and my engagement with global electronic culture.
                    </p>
                    <p className="text-lg text-gray-300">
                    For me, art-making is a form of cultural preservation and innovation. Whether through projection mapping on dhows or digital collages shared online, I aim to create bridges between ancestral knowledge and futuristic possibilities.
                    </p>
                </div>
                </div>
            </div>
            </section>
        </SectionTransition>

        {/* CTA Section */}
        <SectionTransition>
            <section className="relative px-4 py-20 md:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Interested in Commissioning Work?
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                I accept select commissions for custom artworks, installations, and creative direction.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                    <Button
                    size="lg"
                    className="group bg-secondary hover:bg-secondary-700 text-white text-lg px-8 relative overflow-hidden btn-hover-slide"
                    >
                    <span className="relative z-10">Discuss a Project</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
                <Link href="/dj">
                    <Button
                    size="lg"
                    variant="outline"
                    className="group border-secondary text-secondary hover:bg-secondary/10 text-lg px-8"
                    >
                    <span className="relative z-10">Explore My Music</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
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
            </motion.div>
        </footer>
    </div>
)}