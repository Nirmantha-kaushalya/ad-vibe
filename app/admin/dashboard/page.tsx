import { adminStats } from "@/src/content/site";

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Overview</div>
          <h1 className="mt-2 font-[var(--font-display)] text-4xl text-[var(--ivory)] md:text-5xl">Dashboard</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <div key={stat.label} className="rounded-[24px] border border-white/10 bg-white/3 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{stat.label}</div>
            <div className="mt-4 font-[var(--font-display)] text-4xl text-[var(--ivory)]">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[28px] border border-white/10 bg-white/3 p-6">
        <div className="mb-4 text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Recent works</div>
        <div className="space-y-3">
          {[
            { title: "Maison Solene", metric: "Brand identity" },
            { title: "Aurelia Atelier", metric: "Video edit" },
            { title: "Northlake Studio", metric: "Platform refresh" },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-full border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--muted)]">
              <span className="text-[var(--ivory)]">{item.title}</span>
              <span>{item.metric}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
