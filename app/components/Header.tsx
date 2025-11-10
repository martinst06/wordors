import Link from "next/link";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Wordors home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900">
              <span className="text-lg font-bold text-white">W</span>
            </div>
            <span className="text-xl font-semibold text-white">Wordors</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="hidden px-4 py-2 text-zinc-400 transition-colors hover:text-white sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-white px-5 py-2 font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
