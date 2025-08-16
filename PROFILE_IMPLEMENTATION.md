# Profile Implementation Documentation

## Overview

This document describes the implementation of the user profile functionality for the SmartLink application. The profile system allows users to manage their company information with two main sections: Basic Information and Contact Information.

## Features

### User-Specific Behavior
- **Demo User (`suresh.naloor@gmail.com`)**: Shows sample/dummy data and doesn't save changes
- **Other Users**: Use actual MongoDB storage for persistent data

### Profile Sections
1. **Basic Information**
   - Company Name
   - Company Website
   - Company Description
   - Year Established
   - Number of Employees
   - Business Type

2. **Contact Information**
   - Address Line 1
   - Address Line 2 (Optional)
   - City
   - State/Province
   - Postal Code
   - Country
   - Phone Number
   - Email

### Profile Completion Tracking
- Real-time calculation of profile completion percentage
- Visual progress indicator
- Completion status badges (Not Started, Just Started, In Progress, Almost Complete, Complete)

## Database Schema

### Profile Collection
```typescript
interface Profile {
  _id?: ObjectId;
  userId: ObjectId;
  email: string;
  basicInfo: BasicInfo;
  contactInfo: ContactInfo;
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### BasicInfo Interface
```typescript
interface BasicInfo {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  yearEstablished: string;
  numberOfEmployees: string;
  businessType: string;
}
```

### ContactInfo Interface
```typescript
interface ContactInfo {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}
```

## API Endpoints

### GET /api/profile
- **Purpose**: Retrieve user profile data
- **Authentication**: Required
- **Response**: Profile data or empty structure for new users
- **Demo User**: Returns sample data

### POST /api/profile
- **Purpose**: Update entire profile
- **Authentication**: Required
- **Body**: `{ basicInfo, contactInfo }`
- **Response**: Success message and completion percentage

### POST /api/profile/basic-info
- **Purpose**: Update basic information only
- **Authentication**: Required
- **Body**: `{ basicInfo }`
- **Response**: Success message and completion percentage

### POST /api/profile/contact-info
- **Purpose**: Update contact information only
- **Authentication**: Required
- **Body**: `{ contactInfo }`
- **Response**: Success message and completion percentage

## File Structure

```
lib/
├── models/
│   ├── Profile.ts          # Profile model and database operations
│   └── User.ts             # User model (existing)
├── mongodb.ts              # MongoDB client (existing)
└── session.ts              # Session utilities (existing)

app/
├── api/
│   └── profile/
│       ├── route.ts        # Main profile API
│       ├── basic-info/
│       │   └── route.ts    # Basic info API
│       └── contact-info/
│           └── route.ts    # Contact info API
└── dashboard/
    └── profile/
        └── page.tsx        # Profile page component
```

## Implementation Details

### Profile Model (`lib/models/Profile.ts`)
- Database operations for profile CRUD
- Completion percentage calculation
- Type-safe interfaces

### API Routes
- Authentication checks using NextAuth session
- Demo user handling
- Error handling and validation
- MongoDB integration

### Frontend Component (`app/dashboard/profile/page.tsx`)
- React Hook Form with Zod validation
- Real-time form updates
- Loading states and error handling
- Progress tracking and visual feedback

## Environment Variables Required

```env
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=your-database-name
```

## Usage

### For Demo User (`suresh.naloor@gmail.com`)
1. Navigate to `/dashboard/profile`
2. View sample data
3. Form submissions show success but don't persist

### For Other Users
1. Navigate to `/dashboard/profile`
2. Fill in profile information
3. Data is automatically saved to MongoDB
4. Profile completion is tracked and displayed

## Testing

Run the test script to verify API endpoints:
```bash
node test-profile-api.js
```

This will test that:
- API endpoints are properly protected
- Authentication is required
- Endpoints respond correctly

## Future Enhancements

1. **Profile Validation**: Add more comprehensive validation rules
2. **File Uploads**: Add support for company logos and documents
3. **Profile Templates**: Pre-defined profile templates for different business types
4. **Profile Sharing**: Allow users to share their profile publicly
5. **Profile Analytics**: Track profile views and engagement

## Error Handling

- Network errors are caught and displayed to users
- Validation errors show specific field messages
- Database errors are logged and return generic error messages
- Authentication errors redirect to login

## Security Considerations

- All API endpoints require authentication
- User data is isolated by email/user ID
- Input validation prevents malicious data
- MongoDB injection protection through proper query structure
