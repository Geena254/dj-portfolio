import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("section", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch site content" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, section } = body

    if (!key || !section || value === undefined) {
      return NextResponse.json(
        { error: "Key, section, and value are required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("site_content")
      .insert([{ key, value, section }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create site content" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, key, value, section } = body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("site_content")
      .update({ key, value, section })
      .eq("id", id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update site content" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const { error } = await supabase.from("site_content").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete site content" },
      { status: 500 }
    )
  }
}
