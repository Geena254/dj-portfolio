"use client"

// app/art-gallery/page.tsx
import { useState } from "react"

const ArtGallery = () => {
  const slides = [
    { id: 1, image: "/path/to/image1.jpg" },
    { id: 2, image: "/path/to/image2.jpg" },
    { id: 3, image: "/path/to/image3.jpg" },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover" }}
        />
      ))}

      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full"
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full"
        onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
        aria-label="Next slide"
      >
        &gt;
      </button>
    </div>
  )
}

export default ArtGallery
