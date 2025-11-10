import type { Metadata } from "next";
import EditorWorkspace from "./_components/editor-workspace";

export const metadata: Metadata = {
  title: "Editor | Wordors",
  description: "Write and export .docx documents with Wordors' intelligent editor.",
};

export default function EditorPage({
  searchParams,
}: {
  searchParams: { title?: string; space?: string; format?: string };
}) {
  const title = searchParams.title?.trim() || "Untitled document";
  const format = (searchParams.format ?? "docx").toLowerCase();
  const formatLabel = format === "docx" ? "Word (.docx)" : format.toUpperCase();

  return (
    <EditorWorkspace
      initialTitle={title}
      formatLabel={formatLabel}
    />
  );
}
