import Link from "next/link";

import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { services, stats, testimonials, works } from "@/src/content/site";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
        <Reveal className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Luxury brand studio</div>
            <h1 className="font-[var(--font-display)] text-6xl leading-[0.8] text-[var(--ivory)] md:text-[7rem]">
              Design that feels undeniable.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg">
              We craft premium brand experiences, editorial websites and motion-rich campaigns that help ambitious businesses stand out with clarity and confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[var(--gold)] transition hover:-translate-y-0.5">
                Start a project
              </Link>
              <Link href="/works" className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[var(--ivory)] transition hover:-translate-y-0.5">
                View work
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/3 p-6 md:p-8">
            <div className="mb-10 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              <span>Selected focus</span>
              <span>2026</span>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Brand strategy</div>
                <div className="mt-3 font-[var(--font-display)] text-4xl text-[var(--ivory)]">Positioning with presence.</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Creative systems</div>
                <div className="mt-3 font-[var(--font-display)] text-4xl text-[var(--ivory)]">Narratives with depth.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-white/10 bg-[var(--panel)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:grid-cols-3 md:px-8">
          {stats.map((stat) => (
            <Reveal key={stat.label} className="rounded-[24px] border border-white/10 bg-white/3 p-6">
              <div className="font-[var(--font-display)] text-5xl text-[var(--ivory)]">{stat.value}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Services</Reveal>
        <Reveal className="flex items-end justify-between gap-6">
          <h2 className="max-w-2xl font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-6xl">
            Strategy, craft and digital polish for standout brands.
          </h2>
          <Link href="/services" className="hidden text-xs uppercase tracking-[0.2em] text-[var(--muted)] md:inline-block">
            See all services
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06} className="rounded-[28px] border border-white/10 bg-white/3 p-6 transition-transform hover:-translate-y-1">
              <div className="mb-8 text-xs uppercase tracking-[0.28em] text-[var(--gold)]">{service.number}</div>
              <h3 className="font-[var(--font-display)] text-3xl text-[var(--ivory)]">{service.title}</h3>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">{service.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Featured work</Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work, index) => (
            <Reveal key={work.title} delay={index * 0.08} className="overflow-hidden rounded-[30px] border border-white/10 bg-white/3">
              <img src={work.image} alt={work.title} className="h-[360px] w-full object-cover" />
              <div className="space-y-3 p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">{work.category}</div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-[var(--font-display)] text-3xl text-[var(--ivory)]">{work.title}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">{work.accent}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--panel)] border-y border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-2 md:px-8">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.author} delay={index * 0.08} className="rounded-[28px] border border-white/10 bg-white/3 p-7">
              <div className="mb-6 text-[var(--gold)] text-4xl">“</div>
              <p className="text-lg leading-8 text-[var(--muted)]">{testimonial.quote}</p>
              <div className="mt-6 text-[var(--ivory)] uppercase tracking-[0.18em] text-xs">{testimonial.author}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">{testimonial.role}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal className="rounded-[36px] border border-white/10 bg-[var(--panel)] p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Let&apos;s build</div>
              <h2 className="mt-3 max-w-2xl font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-6xl">A premium digital presence that earns attention.</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-7 py-3 text-xs uppercase tracking-[0.22em] text-[var(--gold)] transition hover:-translate-y-0.5">
              Book a call
            </Link>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
