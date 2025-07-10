import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set',
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID ? 'Set' : 'Not Set',
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET ? 'Set' : 'Not Set',
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not Set',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
  };

  const callbackUrls = {
    google: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
    linkedin: `${process.env.NEXTAUTH_URL}/api/auth/callback/linkedin`,
  };

  return NextResponse.json({
    environment: envVars,
    callbackUrls,
    timestamp: new Date().toISOString(),
  });
} 