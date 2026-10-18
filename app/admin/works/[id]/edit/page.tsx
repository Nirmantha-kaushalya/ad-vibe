import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { WorkForm } from "@/src/components/admin/work-form";
import { getAdminWork } from "@/src/lib/work-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Project | Ad Vibe Studio",
  robots: { index: false, follow: false },
};

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = await getAdminWork(id);
  if (!work) notFound();

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/works" className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--gold)]">← All work</Link>
        <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Refine a portfolio piece</div>
        <h1 className="mt-2 font-[var(--font-display)] text-5xl text-[var(--ivory)]">Edit project</h1>
      </div>
      <WorkForm initial={work} />
    </div>
  );
}
