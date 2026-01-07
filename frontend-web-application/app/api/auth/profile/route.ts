import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const authHeader = req.headers.get("authorization")
    
    const res = await fetch(`${BACKEND_URL}/api/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Update failed" }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Profile update proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
