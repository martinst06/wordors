const suggestions = [
  {
    title: "Polish your executive summary",
    description: "Draft a sharper opening with AI-powered rewrites tailored to leadership tone.",
    action: "Rewrite with AI",
  },
  {
    title: "Add citations to research report",
    description: "Wordors found 12 references without citations. Let AI help format them automatically.",
    action: "Review citations",
  },
];

export default function WorkspaceAiSuggestions() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {suggestions.map((suggestion) => (
        <article
          key={suggestion.title}
          className="rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/10 via-black to-black p-6 shadow-[0_30px_60px_-45px_rgba(16,185,129,0.4)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Focus suggestion</p>
          <h3 className="mt-4 text-lg font-semibold text-white">{suggestion.title}</h3>
          <p className="mt-3 text-sm text-zinc-300">{suggestion.description}</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
            {suggestion.action}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </article>
      ))}
    </section>
  );
}
