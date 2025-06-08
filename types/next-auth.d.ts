import 'next-auth'
import { DefaultSession } from "next-auth"

declare module 'next-auth' {
  /**
   * Extending the built-in session types
   */
  interface Session {
    user: {
      /** The user's id */
      id?: string
    } & DefaultSession["user"]
  }
  
  interface User {
    id?: string
    companyName?: string
  }
}

declare module 'next-auth/jwt' {
  /** Extending the built-in JWT types */
  interface JWT {
    id?: string
  }
} 