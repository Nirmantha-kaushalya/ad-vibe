import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Types } from "mongoose";
import { z } from "zod";

import { hasAdminAccess } from "@/src/lib/admin-auth";
import { getCloudinary } from "@/src/lib/cloudinary";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Work } from "@/src/models/work";

const schema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  type: z.enum(["image", "video"]),
  url: z.string().url().refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com";
  }),
  publicId: z.string().trim().min(1).max(255).regex(/^[\w/-]+$/).refine((value) => !value.includes("..")),
  thumbnailUrl: z.string().url().optional(),
  order: z.number().int().min(0).max(100000),
  published: z.boolean(),
}).strict().refine((work) => work.type !== "video" || Boolean(work.thumbnailUrl), {
  message: "A video thumbnail is required.",
  path: ["thumbnailUrl"],
});
const visibilitySchema = z.object({ published: z.boolean() }).strict();

async function invalidatePortfolio() {
  revalidateTag("works", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/works");
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Work not found." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = visibilitySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid publish state." }, { status: 400 });

  try {
    await connectToDatabase();
    const result = await Work.updateOne({ _id: id }, { $set: parsed.data });
    if (result.matchedCount !== 1) return NextResponse.json({ error: "Work not found." }, { status: 404 });
    await invalidatePortfolio();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Could not change work visibility:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Could not update publish state." }, { status: 503 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Work not found." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Check the work details and uploaded media." }, { status: 400 });

  try {
    await connectToDatabase();
    const previous = await Work.findById(id);
    if (!previous) return NextResponse.json({ error: "Work not found." }, { status: 404 });
    const mediaChanged = previous.publicId !== parsed.data.publicId || previous.type !== parsed.data.type;
    const work = await Work.findByIdAndUpdate(id, parsed.data, { new: true, runValidators: true });
    if (!work) return NextResponse.json({ error: "Work not found." }, { status: 404 });
    let cleanupWarning: string | undefined;
    if (mediaChanged) {
      try {
        const { client } = getCloudinary();
        const deletion = await client.uploader.destroy(previous.publicId, {
          resource_type: previous.type === "video" ? "video" : "image",
          invalidate: true,
        });
        if (deletion.result !== "ok" && deletion.result !== "not found") {
          throw new Error(`Cloudinary asset deletion failed: ${deletion.result}`);
        }
      } catch (error) {
        console.error("Updated project but could not remove replaced media:", error instanceof Error ? error.message : "Unknown error");
        cleanupWarning = "Project was saved, but the previous media could not be removed from Cloudinary.";
      }
    }
    await invalidatePortfolio();
    return NextResponse.json({ success: true, ...(cleanupWarning ? { warning: cleanupWarning } : {}) });
  } catch (error) {
    console.error("Could not update work:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Could not update this work." }, { status: 503 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Work not found." }, { status: 404 });

  try {
    await connectToDatabase();
    const work = await Work.findById(id);
    if (!work) return NextResponse.json({ error: "Work not found." }, { status: 404 });

    const { client } = getCloudinary();
    const deletion = await client.uploader.destroy(work.publicId, {
      resource_type: work.type === "video" ? "video" : "image",
      invalidate: true,
    });
    if (deletion.result !== "ok" && deletion.result !== "not found") {
      throw new Error(`Cloudinary asset deletion failed: ${deletion.result}`);
    }

    await work.deleteOne();
    await invalidatePortfolio();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Could not delete work:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Could not delete this work and its media." }, { status: 503 });
  }
}
