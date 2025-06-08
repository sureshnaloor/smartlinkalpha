"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import clientPromise from "@/lib/mongodb"

// Dynamic imports for server-only libraries
const hashPassword = async (password: string): Promise<string> => {
  const { hash } = await import('bcrypt')
  return hash(password, 10)
}

const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const { compare } = await import('bcrypt')
  return compare(plainPassword, hashedPassword)
}

// Authentication result type
type AuthResult = 
  | { success: true; redirectUrl?: string }
  | { error: string }

/**
 * Server-side authentication validation for credentials
 */
export async function authenticateWithCredentials(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('smartlink'); // Explicitly use 'smartlink' database
    
    // Check if user exists (actual password check is done by NextAuth in the auth.ts file)
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return { error: 'Invalid email or password' };
    }
    
    // Return success (actual password validation happens in NextAuth)
    return { success: true };
  } catch (error) {
    console.error('Error during credential validation:', error);
    return { error: 'An error occurred during authentication' };
  }
}

/**
 * Register a new user
 */
export async function registerUser(
  formData: FormData
): Promise<AuthResult> {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
      return { error: "All fields are required" }
    }

    // Check if user already exists
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB as string)
    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash password using dynamic import
    const hashedPassword = await hashPassword(password)

    // Insert user into database
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    if (result.acknowledged) {
      // In NextAuth.js v4, we return success and let the client handle sign-in
      return { success: true, redirectUrl: "/signin" }
    } else {
      return { error: "Failed to create user" }
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An error occurred during registration" }
  }
}

/**
 * Change user password
 */
export async function changePassword(
  formData: FormData
): Promise<AuthResult> {
  try {
    const email = formData.get("email") as string
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string

    if (!email || !currentPassword || !newPassword) {
      return { error: "All fields are required" }
    }

    // Get the user from database
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB as string)
    const user = await db.collection("users").findOne({ email })

    if (!user || !user.password) {
      return { error: "User not found" }
    }

    // Verify current password using dynamic import
    const isPasswordValid = await verifyPassword(currentPassword, user.password)
    if (!isPasswordValid) {
      return { error: "Current password is incorrect" }
    }

    // Hash new password using dynamic import
    const hashedPassword = await hashPassword(newPassword)

    // Update password in database
    const result = await db.collection("users").updateOne(
      { email },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    )

    if (result.modifiedCount === 1) {
      return { success: true }
    } else {
      return { error: "Failed to update password" }
    }
  } catch (error) {
    console.error("Password change error:", error)
    return { error: "An error occurred while changing password" }
  }
} 