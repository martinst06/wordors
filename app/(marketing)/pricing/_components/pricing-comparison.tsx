const rows = [
  {
    feature: "AI writing assistance",
    free: "Lite",
    pro: "Advanced",
    teams: "Advanced + custom prompts",
  },
  {
    feature: "Real-time collaboration",
    free: "Up to 2 guests",
    pro: "Unlimited",
    teams: "Unlimited + roles",
  },
  {
    feature: "Storage",
    free: "5 GB",
    pro: "500 GB",
    teams: "Unlimited",
  },
  {
    feature: "Export formats",
    free: ".docx, PDF",
    pro: ".docx, PDF, Markdown",
    teams: "All + custom workflows",
  },
  {
    feature: "Support",
    free: "Community",
    pro: "Priority email",
    teams: "Dedicated manager",
  },
];

export default function PricingComparison() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Compare plans</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Find the features that match your writing workflow.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/8 bg-zinc-950/70 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] backdrop-blur">
          <table className="min-w-full text-sm text-zinc-300">
            <thead>
              <tr className="bg-white/[0.03] text-xs uppercase tracking-[0.25em] text-zinc-400">
                <th scope="col" className="px-6 py-5 text-left font-semibold text-white">
                  Feature
                </th>
                <th scope="col" className="px-6 py-5 text-center font-semibold text-white">
                  Free
                </th>
                <th scope="col" className="px-6 py-5 text-center font-semibold text-white">
                  Pro
                </th>
                <th scope="col" className="px-6 py-5 text-center font-semibold text-white">
                  Teams
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={row.feature}
                  className={`transition-colors ${
                    rowIndex % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                  } hover:bg-white/[0.04]`}
                >
                  <td className="px-6 py-5 text-left text-white">{row.feature}</td>
                  <td className="px-6 py-5 text-center text-zinc-300">{row.free}</td>
                  <td className="px-6 py-5 text-center text-white">{row.pro}</td>
                  <td className="px-6 py-5 text-center text-white">{row.teams}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
