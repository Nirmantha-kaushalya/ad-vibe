import Link from "next/link";

import { WorkForm } from "@/src/components/admin/work-form";

export default function NewWorkPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/works" className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--gold)]">← All work</Link>
        <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Create a portfolio piece</div>
        <h1 className="mt-2 font-[var(--font-display)] text-5xl text-[var(--ivory)]">Add a project</h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">Upload your finished artwork, add a thoughtful description and decide when it goes live.</p>
      </div>
      <WorkForm />
    </div>
  );
}
