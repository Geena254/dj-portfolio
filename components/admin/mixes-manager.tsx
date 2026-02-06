"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Edit, Music } from "lucide-react"

interface Mix {
  id: string
  title: string
  platform: string
  platform_id: string
  views: string | null
}

export default function MixesManager() {
  const [mixes, setMixes] = useState<Mix[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingMix, setEditingMix] = useState<Mix | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadMixes()
  }, [])

  const loadMixes = async () => {
    try {
      const { data, error } = await supabase
        .from("mixes")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setMixes(data || [])
    } catch (error) {
      console.error("Error loading mixes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mix?")) return

    try {
      const { error } = await supabase.from("mixes").delete().eq("id", id)
      if (error) throw error
      loadMixes()
    } catch (error) {
      console.error("Error deleting mix:", error)
      alert("Failed to delete mix")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const mixData = {
      title: (formData.get("title") as string)?.trim() || "",
      platform: (formData.get("platform") as string)?.trim() || "",
      platform_id: (formData.get("platform_id") as string)?.trim() || "",
      views: (formData.get("views") as string)?.trim() || null,
    }

    // Validate required fields
    if (!mixData.title || !mixData.platform || !mixData.platform_id) {
      alert("Please fill in all required fields (Title, Platform, Platform ID)")
      return
    }

    try {
      if (editingMix) {
        const { error } = await supabase
          .from("mixes")
          .update({ ...mixData, updated_at: new Date().toISOString() })
          .eq("id", editingMix.id)
        if (error) throw error
        alert("Mix updated successfully!")
      } else {
        const { error } = await supabase.from("mixes").insert([mixData])
        if (error) throw error
        alert("Mix created successfully!")
      }
      setIsFormOpen(false)
      setEditingMix(null)
      loadMixes()
    } catch (error: any) {
      console.error("Error saving mix:", error)
      alert(`Failed to save mix: ${error.message || "Unknown error"}`)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        <p className="mt-4 text-white/60">Loading mixes...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold gradient-text">Mixes</h2>
        <Button
          onClick={() => {
            setEditingMix(null)
            setIsFormOpen(true)
          }}
          className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Mix
        </Button>
      </div>

      {isFormOpen && (
        <Card className="mb-6 bg-black/80 border-white/10 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              {editingMix ? "Edit Mix" : "New Mix"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Title</label>
                <input
                  name="title"
                  defaultValue={editingMix?.title || ""}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Platform</label>
                <select
                  name="platform"
                  defaultValue={editingMix?.platform || "YouTube"}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="Spotify">Spotify</option>
                  <option value="Mixcloud">Mixcloud</option>
                  <option value="SoundCloud">SoundCloud</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Platform ID</label>
                <input
                  name="platform_id"
                  defaultValue={editingMix?.platform_id || ""}
                  placeholder="e.g., pKNEODiRdEk for YouTube"
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Views (optional)</label>
                <input
                  name="views"
                  type="text"
                  defaultValue={editingMix?.views || ""}
                  placeholder="e.g., 2.5K"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
                >
                  {editingMix ? "Update" : "Create"} Mix
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false)
                    setEditingMix(null)
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
        {mixes.map((mix) => (
          <Card key={mix.id} className="bg-black/80 border-white/10 backdrop-blur-sm hover:border-secondary/30 transition-all hover-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Music className="h-5 w-5 text-secondary" />
                <span className="text-sm text-white/60">{mix.platform}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">{mix.title}</h3>
              {mix.views && (
                <p className="text-sm text-white/60 mb-4">{mix.views} views</p>
              )}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingMix(mix)
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
                  onClick={() => handleDelete(mix.id)}
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
