import { Schema, model, models } from "mongoose";

export interface AdminRecord {
  username: string;
  email: string;
  passwordHash: string;
  resetTokenHash?: string;
  resetTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<AdminRecord>(
  {
    username: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    passwordHash: { type: String, required: true },
    resetTokenHash: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  { timestamps: true },
);

export const Admin = models.Admin || model<AdminRecord>("Admin", adminSchema);
