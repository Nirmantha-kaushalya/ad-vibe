import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/src/components/admin/forgot-password-form";

export const metadata: Metadata = { title: "Reset Admin Access | Ad Vibe", robots: { index: false, follow: false } };

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-5">
      <div className="w-full border border-[var(--border)] bg-[var(--panel)] p-7 shadow-[0_25px_90px_rgba(40,42,37,0.08)] sm:p-10">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Secure studio access</div>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl text-[var(--ivory)]">Forgot your password?</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Enter the email for your admin account and we&apos;ll send a reset link.</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
