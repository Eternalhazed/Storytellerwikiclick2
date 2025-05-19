import { handlers } from "@/auth" // Referring to the auth.ts we just created
import { NextRequest } from "next/server"

const { GET: NextAuthGet, POST: NextAuthPost } = handlers

export function GET(request: NextRequest) {
  return NextAuthGet(request)
}

export function POST(request: NextRequest) {
  return NextAuthPost(request)
}
