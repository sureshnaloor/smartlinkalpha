import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  
  // Get the NextAuth.js session token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isLoggedIn = !!token
  
  // Define your public routes
  const isPublicRoute = [
    '/',
    '/login', 
    '/signin',
    '/signup',
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/auth/callback',
    '/api/auth/session',
    '/api/auth/csrf',
  ].includes(nextUrl.pathname) || 
    nextUrl.pathname.startsWith('/_next') || 
    nextUrl.pathname.startsWith('/api/auth') ||
    nextUrl.pathname.includes('.')

  // If it's a protected route and user isn't logged in, redirect to login
  if (!isPublicRoute && !isLoggedIn) {
    // Store the original URL the user was trying to access
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search)
    return NextResponse.redirect(new URL(`/signin?callbackUrl=${callbackUrl}`, nextUrl.origin))
  }

  // If user is logged in and trying to access login/signup, redirect to dashboard
  if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signin' || nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
  }

  // Handle redirect from login to signin (consistency)
  if (!isLoggedIn && nextUrl.pathname === '/login') {
    const callbackUrl = nextUrl.searchParams.get('callbackUrl')
    const redirectUrl = callbackUrl ? `/signin?callbackUrl=${callbackUrl}` : '/signin'
    return NextResponse.redirect(new URL(redirectUrl, nextUrl.origin))
  }

  return NextResponse.next()
}

// Don't invoke middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. static files (.ico, .png, etc.)
     * 2. public assets stored in `public` directory
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 