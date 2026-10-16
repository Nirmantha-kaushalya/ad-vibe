import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--base)] text-[var(--muted)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] md:px-8">
        <div>
          <div className="mb-4 text-sm uppercase tracking-[0.38em] text-[var(--gold)]">Ad Vibe</div>
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            Luxury brand storytelling for founders, product teams and modern lifestyle companies.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--ivory)]">Navigate</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-[var(--ivory)]">About</Link></li>
            <li><Link href="/services" className="hover:text-[var(--ivory)]">Services</Link></li>
            <li><Link href="/works" className="hover:text-[var(--ivory)]">Works</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--ivory)]">Connect</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="mailto:hello@ad-vibe.studio" className="hover:text-[var(--ivory)]">hello@ad-vibe.studio</a></li>
            <li><a href="https://instagram.com" className="hover:text-[var(--ivory)]">Instagram</a></li>
            <li><a href="https://linkedin.com" className="hover:text-[var(--ivory)]">LinkedIn</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--ivory)]">Book a call</h3>
          <Link href="/contact" className="inline-flex items-center rounded-full border border-[var(--gold)]/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[var(--gold)] transition-transform hover:-translate-y-0.5">
            Let&apos;s talk
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-[11px] tracking-[0.24em] uppercase text-[var(--muted)] md:px-8">
          <span>© 2026 Ad Vibe</span>
          <span>Strategy • Design • Motion</span>
        </div>
      </div>
    </footer>
  );
}
