import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { hasAdminAccess } from "@/src/lib/admin-auth";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Work } from "@/src/models/work";
import { getPublishedWorks } from "@/src/lib/work-data";

const cloudinaryUrl = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" && url.hostname === "res.cloudinary.com";
}, "Media must be hosted on Cloudinary.");
const publicIdSchema = z.string().trim().min(1).max(255).regex(/^[\w/-]+$/).refine((value) => !value.includes(".."));
const workSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  type: z.enum(["image", "video"]),
  url: cloudinaryUrl,
  publicId: publicIdSchema,
  thumbnailUrl: cloudinaryUrl.optional(),
  order: z.number().int().min(0).max(100000).default(0),
  published: z.boolean().default(true),
}).strict().refine((work) => work.type !== "video" || Boolean(work.thumbnailUrl), {
  message: "A video thumbnail is required.",
  path: ["thumbnailUrl"],
});

export async function GET() {
  try {
    return NextResponse.json({ works: await getPublishedWorks() }, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=60" },
    });
  } catch (error) {
    console.error("Could not load public works:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Portfolio is temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = workSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Check the work details and uploaded media." }, { status: 400 });

  try {
    await connectToDatabase();
    const work = await Work.create(parsed.data);
    revalidateTag("works", { expire: 0 });
    revalidatePath("/");
    revalidatePath("/works");
    return NextResponse.json({ id: String(work._id) }, { status: 201 });
  } catch (error) {
    console.error("Could not create work:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Could not save this work." }, { status: 503 });
  }
}
