import Link from "next/link";

import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { aboutStats, values } from "@/src/content/site";

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">About</Reveal>
        <Reveal className="max-w-4xl">
          <h1 className="font-[var(--font-display)] text-5xl leading-[0.9] text-[var(--ivory)] md:text-7xl">
            We build brands that feel as premium as they perform.
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="rounded-[32px] border border-white/10 bg-white/3 p-8 text-lg leading-8 text-[var(--muted)]">
            Ad Vibe is a boutique design studio focused on shaping memorable digital experiences for culture-led brands. We blend strategy, editorial direction and motion to help companies feel clearer, warmer and more premium — without losing performance.
            <br />
            <br />
            Our work sits between art direction and conversion strategy, giving founders and teams the creative system they need to win in crowded, high-expectation markets.
          </Reveal>

          <Reveal className="overflow-hidden rounded-[32px] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Creative team planning a brand strategy"
              className="h-full min-h-[340px] w-full object-cover"
            />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value} delay={index * 0.08} className="rounded-[28px] border border-white/10 bg-white/3 p-6">
              <div className="mb-4 text-xs uppercase tracking-[0.26em] text-[var(--gold)]">0{index + 1}</div>
              <p className="font-[var(--font-display)] text-3xl text-[var(--ivory)]">{value}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded-[32px] border border-white/10 bg-white/3 p-8">
            <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Our process</div>
            <div className="mt-8 space-y-6 text-[var(--muted)]">
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.18em] text-[var(--ivory)]">01 / Discover</div>
                <p>We map your audience, category tension and opportunity to define what matters most to the brand.</p>
              </div>
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.18em] text-[var(--ivory)]">02 / Shape</div>
                <p>We translate strategy into an expressive visual language, narrative and creative options that feel distinct.</p>
              </div>
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.18em] text-[var(--ivory)]">03 / Deliver</div>
                <p>We turn the vision into polished web experiences, launch assets and motion systems built for real-world growth.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-3">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 text-center">
                <div className="font-[var(--font-display)] text-4xl text-[var(--ivory)]">{stat.value}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-24 rounded-[32px] border border-white/10 bg-[var(--panel)] p-8">
          <div className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Ready to begin?</div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl font-[var(--font-display)] text-4xl leading-none text-[var(--ivory)] md:text-5xl">
              A refined website can become your most powerful room to grow.
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
