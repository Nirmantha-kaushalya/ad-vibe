import Link from "next/link";

import { adminWorks } from "@/src/content/site";

export default function AdminWorksPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Portfolio</div>
          <h1 className="mt-2 font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-5xl">Works</h1>
        </div>
        <Link href="/admin/works/new" className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[var(--gold)] transition hover:-translate-y-0.5">
          Add work
        </Link>
      </div>

      <div className="space-y-4">
        {adminWorks.map((work) => (
          <div key={work.id} className="flex flex-col gap-4 rounded-[26px] border border-white/10 bg-white/3 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xl text-[var(--ivory)]">{work.title}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{work.type}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                {work.published ? "Published" : "Draft"}
              </span>
              <Link href={`/admin/works/${work.id}/edit`} className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--ivory)]">Edit</Link>
              <button type="button" className="rounded-full border border-[var(--gold)]/60 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
