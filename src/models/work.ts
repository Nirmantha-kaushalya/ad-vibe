import { Schema, model, models } from "mongoose";

export type WorkType = "image" | "video";

export interface WorkRecord {
  title: string;
  description: string;
  type: WorkType;
  url: string;
  publicId: string;
  thumbnailUrl?: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workSchema = new Schema<WorkRecord>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    thumbnailUrl: { type: String },
    order: { type: Number, default: 0, min: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

workSchema.index({ published: 1, order: 1, createdAt: -1 });

export const Work = models.Work || model<WorkRecord>("Work", workSchema);
