import { supabase } from "@/lib/supabase"
import { getAuthenticatedUser, unauthorizedResponse } from "@/lib/auth-helpers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("general_updates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch updates" },
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
    const { category, title, description, update_type } = body

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("general_updates")
      .insert([{ category, title, description, update_type }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create update" },
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

    const { error } = await supabase.from("general_updates").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete update" },
      { status: 500 }
    )
  }
}
