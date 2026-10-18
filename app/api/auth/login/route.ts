import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  ADMIN_ID,
  createAdminSession,
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
} from "@/src/lib/admin-session";
import { getAdminCollection } from "@/src/lib/mongodb";
import { checkRateLimit, getRequestIp } from "@/src/lib/rate-limit";

const credentialsSchema = z
  .object({
    username: z.string().trim().min(1).max(100),
    password: z.string().min(1).max(1024),
  })
  .strict();

export async function POST(request: Request) {
  const rate = checkRateLimit(`login:${getRequestIp(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many sign-in attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const credentials = credentialsSchema.safeParse(body);
  if (!credentials.success) {
    return NextResponse.json({ error: "Enter a valid username and password." }, { status: 400 });
  }

  let admin;
  try {
    admin = await (await getAdminCollection()).findOne({ _id: ADMIN_ID });
  } catch (error) {
    console.error(
      "Admin login could not connect to MongoDB:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return NextResponse.json({ error: "Admin database is unavailable. Please try again." }, { status: 503 });
  }

  const loginIdentifier = credentials.data.username.toLowerCase();
  const validIdentifier =
    admin !== null &&
    (admin.username.toLowerCase() === loginIdentifier ||
      admin.email.toLowerCase() === loginIdentifier);
  const validPassword =
    validIdentifier &&
    admin !== null &&
    typeof admin.passwordHash === "string" &&
    (await bcrypt.compare(credentials.data.password, admin.passwordHash));

  if (!validPassword) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = await createAdminSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });

  return response;
}
