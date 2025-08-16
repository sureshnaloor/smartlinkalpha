import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { findProfileByEmail } from '@/lib/models/Profile';

// GET /api/test-profile - Test profile functionality
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    const profile = await findProfileByEmail(email);
    
    return NextResponse.json({
      user: {
        email: session.user.email,
        name: session.user.name,
      },
      hasProfile: !!profile,
      profile: profile ? {
        basicInfo: profile.basicInfo,
        contactInfo: profile.contactInfo,
        completionPercentage: profile.completionPercentage
      } : null
    });

  } catch (error) {
    console.error('Error testing profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
