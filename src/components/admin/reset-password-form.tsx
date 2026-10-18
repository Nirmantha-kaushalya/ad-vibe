"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  const strength = password.length >= 12
    ? /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)
      ? "Strong password"
      : "Good start — add upper/lowercase letters, a number and a symbol."
    : "Use at least 12 characters.";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const fields = new FormData(event.currentTarget);
    const confirmation = fields.get("confirmation");
    if (password !== confirmation) {
      setError("Those passwords don’t match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "The password could not be updated.");
        return;
      }
      setComplete(true);
    } catch {
      setError("Password reset is unavailable right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (complete) {
    return (
      <div className="text-center">
        <p className="text-sm text-emerald-800" role="status">Your password has been updated.</p>
        <Link href="/admin/login" className="mt-5 inline-flex rounded-full bg-[#252620] px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)]">Return to sign in</Link>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={submit}>
      <label className="block text-sm text-[var(--muted)]">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)]">New password</span>
        <input autoComplete="new-password" className="w-full rounded-xl border border-[var(--border)] bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)]" maxLength={128} minLength={12} onChange={(event) => setPassword(event.target.value)} required type="password" />
        <span className="mt-2 block text-xs">{strength}</span>
      </label>
      <label className="block text-sm text-[var(--muted)]">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)]">Confirm password</span>
        <input autoComplete="new-password" className="w-full rounded-xl border border-[var(--border)] bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)]" maxLength={128} minLength={12} name="confirmation" required type="password" />
      </label>
      {error && <p aria-live="polite" className="text-sm text-red-700" role="alert">{error}</p>}
      <button className="w-full rounded-full bg-[#252620] px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)] disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Updating password..." : "Update password"}
      </button>
    </form>
  );
}
