"use client";

import { useEffect } from "react";
import type { FocusEvent, KeyboardEvent, RefObject } from "react";

type EditorCanvasProps = {
  html: string;
  title: string;
  onHtmlChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  editorRef: RefObject<HTMLDivElement | null>;
};

export default function EditorCanvas({ html, title, onHtmlChange, onTitleChange, editorRef }: EditorCanvasProps) {
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== html) {
      editorRef.current.innerHTML = html;
    }
  }, [editorRef, html]);

  useEffect(() => {
    editorRef.current?.setAttribute("contenteditable", "true");
  }, [editorRef]);

  const handleInput = () => {
    if (!editorRef.current) return;
    onHtmlChange(editorRef.current.innerHTML);
  };

  const handleTitleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onTitleChange(event.currentTarget.value.trim() || "Untitled document");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      const { scrollX, scrollY } = window;
      editorRef.current?.focus({ preventScroll: true });
      document.execCommand(event.shiftKey ? "outdent" : "indent");
      if (editorRef.current) {
        const nextHtml = editorRef.current.innerHTML;
        requestAnimationFrame(() => {
          window.scrollTo(scrollX, scrollY);
          onHtmlChange(nextHtml);
        });
      }
      window.scrollTo(scrollX, scrollY);
    }
  };

  const wordCount = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <section className="flex-1 rounded-3xl border border-white/10 bg-black/40 p-6 text-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)]">
      <header className="flex flex-col gap-2 border-b border-white/5 pb-4">
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          onBlur={handleTitleBlur}
          className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-2xl font-semibold text-white outline-none transition-colors focus:border-white/25"
        />
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
            Live edit mode
          </span>
          <span>Word count: {wordCount}</span>
          <span>Reading time: ~{readingTime} min</span>
        </div>
      </header>

      <div className="relative mt-6 flex justify-center">
        <div className="absolute inset-y-0 left-1/2 w-[calc(100%+8rem)] max-w-[960px] -translate-x-1/2 rounded-[36px] bg-gradient-to-b from-white/5 via-white/0 to-white/0 blur-2xl" aria-hidden />
        <div className="relative w-full max-w-[820px] overflow-hidden rounded-[28px] border border-white/10 bg-black/50 p-10 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)]">
          <div
            ref={editorRef}
            className="min-h-[640px] w-full text-[15px] leading-relaxed text-zinc-200 outline-none [&>*]:my-3 [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-white/10 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:bg-transparent [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:my-1"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            spellCheck
            suppressContentEditableWarning
          />
        </div>
      </div>
    </section>
  );
}
