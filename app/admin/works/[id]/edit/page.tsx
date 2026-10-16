export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Update</div>
        <h1 className="mt-2 font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-5xl">Edit work #{id}</h1>
      </div>

      <form className="space-y-6 rounded-[30px] border border-white/10 bg-white/3 p-6">
        <label className="block text-sm text-[var(--muted)]">
          <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Title</span>
          <input defaultValue="Maison Solene" className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none" />
        </label>

        <label className="block text-sm text-[var(--muted)]">
          <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Description</span>
          <textarea rows={5} defaultValue="Luxury brand story for a modern hospitality concept." className="w-full rounded-[24px] border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none" />
        </label>

        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--gold)]" />
          Published
        </label>

        <button type="submit" className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--gold)] transition hover:-translate-y-0.5">
          Update work
        </button>
      </form>
    </div>
  );
}
