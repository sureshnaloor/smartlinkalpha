import NextAuth from "next-auth/next"
import { authOptions } from "@/auth"

// Export the NextAuth handler with the authOptions
export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions) 