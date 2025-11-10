const documents = [
  {
    title: "Q4 launch plan",
    type: "Strategy",
    updatedAt: "Edited 2h ago",
    collaborators: ["JS", "AL", "MW"],
    status: "In review",
  },
  {
    title: "AI research summary",
    type: "Report",
    updatedAt: "Edited yesterday",
    collaborators: ["JS"],
    status: "Draft",
  },
  {
    title: "Client onboarding deck",
    type: "Presentation",
    updatedAt: "Edited 2d ago",
    collaborators: ["JS", "HK"],
    status: "Approved",
  },
  {
    title: "Grant proposal",
    type: "Funding",
    updatedAt: "Edited 3d ago",
    collaborators: ["AL", "MW", "SG"],
    status: "Editing",
  },
];

const statusStyles: Record<string, string> = {
  Draft: "bg-amber-500/10 text-amber-300",
  "In review": "bg-emerald-500/10 text-emerald-300",
  Approved: "bg-emerald-500/10 text-emerald-300",
  Editing: "bg-rose-500/10 text-rose-300",
};

export default function WorkspaceRecentDocuments() {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent documents</h2>
          <p className="text-sm text-zinc-400">Continue where you left off across devices.</p>
        </div>
        <button className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white">
          View all
        </button>
      </div>

      <div className="mt-6 overflow-hidden">
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          <span>Document</span>
          <span>Updated</span>
          <span>Collaborators</span>
          <span>Status</span>
        </div>
        <div className="mt-3 space-y-2">
          {documents.map((doc) => (
            <article
              key={doc.title}
              className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5"
            >
              <div>
                <p className="text-sm font-medium text-white">{doc.title}</p>
                <p className="text-xs text-zinc-500">{doc.type}</p>
              </div>
              <p className="text-sm text-zinc-400">{doc.updatedAt}</p>
              <div className="flex -space-x-2">
                {doc.collaborators.map((initials) => (
                  <span
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[doc.status]}`}>
                {doc.status}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
