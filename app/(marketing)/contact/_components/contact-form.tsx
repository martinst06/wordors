export default function ContactForm() {
  return (
    <section id="form" className="px-6 pb-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-10">
          <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">Tell us about your team</h2>
          <p className="mb-10 text-zinc-400">
            Share a few details so we can connect you with the right person. We typically reply within one business day.
          </p>

          <form className="space-y-6" method="post">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jordan Smith"
                  className="rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-zinc-500 focus:bg-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-zinc-500 focus:bg-black"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="team-size" className="text-sm font-medium text-white">
                  Team size
                </label>
                <select
                  id="team-size"
                  name="teamSize"
                  defaultValue=""
                  required
                  className="rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-zinc-500 focus:bg-black"
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option value="1-5">1 - 5</option>
                  <option value="6-20">6 - 20</option>
                  <option value="21-100">21 - 100</option>
                  <option value="101+">101+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="use-case" className="text-sm font-medium text-white">
                  Primary use case
                </label>
                <select
                  id="use-case"
                  name="useCase"
                  defaultValue=""
                  required
                  className="rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-zinc-500 focus:bg-black"
                >
                  <option value="" disabled>
                    Choose an option
                  </option>
                  <option value="education">Education: essays, research, coursework</option>
                  <option value="business">Business: proposals, reports, documentation</option>
                  <option value="creative">Creative: books, scripts, storytelling</option>
                  <option value="other">Something else</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-white">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Share a bit about your project, goals, or timeline."
                className="rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-zinc-500 focus:bg-black"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="h-4 w-4 rounded border border-zinc-700 bg-black text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                I agree to receive email updates from Wordors.
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-black transition-all hover:scale-105 hover:bg-zinc-200"
              >
                Submit message
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Office hours</h3>
            <p className="text-zinc-400">Monday – Friday, 9:00 – 18:00 UTC</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Response time</h3>
            <p className="text-zinc-400">We reply in under 24 hours during the work week.</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Need something urgent?</h3>
            <p className="text-zinc-400">
              Reach us directly at <a className="text-white" href="mailto:hello@wordors.com">hello@wordors.com</a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
