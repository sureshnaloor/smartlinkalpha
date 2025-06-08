import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  name?: string;
  companyName?: string;
  password?: string;
  image?: string;
  provider?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB as string);
  
  return db.collection('users').findOne({ email }) as Promise<User | null>;
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt'>): Promise<ObjectId> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB as string);
  
  const result = await db.collection('users').insertOne({
    ...userData,
    createdAt: new Date(),
  });
  
  return result.insertedId;
}

export async function updateUser(id: ObjectId | string, updateData: Partial<User>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB as string);
  
  const _id = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection('users').updateOne(
    { _id },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
} 