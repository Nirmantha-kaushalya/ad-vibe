import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Link from "next/link";

import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { getPublishedWorks } from "@/src/lib/work-data";

const WorksGallery = dynamicImport(
  () => import("@/src/components/sections/works-gallery").then((module) => module.WorksGallery),
  {
    loading: () => <div aria-label="Loading projects" className="h-80 animate-pulse border-y border-[var(--border)] bg-[var(--panel)]" />,
  },
);

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Selected Work | Ad Vibe Studio",
  description: "Explore identity, packaging, campaign and digital design projects from the Ad Vibe graphic design studio.",
};

export default async function WorksPage() {
  const works = await getPublishedWorks();

  return (
    <SiteShell>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pb-32 md:pt-20">
        <Reveal className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.26em] text-[var(--gold)]">
          <span className="h-px w-8 bg-[var(--gold)]" /> A little bit of what we do
        </Reveal>
        <Reveal className="max-w-5xl">
          <h1 className="font-[var(--font-display)] text-5xl leading-[0.91] tracking-[-0.035em] text-[var(--ivory)] md:text-8xl">
            Good ideas, <span className="italic text-[var(--gold)]">given a face.</span>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base">
            Identity, packaging, editorial and campaign design, made with a clear point of view and attention to the details that matter.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <WorksGallery works={works} />
        </div>

        <Reveal className="mt-28 flex flex-col gap-6 border-t border-[var(--border)] pt-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-[var(--font-display)] text-4xl leading-tight md:text-5xl">Your project could be the next good story.</h2>
          <Link href="/contact" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#252620] px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)]">
            Let&apos;s make something <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>
      </section>
    </SiteShell>
  );
}
