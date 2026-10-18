import type { Metadata } from "next";

import { SiteShell } from "@/src/components/layout/site-shell";
import { ContactForm } from "@/src/components/sections/contact-form";
import { Reveal } from "@/src/components/sections/reveal";
import { contactDetails } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Start a Project | Contact Ad Vibe",
  description: "Tell Ad Vibe about your graphic design project. We would love to hear about your next idea.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        <Reveal className="mb-8 text-xs uppercase tracking-[0.34em] text-[var(--gold)]">The start of something good</Reveal>
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h1 className="font-[var(--font-display)] text-5xl leading-[0.9] text-[var(--ivory)] md:text-7xl">
              Have a good idea? Let&apos;s give it a look.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-[var(--muted)]">
              Tell us what you&apos;re thinking—even if it&apos;s still just a sketch. We work remotely with good people everywhere.
            </p>
            <div className="mt-8 space-y-3 text-[var(--muted)]">
              {contactDetails.map((item) => (
                <div key={item.label} className="border-b border-[var(--border)] py-3 text-sm">
                  <span className="mr-4 text-[10px] uppercase tracking-[0.16em] text-[var(--gold)]">{item.label}</span>
                  {item.href ? <a className="hover:text-[var(--ivory)]" href={item.href}>{item.value}</a> : item.value}
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={0.08} className="border-t border-[var(--border)] pt-2">
            <ContactForm />
          </Reveal>
        </Reveal>
      </section>
    </SiteShell>
  );
}
