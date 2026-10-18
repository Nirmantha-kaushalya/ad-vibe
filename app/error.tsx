"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Public page error:", error.digest ?? error.name);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--base)] px-5 text-[var(--ivory)]">
      <div className="max-w-lg text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">A small interruption</p>
        <h1 className="mt-5 font-[var(--font-display)] text-5xl">We couldn&apos;t load this page.</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">Please try again. If the problem keeps happening, come back in a little while.</p>
        <button type="button" onClick={reset} className="mt-7 rounded-full bg-[#252620] px-6 py-4 text-[10px] uppercase tracking-[0.17em] text-white transition hover:bg-[var(--gold)]">Try again</button>
      </div>
    </main>
  );
}
