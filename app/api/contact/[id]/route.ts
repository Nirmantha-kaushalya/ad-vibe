import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { z } from "zod";

import { hasAdminAccess } from "@/src/lib/admin-auth";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Message } from "@/src/models/message";

const updateSchema = z.object({ read: z.boolean() }).strict();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Message not found." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid read status." }, { status: 400 });

  try {
    await connectToDatabase();
    const result = await Message.updateOne({ _id: id }, { $set: { read: parsed.data.read } });
    if (result.matchedCount !== 1) return NextResponse.json({ error: "Message not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Could not update message:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Could not update the message." }, { status: 503 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminAccess(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Message not found." }, { status: 404 });

  try {
    await connectToDatabase();
    const result = await Message.deleteOne({ _id: id });
    if (result.deletedCount !== 1) return NextResponse.json({ error: "Message not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Could not delete message:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Could not delete the message." }, { status: 503 });
  }
}
