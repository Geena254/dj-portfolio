"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Edit, Image as ImageIcon } from "lucide-react"
import ImageUpload from "./image-upload"

interface GalleryImage {
  id: string
  image_url: string
  alt: string
  section: string | null
  order_index: number
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (!response.ok) throw new Error('Failed to fetch gallery images')
      const data = await response.json()
      setImages(data || [])
    } catch (error) {
      console.error("Error loading images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete image')
      loadImages()
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Failed to delete image")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const imageData = {
      image_url: (formData.get("image_url") as string)?.trim() || "",
      alt: (formData.get("alt") as string)?.trim() || "",
      section: (formData.get("section") as string)?.trim() || null,
      order_index: parseInt((formData.get("order_index") as string) || "0") || 0,
    }

    // Validate required fields
    if (!imageData.image_url || !imageData.alt) {
      alert("Please fill in all required fields (Image URL and Alt Text)")
      return
    }

    try {
      const response = await fetch(
        editingImage ? '/api/gallery' : '/api/gallery',
        {
          method: editingImage ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingImage ? { ...imageData, id: editingImage.id } : imageData)
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save image")
      }
      
      alert(`Image ${editingImage ? "updated" : "created"} successfully!`)
      setIsFormOpen(false)
      setEditingImage(null)
      loadImages()
    } catch (error: any) {
      console.error("Error saving image:", error)
      alert(`Failed to save image: ${error.message || "Unknown error"}`)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        <p className="mt-4 text-white/60">Loading gallery images...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold gradient-text">Gallery Images</h2>
        <Button
          onClick={() => {
            setEditingImage(null)
            setIsFormOpen(true)
          }}
          className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {isFormOpen && (
        <Card className="mb-6 bg-black/80 border-white/10 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              {editingImage ? "Edit Image" : "New Image"}
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
                  defaultValue={editingImage?.image_url || ""}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Alt Text</label>
                <input
                  name="alt"
                  defaultValue={editingImage?.alt || ""}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Section (optional)</label>
                <input
                  name="section"
                  defaultValue={editingImage?.section || ""}
                  placeholder="e.g., dj-gallery, art-gallery"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Order Index</label>
                <input
                  name="order_index"
                  type="number"
                  defaultValue={editingImage?.order_index || 0}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
                >
                  {editingImage ? "Update" : "Create"} Image
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false)
                    setEditingImage(null)
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <Card key={image.id} className="bg-black/80 border-white/10 backdrop-blur-sm hover:border-secondary/30 transition-all hover-card">
            <CardContent className="p-4">
              <div className="relative rounded-md mb-4">
                <img
                  src={image.image_url}
                  alt={image.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="font-bold text-sm mb-1 truncate text-white">{image.alt}</h3>
              {image.section && (
                <p className="text-xs text-white/60 mb-4">Section: {image.section}</p>
              )}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingImage(image)
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
                  onClick={() => handleDelete(image.id)}
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
