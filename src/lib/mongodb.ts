import type { Collection, Document } from "mongodb";
import mongoose from "mongoose";

export interface AdminRecord extends Document {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "admin";
  resetTokenHash?: string;
  resetTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("Missing required environment variable: MONGODB_URI");
  }

  const cache = (globalThis.mongooseCache ??= {
    connection: null,
    promise: null,
  });

  if (cache.connection) {
    return cache.connection;
  }

  cache.promise ??= mongoose.connect(uri);

  try {
    cache.connection = await cache.promise;
    return cache.connection;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
}

export async function getAdminCollection(): Promise<Collection<AdminRecord>> {
  await connectToDatabase();
  return mongoose.connection.collection<AdminRecord>("admins");
}
