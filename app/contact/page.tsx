import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { contactDetails } from "@/src/content/site";

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">Contact</Reveal>
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h1 className="font-[var(--font-display)] text-5xl leading-[0.9] text-[var(--ivory)] md:text-7xl">
              Tell us what you&apos;re building.
            </h1>
            <div className="mt-8 space-y-4 text-[var(--muted)]">
              {contactDetails.map((item) => (
                <div key={item.label} className="rounded-full border border-white/10 bg-white/3 px-4 py-3 text-sm">
                  <span className="mr-3 text-[var(--gold)]">{item.label}</span>
                  {item.value}
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-[28px] border border-white/10 bg-white/3 p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm text-[var(--muted)]">
                <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Name</span>
                <input className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="Your name" />
              </label>
              <label className="text-sm text-[var(--muted)]">
                <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Email</span>
                <input className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="you@example.com" />
              </label>
            </div>

            <label className="mt-5 block text-sm text-[var(--muted)]">
              <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Subject</span>
              <input className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="Project type" />
            </label>

            <label className="mt-5 block text-sm text-[var(--muted)]">
              <span className="mb-2 block uppercase tracking-[0.18em] text-[var(--ivory)]">Message</span>
              <textarea rows={6} className="w-full rounded-[24px] border border-white/10 bg-transparent px-4 py-3 text-[var(--ivory)] outline-none placeholder:text-[var(--muted)]" placeholder="Tell us about your goals, timeline and project scope." />
            </label>

            <button type="submit" className="mt-8 inline-flex items-center justify-center rounded-full border border-[var(--gold)]/60 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[var(--gold)] transition hover:-translate-y-0.5">
              Send inquiry
            </button>
          </form>
        </Reveal>
      </section>
    </SiteShell>
  );
}
