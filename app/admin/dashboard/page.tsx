import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { connectToDatabase } from "@/src/lib/mongodb";
import { Message } from "@/src/models/message";
import { Work } from "@/src/models/work";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await connectToDatabase();
  const [totalWorks, images, videos, unreadMessages, recentWorks] = await Promise.all([
    Work.countDocuments(),
    Work.countDocuments({ type: "image" }),
    Work.countDocuments({ type: "video" }),
    Message.countDocuments({ read: false }),
    Work.find().sort({ createdAt: -1 }).limit(5).select("title type published createdAt").lean(),
  ]);
  const stats = [
    { label: "Total projects", value: totalWorks },
    { label: "Images", value: images },
    { label: "Videos", value: videos },
    { label: "Unread notes", value: unreadMessages },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">The studio at a glance</div>
          <h1 className="mt-2 font-[var(--font-display)] text-5xl text-[var(--ivory)]">Good morning.</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Here&apos;s what&apos;s happening with your work.</p>
        </div>
        <Link href="/admin/works/new" className="inline-flex items-center gap-2 rounded-full bg-[#252620] px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-white transition hover:bg-[var(--gold)]">Add project <ArrowUpRight size={14} /></Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-y border-[var(--border)] py-5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">{stat.label}</div>
            <div className="mt-2 font-[var(--font-display)] text-5xl text-[var(--ivory)]">{stat.value}</div>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[var(--font-display)] text-3xl">Recently added</h2>
          <Link href="/admin/works" className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[var(--gold)]">All projects <ArrowUpRight size={13} /></Link>
        </div>
        {recentWorks.length === 0 ? (
          <div className="border-y border-[var(--border)] py-8 text-sm text-[var(--muted)]">Your first project is waiting to be uploaded.</div>
        ) : (
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {recentWorks.map((work) => (
              <div key={String(work._id)} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-medium">{work.title}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[var(--muted)]">{work.type} · {work.published ? "Published" : "Draft"}</p>
                </div>
                <time className="text-[10px] text-[var(--muted)]" dateTime={work.createdAt.toISOString()}>
                  {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(work.createdAt)}
                </time>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
