import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb';

export interface Demo {
  _id?: ObjectId;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getDemoState(): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('smartlink');
  
  const demo = await db.collection('demo').findOne({}) as Demo | null;
  
  // If no demo record exists, default to showing demo data (true)
  return demo ? demo.visible : true;
}

export async function setDemoState(visible: boolean): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('smartlink');
  
  const result = await db.collection('demo').updateOne(
    {}, // Update the first (and only) document
    { 
      $set: { visible, updatedAt: new Date() },
      $setOnInsert: { createdAt: new Date() }
    },
    { upsert: true }
  );
  
  return result.upsertedCount > 0 || result.modifiedCount > 0;
}

export async function toggleDemoState(): Promise<boolean> {
  const currentState = await getDemoState();
  const newState = !currentState;
  
  return await setDemoState(newState);
}
