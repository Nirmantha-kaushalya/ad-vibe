import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Works", href: "/admin/works" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Logout", href: "/admin/login" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--base)] text-[var(--ivory)]">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-6 md:px-6">
        <aside className="hidden w-72 shrink-0 rounded-[28px] border border-white/10 bg-white/3 p-5 md:block">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/60 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">AV</span>
            <div>
              <div className="text-xs uppercase tracking-[0.32em] text-[var(--gold)]">Ad Vibe</div>
              <div className="text-xs text-[var(--muted)]">Admin panel</div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-full border border-transparent px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--muted)] transition hover:border-white/10 hover:bg-white/5 hover:text-[var(--ivory)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1 rounded-[30px] border border-white/10 bg-white/3 p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
