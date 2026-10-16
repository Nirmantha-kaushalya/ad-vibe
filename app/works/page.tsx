import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { works } from "@/src/content/site";

export default function WorksPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Selected work</Reveal>
        <Reveal className="max-w-4xl">
          <h1 className="font-[var(--font-display)] text-5xl leading-[0.9] text-[var(--ivory)] md:text-7xl">
            Brand experiences engineered with intention and atmosphere.
          </h1>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 md:columns-2 xl:columns-3">
          {works.map((work, index) => (
            <Reveal key={work.title} delay={index * 0.08} className="mb-6 break-inside-avoid overflow-hidden rounded-[28px] border border-white/10 bg-white/3">
              <img src={work.image} alt={work.title} className="h-auto w-full object-cover" />
              <div className="space-y-3 p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{work.category}</div>
                <div className="flex items-center justify-between gap-4 text-[var(--ivory)]">
                  <h2 className="font-[var(--font-display)] text-3xl">{work.title}</h2>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">{work.accent}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
