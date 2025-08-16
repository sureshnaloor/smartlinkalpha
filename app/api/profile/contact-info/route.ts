import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { findProfileByEmail, upsertProfile, calculateCompletionPercentage } from '@/lib/models/Profile';
import { findUserByEmail } from '@/lib/models/User';
import clientPromise from '@/lib/mongodb';

// GET /api/profile/contact-info - Get contact information
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    const profile = await findProfileByEmail(email);
    
    if (!profile) {
      return NextResponse.json({
        contactInfo: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          phone: "",
          email: email
        }
      });
    }

    return NextResponse.json({
      contactInfo: profile.contactInfo
    });

  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/profile/contact-info - Update contact information
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    const body = await request.json();
    const { contactInfo } = body;

    // Validate required fields
    if (!contactInfo) {
      return NextResponse.json({ error: 'Missing contact information' }, { status: 400 });
    }

    // Get existing profile or create new one
    const existingProfile = await findProfileByEmail(email);
    
    // Get user from NextAuth collections
    const client = await clientPromise;
    const db = client.db('smartlink'); // Use same database as NextAuth
    
    // First try to find user in NextAuth users collection
    let user: any = await db.collection('users').findOne({ email });
    
    // If not found in NextAuth users, try to find in our custom users collection
    if (!user) {
      user = await findUserByEmail(email);
    }
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the user ID, handling both NextAuth and custom user structures
    const userId = user._id || user.id;

    // Prepare profile data
    const basicInfo = existingProfile?.basicInfo || {
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
      yearEstablished: "",
      numberOfEmployees: "",
      businessType: ""
    };

    // Calculate completion percentage
    const completionPercentage = calculateCompletionPercentage(basicInfo, contactInfo);

    // Update or create profile
    const success = await upsertProfile({
      userId: userId,
      email,
      basicInfo,
      contactInfo,
      completionPercentage
    });

    if (!success) {
      return NextResponse.json({ error: 'Failed to update contact information' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Contact information updated successfully',
      completionPercentage
    });

  } catch (error) {
    console.error('Error updating contact information:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/profile/contact-info - Legacy endpoint for backward compatibility
export async function POST(request: NextRequest) {
  // Redirect to PUT method
  return PUT(request);
}
