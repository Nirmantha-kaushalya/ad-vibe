import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { services } from "@/src/content/site";

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Services</Reveal>
        <Reveal className="max-w-4xl">
          <h1 className="font-[var(--font-display)] text-5xl leading-[0.9] text-[var(--ivory)] md:text-7xl">
            Elegant strategy, creative systems and experiences that convert.
          </h1>
        </Reveal>

        <div className="mt-16 space-y-5">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06} className="rounded-[28px] border border-white/10 bg-white/3 p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{service.number}</div>
                <div>
                  <div className="text-2xl font-medium text-[var(--ivory)] md:text-4xl">{service.title}</div>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--muted)]">{service.description}</p>
                </div>
                <div className="text-xs uppercase tracking-[0.26em] text-[var(--muted)]">Strategy</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 rounded-[32px] border border-white/10 bg-[var(--panel)] p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Engagement model</div>
              <h2 className="mt-4 font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-5xl">A focused studio partnership.</h2>
            </div>
            <div className="space-y-5 text-[var(--muted)]">
              <p>We work closely with founders and in-house teams to define a brand position, refine the product story and build the assets necessary to launch confidently.</p>
              <p>Whether you need a refreshed website, an editorial campaign, or a full creative system, we deliver with clarity, speed and taste.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
