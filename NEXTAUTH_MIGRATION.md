# NextAuth.js v4 Migration Guide

This guide provides information about how to complete the migration from Auth.js v5 (beta) to NextAuth.js v4 (stable).

## Changes Made

1. Updated dependencies:
   - Changed from `next-auth@5.0.0-beta.25` to `next-auth@4.24.5`
   - Added `@next-auth/mongodb-adapter@1.1.3` for MongoDB integration
   - Removed `@auth/nextjs` as it's no longer needed

2. Updated Auth Configuration:
   - Switched from Auth.js v5 to NextAuth.js v4 in `auth.ts`
   - Added MongoDB adapter for user persistence
   - Updated API route to use NextAuth.js v4 format
   - Added explicit JWT configuration to prevent decryption errors

3. Updated Client Components:
   - Created a `SessionProvider` for client-side auth context
   - Updated auth components to use v4 imports

4. Created Server-Side Helpers:
   - Added a `lib/session.ts` helper for server components
   - Updated components to use `getSession()` instead of `auth()`
   - Fixed type definitions in `/types/next-auth.d.ts`

## Fixing the "Configuration" Error

If you see an error like `GET /signin?error=Configuration`, it's typically because:

1. The environment variables aren't properly set up:

```
NEXTAUTH_URL=http://localhost:3000  # Required in NextAuth v4
NEXTAUTH_SECRET=your_secret_here    # Required for JWT encryption
MONGODB_DB=your_db_name            # Your MongoDB database name
GOOGLE_CLIENT_ID=your_client_id     # If using Google auth
GOOGLE_CLIENT_SECRET=your_client_secret
LINKEDIN_CLIENT_ID=your_client_id   # If using LinkedIn auth
LINKEDIN_CLIENT_SECRET=your_client_secret
```

2. The MongoDB connection might be failing:
   - Check that MongoDB is running and accessible
   - Verify your connection string in the MongoDB client setup

3. Provider configuration:
   - Ensure all OAuth providers have valid credentials
   - For local development, make sure redirect URIs are properly set in the provider's developer console

## Fixing JWT Decryption Errors

If you encounter errors like `[next-auth][error][JWT_SESSION_ERROR] "decryption operation failed"`:

1. **Clear all cookies and browser storage**:
   - The most reliable way is to clear site data for your domain
   - In Chrome: DevTools > Application > Storage > Clear site data

2. **Check NEXTAUTH_SECRET**:
   - Ensure the secret is consistent between environments
   - Make sure it's properly set in your `.env.local` file
   - For development, you can set it to any secure random string

3. **JWT Configuration**:
   - Add explicit JWT configuration in your auth options:
   ```typescript
   jwt: {
     secret: process.env.NEXTAUTH_SECRET,
     maxAge: 60 * 60 * 24 * 30, // 30 days
   }
   ```

4. **Restart Your Development Server**:
   - Stop your Next.js server completely
   - Run `npm run dev` to start fresh

## Server-Side Authentication

For NextAuth.js v4, we've created a helper to get the session in server components:

```typescript
// Import our helper
import { getSession } from "@/lib/session"

export default async function MyServerComponent() {
  // Use the helper instead of auth()
  const session = await getSession()
  
  // Use the session data
  if (session) {
    // User is authenticated
    return <div>Hello, {session.user.name}</div>
  }
  
  // User is not authenticated
  return <div>Please sign in</div>
}
```

## Troubleshooting

1. **Clear Browser Cache & Cookies**: NextAuth stores data in cookies, so clear them to start fresh.

2. **Check Network Requests**: Use browser dev tools to check network requests to `/api/auth/*` endpoints.

3. **MongoDB Adapter Issues**: If using MongoDB, ensure the adapter is properly configured.

4. **JWT Verification Issues**: Make sure your NEXTAUTH_SECRET is consistent.

5. **Check Server Logs**: Look for errors in your server logs that might give more details.

6. **Try Incognito Mode**: Test your auth flow in an incognito/private browser window.

## Benefits of NextAuth.js v4

- Stable, well-documented API
- Large community support
- Better compatibility with existing packages
- Consistent behavior between development and production

For more information, visit the [NextAuth.js documentation](https://next-auth.js.org/) 