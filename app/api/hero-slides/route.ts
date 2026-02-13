import { supabase } from "@/lib/supabase"
import { getAuthenticatedUser, unauthorizedResponse } from "@/lib/auth-helpers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("order_index", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero slides" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()
    const { image_url, alt, page, order_index } = body

    if (!image_url || !alt || !page) {
      return NextResponse.json(
        { error: "Image URL, alt text, and page are required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("hero_slides")
      .insert([{ image_url, alt, page, order_index: order_index || 0 }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create hero slide" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()
    const { id, image_url, alt, page, order_index } = body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("hero_slides")
      .update({ image_url, alt, page, order_index: order_index || 0 })
      .eq("id", id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update hero slide" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return unauthorizedResponse()
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const { error } = await supabase.from("hero_slides").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete hero slide" },
      { status: 500 }
    )
  }
}
