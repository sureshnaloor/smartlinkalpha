"use server"

import { hash } from "bcrypt"
import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { findUserByEmail } from "@/lib/models/User"
import { getServerSession } from "next-auth/next"
import authOptions from "@/auth"

type AuthResult = 
  | { success: true }
  | { error: string }

export async function registerUser(formData: FormData): Promise<AuthResult> {
  const companyName = formData.get("companyName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!companyName || !email || !password) {
    return {
      error: "All fields are required"
    }
  }

  try {
    // Check if user already exists
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB as string)
    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
      return {
        error: "User with this email already exists"
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Insert user into database
    const result = await db.collection("users").insertOne({
      companyName,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    if (result.acknowledged) {
      // After registration we now need to sign in the user
      // We'll redirect to the login page for simplicity
      return { success: true }
    } else {
      return {
        error: "Failed to create user"
      }
    }
  } catch (error: any) {
    console.error("Registration error:", error)
    return {
      error: "An error occurred during registration"
    }
  }
}

// For server actions with NextAuth v4
export async function authenticateUser(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      error: "Email and password are required"
    }
  }

  try {
    // For server actions, we'll create a credentials auth request
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB as string)
    const user = await db.collection("users").findOne({ email })
    
    if (!user || typeof user.password !== 'string') {
      return {
        error: "Invalid email or password"
      }
    }
    
    // Verify password
    const { compare } = await import('bcrypt')
    const passwordMatch = await compare(password, user.password)
    
    if (!passwordMatch) {
      return {
        error: "Invalid email or password"
      }
    }
    
    // Password is correct, but since we can't use signIn directly in server actions,
    // we'll return success and handle the actual session creation on the client side
    return { success: true }
  } catch (error: any) {
    console.error("Authentication error:", error)
    return {
      error: "An error occurred during authentication"
    }
  }
} 