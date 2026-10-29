import type { ReactNode } from "react";

import { Footer } from "@/src/components/layout/footer";
import { Header } from "@/src/components/layout/header";
import { PageTransition } from "@/src/components/layout/page-transition";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--base)] text-[var(--ivory)]">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main><PageTransition>{children}</PageTransition></main>
      <Footer />
    </div>
  );
}
