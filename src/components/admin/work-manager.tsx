"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type ManagedWork = {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  order: number;
  published: boolean;
  createdAt: string;
};

export function WorkManager({ initialWorks, initialStatus = "" }: { initialWorks: ManagedWork[]; initialStatus?: string }) {
  const [works, setWorks] = useState(initialWorks);
  const [pendingId, setPendingId] = useState("");
  const [status, setStatus] = useState(initialStatus);

  async function update(id: string, method: "PATCH" | "DELETE", body?: object) {
    setPendingId(id);
    setStatus("");
    try {
      const response = await fetch(`/api/works/${encodeURIComponent(id)}`, {
        method,
        ...(body ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {}),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "The portfolio could not be updated.");

      if (method === "DELETE") {
        setWorks((items) => items.filter((work) => work.id !== id));
        setStatus("Project and its media were deleted.");
      } else {
        setWorks((items) => items.map((work) => work.id === id ? { ...work, published: !work.published } : work));
        setStatus("Publish status updated.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "The portfolio could not be updated.");
    } finally {
      setPendingId("");
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Portfolio</div>
          <h1 className="mt-2 font-[var(--font-display)] text-5xl text-[var(--ivory)]">Your work</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{works.length} project{works.length === 1 ? "" : "s"} in your studio.</p>
        </div>
        <Link href="/admin/works/new" className="inline-flex items-center gap-2 rounded-full bg-[#252620] px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-white transition hover:bg-[var(--gold)]">
          <Plus size={15} /> Add project
        </Link>
      </div>

      {status && <p aria-live="polite" className="mb-5 text-sm text-[var(--muted)]" role="status">{status}</p>}

      {works.length === 0 ? (
        <div className="border-y border-[var(--border)] py-14 text-center">
          <h2 className="font-[var(--font-display)] text-3xl">A blank canvas.</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Add your first project to start building the portfolio.</p>
          <Link className="mt-5 inline-flex text-sm text-[var(--gold)] underline underline-offset-4" href="/admin/works/new">Add a project</Link>
        </div>
      ) : (
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {works.map((work) => {
            const image = work.type === "video" ? work.thumbnailUrl : work.url;
            return (
              <article key={work.id} className="grid gap-4 py-5 md:grid-cols-[96px_1fr_auto] md:items-center">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da] md:w-24">
                  {image && <Image src={image} alt="" fill sizes="96px" className="object-cover" />}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate font-[var(--font-display)] text-2xl">{work.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{work.description}</p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-[var(--gold)]">{work.type} · {work.published ? "Published" : "Draft"} · Order {work.order}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    aria-pressed={work.published}
                    disabled={pendingId === work.id}
                    onClick={() => void update(work.id, "PATCH", { published: !work.published })}
                    type="button"
                    className="rounded-full border border-[var(--border)] px-3 py-2 text-[9px] uppercase tracking-[0.13em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--ivory)] disabled:opacity-50"
                  >
                    {work.published ? "Unpublish" : "Publish"}
                  </button>
                  <Link href={`/admin/works/${work.id}/edit`} className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-3 py-2 text-[9px] uppercase tracking-[0.13em] hover:border-[var(--gold)]">
                    <Pencil size={12} /> Edit
                  </Link>
                  <button
                    disabled={pendingId === work.id}
                    onClick={() => {
                      if (window.confirm(`Delete “${work.title}” and its uploaded media? This cannot be undone.`)) {
                        void update(work.id, "DELETE");
                      }
                    }}
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-red-900/15 px-3 py-2 text-[9px] uppercase tracking-[0.13em] text-red-800 hover:border-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
