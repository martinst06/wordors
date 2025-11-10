const stats = [
  {
    label: "Active projects",
    value: "8",
    change: "+2 this week",
  },
  {
    label: "Writing streak",
    value: "12 days",
    change: "Keep it going",
  },
  {
    label: "Words drafted",
    value: "32.4k",
    change: "+4.6k this week",
  },
  {
    label: "Storage used",
    value: "18%",
    change: "Plan: Pro",
  },
];

export default function WorkspaceOverview() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">{stat.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-zinc-400">{stat.change}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
