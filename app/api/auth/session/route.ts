import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

// GET /api/auth/session - Get current session data
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    return NextResponse.json(session);

  } catch (error) {
    console.error('Error getting session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
