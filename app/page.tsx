import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { SiteShell } from "@/src/components/layout/site-shell";
import { Reveal } from "@/src/components/sections/reveal";
import { services } from "@/src/content/site";
import { getPublishedWorks } from "@/src/lib/work-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ad Vibe | Independent Graphic Design Studio",
  description: "Distinctive brand identities, packaging, campaigns and digital design for ideas worth noticing.",
};

export default async function HomePage() {
  const works = await getPublishedWorks();
  const featuredWorks = works.slice(0, 3);
  const heroWork = featuredWorks[0];
  const heroImage = heroWork?.type === "video" ? heroWork.thumbnailUrl : heroWork?.url;

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-20 pt-32 md:min-h-[calc(100svh-5rem)] md:grid-cols-[1fr_0.9fr] md:gap-16 md:px-10 md:pb-24 md:pt-28">
        <Reveal className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
            <span className="h-px w-8 bg-[var(--gold)]" />
            Independent graphic design studio
          </div>
          <h1 className="font-[var(--font-body)] text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-[var(--ivory)] sm:text-6xl lg:text-7xl">
            Graphic design for brands ready to stand out.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--muted)] md:text-base">
            We build clear, distinctive identities and design that helps good ideas connect with people.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-6 rounded-full bg-[#252620] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--gold)]"
            >
              Start a project
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.15em] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              View our work
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.17em] text-[var(--muted)]">
            Remote studio · Working worldwide
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-3 rounded-[2rem] border border-[var(--border)]" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-[#e8e9e1]">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={heroWork.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div aria-label="Ad Vibe graphic design studio visual" role="img" className="absolute inset-0 p-5 sm:p-8">
                <div className="flex h-full flex-col justify-between rounded-xl bg-[#f8f7f2] p-6 sm:p-9">
                  <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-[#63665f]">
                    <span>Ad Vibe Studio</span>
                    <span>01 / 04</span>
                  </div>
                  <div>
                    <div className="mb-5 flex gap-2">
                      <span className="h-8 w-8 rounded-full bg-[#d5e77a]" />
                      <span className="h-8 w-8 rounded-full bg-[#edaa91]" />
                      <span className="h-8 w-8 rounded-full bg-[#233b35]" />
                    </div>
                    <div className="font-[var(--font-body)] text-5xl font-semibold tracking-[-0.06em] text-[#20211e] sm:text-7xl">Good ideas.</div>
                    <div className="mt-2 text-sm text-[#73756e] sm:text-base">Made clear. Made memorable.</div>
                  </div>
                  <div className="flex items-end justify-between border-t border-[#20211e]/15 pt-4 text-[10px] uppercase tracking-[0.14em] text-[#63665f]">
                    <span>Identity · Packaging · Digital</span>
                    <span>AV</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[var(--border)] bg-[#eeece5]">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-7 md:grid-cols-[0.7fr_1.3fr] md:items-center md:px-10 md:py-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">Thoughtful design, from first idea to final detail</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-[var(--muted)] md:justify-end">
            <span>Brand identity</span>
            <span>Packaging & print</span>
            <span>Campaigns</span>
            <span>Digital design</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">Selected work</p>
            <h2 className="font-[var(--font-body)] text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Made with purpose.</h2>
          </div>
          <Link href="/works" className="inline-flex items-center gap-2 border-b border-[var(--gold)] pb-2 text-[10px] font-medium uppercase tracking-[0.14em] hover:text-[var(--gold)]">
            Explore all work <ArrowUpRight size={14} />
          </Link>
        </Reveal>

        {featuredWorks.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.map((work, index) => {
              const image = work.type === "video" ? work.thumbnailUrl : work.url;
              if (!image) return null;

              return (
                <Reveal key={work.id} delay={index * 0.06} className="group">
                  <Link href="/works" aria-label={`View ${work.title} and more projects`}>
                    <div className="image-hover relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e8e4da]">
                      <Image
                        src={image}
                        alt={work.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-4 pt-4">
                      <div>
                        <h3 className="font-[var(--font-body)] text-lg font-medium">{work.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{work.description}</p>
                      </div>
                      <ArrowUpRight size={16} className="mt-1 shrink-0 text-[var(--gold)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="border-y border-[var(--border)] py-8 text-sm text-[var(--muted)]">
            New work is in the making.{" "}
            <Link href="/contact" className="text-[var(--gold)] underline underline-offset-4">Tell us about your project.</Link>
          </div>
        )}
      </section>

      <section className="bg-[#eeece5]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">What we do</p>
            <h2 className="font-[var(--font-body)] text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Design built around your goals.</h2>
          </Reveal>
          <div className="grid gap-x-8 md:grid-cols-2">
            {services.map((service) => (
              <Reveal key={service.title} className="border-t border-[var(--border)] py-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-medium tracking-[0.14em] text-[var(--gold)]">{service.number}</span>
                  <h3 className="font-[var(--font-body)] text-xl font-medium">{service.title}</h3>
                </div>
                <p className="mt-3 max-w-lg pl-8 text-sm leading-7 text-[var(--muted)]">{service.description}</p>
              </Reveal>
            ))}
          </div>
          <Link href="/services" className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] hover:text-[var(--gold)]">
            See all services <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="flex flex-col gap-8 rounded-2xl bg-[#252620] px-6 py-10 text-[#f6f4ef] sm:px-10 md:flex-row md:items-center md:justify-between md:px-14 md:py-14">
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d9c8a6]">Have a project in mind?</p>
            <h2 className="font-[var(--font-body)] text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Let&apos;s make something clear and memorable.</h2>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-5 rounded-full bg-[#f6f4ef] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-[#252620] transition-colors hover:bg-[#d9c8a6]">
            Get in touch <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>
    </SiteShell>
  );
}
