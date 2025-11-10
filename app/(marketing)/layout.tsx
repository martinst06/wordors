import type { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-black text-white">
      <div className="flex-1">{children}</div>
    </div>
  );
}
