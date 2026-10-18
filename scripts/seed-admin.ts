import bcrypt from "bcryptjs";
import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";

import { ADMIN_ID } from "../src/lib/admin-session";
import { getAdminCollection } from "../src/lib/mongodb";

loadEnvConfig(process.cwd());

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function seedAdmin() {
  requiredEnv("MONGODB_URI");
  const adminUsername = requiredEnv("ADMIN_USERNAME").trim();
  const adminEmail = requiredEnv("ADMIN_EMAIL").trim();
  const adminPassword = requiredEnv("ADMIN_PASSWORD");
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  try {
    const admins = await getAdminCollection();
    const now = new Date();
    const existingCount = await admins.countDocuments();
    if (existingCount > 0) {
      const existingAdmin = await admins.findOne({ _id: ADMIN_ID });
      if (!existingAdmin) {
        throw new Error("The admins collection contains an unexpected record; refusing to create another admin.");
      }
      console.log("The single admin account already exists; no changes made.");
      return;
    }

    await admins.insertOne({
      _id: ADMIN_ID,
      username: adminUsername,
      email: adminEmail,
      passwordHash,
      role: "admin",
      createdAt: now,
      updatedAt: now,
    });
    console.log("Admin account created.");
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  const uri = process.env.MONGODB_URI;
  console.error("Failed to seed admin:", uri ? message.replace(uri, "[redacted]") : message);
  process.exitCode = 1;
});
