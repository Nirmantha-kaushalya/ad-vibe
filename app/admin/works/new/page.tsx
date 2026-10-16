export default function NewWorkPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Create</div>
        <h1 className="mt-2 font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-5xl">Add work</h1>
      </div>

      <form className="space-y-6 rounded-[30px] border border-white/10 bg-white/3 p-6">
        <label className="block text-sm text-[var(--muted)]">
          <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Title</span>
          <input className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="Project title" />
        </label>

        <label className="block text-sm text-[var(--muted)]">
          <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Description</span>
          <textarea rows={5} className="w-full rounded-[24px] border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="Short project summary" />
        </label>

        <div className="rounded-[24px] border border-dashed border-white/15 p-8 text-center text-[var(--muted)]">
          Drag and drop media or browse for an image/video asset.
        </div>

        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <input type="checkbox" className="h-4 w-4 accent-[var(--gold)]" />
          Publish immediately
        </label>

        <button type="submit" className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--gold)] transition hover:-translate-y-0.5">
          Save work
        </button>
      </form>
    </div>
  );
}
