import Link from "next/link";

const navigation = [
  { label: "Home", href: "/workspace" },
  { label: "Documents", href: "/workspace/documents" },
  { label: "Templates", href: "/workspace/templates" },
  { label: "Shared", href: "/workspace/shared" },
  { label: "Insights", href: "/workspace/insights" },
];

const workspaceActions = [
  { label: "New document", href: "/workspace/new" },
  { label: "Import .docx", href: "/workspace/import" },
];

export default function WorkspaceSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-white/5 bg-black/60 px-6 py-10 text-sm text-zinc-400 backdrop-blur lg:flex">
      <Link href="/" className="mb-8 flex items-center gap-2" aria-label="Wordors home">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900">
          <span className="text-lg font-bold text-white">W</span>
        </div>
        <div className="leading-tight">
          <p className="text-base font-semibold text-white">Wordors</p>
          <p className="text-xs text-zinc-500">Workspace</p>
        </div>
      </Link>

      <div className="mb-10 space-y-1">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Navigate
        </p>
        <nav className="mt-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
              <svg className="h-3 w-3 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-1">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Create
        </p>
        <div className="mt-3 space-y-2">
          {workspaceActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white transition-all hover:border-white/25 hover:bg-white/5"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-zinc-300">
        <p className="font-semibold text-white">Upgrade to Teams</p>
        <p className="mt-1 text-zinc-400">
          Unlock shared workspaces, admin controls, and advanced compliance tools.
        </p>
        <Link
          href="/pricing"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-zinc-300"
        >
          View plans
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
