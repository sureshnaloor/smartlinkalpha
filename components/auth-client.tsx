"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

// This file provides client-side authentication functions for use in React components

/**
 * Client-side wrapper for signIn function
 * @param provider The authentication provider to use
 * @param options Options for the signIn function
 */
export async function signInClient(provider: string, options: any = {}) {
  const { redirectTo, ...rest } = options
  
  // Handle redirect manually for client components
  const searchParams = new URLSearchParams(rest)
  if (redirectTo) {
    searchParams.set("callbackUrl", redirectTo)
  }
  
  // Redirect to the appropriate auth endpoint
  const url = `/api/auth/signin/${provider}?${searchParams.toString()}`
  window.location.href = url
}

/**
 * Client-side wrapper for signOut function
 * @param options Options for the signOut function
 */
export async function signOutClient(options: any = {}) {
  const { redirectTo, ...rest } = options
  
  // Handle redirect manually for client components
  const searchParams = new URLSearchParams(rest)
  if (redirectTo) {
    searchParams.set("callbackUrl", redirectTo)
  }
  
  // Redirect to the signout endpoint
  const url = `/api/auth/signout?${searchParams.toString()}`
  window.location.href = url
}

// Helper function to sign in with credentials
export const signInWithCredentials = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    return { success: !result?.error, error: result?.error }
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, error: "An error occurred during sign in" }
  }
}

// Helper function to sign in with OAuth providers
export const signInWithProvider = (provider: string) => {
  signIn(provider, { callbackUrl: "/dashboard" })
}

// Helper function to sign out
export const handleSignOut = () => {
  signOut({ callbackUrl: "/" })
}

// Component to get current authentication status
export function AuthStatus() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="auth-status">
      {status === "authenticated" ? (
        <div>
          Signed in as {session?.user?.email || "User"}
          <button 
            onClick={() => handleSignOut()}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  )
}