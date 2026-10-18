"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
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

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        isScrolled
          ? "border-[var(--border)] bg-[rgba(246,244,239,0.88)] shadow-[0_8px_30px_rgba(40,42,37,0.04)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Link href="/" className="group flex items-center gap-3 text-[var(--ivory)]" aria-label="Ad Vibe home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/50 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--gold)] transition duration-300 group-hover:bg-[var(--gold)] group-hover:text-white">
            AV
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em]">Ad Vibe</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-9 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "relative transition-colors hover:text-[var(--ivory)]",
                pathname === item.href ? "text-[var(--ivory)]" : "",
              ].join(" ")}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span className="nav-link" data-active={pathname === item.href}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#252620] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[var(--gold)]"
          >
            Start a project <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ivory)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--base)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-center justify-between border-b border-[var(--border)] py-4 font-[var(--font-display)] text-3xl text-[var(--ivory)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight size={18} className="text-[var(--gold)]" />
                  </Link>
                </motion.div>
              ))}
              <p className="pt-5 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Independent creative studio · Est. 2018</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
