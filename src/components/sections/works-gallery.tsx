"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { PublicWork } from "@/src/lib/work-data";

type Filter = "all" | "image" | "video";

export function WorksGallery({ works }: { works: PublicWork[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<PublicWork | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All work" },
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
  ];
  const visibleWorks = filter === "all" ? works : works.filter((work) => work.type === filter);

  useEffect(() => {
    if (!selected) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <div className="mb-9 flex flex-wrap items-center gap-2" aria-label="Filter projects">
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={`rounded-full border px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "border-[#252620] bg-[#252620] text-white"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--ivory)]"
              }`}
            >
              {item.label}
              <span className="ml-2 opacity-60">
                {item.value === "all" ? works.length : works.filter((work) => work.type === item.value).length}
              </span>
            </button>
          );
        })}
      </div>

      {visibleWorks.length === 0 ? (
        <div className="border-y border-[var(--border)] py-16 text-center">
          <p className="font-[var(--font-display)] text-3xl">No {filter === "all" ? "" : `${filter} `}projects just yet.</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Check back soon for new work from the studio.</p>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {visibleWorks.map((work, index) => {
            const preview = work.type === "video" ? work.thumbnailUrl : work.url;
            if (!preview) return null;
            return (
              <motion.article
                key={work.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
                className={`group ${index % 3 === 1 ? "xl:translate-y-12" : ""}`}
              >
                <div className="image-hover relative aspect-[4/5] overflow-hidden bg-[#e8e4da]">
                  {work.type === "video" ? (
                    <>
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={preview}
                        src={work.url}
                        aria-label={`${work.title} video`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setSelected(work)}
                        aria-label={`View ${work.title} video in large player`}
                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/65 bg-black/35 text-white transition hover:bg-black/70"
                      >
                        <ArrowUpRight size={17} />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelected(work)}
                      aria-label={`View image: ${work.title}`}
                      className="image-hover group relative block h-full w-full text-left"
                    >
                      <Image src={work.url} alt={work.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                      <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                        <span>
                          <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/80">Selected work</span>
                          <span className="block font-[var(--font-display)] text-3xl">{work.title}</span>
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/65">
                          <ArrowUpRight size={17} />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3 pt-4">
                  <div>
                    <h2 className="font-[var(--font-display)] text-2xl text-[var(--ivory)]">{work.title}</h2>
                    <p className="mt-1 max-w-md text-sm leading-6 text-[var(--muted)]">{work.description}</p>
                  </div>
                  <span className="mt-2 shrink-0 text-[9px] uppercase tracking-[0.15em] text-[var(--gold)]">
                    {work.type}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171815]/95 p-4 backdrop-blur-sm md:p-10"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              aria-label="Close project viewer"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
            >
              <X size={19} />
            </button>
            <motion.div
              initial={prefersReducedMotion ? false : { y: 16, scale: 0.985 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.99 }}
              className="relative max-h-full w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              {selected.type === "video" ? (
                <video
                  controls
                  autoPlay
                  preload="metadata"
                  poster={selected.thumbnailUrl}
                  src={selected.url}
                  className="mx-auto max-h-[78vh] max-w-full"
                />
              ) : (
                <div className="relative mx-auto h-[min(76vh,900px)] w-full">
                  <Image src={selected.url} alt={selected.title} fill sizes="90vw" className="object-contain" />
                </div>
              )}
              <div className="mx-auto mt-4 max-w-4xl text-center text-white">
                <h2 className="font-[var(--font-display)] text-3xl">{selected.title}</h2>
                <p className="mt-1 text-sm text-white/70">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
