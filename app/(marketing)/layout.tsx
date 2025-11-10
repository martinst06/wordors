import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-1 bg-black pt-24">{children}</main>
      <Footer />
    </div>
  );
}
