import type { ReactNode } from "react";

import { Footer } from "@/src/components/layout/footer";
import { Header } from "@/src/components/layout/header";
import { CursorFollower } from "@/src/components/layout/cursor-follower";
import { PageTransition } from "@/src/components/layout/page-transition";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--base)] text-[var(--ivory)]">
      <div className="noise-overlay" aria-hidden="true" />
      <CursorFollower />
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </div>
  );
}
