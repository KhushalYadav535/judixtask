import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    
    const res = await fetch(`${BACKEND_URL}/api/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Failed to fetch tasks" }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Get tasks proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const authHeader = req.headers.get("authorization")
    
    const res = await fetch(`${BACKEND_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Failed to create task" }, { status: res.status })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Create task proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
