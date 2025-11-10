const outline = [
  { title: "Introduction", progress: "120 words" },
  { title: "Problem statement", progress: "340 words" },
  { title: "Proposed solution", progress: "220 words" },
  { title: "Next steps", progress: "80 words" },
];

export default function EditorOutline() {
  return (
    <aside className="hidden w-72 flex-shrink-0 flex-col gap-4 rounded-3xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-300 xl:flex">
      <div>
        <h2 className="text-base font-semibold text-white">Outline</h2>
        <p className="text-xs text-zinc-500">Click a section to jump.</p>
      </div>
      <div className="space-y-3">
        {outline.map((item) => (
          <button
            key={item.title}
            type="button"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all hover:border-white/25 hover:bg-white/10"
          >
            <p className="text-sm font-medium text-white">{item.title}</p>
            <p className="text-xs text-zinc-500">{item.progress}</p>
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-zinc-400">
        <p className="font-semibold text-white">AI outline active</p>
        <p className="mt-1">Wordors keeps sections aligned with your structure and suggests improvements as you write.</p>
      </div>
    </aside>
  );
}
