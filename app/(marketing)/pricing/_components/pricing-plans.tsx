"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    description: "For individual writers getting started with Wordors",
    price: { monthly: 0, annual: 0 },
    highlight: false,
    badge: "Start here",
    features: [
      "Unlimited drafts",
      "AI writing assistant (lite)",
      "Export to .docx",
      "Offline mode",
    ],
    cta: { label: "Start free", href: "/signup" },
  },
  {
    name: "Pro",
    description: "For power users collaborating on documents every day",
    price: { monthly: 18, annual: 15 },
    highlight: true,
    badge: "Most popular",
    features: [
      "Everything in Free",
      "Advanced AI rewrites",
      "Real-time collaboration",
      "Version history",
      "Priority support",
    ],
    cta: { label: "Start 14-day trial", href: "/signup?plan=pro" },
  },
  {
    name: "Teams",
    description: "For departments and organizations with compliance needs",
    price: { monthly: 32, annual: 28 },
    highlight: false,
    badge: "Scale ready",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Role-based access control",
      "Custom templates & branding",
      "Dedicated success manager",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
] as const;

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950/80 p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                billingCycle === "monthly"
                  ? "bg-white text-black shadow-[0_20px_45px_-20px_rgba(255,255,255,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-pressed={billingCycle === "monthly"}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                billingCycle === "annual"
                  ? "bg-white text-black shadow-[0_20px_45px_-20px_rgba(255,255,255,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-pressed={billingCycle === "annual"}
            >
              Annual
            </button>
          </div>
          <p className="text-sm text-zinc-500">Save up to 20% with annual billing.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = plan.price[billingCycle];
            const formattedPrice = price === 0 ? "Free" : `$${price}`;

            return (
              <article
                key={plan.name}
                className={`group relative flex h-full flex-col rounded-[28px] border border-white/8 bg-zinc-950/80 p-10 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_35px_80px_-40px_rgba(0,0,0,0.85)] ${
                  plan.highlight
                    ? "ring-1 ring-white/20 backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:rounded-[28px] before:bg-white/10 before:opacity-60 before:transition-opacity group-hover:before:opacity-90"
                    : ""
                }`}
              >
                {plan.badge ? (
                  <span className="mb-5 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {plan.badge}
                  </span>
                ) : null}
                <h2 className="text-3xl font-semibold text-white">{plan.name}</h2>
                <p className="mt-3 text-base text-zinc-400">{plan.description}</p>

                <div className="mt-8 flex items-baseline gap-3 text-white">
                  <span className="text-5xl font-bold tracking-tight">{formattedPrice}</span>
                  {price !== 0 ? (
                    <span className="text-sm text-zinc-500">
                      per user / {billingCycle === "monthly" ? "month" : "month (billed annually)"}
                    </span>
                  ) : (
                    <span className="text-sm text-zinc-500">Always</span>
                  )}
                </div>

                <Link
                  href={plan.cta.href}
                  className={`mt-10 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    plan.highlight
                      ? "bg-white text-black shadow-[0_24px_50px_-24px_rgba(255,255,255,0.9)] hover:scale-[1.02] hover:bg-zinc-200"
                      : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {plan.cta.label}
                </Link>

                <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white">
                        <svg
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
