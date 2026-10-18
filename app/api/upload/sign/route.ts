import { NextResponse } from "next/server";
import { z } from "zod";

import { hasAdminAccess } from "@/src/lib/admin-auth";
import { getCloudinary } from "@/src/lib/cloudinary";

const signSchema = z.object({ type: z.enum(["image", "video"]) }).strict();

export async function POST(request: Request) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
    }
    const parsed = signSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Choose an image or video upload." }, { status: 400 });

    const { client, cloudName, apiKey, apiSecret } = getCloudinary();
    const uploadPreset = parsed.data.type === "image"
      ? process.env.CLOUDINARY_IMAGE_UPLOAD_PRESET
      : process.env.CLOUDINARY_VIDEO_UPLOAD_PRESET;
    const timestamp = Math.floor(Date.now() / 1000);
    const allowedFormats = parsed.data.type === "image" ? "jpg,jpeg,png,webp" : "mp4,webm,mov";
    const params = {
      timestamp,
      folder: "portfolio-works",
      allowed_formats: allowedFormats,
      ...(uploadPreset ? { upload_preset: uploadPreset } : {}),
    };
    const signature = client.utils.api_sign_request(params, apiSecret);

    return NextResponse.json({
      timestamp,
      signature,
      apiKey,
      cloudName,
      folder: params.folder,
      ...(uploadPreset ? { uploadPreset } : {}),
      allowedFormats: params.allowed_formats.split(","),
      maxBytes: parsed.data.type === "image" ? 10 * 1024 * 1024 : 200 * 1024 * 1024,
    });
  } catch (error) {
    console.error("Could not create signed upload:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Media uploads are unavailable." }, { status: 503 });
  }
}
