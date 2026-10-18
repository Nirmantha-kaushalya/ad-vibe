import { NextResponse } from "next/server";
import { z } from "zod";

import { hasAdminAccess } from "@/src/lib/admin-auth";
import { connectToDatabase } from "@/src/lib/mongodb";
import { checkRateLimit, getRequestIp } from "@/src/lib/rate-limit";
import { Message } from "@/src/models/message";

const messageSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(5000),
  company: z.string().max(200).optional(),
}).strict();

export async function POST(request: Request) {
  const rate = checkRateLimit(`contact:${getRequestIp(request)}`, 3);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Please wait before sending another message." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Check the form fields and try again." }, { status: 400 });
  if (parsed.data.company) return NextResponse.json({ success: true });

  try {
    await connectToDatabase();
    const message = await Message.create({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
    return NextResponse.json({ success: true, id: String(message._id) }, { status: 201 });
  } catch (error) {
    console.error("Could not save contact message:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "We could not send your message right now. Please try again." }, { status: 503 });
  }
}

export async function GET(request: Request) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    await connectToDatabase();
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      messages: messages.map((message) => ({
        id: String(message._id),
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        read: message.read,
        createdAt: message.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Could not load contact messages:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Messages are temporarily unavailable." }, { status: 503 });
  }
}
