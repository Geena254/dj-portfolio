export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          name: string
          location: string
          date: string
          image_url: string | null
          url: string | null
          is_upcoming: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          date: string
          image_url?: string | null
          url?: string | null
          is_upcoming?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          date?: string
          image_url?: string | null
          url?: string | null
          is_upcoming?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      mixes: {
        Row: {
          id: string
          title: string
          platform: string
          platform_id: string
          views: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          platform: string
          platform_id: string
          views?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          platform?: string
          platform_id?: string
          views?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gallery_images: {
        Row: {
          id: string
          image_url: string
          alt: string
          section: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          image_url: string
          alt: string
          section?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          alt?: string
          section?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      hero_slides: {
        Row: {
          id: string
          image_url: string
          alt: string
          page: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          image_url: string
          alt: string
          page: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          alt?: string
          page?: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      site_content: {
        Row: {
          id: string
          key: string
          value: Json
          section: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          section: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          section?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
