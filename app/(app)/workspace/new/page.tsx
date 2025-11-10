import type { Metadata } from "next";
import EditorWorkspace from "../editor/_components/editor-workspace";

export const metadata: Metadata = {
  title: "Create .docx | Wordors",
  description: "Open a fresh Word-style document and export genuine .docx files without leaving your workspace.",
};

export default function WorkspaceNewDocumentPage() {
  return <EditorWorkspace initialTitle="Untitled document" formatLabel="Word (.docx)" />;
}
