"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Upload, Loader2, Link } from "lucide-react"

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [urlInput, setUrlInput] = useState("")
  const [processingUrl, setProcessingUrl] = useState(false)
  const supabase = createClient()

  // Convert Google Drive URL to direct download URL
  const convertGoogleDriveUrl = (url: string): string => {
    // Check if it's a Google Drive URL
    if (url.includes("drive.google.com")) {
      // Extract file ID from various Google Drive URL formats
      const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                         url.match(/id=([a-zA-Z0-9_-]+)/) ||
                         url.match(/\/d\/([a-zA-Z0-9_-]+)/)
      
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1]
        // Return direct download URL
        return `https://drive.google.com/uc?export=view&id=${fileId}`
      }
    }
    return url
  }

  // Validate if URL is accessible and returns an image
  const validateImageUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      const contentType = response.headers.get('content-type')
      return contentType ? contentType.startsWith('image/') : false
    } catch {
      return false
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB")
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (error) throw error

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath)

      onUploadComplete(publicUrl)
      setUploadProgress(100)
    } catch (error: any) {
      console.error("Error uploading image:", error)
      alert(`Failed to upload image: ${error.message}`)
    } finally {
      setUploading(false)
      setUploadProgress(0)
      // Reset input
      e.target.value = ""
    }
  }

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      alert("Please enter an image URL")
      return
    }

    setProcessingUrl(true)
    
    try {
      // Convert Google Drive URL if needed
      let processedUrl = urlInput.trim()
      if (processedUrl.includes("drive.google.com")) {
        processedUrl = convertGoogleDriveUrl(processedUrl)
      }

      // Validate the URL
      const isValidImage = await validateImageUrl(processedUrl)
      if (!isValidImage) {
        alert("The URL does not appear to be a valid image. Please check the URL and try again.")
        return
      }

      onUploadComplete(processedUrl)
      setUrlInput("")
      alert("Image URL added successfully!")
    } catch (error: any) {
      console.error("Error processing image URL:", error)
      alert(`Failed to process image URL: ${error.message}`)
    } finally {
      setProcessingUrl(false)
    }
  }

  return (
    <div className="mb-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-white/80">Upload Image</label>
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              className="border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 text-secondary"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </>
              )}
            </Button>
          </label>
          {uploading && (
            <div className="flex-1 bg-white/5 rounded-full h-2 border border-white/10">
              <div
                className="bg-gradient-to-r from-secondary to-primary h-full transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
        <p className="text-xs text-white/60 mt-2">
          Max file size: 10MB. Supported formats: JPG, PNG, GIF, WebP
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-white/80">Or Add Image URL</label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg or Google Drive link"
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
            disabled={processingUrl}
          />
          <Button
            onClick={handleUrlSubmit}
            disabled={processingUrl || !urlInput.trim()}
            className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20 disabled:opacity-50"
          >
            {processingUrl ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Link className="h-4 w-4 mr-2" />
                Add URL
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-white/60 mt-2">
          Supports direct image URLs and Google Drive links
        </p>
      </div>
    </div>
  )
}
