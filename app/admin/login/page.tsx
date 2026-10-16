import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
      <div className="w-full rounded-[32px] border border-white/10 bg-white/3 p-8">
        <div className="mb-8 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Ad Vibe</div>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl text-[var(--ivory)]">Admin login</h1>
        </div>

        <form className="space-y-5">
          <label className="block text-sm text-[var(--muted)]">
            <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Username</span>
            <input className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="admin" />
          </label>

          <label className="block text-sm text-[var(--muted)]">
            <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Password</span>
            <input type="password" className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="••••••••" />
          </label>

          <div className="flex items-center justify-between text-sm text-[var(--muted)]">
            <span>Secure single-admin access</span>
            <Link href="/admin/forgot-password" className="text-[var(--gold)]">Forgot password?</Link>
          </div>

          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full border border-[var(--gold)]/60 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[var(--gold)] transition hover:-translate-y-0.5">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
