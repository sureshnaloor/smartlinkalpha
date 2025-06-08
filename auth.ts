import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import CredentialsProvider from "next-auth/providers/credentials"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import type { User } from "@/lib/models/User"
import type { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { Session, Account } from "next-auth"

// This is a server-only function that will not be included in client bundles
const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  // Dynamically import bcrypt only on the server
  if (typeof window === 'undefined') {
    const { compare } = await import('bcrypt')
    return compare(plainPassword, hashedPassword)
  }
  return false // This should never be reached in proper server/client setup
}

// Make sure NextAuth.js v4 config is exported as default
const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/signin",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Use the baseUrl from environment variables
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return url
    },
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: Account | null }) {
      if (account && user) {
        return {
          ...token,
          id: user.id,
        }
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    // This callback is called when a user tries to sign in
    async signIn({ user, account, profile, email, credentials }) {
      // For credential login, we rely on the authorize callback
      if (credentials) {
        return true
      }
      
      // For OAuth (Google, LinkedIn, etc)
      if (account && account.provider && user.email) {
        // Always allow sign-in with email matching across providers
        console.log(`Allowing sign-in for ${user.email} with ${account.provider}`)
        return true
      }
      
      // Default to allowing sign in
      return true
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Allow users to link Google accounts with the same email
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },  
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { 
          scope: 'openid profile email',
        }
      },
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      // Allow users to link LinkedIn accounts with the same email
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const client = await clientPromise
          const db = client.db('smartlink') // Explicitly use 'smartlink' database
          const user = await db.collection("users").findOne({ email: credentials.email }) as User | null

          // Check if user exists and has a password (password could be undefined for social logins)
          if (!user || typeof user.password !== 'string') {
            return null
          }

          // Use the server-side only password verification
          const passwordMatch = await verifyPassword(credentials.password, user.password)
          if (!passwordMatch) {
            return null
          }

          return {
            id: user._id?.toString() || "",
            email: user.email,
            name: user.name || user.companyName,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'smartlink' // Explicitly use 'smartlink' database
  }),
  // Explicit JWT configuration to fix decryption errors
  jwt: {
    // Explicitly specify the encryption/decryption mechanism
    secret: process.env.NEXTAUTH_SECRET,
    // Short maxAge to help with debugging - you might want to increase this in production
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Add debug mode for development 
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)

// Export authOptions for use in other files
export { authOptions }