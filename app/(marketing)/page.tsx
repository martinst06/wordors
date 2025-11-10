import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
              Write better, <span className="bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">write faster</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-zinc-400 md:text-2xl">
              The intelligent writing environment for students and professionals. AI-powered assistance meets beautiful design.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-lg bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:bg-zinc-200"
              >
                Download for Free
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-zinc-800"
              >
                See it in Action
              </Link>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Compatible with .docx • Works offline • Free trial available
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Writing, reimagined</h2>
            <p className="text-xl text-zinc-400">Everything you need to write better documents</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all hover:border-zinc-700">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition-colors group-hover:bg-zinc-700">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-white">AI Writing Assistant</h3>
              <p className="leading-relaxed text-zinc-400">
                Get intelligent suggestions, grammar fixes, and tone adjustments as you write. Like having a co-writer by your side.
              </p>
            </div>

            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all hover:border-zinc-700">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition-colors group-hover:bg-zinc-700">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-white">Real-time Collaboration</h3>
              <p className="leading-relaxed text-zinc-400">
                Work together seamlessly. See changes instantly, leave comments, and collaborate on essays, reports, or proposals.
              </p>
            </div>

            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all hover:border-zinc-700">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition-colors group-hover:bg-zinc-700">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-white">Universal Format Support</h3>
              <p className="leading-relaxed text-zinc-400">
                Native .docx compatibility with Word. Import, edit, and export without formatting headaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="bg-zinc-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">2M+</div>
              <div className="text-zinc-400">Documents Created</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">500K+</div>
              <div className="text-zinc-400">Active Writers</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">95%</div>
              <div className="text-zinc-400">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">4.9★</div>
              <div className="text-zinc-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Start writing smarter today</h2>
            <p className="mb-8 text-xl text-zinc-400">
              Join students and professionals who are already writing better documents with AI assistance.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/signup?plan=pro"
                className="rounded-lg bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:bg-zinc-200"
              >
                Download Now
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-zinc-700 bg-transparent px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-zinc-800"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
