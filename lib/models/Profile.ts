import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb';

export interface BasicInfo {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  yearEstablished: string;
  numberOfEmployees: string;
  businessType: string;
}

export interface ContactInfo {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

export interface Profile {
  _id?: ObjectId;
  userId: ObjectId;
  email: string;
  basicInfo: BasicInfo;
  contactInfo: ContactInfo;
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function findProfileByEmail(email: string): Promise<Profile | null> {
  const client = await clientPromise;
  const db = client.db('smartlink'); // Use same database as NextAuth
  
  return db.collection('profiles').findOne({ email }) as Promise<Profile | null>;
}

export async function findProfileByUserId(userId: ObjectId | string): Promise<Profile | null> {
  const client = await clientPromise;
  const db = client.db('smartlink'); // Use same database as NextAuth
  
  const _userId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  
  return db.collection('profiles').findOne({ userId: _userId }) as Promise<Profile | null>;
}

export async function createProfile(profileData: Omit<Profile, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const client = await clientPromise;
  const db = client.db('smartlink'); // Use same database as NextAuth
  
  const result = await db.collection('profiles').insertOne({
    ...profileData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  return result.insertedId;
}

export async function updateProfile(email: string, updateData: Partial<Profile>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('smartlink'); // Use same database as NextAuth
  
  const result = await db.collection('profiles').updateOne(
    { email },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}

export async function upsertProfile(profileData: Omit<Profile, '_id' | 'createdAt' | 'updatedAt'>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('smartlink'); // Use same database as NextAuth
  
  const result = await db.collection('profiles').updateOne(
    { email: profileData.email },
    { 
      $set: { ...profileData, updatedAt: new Date() },
      $setOnInsert: { createdAt: new Date() }
    },
    { upsert: true }
  );
  
  return result.upsertedCount > 0 || result.modifiedCount > 0;
}

export async function deleteProfile(email: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('smartlink'); // Use same database as NextAuth
  
  const result = await db.collection('profiles').deleteOne({ email });
  
  return result.deletedCount > 0;
}

// Helper function to calculate profile completion percentage
export function calculateCompletionPercentage(basicInfo: BasicInfo, contactInfo: ContactInfo): number {
  const basicInfoFields = [
    'companyName',
    'companyWebsite',
    'companyDescription',
    'yearEstablished',
    'numberOfEmployees',
    'businessType'
  ];
  
  const contactInfoFields = [
    'addressLine1',
    'city',
    'state',
    'postalCode',
    'country',
    'phone',
    'email',
  ];
  
  const totalFields = basicInfoFields.length + contactInfoFields.length;
  let completedFields = 0;
  
  // Count completed fields in basicInfo
  basicInfoFields.forEach(field => {
    const value = basicInfo[field as keyof BasicInfo];
    if (value && typeof value === 'string' && value.trim() !== '') {
      completedFields++;
    }
  });
  
  // Count completed fields in contactInfo
  contactInfoFields.forEach(field => {
    const value = contactInfo[field as keyof ContactInfo];
    if (value && typeof value === 'string' && value.trim() !== '') {
      completedFields++;
    }
  });
  
  return Math.round((completedFields / totalFields) * 100);
}
