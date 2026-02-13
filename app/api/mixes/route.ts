import { supabase } from "@/lib/supabase"
import { getAuthenticatedUser, unauthorizedResponse } from "@/lib/auth-helpers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("mixes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch mixes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()
    const { title, platform, platform_id, views } = body

    if (!title || !platform || !platform_id) {
      return NextResponse.json(
        { error: "Title, platform, and platform_id are required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("mixes")
      .insert([{ title, platform, platform_id, views }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create mix" },
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
    const { id, title, platform, platform_id, views } = body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("mixes")
      .update({ title, platform, platform_id, views })
      .eq("id", id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update mix" },
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

    const { error } = await supabase.from("mixes").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete mix" },
      { status: 500 }
    )
  }
}
