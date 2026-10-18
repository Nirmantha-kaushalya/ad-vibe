import type { Metadata } from "next";

import { AdminLoginForm } from "@/src/components/admin/admin-login-form";

export const metadata: Metadata = { title: "Studio Sign In | Ad Vibe", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-5">
      <div className="w-full border border-[var(--border)] bg-[var(--panel)] p-7 shadow-[0_25px_90px_rgba(40,42,37,0.08)] sm:p-10">
        <div className="mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252620] text-[10px] font-medium tracking-[0.12em] text-white">AV</div>
          <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Ad Vibe studio</div>
          <h1 className="mt-2 font-[var(--font-display)] text-4xl text-[var(--ivory)]">Welcome back.</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">Sign in to keep your portfolio in good hands.</p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
