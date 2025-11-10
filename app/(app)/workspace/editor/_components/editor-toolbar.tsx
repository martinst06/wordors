"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { EditorSelectionState } from "./editor-workspace";

type Control = {
  id: string;
  label: string;
  command: string;
  value?: string;
  isActive?: (selection: EditorSelectionState) => boolean;
};

type ControlGroup = {
  label: string;
  controls: Control[];
};

const formattingGroups: ControlGroup[] = [
  {
    label: "Text",
    controls: [
      { id: "bold", label: "Bold", command: "bold", isActive: (selection) => selection.bold },
      { id: "italic", label: "Italic", command: "italic", isActive: (selection) => selection.italic },
      { id: "underline", label: "Underline", command: "underline", isActive: (selection) => selection.underline },
      { id: "strike", label: "Strike", command: "strikeThrough", isActive: (selection) => selection.strike },
    ],
  },
  {
    label: "Structure",
    controls: [
      { id: "heading1", label: "Heading 1", command: "formatBlock", value: "<h1>", isActive: (selection) => selection.block === "h1" },
      { id: "heading2", label: "Heading 2", command: "formatBlock", value: "<h2>", isActive: (selection) => selection.block === "h2" },
      { id: "heading3", label: "Heading 3", command: "formatBlock", value: "<h3>", isActive: (selection) => selection.block === "h3" },
      { id: "quote", label: "Quote", command: "formatBlock", value: "<blockquote>", isActive: (selection) => selection.block === "blockquote" },
      { id: "list", label: "Bullets", command: "insertUnorderedList", isActive: (selection) => selection.unordered },
      { id: "numbers", label: "Numbered", command: "insertOrderedList", isActive: (selection) => selection.ordered },
    ],
  },
  {
    label: "Alignment",
    controls: [
      { id: "align-left", label: "Left", command: "justifyLeft", isActive: (selection) => selection.align === "left" },
      { id: "align-center", label: "Center", command: "justifyCenter", isActive: (selection) => selection.align === "center" },
      { id: "align-right", label: "Right", command: "justifyRight", isActive: (selection) => selection.align === "right" },
      { id: "align-justify", label: "Justify", command: "justifyFull", isActive: (selection) => selection.align === "justify" },
    ],
  },
  {
    label: "Spacing",
    controls: [
      { id: "indent", label: "Indent", command: "indent" },
      { id: "outdent", label: "Outdent", command: "outdent" },
      { id: "hr", label: "Rule", command: "insertHorizontalRule" },
      { id: "clear", label: "Clear", command: "removeFormat" },
    ],
  },
];

const fontSizePresets = ["10", "11", "12", "14", "16", "18", "20", "24", "32", "48"];

type FontOption = {
  label: string;
  value: string;
};

type EditorToolbarProps = {
  onExport: () => void;
  onCommand: (command: string, value?: string) => void;
  isExporting: boolean;
  selection: EditorSelectionState;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (font: string) => void;
  fontOptions: FontOption[];
};

export default function EditorToolbar({
  onExport,
  onCommand,
  isExporting,
  selection,
  onFontSizeChange,
  onFontFamilyChange,
  fontOptions,
}: EditorToolbarProps) {
  const handleColorChange = (command: string) => (event: ChangeEvent<HTMLInputElement>) => {
    onCommand(command, event.target.value);
  };

  const [sizeValue, setSizeValue] = useState(selection.fontSize);
  const [fontValue, setFontValue] = useState(selection.fontFamily);

  useEffect(() => {
    setSizeValue(selection.fontSize);
  }, [selection.fontSize]);

  useEffect(() => {
    setFontValue(selection.fontFamily);
  }, [selection.fontFamily]);

  const commitFontSize = () => {
    const numeric = Number.parseFloat(sizeValue);
    if (!Number.isFinite(numeric) || numeric <= 0) return;
    onFontSizeChange(numeric);
  };

  const handleFontSizeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitFontSize();
    }
  };

  const handleFontSizeBlur = () => {
    commitFontSize();
  };

  const commitFontFamily = (value = fontValue) => {
    if (!value) return;
    const resolved = fontOptions.find((option) => option.value.toLowerCase() === value.toLowerCase());
    const resolvedValue = resolved ? resolved.value : value;
    setFontValue(resolvedValue);
    onFontFamilyChange(resolvedValue);
  };

  const handleFontChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFontValue(value);
    const matchesPreset = fontOptions.some((option) => option.value.toLowerCase() === value.toLowerCase());
    if (matchesPreset) {
      commitFontFamily(value);
    }
  };

  const handleFontKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitFontFamily();
    }
  };

  const handleFontBlur = () => {
    commitFontFamily();
  };

  const handleControlClick = (control: Control) => {
    if (control.id === "heading1" && selection.block === "h1") {
      onCommand("formatBlock", "<p>");
      return;
    }
    if (control.id === "heading2" && selection.block === "h2") {
      onCommand("formatBlock", "<p>");
      return;
    }
    if (control.id === "heading3" && selection.block === "h3") {
      onCommand("formatBlock", "<p>");
      return;
    }
    if (control.id === "quote" && selection.block === "blockquote") {
      onCommand("formatBlock", "<p>");
      return;
    }

    onCommand(control.command, control.value);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white shadow-[0_20px_60px_-45px_rgba(0,0,0,0.8)]">
      <div className="flex flex-wrap items-center gap-3">
        {formattingGroups.map((group) => (
          <div key={group.label} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-1">
            {group.controls.map((control) => {
              const isActive = control.isActive?.(selection) ?? false;
              const buttonClass = `rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors ${
                isActive ? "bg-white text-black" : "text-white hover:bg-white/10"
              }`;

              return (
                <button
                  key={control.id}
                  type="button"
                  className={buttonClass}
                  aria-label={control.label}
                  aria-pressed={isActive}
                  onClick={() => handleControlClick(control)}
                >
                  {control.label}
                </button>
              );
            })}
          </div>
        ))}

        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1">
          <label htmlFor="font-family" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Font
          </label>
          <input
            id="font-family"
            list="wordors-font-list"
            value={fontValue}
            onChange={handleFontChange}
            onKeyDown={handleFontKeyDown}
            onBlur={handleFontBlur}
            className="w-32 rounded-lg bg-black/30 px-3 py-2 text-xs text-white outline-none"
            placeholder="Font"
          />
          <datalist id="wordors-font-list">
            {fontOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </datalist>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1">
          <label htmlFor="font-size" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Size
          </label>
          <input
            id="font-size"
            type="number"
            min={6}
            max={96}
            step={1}
            list="wordors-font-size-list"
            value={sizeValue}
            onChange={(event) => setSizeValue(event.target.value)}
            onKeyDown={handleFontSizeKeyDown}
            onBlur={handleFontSizeBlur}
            className="w-20 rounded-lg bg-black/30 px-3 py-2 text-xs text-white outline-none"
            placeholder="pt"
          />
          <datalist id="wordors-font-size-list">
            {fontSizePresets.map((preset) => (
              <option key={preset} value={preset} />
            ))}
          </datalist>
        </div>

        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-1">
          <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400" htmlFor="text-color">
            Text
          </label>
          <input
            id="text-color"
            type="color"
            defaultValue="#ffffff"
            onChange={handleColorChange("foreColor")}
            className="h-8 w-8 cursor-pointer rounded-md border border-white/20 bg-transparent p-0"
            aria-label="Text color"
          />
          <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400" htmlFor="highlight-color">
            Highlight
          </label>
          <input
            id="highlight-color"
            type="color"
            defaultValue="#3730a3"
            onChange={handleColorChange("backColor")}
            className="h-8 w-8 cursor-pointer rounded-md border border-white/20 bg-transparent p-0"
            aria-label="Highlight color"
          />
        </div>

        <button
          type="button"
          onClick={onExport}
          disabled={isExporting}
          aria-busy={isExporting}
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.02] hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isExporting ? "Exporting..." : "Export .docx"}
          {!isExporting && (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v12m6-6H6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
