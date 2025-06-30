import { type NextRequest, NextResponse } from "next/server"
import { validateSession } from "./auth"

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: {
    id: string
    email: string
    name: string
    createdAt: Date
  }) => Promise<NextResponse>,
) {
  try {
    const authHeader = request.headers.get("authorization")
    const sessionToken = request.cookies.get("session-token")?.value

    let token = null
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
    } else if (sessionToken) {
      token = sessionToken
    }

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await validateSession(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 })
    }

    return handler(request, user)
  } catch (error) {
    console.error("Auth middleware error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }
}
