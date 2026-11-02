"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { navItems } from "@/src/content/site";

export function Header() {
  const pathname = usePathname();
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
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:px-10 md:py-5">
        <Link href="/" className="group flex shrink-0 items-center gap-3 text-[var(--ivory)]" aria-label="Ad Vibe home">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-black transition-colors duration-300 group-hover:bg-[var(--gold)] sm:h-10 sm:w-10">
            <Image
              src="/ad-vibe-logo.png"
              alt=""
              width={30}
              height={23}
              sizes="30px"
              className="h-6 w-7 object-contain sm:h-7 sm:w-8"
            />
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.24em] sm:inline sm:tracking-[0.32em]">Ad Vibe</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.08em] text-[var(--muted)] min-[380px]:gap-4 min-[380px]:tracking-[0.12em] sm:gap-7 sm:text-[10px] sm:tracking-[0.2em] md:gap-9">
          {navItems.map((item) => {
            const route = item.href.split("#")[0] || "/";
            const isActive = pathname === route;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative transition-colors hover:text-[var(--ivory)]",
                  isActive ? "text-[var(--ivory)]" : "",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-link" data-active={isActive}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#252620] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[var(--gold)]"
          >
            Contact <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
