import type { Metadata } from "next";

import { ResetPasswordForm } from "@/src/components/admin/reset-password-form";

export const metadata: Metadata = { title: "Set New Password | Ad Vibe", robots: { index: false, follow: false } };

export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-5">
      <div className="w-full border border-[var(--border)] bg-[var(--panel)] p-7 shadow-[0_25px_90px_rgba(40,42,37,0.08)] sm:p-10">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Secure studio access</div>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl text-[var(--ivory)]">Choose a new password.</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">For your security, reset links expire 30 minutes after they&apos;re sent.</p>
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
