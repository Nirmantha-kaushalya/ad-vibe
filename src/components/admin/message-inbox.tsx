"use client";

import { Mail, Trash2 } from "lucide-react";
import { useState } from "react";

type InboxMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function MessageInbox({ initialMessages }: { initialMessages: InboxMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [busyId, setBusyId] = useState("");
  const [status, setStatus] = useState("");

  async function update(id: string, method: "PATCH" | "DELETE", read?: boolean) {
    setBusyId(id);
    setStatus("");
    try {
      const response = await fetch(`/api/contact/${encodeURIComponent(id)}`, {
        method,
        ...(method === "PATCH" ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ read }) } : {}),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Could not update the message.");
      if (method === "DELETE") {
        setMessages((items) => items.filter((item) => item.id !== id));
        setStatus("Message deleted.");
      } else {
        setMessages((items) => items.map((item) => item.id === id ? { ...item, read: Boolean(read) } : item));
        setStatus(read ? "Message marked as read." : "Message marked as unread.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not update the message.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div>
      {status && <p aria-live="polite" className="mb-5 text-sm text-[var(--muted)]" role="status">{status}</p>}
      {messages.length === 0 ? (
        <div className="border-y border-[var(--border)] py-14 text-center">
          <Mail className="mx-auto text-[var(--gold)]" size={24} />
          <h2 className="mt-4 font-[var(--font-display)] text-3xl">All caught up.</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">New notes from the contact form will show up here.</p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {messages.map((message) => (
            <article key={message.id} className={`py-6 ${message.read ? "" : "md:pl-4 md:border-l-2 md:border-[var(--gold)]"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-display)] text-2xl">{message.name}</h2>
                    {!message.read && <span className="rounded-full bg-[#efe6d4] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-[#72582f]">New</span>}
                  </div>
                  <a href={`mailto:${message.email}`} className="mt-1 inline-block text-xs text-[var(--gold)] underline-offset-4 hover:underline">{message.email}</a>
                  <p className="mt-3 text-sm font-medium text-[var(--ivory)]">{message.subject}</p>
                </div>
                <time className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]" dateTime={message.createdAt}>
                  {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.createdAt))}
                </time>
              </div>
              <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-[var(--muted)]">{message.message}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button disabled={busyId === message.id} onClick={() => void update(message.id, "PATCH", !message.read)} type="button" className="rounded-full border border-[var(--border)] px-3 py-2 text-[9px] uppercase tracking-[0.12em] hover:border-[var(--gold)] disabled:opacity-50">
                  Mark {message.read ? "unread" : "read"}
                </button>
                <button
                  disabled={busyId === message.id}
                  onClick={() => {
                    if (window.confirm(`Delete the message from ${message.name}?`)) void update(message.id, "DELETE");
                  }}
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full border border-red-900/15 px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-red-800 hover:border-red-700 disabled:opacity-50"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
