import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 pt-24 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
            Error 404
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            The link might be broken or the resource may have been moved. Try heading back to the home page or exploring our latest updates.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-zinc-200"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              Contact support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
