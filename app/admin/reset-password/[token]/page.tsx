export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
      <div className="w-full rounded-[32px] border border-white/10 bg-white/3 p-8">
        <div className="mb-8 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Secure update</div>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl text-[var(--ivory)]">Reset your password</h1>
        </div>

        <div className="mb-6 rounded-full border border-white/10 bg-transparent px-4 py-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Token: {token}
        </div>

        <form className="space-y-5">
          <label className="block text-sm text-[var(--muted)]">
            <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">New password</span>
            <input type="password" className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="Choose a strong password" />
          </label>

          <label className="block text-sm text-[var(--muted)]">
            <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Confirm password</span>
            <input type="password" className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="Repeat password" />
          </label>

          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full border border-[var(--gold)]/60 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[var(--gold)] transition hover:-translate-y-0.5">
            Update password
          </button>
        </form>
      </div>
    </div>
  );
}
