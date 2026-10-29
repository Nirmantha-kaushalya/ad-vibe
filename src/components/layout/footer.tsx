import Link from "next/link";

import { contactDetails } from "@/src/content/site";

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-[var(--border)] bg-[var(--base)] text-[var(--muted)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ivory)]">Ad Vibe</Link>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/about" className="transition-colors hover:text-[var(--ivory)]">About</Link>
          {contactDetails.map((item) => (
            <a key={item.label} href={item.href} className="transition-colors hover:text-[var(--ivory)]">{item.label}</a>
          ))}
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-5 py-5 text-[10px] uppercase tracking-[0.17em] md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} Ad Vibe</span>
        </div>
      </div>
    </footer>
  );
}
