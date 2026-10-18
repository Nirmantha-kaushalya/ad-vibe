"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    const email = new FormData(event.currentTarget).get("email");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setStatus({ kind: "error", text: result.error ?? "We couldn’t process that request. Please try again." });
        return;
      }
      setStatus({ kind: "success", text: result.message ?? "If an account matches that email, a reset link will be sent." });
    } catch {
      setStatus({ kind: "error", text: "Password reset is unavailable right now. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={submit}>
      <label className="block text-sm text-[var(--muted)]">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)]">Admin email</span>
        <input autoComplete="email" className="w-full rounded-xl border border-[var(--border)] bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)]" maxLength={254} name="email" placeholder="hello@brand.com" required type="email" />
      </label>
      {status && <p aria-live="polite" className={`text-sm ${status.kind === "error" ? "text-red-700" : "text-emerald-800"}`} role={status.kind === "error" ? "alert" : "status"}>{status.text}</p>}
      <button className="w-full rounded-full bg-[#252620] px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)] disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending request..." : "Send reset link"}
      </button>
      <Link href="/admin/login" className="block text-center text-sm text-[var(--muted)] hover:text-[var(--ivory)]">Back to sign in</Link>
    </form>
  );
}
