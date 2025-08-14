import { NextResponse } from 'next/server';

export async function GET() {
  const envInfo = `
Environment Variables Debug:
=======================
NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'NOT SET'}
NODE_ENV: ${process.env.NODE_ENV || 'NOT SET'}
GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET'}
GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET'}
LINKEDIN_CLIENT_ID: ${process.env.LINKEDIN_CLIENT_ID ? 'SET' : 'NOT SET'}
LINKEDIN_CLIENT_SECRET: ${process.env.LINKEDIN_CLIENT_SECRET ? 'SET' : 'NOT SET'}
MONGODB_URI: ${process.env.MONGODB_URI ? 'SET' : 'NOT SET'}
NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET'}

Callback URLs:
=============
Google: ${process.env.NEXTAUTH_URL}/api/auth/callback/google
LinkedIn: ${process.env.NEXTAUTH_URL}/api/auth/callback/linkedin

Timestamp: ${new Date().toISOString()}
`;

  return new NextResponse(envInfo, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 