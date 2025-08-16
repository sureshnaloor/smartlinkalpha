import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { findProfileByEmail, upsertProfile, calculateCompletionPercentage, deleteProfile } from '@/lib/models/Profile';
import { findUserByEmail } from '@/lib/models/User';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

// GET /api/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    
    // Get actual profile from database
    const profile = await findProfileByEmail(email);
    
    if (!profile) {
      // Return empty profile structure for new users
      return NextResponse.json({
        basicInfo: {
          companyName: "",
          companyWebsite: "",
          companyDescription: "",
          yearEstablished: "",
          numberOfEmployees: "",
          businessType: ""
        },
        contactInfo: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          phone: "",
          email: email
        },
        completionPercentage: 0
      });
    }

    return NextResponse.json({
      basicInfo: profile.basicInfo,
      contactInfo: profile.contactInfo,
      completionPercentage: profile.completionPercentage
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/profile - Update entire user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    const body = await request.json();
    const { basicInfo, contactInfo } = body;

    // Validate required fields
    if (!basicInfo || !contactInfo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      completionPercentage
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/profile - Delete user profile
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    
    // Delete profile from database
    const success = await deleteProfile(email);

    if (!success) {
      return NextResponse.json({ error: 'Profile not found or failed to delete' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Profile deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/profile - Legacy endpoint for backward compatibility
export async function POST(request: NextRequest) {
  // Redirect to PUT method
  return PUT(request);
}
