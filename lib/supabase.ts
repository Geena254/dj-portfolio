import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type GalleryImage = {
  id: string
  title: string
  description: string | null
  image_url: string
  created_at: string
  updated_at: string
}

export type WiraVideo = {
  id: string
  title: string
  description: string | null
  video_url: string
  thumbnail_url: string | null
  created_at: string
  updated_at: string
}

export type MixLink = {
  id: string
  title: string
  description: string | null
  link_url: string
  platform: string | null
  created_at: string
  updated_at: string
}

export type Event = {
  id: string
  title: string
  description: string | null
  event_date: string
  location: string | null
  image_url: string | null
  link_url: string | null
  created_at: string
  updated_at: string
}

export type GeneralUpdate = {
  id: string
  category: string | null
  title: string
  description: string | null
  update_type: string | null
  created_at: string
  updated_at: string
}
