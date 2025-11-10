import type { Metadata } from "next";
import WorkspaceOverview from "./_components/workspace-overview";
import WorkspaceQuickActions from "./_components/workspace-quick-actions";
import WorkspaceRecentDocuments from "./_components/workspace-recent-documents";
import WorkspaceAiSuggestions from "./_components/workspace-ai-suggestions";
import WorkspaceTemplateCarousel from "./_components/workspace-template-carousel";

export const metadata: Metadata = {
  title: "Workspace | Wordors",
  description:
    "Your Wordors workspace home. Resume recent documents, start new drafts, and see AI-powered suggestions.",
};

export default function WorkspaceHomePage() {
  return (
    <div className="space-y-8">
      <WorkspaceOverview />
      <WorkspaceQuickActions />
      <WorkspaceRecentDocuments />
      <WorkspaceAiSuggestions />
      <WorkspaceTemplateCarousel />
    </div>
  );
}
