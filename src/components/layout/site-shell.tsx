import type { ReactNode } from "react";

import { Footer } from "@/src/components/layout/footer";
import { Header } from "@/src/components/layout/header";
import { CursorFollower } from "@/src/components/layout/cursor-follower";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--base)] text-[var(--ivory)]">
      <div className="noise-overlay" aria-hidden="true" />
      <CursorFollower />
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}
