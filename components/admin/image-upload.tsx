"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const supabase = createClient()

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

  return (
    <div className="mb-4">
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
  )
}
