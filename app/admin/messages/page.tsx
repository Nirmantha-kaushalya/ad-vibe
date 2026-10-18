import { MessageInbox } from "@/src/components/admin/message-inbox";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Message } from "@/src/models/message";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  await connectToDatabase();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  const items = messages.map((message) => ({
    id: String(message._id),
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
    read: message.read,
    createdAt: message.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Notes from the outside world</div>
        <h1 className="mt-2 font-[var(--font-display)] text-5xl text-[var(--ivory)]">Inbox</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{items.filter((message) => !message.read).length} unread · {items.length} total</p>
      </div>
      <MessageInbox initialMessages={items} />
    </div>
  );
}
