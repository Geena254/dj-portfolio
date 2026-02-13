"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Edit, Image as ImageIcon } from "lucide-react"
import ImageUpload from "./image-upload"

interface HeroSlide {
  id: string
  image_url: string
  alt: string
  page: string
  order_index: number
}

export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadSlides()
  }, [])

  const loadSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides')
      if (!response.ok) throw new Error('Failed to fetch hero slides')
      const data = await response.json()
      setSlides(data || [])
    } catch (error) {
      console.error("Error loading slides:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return

    try {
      const response = await fetch(`/api/hero-slides?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete slide')
      loadSlides()
    } catch (error) {
      console.error("Error deleting slide:", error)
      alert("Failed to delete slide")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const slideData = {
      image_url: (formData.get("image_url") as string)?.trim() || "",
      alt: (formData.get("alt") as string)?.trim() || "",
      page: (formData.get("page") as string)?.trim() || "home",
      order_index: parseInt((formData.get("order_index") as string) || "0") || 0,
    }

    // Validate required fields
    if (!slideData.image_url) {
      alert("Please upload an image")
      return
    }

    try {
      const response = await fetch(
        editingSlide ? '/api/hero-slides' : '/api/hero-slides',
        {
          method: editingSlide ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingSlide ? { ...slideData, id: editingSlide.id } : slideData)
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save slide")
      }
      
      alert(`Slide ${editingSlide ? "updated" : "created"} successfully!`)
      setIsFormOpen(false)
      setEditingSlide(null)
      loadSlides()
    } catch (error: any) {
      console.error("Error saving slide:", error)
      alert(`Failed to save slide: ${error.message || "Unknown error"}`)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        <p className="mt-4 text-white/60">Loading hero slides...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold gradient-text">Hero Slides</h2>
        <Button
          onClick={() => {
            setEditingSlide(null)
            setIsFormOpen(true)
          }}
          className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Slide
        </Button>
      </div>

      {isFormOpen && (
        <Card className="mb-6 bg-black/80 border-white/10 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              {editingSlide ? "Edit Slide" : "New Slide"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <ImageUpload
                  onUploadComplete={(url) => {
                    const form = document.querySelector("form") as HTMLFormElement
                    const hiddenInput = form?.querySelector('input[name="image_url"]') as HTMLInputElement
                    if (hiddenInput) hiddenInput.value = url
                  }}
                />
                <input
                  name="image_url"
                  type="hidden"
                  defaultValue={editingSlide?.image_url || ""}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Alt Text (optional)</label>
                <input
                  name="alt"
                  defaultValue={editingSlide?.alt || ""}
                  placeholder="Description for accessibility"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Page</label>
                <select
                  name="page"
                  defaultValue={editingSlide?.page || "home"}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                >
                  <option value="home">Home</option>
                  <option value="events">Events</option>
                  <option value="mixes">Mixes</option>
                  <option value="art-gallery">Art Gallery</option>
                  <option value="wira">Wira</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Order Index</label>
                <input
                  name="order_index"
                  type="number"
                  defaultValue={editingSlide?.order_index || 0}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
                >
                  {editingSlide ? "Update" : "Create"} Slide
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false)
                    setEditingSlide(null)
                  }}
                  className="border-white/20 hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide) => (
          <Card key={slide.id} className="bg-black/80 border-white/10 backdrop-blur-sm hover:border-secondary/30 transition-all hover-card">
            <CardContent className="p-4">
              <div className="relative rounded-md mb-4">
                <img
                  src={slide.image_url}
                  alt={slide.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-white">{slide.alt}</h3>
              <p className="text-xs text-white/60 mb-2">Page: {slide.page}</p>
              <p className="text-xs text-white/60 mb-4">Order: {slide.order_index}</p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingSlide(slide)
                    setIsFormOpen(true)
                  }}
                  className="border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 text-secondary"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(slide.id)}
                  className="text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400/50"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
