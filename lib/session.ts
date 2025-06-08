import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { authOptions } from "@/auth"

// Helper function to get the session on the server side
export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions)
}

// Type-safe session accessor for server components
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
} 