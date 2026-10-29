import type { Metadata } from "next";

import { SiteShell } from "@/src/components/layout/site-shell";
import { ContactForm } from "@/src/components/sections/contact-form";
import { Reveal } from "@/src/components/sections/reveal";
import { contactDetails } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Contact | Ad Vibe",
  description: "Get in touch with Ad Vibe by email or WhatsApp.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8 md:px-10 md:pb-28 md:pt-36">
        <Reveal>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">Contact</p>
          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-[var(--ivory)] sm:text-6xl">Let&apos;s talk.</h1>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Choose how you&apos;d like to get in touch.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {contactDetails.map((item) => (
              <a key={item.label} className="text-[var(--muted)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--ivory)]" href={item.href}>
                {item.label}: {item.value}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 rounded-3xl border border-[var(--border)] bg-white/40 p-5 sm:p-8">
          <ContactForm />
        </Reveal>
      </section>
    </SiteShell>
  );
}
