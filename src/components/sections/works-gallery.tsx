"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

import type { PublicWork } from "@/src/lib/work-data";

type Filter = "all" | "image" | "video";

export function WorksGallery({ works }: { works: PublicWork[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<PublicWork | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All work" },
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
  ];
  const visibleWorks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return works.filter((work) => {
      const matchesType = filter === "all" || work.type === filter;
      const searchableText = `${work.title} ${work.description} ${work.type}`.toLowerCase();
      return matchesType && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [filter, query, works]);

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
      <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-h-12 items-center gap-3 rounded-full border border-[var(--border)] bg-white/60 px-4 sm:max-w-sm sm:flex-1">
          <Search size={16} aria-hidden="true" className="shrink-0 text-[var(--muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search my work"
            aria-label="Search work"
            className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm outline-none placeholder:text-[var(--muted)]"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter work by type">
          {filters.map((item) => {
            const active = filter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.value)}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-xs transition-colors ${
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
      </div>

      {visibleWorks.length === 0 ? (
        <div className="border-y border-[var(--border)] py-16 text-center">
          <p className="font-[var(--font-display)] text-3xl">
            {works.length === 0 ? "New work coming soon." : "No work found."}
          </p>
          {works.length > 0 && (
            <button
              type="button"
              onClick={() => { setFilter("all"); setQuery(""); }}
              className="mt-3 min-h-11 px-3 text-sm text-[var(--gold)] underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[520px]:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:grid-cols-3">
          {visibleWorks.map((work, index) => {
            const preview = work.type === "video" ? work.thumbnailUrl : work.url;
            if (work.type === "image" && !preview) return null;
            return (
              <motion.article
                key={work.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
                className="group"
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
                      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/65 text-white">
                        <ArrowUpRight size={17} />
                      </span>
                    </button>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3 pt-3">
                  <div>
                    <h2 className="text-sm font-medium text-[var(--ivory)] sm:text-base">{work.title}</h2>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--muted)]">{work.description}</p>
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

      {selected && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
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
              onClick={(event) => {
                event.stopPropagation();
                setSelected(null);
              }}
              className="fixed right-5 top-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#171815]/80 text-white transition hover:bg-white/20"
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
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
