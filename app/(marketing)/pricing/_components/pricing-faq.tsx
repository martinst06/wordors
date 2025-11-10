const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time from your workspace settings. Changes take effect immediately, and we prorate the difference.",
  },
  {
    question: "Do you offer student or educator discounts?",
    answer:
      "Yes. Verified students and educators receive 30% off the Pro plan. Contact our education team to activate your discount.",
  },
  {
    question: "Is there an on-premise option?",
    answer:
      "Our Teams plan supports private cloud deployments and SSO integrations. For on-premise options, talk with sales and we’ll tailor a solution.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, Apple Pay, and Google Pay for self-serve plans. Teams customers can pay by invoice or purchase order.",
  },
];

export default function PricingFaq() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Questions, answered</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Can’t find what you’re looking for? Reach us at hello@wordors.com.
          </p>
        </div>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.9)] transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <h3 className="text-lg font-medium text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
