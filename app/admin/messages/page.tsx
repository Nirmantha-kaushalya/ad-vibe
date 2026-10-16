export default function AdminMessagesPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Inbox</div>
        <h1 className="mt-2 font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-5xl">Messages</h1>
      </div>

      <div className="space-y-4">
        {[
          { name: "Alicia Prenn", subject: "Brand refresh", read: false },
          { name: "Daniel Roe", subject: "Website launch", read: true },
        ].map((message) => (
          <div key={message.name} className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/3 p-4">
            <div>
              <div className="text-lg text-[var(--ivory)]">{message.name}</div>
              <div className="mt-1 text-sm text-[var(--muted)]">{message.subject}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                {message.read ? "Read" : "Unread"}
              </span>
              <button type="button" className="rounded-full border border-[var(--gold)]/60 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Mark read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
