import type { Metadata } from "next";

import { SiteShell } from "@/src/components/layout/site-shell";
import { WorksGallery } from "@/src/components/sections/works-gallery";
import { getPublishedWorks } from "@/src/lib/work-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ad Vibe | Design Portfolio",
  description: "Selected graphic design, social media and video work by Ad Vibe.",
};

export default async function HomePage() {
  const works = await getPublishedWorks();

  return (
    <SiteShell>
      <section id="work" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-20 pt-28 sm:px-8 md:px-10 md:pb-28 md:pt-36">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">Ad Vibe · Portfolio</p>
            <h1 className="text-4xl font-semibold tracking-[-0.045em] text-[var(--ivory)] sm:text-5xl">Selected work</h1>
          </div>
          <p className="text-sm text-[var(--muted)]">Design, images & video.</p>
        </div>
        <WorksGallery works={works} />
      </section>
    </SiteShell>
  );
}
