/**
 * Client-safe MongoDB functions
 * 
 * This file provides wrappers around MongoDB operations that are safe to import
 * in client components. The actual MongoDB code will only be loaded on the server.
 */

import { User } from "./models/User";

/**
 * Find a user by email
 * This can be safely imported anywhere but will only run on the server
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  if (typeof window !== 'undefined') {
    console.error('MongoDB functions cannot be executed on the client side');
    return null;
  }
  
  try {
    // Dynamically import MongoDB client only on the server
    const clientPromise = (await import('./mongodb')).default;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB as string);
    
    return db.collection('users').findOne({ email }) as Promise<User | null>;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

/**
 * Get user profile safely
 */
export async function getUserProfile(userId: string): Promise<Partial<User> | null> {
  if (typeof window !== 'undefined') {
    console.error('MongoDB functions cannot be executed on the client side');
    return null;
  }
  
  try {
    // Dynamically import MongoDB client only on the server
    const clientPromise = (await import('./mongodb')).default;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB as string);
    
    const user = await db.collection('users').findOne(
      { _id: new (await import('mongodb')).ObjectId(userId) },
      { projection: { password: 0 } } // Exclude password
    );
    
    return user;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
} 