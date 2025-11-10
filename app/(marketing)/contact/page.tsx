import type { Metadata } from "next";
import ContactHero from "./_components/contact-hero";
import ContactChannels from "./_components/contact-channels";
import ContactForm from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Wordors",
  description:
    "Talk with the Wordors team about pricing, support, and onboarding. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <ContactHero />
      <ContactChannels />
      <ContactForm />
    </div>
  );
}
