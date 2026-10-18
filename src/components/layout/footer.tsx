import Link from "next/link";

import { contactDetails } from "@/src/content/site";

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-[var(--border)] bg-[var(--base)] text-[var(--muted)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_0.7fr_0.9fr_1fr] md:px-10 md:py-16">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[var(--ivory)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/50 text-[10px] font-medium tracking-[0.12em] text-[var(--gold)]">AV</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Ad Vibe</span>
          </div>
          <p className="max-w-sm text-sm leading-7">
            Graphic design for ideas that deserve to be seen. Identity, packaging, campaigns and digital.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Explore</h3>
          <ul className="space-y-3 text-[13px]">
            <li><Link href="/about" className="transition-colors hover:text-[var(--ivory)]">About</Link></li>
            <li><Link href="/services" className="transition-colors hover:text-[var(--ivory)]">Services</Link></li>
            <li><Link href="/works" className="transition-colors hover:text-[var(--ivory)]">Works</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Say hello</h3>
          <ul className="space-y-3 text-[13px]">
            {contactDetails.filter((item) => item.href).map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition-colors hover:text-[var(--ivory)]">{item.value}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Have a good one?</h3>
          <Link href="/contact" className="inline-flex items-center border-b border-[var(--gold)] pb-2 font-[var(--font-display)] text-2xl text-[var(--ivory)] transition-colors hover:text-[var(--gold)]">
            Let&apos;s make it real ↗
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-5 py-5 text-[10px] uppercase tracking-[0.17em] md:flex-row md:px-10">
          <span>© 2026 Ad Vibe Studio. Made with intention.</span>
          <span>Identity · Print · Packaging · Digital</span>
        </div>
      </div>
    </footer>
  );
}
