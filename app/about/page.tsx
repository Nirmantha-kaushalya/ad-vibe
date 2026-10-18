import Link from "next/link";
import type { Metadata } from "next";

import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { ProjectArtwork } from "@/src/components/sections/project-artwork";
import { aboutStats, values } from "@/src/content/site";

export const metadata: Metadata = {
  title: "About the Studio | Ad Vibe",
  description: "Meet Ad Vibe, an independent graphic design studio turning good ideas into memorable brand identities and experiences.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">The studio</Reveal>
        <Reveal className="max-w-4xl">
          <h1 className="font-[var(--font-display)] text-5xl leading-[0.9] text-[var(--ivory)] md:text-7xl">
            We make good ideas look like they feel.
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="border-y border-[var(--border)] py-8 text-lg leading-8 text-[var(--muted)] md:py-12">
            Ad Vibe is an independent graphic design studio for people building something worth noticing. We make identities, packaging, campaigns and digital design that give good ideas a clear point of view.
            <br />
            <br />
            No borrowed formulas. No decoration for decoration&apos;s sake. Just smart thinking, a lot of care and visual worlds with enough character to feel like yours.
          </Reveal>

          <Reveal className="relative min-h-[340px] overflow-hidden md:min-h-[420px]">
            <ProjectArtwork variant="field" className="absolute inset-0" />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value} delay={index * 0.08} className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-6">
              <div className="mb-4 text-xs uppercase tracking-[0.26em] text-[var(--gold)]">0{index + 1}</div>
              <p className="font-[var(--font-display)] text-3xl text-[var(--ivory)]">{value}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 grid gap-8 bg-[#252620] px-7 py-9 text-[#f6f4ef] md:grid-cols-[0.7fr_1.3fr] md:items-end md:px-10 md:py-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#d9c8a6]">The way we work</div>
            <h2 className="mt-4 font-[var(--font-display)] text-4xl md:text-5xl">Small by design.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/70">
            You work directly with the creatives making the work. It keeps the thinking close to the making, the conversations honest, and every detail connected to the original idea.
          </p>
        </Reveal>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-8">
            <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">From first thought to final file</div>
            <div className="mt-8 space-y-6 text-[var(--muted)]">
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.18em] text-[var(--ivory)]">01 / Discover</div>
                <p>We get to know your people, your ambition and the little thing that makes your idea different.</p>
              </div>
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.18em] text-[var(--ivory)]">02 / Shape</div>
                <p>We explore the big idea, then shape it into a visual language with clarity, character and purpose.</p>
              </div>
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.18em] text-[var(--ivory)]">03 / Deliver</div>
                <p>We bring the system to life across print, packaging, campaigns and digital. Ready to use, built to last.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-3">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-6 text-center">
                <div className="font-[var(--font-display)] text-4xl text-[var(--ivory)]">{stat.value}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-24 rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-8">
          <div className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Ready to begin?</div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl font-[var(--font-display)] text-4xl leading-none text-[var(--ivory)] md:text-5xl">
              Let&apos;s give your next idea a look and feel all its own.
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--gold)] transition hover:-translate-y-0.5">
              Book a consult
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
