"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Sign in failed. Please try again.");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block text-sm text-[var(--muted)]">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)]">Username or email</span>
        <input
          autoComplete="username"
          className="w-full rounded-xl border border-[var(--border)] bg-white/60 px-4 py-3 text-sm text-[var(--ivory)] outline-none transition focus:border-[var(--gold)] placeholder:text-[var(--muted)]"
          name="username"
          placeholder="admin"
          required
        />
      </label>

      <label className="block text-sm text-[var(--muted)]">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)]">Password</span>
        <input
          autoComplete="current-password"
          className="w-full rounded-xl border border-[var(--border)] bg-white/60 px-4 py-3 text-sm text-[var(--ivory)] outline-none transition focus:border-[var(--gold)] placeholder:text-[var(--muted)]"
          name="password"
          placeholder="Enter your password"
          required
          type="password"
        />
      </label>

      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <span>Secure studio access</span>
        <Link href="/admin/forgot-password" className="underline underline-offset-4 text-[var(--gold)]">
          Forgot password?
        </Link>
      </div>

      <button
        className="inline-flex w-full items-center justify-center rounded-full bg-[#252620] px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)] disabled:cursor-wait disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
