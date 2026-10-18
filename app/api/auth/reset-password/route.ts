import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_ID } from "@/src/lib/admin-session";
import { getAdminCollection } from "@/src/lib/mongodb";

const schema = z
  .object({
    token: z.string().regex(/^[a-f0-9]{64}$/i),
    password: z.string().min(12).max(128),
  })
  .strict();

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Use a valid reset link and a password of at least 12 characters." }, { status: 400 });
  }

  try {
    const admins = await getAdminCollection();
    const tokenHash = createHash("sha256").update(parsed.data.token).digest("hex");
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const result = await admins.updateOne(
      { _id: ADMIN_ID, resetTokenHash: tokenHash, resetTokenExpires: { $gt: new Date() } },
      {
        $set: { passwordHash, updatedAt: new Date() },
        $unset: { resetTokenHash: "", resetTokenExpires: "" },
      },
    );

    if (result.modifiedCount !== 1) {
      return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password update failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Password reset is unavailable right now." }, { status: 503 });
  }
}
