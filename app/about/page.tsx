import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SiteShell } from "@/src/components/layout/site-shell";

export const metadata: Metadata = {
  title: "About | Ad Vibe",
  description: "A little about Ad Vibe and the design services I offer.",
};

const services = [
  "Tuition post design",
  "Tute cover design",
  "Social media post design",
  "Reel video editing",
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8 md:px-10 md:pb-28 md:pt-36">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">About me</p>
        <h1 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ivory)] sm:text-6xl">
          Creative design, made clear.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
          I&apos;m a graphic designer with experience creating educational and social content. I make thoughtful visuals that help your ideas stand out.
        </p>

        <div className="mt-12 border-t border-[var(--border)] pt-7">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--gold)]">What I do</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-4 text-sm text-[var(--ivory)]">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/contact"
          className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#252620] px-5 text-xs font-medium text-white transition-colors hover:bg-[var(--gold)]"
        >
          Let&apos;s work together <ArrowUpRight size={15} />
        </Link>
      </section>
    </SiteShell>
  );
}
