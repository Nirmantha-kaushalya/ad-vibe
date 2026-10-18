import Link from "next/link";

import { SiteShell } from "@/src/components/layout/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex min-h-[65vh] max-w-5xl flex-col justify-center px-5 py-20 md:px-10">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">404 · Wrong turn</p>
        <h1 className="mt-5 font-[var(--font-display)] text-6xl leading-[0.9] md:text-8xl">Nothing to see<br />here. Yet.</h1>
        <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--muted)]">That page seems to have wandered off. Let&apos;s get you back to something good.</p>
        <Link href="/" className="mt-8 inline-flex w-fit items-center rounded-full bg-[#252620] px-6 py-4 text-[10px] uppercase tracking-[0.17em] text-white transition hover:bg-[var(--gold)]">Back to the studio ↗</Link>
      </section>
    </SiteShell>
  );
}
