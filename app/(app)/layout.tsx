import type { ReactNode } from "react";
import WorkspaceSidebar from "./_components/workspace-sidebar";
import WorkspaceTopNav from "./_components/workspace-top-nav";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <WorkspaceSidebar />
      <div className="flex flex-1 flex-col">
        <WorkspaceTopNav />
        <main className="flex-1 overflow-y-auto px-6 py-10">
          <div className="mx-auto w-full max-w-6xl space-y-8 pb-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
