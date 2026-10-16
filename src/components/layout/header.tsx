"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navItems } from "@/src/content/site";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        isScrolled ? "bg-[rgba(10,10,10,0.7)] backdrop-blur-xl" : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-[var(--ivory)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/60 text-xs font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
            AV
          </span>
          <span className="text-sm uppercase tracking-[0.38em]">Ad Vibe</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "relative transition-colors hover:text-[var(--ivory)]",
                pathname === item.href ? "text-[var(--ivory)]" : "",
              ].join(" ")}
            >
              <span className="nav-link">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 px-5 py-2.5 text-xs uppercase tracking-[0.24em] text-[var(--gold)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a project
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[var(--ivory)] md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={[
          "border-t border-white/10 bg-[var(--base)]/95 backdrop-blur-xl md:hidden",
          isMenuOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--ivory)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
