export interface Event {
  id?: string
  title: string
  name?: string
  description?: string
  event_date?: string
  date?: string
  location?: string
  image_url?: string
  image?: string
  link_url?: string
  url?: string
  created_at?: string
  updated_at?: string
}

/**
 * Parse various date formats to a comparable timestamp
 */
export function parseEventDate(dateString: string | undefined): Date | null {
  if (!dateString) return null

  try {
    // Handle ISO format (TIMESTAMP from Supabase)
    if (dateString.includes("T")) {
      return new Date(dateString)
    }

    // Handle custom formats like "Sun 28th Dec 2025"
    const monthMap: { [key: string]: number } = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    }

    const regex =
      /(\d{1,2})(?:st|nd|rd|th)?\s+(\w+)\s+(\d{4})/i
    const match = dateString.match(regex)

    if (match) {
      const day = parseInt(match[1], 10)
      const month = monthMap[match[2].toLowerCase()]
      const year = parseInt(match[3], 10)

      if (month !== undefined) {
        return new Date(year, month, day)
      }
    }

    // Fallback: try native parsing
    const parsed = new Date(dateString)
    if (!isNaN(parsed.getTime())) {
      return parsed
    }

    return null
  } catch {
    console.error("[v0] Failed to parse date:", dateString)
    return null
  }
}

/**
 * Categorize events into upcoming and past based on current date
 */
export function categorizeEvents(events: Event[]): {
  upcoming: Event[]
  past: Event[]
} {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const upcoming: Event[] = []
  const past: Event[] = []

  events.forEach((event) => {
    const eventDate =
      parseEventDate(event.event_date) || parseEventDate(event.date)

    if (!eventDate) {
      console.warn(
        "[v0] Could not parse event date, defaulting to past:",
        event
      )
      past.push(event)
      return
    }

    // Set time to start of day for comparison
    eventDate.setHours(0, 0, 0, 0)

    if (eventDate >= now) {
      upcoming.push(event)
    } else {
      past.push(event)
    }
  })

  // Sort upcoming by date (earliest first)
  upcoming.sort((a, b) => {
    const dateA = parseEventDate(a.event_date) || parseEventDate(a.date)
    const dateB = parseEventDate(b.event_date) || parseEventDate(b.date)
    return (dateA?.getTime() || 0) - (dateB?.getTime() || 0)
  })

  // Sort past by date (most recent first)
  past.sort((a, b) => {
    const dateA = parseEventDate(a.event_date) || parseEventDate(a.date)
    const dateB = parseEventDate(b.event_date) || parseEventDate(b.date)
    return (dateB?.getTime() || 0) - (dateA?.getTime() || 0)
  })

  return { upcoming, past }
}
