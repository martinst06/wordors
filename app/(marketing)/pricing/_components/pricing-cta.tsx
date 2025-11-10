import Link from "next/link";

export default function PricingCta() {
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-14 text-center shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)]">
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            Ready to bring Wordors to your team?
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Start a free trial today or connect with our specialists to design a plan that fits.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup?plan=pro"
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-[1.02] hover:bg-zinc-200"
            >
              Start free trial
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:border-white/40 hover:bg-white/5"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
