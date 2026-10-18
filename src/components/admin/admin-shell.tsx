"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight, LayoutDashboard, MessageSquareText, PanelsTopLeft } from "lucide-react";
import { AdminLogoutButton } from "./admin-logout-button";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Works", href: "/admin/works", icon: PanelsTopLeft },
  { label: "Messages", href: "/admin/messages", icon: MessageSquareText },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublicPage =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname.startsWith("/admin/reset-password/");

  if (isPublicPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[var(--base)] text-[var(--ivory)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-5 px-4 py-4 md:flex-row md:gap-8 md:px-8 md:py-8">
        <aside className="flex shrink-0 flex-col rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-4 md:sticky md:top-8 md:h-[calc(100svh-4rem)] md:w-64 md:p-5">
          <Link href="/admin/dashboard" className="mb-5 flex items-center gap-3 px-2 py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252620] text-[10px] font-medium tracking-[0.12em] text-white">AV</span>
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.25em]">Ad Vibe</span>
              <span className="mt-1 block text-[10px] text-[var(--muted)]">Studio workspace</span>
            </span>
          </Link>

          <div className="mb-3 hidden px-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] md:block">Workspace</div>
          <nav aria-label="Admin navigation" className="flex gap-2 overflow-x-auto md:flex-col">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-[11px] font-medium transition-colors",
                    isActive
                      ? "bg-[#252620] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--panel-hover)] hover:text-[var(--ivory)]",
                  ].join(" ")}
                >
                  <Icon size={16} strokeWidth={1.7} />
                  {item.label}
                  {isActive && <ArrowUpRight size={13} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto hidden border-t border-[var(--border)] pt-4 md:block">
            <div className="mb-3 px-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Account</div>
            <AdminLogoutButton />
          </div>
        </aside>

        <main className="min-w-0 flex-1 rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-5 md:p-10">
          <div className="mb-8 flex items-center justify-between border-b border-[var(--border)] pb-5 md:mb-10">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Ad Vibe <span className="mx-2 text-[var(--gold)]">/</span> Studio workspace</div>
            <Link href="/" className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)] transition-colors hover:text-[var(--ivory)]">
              View site <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="md:hidden"><AdminLogoutButton /></div>
          {children}
        </main>
      </div>
    </div>
  );
}
