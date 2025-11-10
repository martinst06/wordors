import Link from "next/link";

const templates = [
  {
    title: "Grant proposal",
    category: "Funding",
  },
  {
    title: "Product requirements",
    category: "Product",
  },
  {
    title: "Research report",
    category: "Academia",
  },
];

export default function WorkspaceTemplateCarousel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Recommended templates</h2>
          <p className="text-sm text-zinc-400">Speed up your next draft with curated structures.</p>
        </div>
        <Link href="/workspace/templates" className="text-sm font-semibold text-zinc-400 hover:text-white">
          Browse all
        </Link>
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {templates.map((template) => (
          <Link
            key={template.title}
            href={`/workspace/templates/${template.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="min-w-[220px] rounded-2xl border border-white/15 bg-black/40 p-4 transition-all hover:-translate-y-1 hover:border-white/30"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{template.category}</p>
            <h3 className="mt-3 text-base font-semibold text-white">{template.title}</h3>
            <p className="mt-2 text-xs text-zinc-400">Built with AI sections and citation helpers.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
