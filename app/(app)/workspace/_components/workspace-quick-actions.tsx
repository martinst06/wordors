import Link from "next/link";

const quickActions = [
  {
    title: "Blank document",
    description: "Start from a clean page with AI suggestions ready",
    href: "/workspace/new",
  },
  {
    title: "Import .docx",
    description: "Bring in an existing Word file and continue editing",
    href: "/workspace/import",
  },
  {
    title: "Resume recent",
    description: "Jump back into your last open draft from today",
    href: "/workspace/recent",
  },
];

export default function WorkspaceQuickActions() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {quickActions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{action.title}</h2>
            <span className="rounded-full border border-white/15 p-2 text-white transition-colors group-hover:border-white/40">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
          <p className="mt-3 text-sm text-zinc-300">{action.description}</p>
        </Link>
      ))}
    </section>
  );
}
