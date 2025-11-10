import Link from "next/link";

const quickLinks = [
  { label: "All documents", href: "/workspace" },
  { label: "Shared with me", href: "/workspace/shared" },
  { label: "Starred", href: "/workspace/starred" },
];

export default function WorkspaceTopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Workspace</h1>
          <p className="text-sm text-zinc-500">Morning, Jordan. Ready to keep writing?</p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M18 10.5A7.5 7.5 0 113 10.5a7.5 7.5 0 0115 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search documents"
              className="w-64 rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-white/25 focus:outline-none"
            />
          </div>
          <Link
            href="/workspace/new"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-zinc-200"
          >
            New document
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5 bg-black/60">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-1 overflow-x-auto px-6 py-3 text-sm text-zinc-400">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <button className="ml-auto inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-zinc-400 transition-colors hover:text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
            </svg>
            Customize
          </button>
        </div>
      </div>
    </header>
  );
}
