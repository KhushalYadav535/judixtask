import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || "Login failed" }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Login proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
