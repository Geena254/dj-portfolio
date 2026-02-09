"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Edit, Calendar, MapPin, Link as LinkIcon } from "lucide-react"
import ImageUpload from "./image-upload"

interface Event {
  id: string
  name: string
  location: string
  date: string
  image_url: string | null
  url: string | null
  is_upcoming: boolean
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (!response.ok) throw new Error('Failed to fetch events')
      const data = await response.json()
      setEvents(data || [])
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete event')
      loadEvents()
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Failed to delete event")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const eventData = {
      name: (formData.get("name") as string)?.trim() || "",
      location: (formData.get("location") as string)?.trim() || "",
      date: (formData.get("date") as string)?.trim() || "",
      image_url: (formData.get("image_url") as string)?.trim() || null,
      url: (formData.get("url") as string)?.trim() || null,
      is_upcoming: formData.get("is_upcoming") === "on" || formData.get("is_upcoming") === "true",
    }

    // Validate required fields
    if (!eventData.name || !eventData.location || !eventData.date) {
      alert("Please fill in all required fields (Name, Location, Date)")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(
        editingEvent ? '/api/events' : '/api/events',
        {
          method: editingEvent ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingEvent ? { ...eventData, id: editingEvent.id } : eventData)
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save event")
      }
      
      alert(`Event ${editingEvent ? "updated" : "created"} successfully!`)
      setIsFormOpen(false)
      setEditingEvent(null)
      loadEvents()
    } catch (error: any) {
      console.error("Error saving event:", error)
      alert(`Failed to save event: ${error.message || "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        <p className="mt-4 text-white/60">Loading events...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold gradient-text">Events</h2>
        <Button
          onClick={() => {
            setEditingEvent(null)
            setIsFormOpen(true)
          }}
          className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {isFormOpen && (
        <Card className="mb-6 bg-black/80 border-white/10 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              {editingEvent ? "Edit Event" : "New Event"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Event Name</label>
                <input
                  name="name"
                  defaultValue={editingEvent?.name || ""}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Location</label>
                <input
                  name="location"
                  defaultValue={editingEvent?.location || ""}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Date</label>
                <input
                  name="date"
                  type="text"
                  defaultValue={editingEvent?.date || ""}
                  placeholder="e.g., Sun 28th Dec 2025"
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Event URL (optional)</label>
                <input
                  name="url"
                  type="url"
                  defaultValue={editingEvent?.url || ""}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
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
                  defaultValue={editingEvent?.image_url || ""}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  name="is_upcoming"
                  type="checkbox"
                  defaultChecked={editingEvent?.is_upcoming || false}
                  className="w-4 h-4 accent-secondary"
                />
                <label className="text-sm text-white/80">Upcoming Event</label>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingEvent ? "Update" : "Create"} Event
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false)
                    setEditingEvent(null)
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
        {events.map((event) => (
          <Card key={event.id} className="bg-black/80 border-white/10 backdrop-blur-sm hover:border-secondary/30 transition-all hover-card">
            <CardContent className="p-4">
              {event.image_url && (
                <div className="relative rounded-md mb-4">
                  <img
                    src={event.image_url}
                    alt={event.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <h3 className="font-bold text-lg mb-2 text-white">{event.name}</h3>
              <div className="space-y-1 text-sm text-white/60 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>{event.date}</span>
                </div>
                {event.is_upcoming && (
                  <span className="inline-block px-2 py-1 bg-gradient-to-r from-secondary/20 to-primary/20 text-secondary text-xs rounded border border-secondary/30 mt-2">
                    Upcoming
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingEvent(event)
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
                  onClick={() => handleDelete(event.id)}
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
