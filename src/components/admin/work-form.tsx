"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import type { UploadedMedia } from "@/src/components/admin/media-uploader";

const MediaUploader = dynamic(
  () => import("@/src/components/admin/media-uploader").then((module) => module.MediaUploader),
  {
    loading: () => <div className="flex min-h-52 items-center justify-center border border-dashed border-[var(--border)] text-sm text-[var(--muted)]">Preparing secure uploader…</div>,
  },
);

type InitialWork = {
  id?: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  publicId: string;
  thumbnailUrl?: string;
  order: number;
  published: boolean;
};

export function WorkForm({ initial }: { initial?: InitialWork }) {
  const router = useRouter();
  const [media, setMedia] = useState<UploadedMedia | null>(initial ? {
    type: initial.type,
    url: initial.url,
    publicId: initial.publicId,
    thumbnailUrl: initial.thumbnailUrl,
  } : null);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error" | "warning"; message: string } | null>(null);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!media) {
      setStatus({ kind: "error", message: "Upload an image or video before saving." });
      return;
    }
    if (isSaving) return;

    const fields = new FormData(event.currentTarget);
    setIsSaving(true);
    setStatus(null);
    try {
      const response = await fetch(initial ? `/api/works/${encodeURIComponent(initial.id ?? "")}` : "/api/works", {
        method: initial ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: fields.get("title"),
          description: fields.get("description"),
          type: media.type,
          url: media.url,
          publicId: media.publicId,
          ...(media.thumbnailUrl ? { thumbnailUrl: media.thumbnailUrl } : {}),
          order: Number(fields.get("order")),
          published: fields.get("published") === "on",
        }),
      });
      const result = (await response.json()) as { error?: string; warning?: string };
      if (!response.ok) {
        setStatus({ kind: "error", message: result.error ?? "Could not save this project." });
        return;
      }
      if (result.warning) {
        setStatus({ kind: "warning", message: result.warning });
        router.refresh();
        return;
      }
      setStatus({ kind: "success", message: initial ? "Project updated." : "Project added to your portfolio." });
      router.push(`/admin/works?${initial ? "updated" : "created"}=1`);
      router.refresh();
    } catch {
      setStatus({ kind: "error", message: "Could not reach the studio. Check your connection and retry." });
    } finally {
      setIsSaving(false);
    }
  }

  const inputClassName = "mt-2 w-full rounded-xl border border-[var(--border)] bg-white/60 px-4 py-3 text-sm text-[var(--ivory)] outline-none transition focus:border-[var(--gold)]";

  return (
    <form className="max-w-3xl space-y-8" onSubmit={save}>
      <div className="border-y border-[var(--border)] py-7">
        <div className="mb-5 text-[10px] uppercase tracking-[0.17em] text-[var(--gold)]">01 · The artwork</div>
        <MediaUploader value={media} onChange={setMedia} />
      </div>

      <div className="grid gap-6 sm:grid-cols-[1fr_140px]">
        <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
          Project title
          <input className={inputClassName} defaultValue={initial?.title} maxLength={120} name="title" placeholder="Aster & Form" required />
        </label>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
          Display order
          <input className={inputClassName} defaultValue={initial?.order ?? 0} max={100000} min={0} name="order" required type="number" />
        </label>
      </div>

      <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
        Project description
        <textarea className={`${inputClassName} min-h-36 resize-y`} defaultValue={initial?.description} maxLength={2000} name="description" placeholder="A short description of the brief and the work." required />
      </label>

      <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
        <input className="mt-0.5 h-4 w-4 accent-[var(--gold)]" defaultChecked={initial?.published ?? true} name="published" type="checkbox" />
        <span><span className="block text-[var(--ivory)]">Publish this project</span><span className="mt-1 block text-xs">Published work appears on the public portfolio.</span></span>
      </label>

      {status && <p aria-live="polite" className={`text-sm ${status.kind === "error" ? "text-red-700" : status.kind === "warning" ? "text-amber-800" : "text-emerald-800"}`} role={status.kind === "error" ? "alert" : "status"}>{status.message}</p>}

      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-6">
        <button className="rounded-full bg-[#252620] px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)] disabled:cursor-wait disabled:opacity-60" disabled={isSaving} type="submit">
          {isSaving ? "Saving project..." : initial ? "Save changes" : "Add to portfolio"}
        </button>
        <Link className="rounded-full border border-[var(--border)] px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--ivory)]" href="/admin/works">Cancel</Link>
      </div>
    </form>
  );
}
