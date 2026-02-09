"use client"

import React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onSubmit: (data: Record<string, string>) => void
  loading?: boolean
}

interface FormField {
  name: string
  label: string
  type: string
  placeholder: string
  required?: boolean
}

const formFields: Record<string, FormField[]> = {
  gallery: [
    { name: "title", label: "Title", type: "text", placeholder: "Image title", required: true },
    { name: "description", label: "Description", type: "textarea", placeholder: "Image description" },
    { name: "image_url", label: "Image URL", type: "url", placeholder: "https://...", required: true },
  ],
  video: [
    { name: "title", label: "Title", type: "text", placeholder: "Video title", required: true },
    { name: "description", label: "Description", type: "textarea", placeholder: "Video description" },
    { name: "video_url", label: "Video URL", type: "url", placeholder: "https://...", required: true },
    { name: "thumbnail_url", label: "Thumbnail URL", type: "url", placeholder: "https://..." },
  ],
  mix: [
    { name: "title", label: "Mix Title", type: "text", placeholder: "Mix title", required: true },
    { name: "description", label: "Description", type: "textarea", placeholder: "Mix description" },
    { name: "link_url", label: "Link URL", type: "url", placeholder: "https://...", required: true },
    { name: "platform", label: "Platform", type: "text", placeholder: "e.g., Spotify, SoundCloud" },
  ],
  event: [
    { name: "title", label: "Event Title", type: "text", placeholder: "Event title", required: true },
    { name: "description", label: "Description", type: "textarea", placeholder: "Event description" },
    { name: "event_date", label: "Event Date", type: "datetime-local", placeholder: "", required: true },
    { name: "location", label: "Location", type: "text", placeholder: "Event location" },
    { name: "image_url", label: "Image URL", type: "url", placeholder: "https://..." },
    { name: "link_url", label: "Link URL", type: "url", placeholder: "https://..." },
  ],
  update: [
    { name: "title", label: "Title", type: "text", placeholder: "Update title", required: true },
    { name: "description", label: "Description", type: "textarea", placeholder: "Update description" },
    { name: "category", label: "Category", type: "text", placeholder: "e.g., News, Announcement" },
    { name: "update_type", label: "Type", type: "text", placeholder: "e.g., Info, Important" },
  ],
}

export function AdminModal({ isOpen, onClose, title, onSubmit, loading = false }: AdminModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const modalType = title.toLowerCase().includes("gallery")
    ? "gallery"
    : title.toLowerCase().includes("video")
      ? "video"
      : title.toLowerCase().includes("mix")
        ? "mix"
        : title.toLowerCase().includes("event")
          ? "event"
          : "update"

  const fields = formFields[modalType] || []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-secondary/30 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-secondary/20 bg-black">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {field.label}
                {field.required && <span className="text-secondary ml-1">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2 bg-foreground/5 border border-foreground/10 rounded text-foreground placeholder-foreground/40 focus:outline-none focus:border-secondary/50 transition-colors resize-none"
                  rows={3}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2 bg-foreground/5 border border-foreground/10 rounded text-foreground placeholder-foreground/40 focus:outline-none focus:border-secondary/50 transition-colors"
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-foreground/10 hover:bg-foreground/20 text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-black"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
