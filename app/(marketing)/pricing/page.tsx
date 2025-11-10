import type { Metadata } from "next";
import PricingHero from "./_components/pricing-hero";
import PricingPlans from "./_components/pricing-plans";
import PricingComparison from "./_components/pricing-comparison";
import PricingFaq from "./_components/pricing-faq";
import PricingCta from "./_components/pricing-cta";

export const metadata: Metadata = {
  title: "Pricing - Wordors",
  description:
    "Transparent pricing for Wordors. Choose from Free, Pro, or Teams plans and start your free trial today.",
};

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <PricingHero />
      <PricingPlans />
      <PricingComparison />
      <PricingFaq />
      <PricingCta />
    </div>
  );
}
