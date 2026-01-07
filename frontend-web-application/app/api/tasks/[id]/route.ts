import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    // Validate MongoDB ObjectId format (24 hex characters) - reject invalid IDs early
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ 
        error: "Invalid task ID format. This appears to be an old task. Please refresh the page." 
      }, { status: 400 })
    }
    
    const body = await req.json()
    
    // Get authorization header - check both lowercase and capitalized versions
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")
    
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization header missing" }, { status: 401 })
    }
    
    const res = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Backend error:", data)
      return NextResponse.json({ error: data.error || "Failed to update task" }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Update task proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    // Validate MongoDB ObjectId format (24 hex characters) - reject invalid IDs early
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ 
        error: "Invalid task ID format. This appears to be an old task. Please refresh the page." 
      }, { status: 400 })
    }
    
    // Get authorization header - check both lowercase and capitalized versions
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")
    
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization header missing" }, { status: 401 })
    }
    
    const res = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Backend error:", data)
      return NextResponse.json({ error: data.error || "Failed to delete task" }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Delete task proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
