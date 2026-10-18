import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_ID } from "@/src/lib/admin-session";
import { sendPasswordResetEmail } from "@/src/lib/mailer";
import { getAdminCollection } from "@/src/lib/mongodb";
import { checkRateLimit, getRequestIp } from "@/src/lib/rate-limit";

const schema = z.object({ email: z.string().trim().email().max(254) }).strict();
const genericMessage = "If an account matches that email, a reset link will be sent.";

export async function POST(request: Request) {
  const rate = checkRateLimit(`forgot:${getRequestIp(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  try {
    const admins = await getAdminCollection();
    const admin = await admins.findOne({ _id: ADMIN_ID, email: parsed.data.email.toLowerCase() });
    if (admin) {
      const token = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
      const update = await admins.updateOne(
        { _id: ADMIN_ID },
        { $set: { resetTokenHash: tokenHash, resetTokenExpires: expiresAt, updatedAt: new Date() } },
      );
      if (update.modifiedCount !== 1) throw new Error("Could not store the password reset token.");
      try {
        await sendPasswordResetEmail(admin.email, token);
      } catch (error) {
        console.error("Could not send password reset email:", error instanceof Error ? error.message : "Unknown error");
      }
    }
  } catch (error) {
    console.error("Password reset request failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Password reset is unavailable right now." }, { status: 503 });
  }

  return NextResponse.json({ message: genericMessage });
}
