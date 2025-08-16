import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getDemoState, setDemoState, toggleDemoState } from '@/lib/models/Demo';

// GET /api/demo - Get current demo state
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const visible = await getDemoState();
    
    return NextResponse.json({ visible });

  } catch (error) {
    console.error('Error getting demo state:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/demo - Set demo state
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { visible } = body;

    if (typeof visible !== 'boolean') {
      return NextResponse.json({ error: 'Invalid visible value' }, { status: 400 });
    }

    const success = await setDemoState(visible);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to update demo state' }, { status: 500 });
    }

    return NextResponse.json({ 
      visible,
      message: visible ? 'Demo data enabled' : 'Demo data disabled'
    });

  } catch (error) {
    console.error('Error setting demo state:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/demo - Toggle demo state
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await toggleDemoState();
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to toggle demo state' }, { status: 500 });
    }

    const newState = await getDemoState();
    
    return NextResponse.json({ 
      visible: newState,
      message: newState ? 'Demo data enabled' : 'Demo data disabled'
    });

  } catch (error) {
    console.error('Error toggling demo state:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
