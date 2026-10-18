import type { Metadata } from "next";

import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { services } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Graphic Design Services | Ad Vibe",
  description: "Brand identity, packaging and print, campaign art direction and digital design, all under one roof.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">What we make</Reveal>
        <Reveal className="max-w-4xl">
          <h1 className="font-[var(--font-display)] text-5xl leading-[0.9] text-[var(--ivory)] md:text-7xl">
            Graphic design with a point of view, from first thought to final detail.
          </h1>
        </Reveal>

        <div className="mt-16 space-y-5">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06} className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{service.number} / 04</div>
                <div>
                  <div className="text-2xl font-medium text-[var(--ivory)] md:text-4xl">{service.title}</div>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--muted)]">{service.description}</p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {index === 0 ? "Think" : index === 1 ? "Make" : index === 2 ? "Direct" : "Build"}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 rounded-[32px] border border-[var(--border)] bg-[var(--panel)] p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Small studio. Big attention to detail.</div>
              <h2 className="mt-4 font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-5xl">Good work, made together.</h2>
            </div>
            <div className="space-y-5 text-[var(--muted)]">
              <p>We work directly with the people behind the brief. Fewer handoffs, more honest conversations, and a design process that stays collaborative from the first sketch.</p>
              <p>Come with a clear brief or a half-formed idea. We&apos;ll help you find the visual thread and take it all the way to the finished thing.</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="mt-8 flex flex-col gap-5 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[var(--font-display)] text-3xl">Have a project brewing?</p>
          <a href="/contact" className="inline-flex w-fit items-center rounded-full bg-[#252620] px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-[var(--gold)]">Let&apos;s talk ↗</a>
        </Reveal>
      </section>
    </SiteShell>
  );
}
