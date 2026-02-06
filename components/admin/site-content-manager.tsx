"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Edit, Settings } from "lucide-react"

interface SiteContent {
  id: string
  key: string
  value: any
  section: string
}

export default function SiteContentManager() {
  const [contents, setContents] = useState<SiteContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadContents()
  }, [])

  const loadContents = async () => {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section", { ascending: true })

      if (error) throw error
      setContents(data || [])
    } catch (error) {
      console.error("Error loading content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return

    try {
      const { error } = await supabase.from("site_content").delete().eq("id", id)
      if (error) throw error
      loadContents()
    } catch (error) {
      console.error("Error deleting content:", error)
      alert("Failed to delete content")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const valueStr = (formData.get("value") as string)?.trim() || ""
    let value: any
    try {
      // Try to parse as JSON first
      value = JSON.parse(valueStr)
    } catch {
      // If not valid JSON, use as string
      value = valueStr
    }

    const contentData = {
      key: (formData.get("key") as string)?.trim() || "",
      value: value,
      section: (formData.get("section") as string)?.trim() || "",
    }

    // Validate required fields
    if (!contentData.key || !contentData.section || valueStr === "") {
      alert("Please fill in all required fields (Key, Section, and Value)")
      return
    }

    try {
      if (editingContent) {
        const { error } = await supabase
          .from("site_content")
          .update({ ...contentData, updated_at: new Date().toISOString() })
          .eq("id", editingContent.id)
        if (error) throw error
        alert("Content updated successfully!")
      } else {
        const { error } = await supabase.from("site_content").insert([contentData])
        if (error) throw error
        alert("Content created successfully!")
      }
      setIsFormOpen(false)
      setEditingContent(null)
      loadContents()
    } catch (error: any) {
      console.error("Error saving content:", error)
      alert(`Failed to save content: ${error.message || "Unknown error"}`)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        <p className="mt-4 text-white/60">Loading site content...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold gradient-text">Site Content</h2>
        <Button
          onClick={() => {
            setEditingContent(null)
            setIsFormOpen(true)
          }}
          className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {isFormOpen && (
        <Card className="mb-6 bg-black/80 border-white/10 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              {editingContent ? "Edit Content" : "New Content"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Key</label>
                <input
                  name="key"
                  defaultValue={editingContent?.key || ""}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Section</label>
                <input
                  name="section"
                  defaultValue={editingContent?.section || ""}
                  placeholder="e.g., hero, social, contact"
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Value (JSON or text)</label>
                <textarea
                  name="value"
                  defaultValue={
                    editingContent?.value
                      ? typeof editingContent.value === "string"
                        ? editingContent.value
                        : JSON.stringify(editingContent.value, null, 2)
                      : ""
                  }
                  rows={6}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-white font-mono text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 font-semibold shadow-lg shadow-secondary/20"
                >
                  {editingContent ? "Update" : "Create"} Content
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false)
                    setEditingContent(null)
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

      <div className="space-y-4">
        {contents.map((content) => (
          <Card key={content.id} className="bg-black/80 border-white/10 backdrop-blur-sm hover:border-secondary/30 transition-all hover-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-white">{content.key}</h3>
                  <p className="text-sm text-white/60">Section: {content.section}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingContent(content)
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
                    onClick={() => handleDelete(content.id)}
                    className="text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400/50"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
              <pre className="text-xs text-white/60 bg-white/5 p-3 rounded border border-white/10">
                {typeof content.value === "string"
                  ? content.value
                  : JSON.stringify(content.value, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
