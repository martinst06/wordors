import Link from "next/link";

const channels = [
  {
    title: "Product & Sales",
    description:
      "Talk with a specialist about plans for teams, campuses, and enterprise deployments.",
    action: "Schedule a call",
    href: "/contact#form",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M4 4h16v12H5.17A1.17 1.17 0 014 14.83V4zm3 16h10"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 8H8m8 4H8" />
      </svg>
    ),
  },
  {
    title: "Support",
    description:
      "Get help from our support team for billing, account recovery, and technical questions.",
    action: "Open support hub",
    href: "/support",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M12 9v4l2.5 2.5M12 22a10 10 0 110-20 10 10 0 010 20z"
        />
      </svg>
    ),
  },
  {
    title: "Education",
    description:
      "Bring Wordors to your classroom or campus. We offer deployment guides and training materials.",
    action: "View resources",
    href: "/education",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3l9 4-9 4-9-4 9-4z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M5 10.5V17A2.5 2.5 0 007.5 19.5H12"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 11v8" />
      </svg>
    ),
  },
];

export default function ContactChannels() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        {channels.map((channel) => (
          <article
            key={channel.title}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 transition-all hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80">
              {channel.icon}
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-white">{channel.title}</h2>
            <p className="mb-8 text-zinc-400">{channel.description}</p>
            <Link
              href={channel.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-transform hover:translate-x-1 hover:text-zinc-200"
            >
              {channel.action}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
