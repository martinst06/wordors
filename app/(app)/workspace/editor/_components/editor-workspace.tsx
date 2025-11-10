"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { IParagraphOptions } from "docx";
import {
  AlignmentType,
  BorderStyle,
  Document as DocxDocument,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  UnderlineType,
  ShadingType,
} from "docx";
import EditorToolbar from "./editor-toolbar";
import EditorCanvas from "./editor-canvas";

type EditorWorkspaceProps = {
  initialTitle: string;
  formatLabel: string;
  initialContent?: string;
};

type RunStyle = {
  bold?: boolean;
  italics?: boolean;
  underline?: boolean;
  strike?: boolean;
  color?: string;
  highlight?: string;
  size?: number;
  font?: string;
};

export type EditorSelectionState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  block: "p" | "h1" | "h2" | "h3" | "blockquote";
  unordered: boolean;
  ordered: boolean;
  align: "left" | "center" | "right" | "justify";
  fontSize: string;
  fontFamily: string;
};

const defaultSelectionState: EditorSelectionState = {
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  block: "p",
  unordered: false,
  ordered: false,
  align: "left",
  fontSize: "",
  fontFamily: "",
};

const defaultInitialHtml = "<p><br /></p>";

const htmlFontSizeToHalfPoints: Record<string, number> = {
  "1": 16,
  "2": 20,
  "3": 24,
  "4": 28,
  "5": 36,
  "6": 48,
  "7": 64,
};

const FONT_STYLESHEET_ID = "wordors-editor-fonts";

const FONT_OPTIONS = [
  { label: "Inter", value: "Inter", cssFamily: '"Inter", sans-serif' },
  { label: "Merriweather", value: "Merriweather", cssFamily: '"Merriweather", serif' },
  { label: "Source Serif", value: "Source Serif 4", cssFamily: '"Source Serif 4", serif' },
  { label: "Roboto Mono", value: "Roboto Mono", cssFamily: '"Roboto Mono", monospace' },
  { label: "Space Grotesk", value: "Space Grotesk", cssFamily: '"Space Grotesk", sans-serif' },
];

const normalizeFontToken = (font: string) => font.replace(/^"|"$/g, "").replace(/^'|'$/g, "").trim();

const getPrimaryFontName = (fontFamily?: string) => {
  if (!fontFamily) return "";
  const firstToken = fontFamily.split(",")[0];
  return normalizeFontToken(firstToken ?? "");
};

const normalizeColor = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
    const hex = trimmed.length === 4 ? trimmed.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])/i, (_match, r, g, b) => `#${r}${r}${g}${g}${b}${b}`) : trimmed;
    return hex.replace("#", "").toUpperCase();
  }

  const rgbMatch = trimmed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i);
  if (rgbMatch) {
    const alpha = rgbMatch[4] ? Number.parseFloat(rgbMatch[4]) : 1;
    if (alpha === 0) return undefined;
    const [r, g, b] = rgbMatch.slice(1, 4).map((component) => Number.parseInt(component, 10));
    const toHex = (component: number) => component.toString(16).padStart(2, "0");
    return `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  return undefined;
};

const cssFontSizeToHalfPoints = (value: string) => {
  const match = value.trim().match(/^([\d.]+)(px|pt)$/i);
  if (!match) return undefined;
  const numeric = Number.parseFloat(match[1]);
  if (Number.isNaN(numeric)) return undefined;
  const unit = match[2].toLowerCase();
  const points = unit === "pt" ? numeric : (numeric * 72) / 96;
  return Math.round(points * 2);
};

const paragraphAlignmentMap: Record<string, (typeof AlignmentType)[keyof typeof AlignmentType]> = {
  center: AlignmentType.CENTER,
  right: AlignmentType.RIGHT,
  justify: AlignmentType.JUSTIFIED,
  justified: AlignmentType.JUSTIFIED,
};

const getParagraphAlignment = (element: HTMLElement) => {
  const styleAlign = element.style.textAlign;
  const attrAlign = element.getAttribute("align");
  const alignment = (styleAlign || attrAlign || "").toLowerCase();
  return paragraphAlignmentMap[alignment];
};

export default function EditorWorkspace({
  initialTitle,
  formatLabel,
  initialContent,
}: EditorWorkspaceProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState(initialTitle);
  const [html, setHtml] = useState(initialContent?.trim() ? initialContent : defaultInitialHtml);
  const [isExporting, setIsExporting] = useState(false);
  const [selectionState, setSelectionState] = useState<EditorSelectionState>(defaultSelectionState);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(FONT_STYLESHEET_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_STYLESHEET_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Merriweather:wght@400;700&family=Source+Serif+4:wght@400;700&family=Roboto+Mono:wght@400;600&family=Space+Grotesk:wght@400;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const computeSelectionState = useCallback((): EditorSelectionState => {
    const editor = editorRef.current;
    if (!editor) return defaultSelectionState;

    const selection = document.getSelection();
    if (!selection?.anchorNode) return defaultSelectionState;

    let anchorNode: Node | null = selection.anchorNode;
    if (anchorNode.nodeType === Node.TEXT_NODE) {
      anchorNode = anchorNode.parentElement;
    }

    if (!anchorNode || !editor.contains(anchorNode)) {
      return defaultSelectionState;
    }

    const anchorElement = (anchorNode instanceof HTMLElement ? anchorNode : anchorNode.parentElement) ?? null;
    const referenceElement = (anchorElement?.closest?.("span, font, p, div, blockquote, li, h1, h2, h3") as HTMLElement | null) ?? anchorElement;

    const safeState = (command: string) => {
      try {
        return document.queryCommandState(command);
      } catch {
        return false;
      }
    };

    const safeValue = (command: string) => {
      try {
        return document.queryCommandValue(command);
      } catch {
        return "";
      }
    };

    const blockValueRaw = safeValue("formatBlock");
    const normalizedBlock =
      typeof blockValueRaw === "string" ? blockValueRaw.replace(/[<>]/g, "").toLowerCase() : "";

    let block: EditorSelectionState["block"] = "p";
    if (normalizedBlock === "h1") block = "h1";
    else if (normalizedBlock === "h2") block = "h2";
    else if (normalizedBlock === "h3") block = "h3";
    else if (normalizedBlock === "blockquote") block = "blockquote";

    let align: EditorSelectionState["align"] = "left";
    if (safeState("justifyCenter")) align = "center";
    else if (safeState("justifyRight")) align = "right";
    else if (safeState("justifyFull")) align = "justify";

    let fontSize = "";
    let fontFamily = "";
    if (referenceElement) {
      const computed = window.getComputedStyle(referenceElement);
      const px = Number.parseFloat(computed.fontSize);
      if (!Number.isNaN(px) && px > 0) {
        const pt = Math.round((px * 72) / 96);
        fontSize = pt > 0 ? String(pt) : "";
      }
      fontFamily = getPrimaryFontName(computed.fontFamily);
    }

    return {
      bold: safeState("bold"),
      italic: safeState("italic"),
      underline: safeState("underline"),
      strike: safeState("strikeThrough"),
      unordered: safeState("insertUnorderedList"),
      ordered: safeState("insertOrderedList"),
      block,
      align,
      fontSize,
      fontFamily,
    };
  }, [editorRef]);

  const focusAndExec = useCallback(
    (command: string, value?: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value ?? "");
      setHtml(editorRef.current.innerHTML);
      setSelectionState(computeSelectionState());
    },
    [computeSelectionState]
  );

  const applyExactFontSize = useCallback(
    (sizePt: number) => {
      if (!editorRef.current) return;
      if (!Number.isFinite(sizePt) || sizePt <= 0) return;
      const normalizedSize = Number.parseFloat(sizePt.toString());
      if (!Number.isFinite(normalizedSize) || normalizedSize <= 0) return;

      editorRef.current.focus();
      document.execCommand("fontSize", false, "7");

      const editor = editorRef.current;
      const fontNodes = Array.from(editor.querySelectorAll('font[size="7"]')) as HTMLElement[];

      fontNodes.forEach((node) => {
        const span = document.createElement("span");
        const existingStyle = node.getAttribute("style");
        if (existingStyle) span.setAttribute("style", existingStyle);

        const colorAttr = node.getAttribute("color");
        if (colorAttr) span.style.color = colorAttr;

        const faceAttr = node.getAttribute("face");
        if (faceAttr) {
          const matched = FONT_OPTIONS.find((option) => option.value === faceAttr);
          span.style.fontFamily = matched ? matched.cssFamily : `"${faceAttr}", sans-serif`;
        }

        span.style.fontSize = `${normalizedSize}pt`;
        span.innerHTML = node.innerHTML;
        node.replaceWith(span);
      });

      setHtml(editor.innerHTML);
      setSelectionState(computeSelectionState());
    },
    [computeSelectionState]
  );

  const applyFontFamily = useCallback(
    (fontValue: string) => {
      if (!editorRef.current) return;
      if (!fontValue) return;

      const option = FONT_OPTIONS.find((item) => item.value === fontValue);
      const cssFamily = option ? option.cssFamily : `"${fontValue}", sans-serif`;

      editorRef.current.focus();
      document.execCommand("fontName", false, fontValue);

      const editor = editorRef.current;
      const fontNodes = Array.from(editor.querySelectorAll("font[face]")) as HTMLElement[];

      fontNodes.forEach((node) => {
        const faceAttr = node.getAttribute("face") ?? fontValue;
        const span = document.createElement("span");
        const existingStyle = node.getAttribute("style");
        if (existingStyle) span.setAttribute("style", existingStyle);

        const colorAttr = node.getAttribute("color");
        if (colorAttr) span.style.color = colorAttr;

        const matched = FONT_OPTIONS.find((item) => item.value === faceAttr);
        span.style.fontFamily = matched ? matched.cssFamily : cssFamily;
        span.innerHTML = node.innerHTML;
        node.replaceWith(span);
      });

      setHtml(editor.innerHTML);
      setSelectionState(computeSelectionState());
    },
    [computeSelectionState]
  );

  useEffect(() => {
    const handleSelectionChange = () => {
      setSelectionState(computeSelectionState());
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("keyup", handleSelectionChange);
      editor.addEventListener("mouseup", handleSelectionChange);
    }

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      if (editor) {
        editor.removeEventListener("keyup", handleSelectionChange);
        editor.removeEventListener("mouseup", handleSelectionChange);
      }
    };
  }, [computeSelectionState, editorRef]);

  useEffect(() => {
    setSelectionState(computeSelectionState());
  }, [html, computeSelectionState]);

  const handleExactFontSizeChange = useCallback(
    (sizePt: number) => {
      applyExactFontSize(sizePt);
    },
    [applyExactFontSize]
  );

  const handleFontFamilyChange = useCallback(
    (fontValue: string) => {
      applyFontFamily(fontValue);
    },
    [applyFontFamily]
  );

  const buildRuns = useCallback((nodes: NodeListOf<ChildNode> | ChildNode[], inherited: RunStyle = {}): TextRun[] => {
    const runs: TextRun[] = [];

    Array.from(nodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        if (!text) return;

        runs.push(
          new TextRun({
            text,
            bold: inherited.bold,
            italics: inherited.italics,
            underline: inherited.underline ? { type: UnderlineType.SINGLE } : undefined,
            strike: inherited.strike,
            color: inherited.color,
            shading: inherited.highlight
              ? {
                  type: ShadingType.CLEAR,
                  fill: inherited.highlight,
                }
              : undefined,
            size: inherited.size,
            font: inherited.font,
          })
        );
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const element = node as HTMLElement;
      const tagName = element.tagName;

      if (tagName === "BR") {
        runs.push(new TextRun({ break: 1 }));
        return;
      }

      const nextStyle: RunStyle = {
        bold: inherited.bold,
        italics: inherited.italics,
        underline: inherited.underline,
        strike: inherited.strike,
        color: inherited.color,
        highlight: inherited.highlight,
        size: inherited.size,
        font: inherited.font,
      };

      if (tagName === "B" || tagName === "STRONG") {
        nextStyle.bold = true;
      }
      if (tagName === "I" || tagName === "EM") {
        nextStyle.italics = true;
      }
      if (tagName === "U") {
        nextStyle.underline = true;
      }
      if (tagName === "S" || tagName === "STRIKE") {
        nextStyle.strike = true;
      }

      if (tagName === "FONT") {
        const sizeAttr = element.getAttribute("size");
        if (sizeAttr) {
          const mappedSize = htmlFontSizeToHalfPoints[sizeAttr];
          if (mappedSize) nextStyle.size = mappedSize;
        }
        const colorAttr = element.getAttribute("color");
        const fontColor = normalizeColor(colorAttr ?? undefined);
        if (fontColor) nextStyle.color = fontColor;
        const faceAttr = element.getAttribute("face");
        if (faceAttr) {
          nextStyle.font = getPrimaryFontName(faceAttr);
        }
      }

      const style = element.style;

      if (style.fontWeight && style.fontWeight !== "normal" && style.fontWeight !== "lighter") {
        const numericWeight = Number.parseInt(style.fontWeight, 10);
        nextStyle.bold = Number.isNaN(numericWeight) ? true : numericWeight >= 600;
      }

      if (style.fontStyle === "italic" || style.fontStyle === "oblique") {
        nextStyle.italics = true;
      }

      const textDecoration = style.textDecorationLine || style.textDecoration;
      if (textDecoration) {
        if (textDecoration.includes("underline")) nextStyle.underline = true;
        if (textDecoration.includes("line-through")) nextStyle.strike = true;
      }

      const colorFromStyle = normalizeColor(style.color);
      if (colorFromStyle) {
        nextStyle.color = colorFromStyle;
      }

      const backgroundFromStyle = normalizeColor(style.backgroundColor);
      if (backgroundFromStyle) {
        nextStyle.highlight = backgroundFromStyle;
      }

      const fontSize = cssFontSizeToHalfPoints(style.fontSize);
      if (fontSize) {
        nextStyle.size = fontSize;
      }

      const fontFamilyFromStyle = getPrimaryFontName(style.fontFamily);
      if (fontFamilyFromStyle) {
        nextStyle.font = fontFamilyFromStyle;
      }

      runs.push(...buildRuns(element.childNodes, nextStyle));
    });

    return runs;
  }, []);

  const ensureRuns = useCallback((runs: TextRun[]): TextRun[] => {
    return runs.length > 0 ? runs : [new TextRun("")];
  }, []);

  const createParagraphs = useCallback(
    (content: string): Paragraph[] => {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(content, "text/html");
      const body = parsed.body;
      const paragraphs: Paragraph[] = [];

      const processList = (listElement: HTMLElement, level: number, type: "bullet" | "numbered") => {
        Array.from(listElement.children).forEach((child) => {
          if (!(child instanceof HTMLElement) || child.tagName !== "LI") return;

          const inlineNodes = Array.from(child.childNodes).filter((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return true;
            return (node as HTMLElement).tagName !== "UL" && (node as HTMLElement).tagName !== "OL";
          });

          const baseOptions: IParagraphOptions = {
            children: ensureRuns(buildRuns(inlineNodes as ChildNode[])),
          };

          const paragraphOptions: IParagraphOptions =
            type === "bullet"
              ? {
                  ...baseOptions,
                  bullet: { level },
                }
              : {
                  ...baseOptions,
                  numbering: {
                    level,
                    reference: "ordered-list",
                  },
                };

          const alignment = getParagraphAlignment(child);
          const finalOptions = alignment ? { ...paragraphOptions, alignment } : paragraphOptions;

          paragraphs.push(new Paragraph(finalOptions));

          Array.from(child.childNodes)
            .filter((nested): nested is HTMLElement => nested instanceof HTMLElement && (nested.tagName === "UL" || nested.tagName === "OL"))
            .forEach((nested) => processList(nested, level + 1, nested.tagName === "UL" ? "bullet" : "numbered"));
        });
      };

      Array.from(body.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = (node.textContent ?? "").trim();
          if (text) {
            paragraphs.push(new Paragraph({ children: [new TextRun(text)] }));
          }
          return;
        }

        if (!(node instanceof HTMLElement)) return;

        switch (node.tagName) {
          case "H1":
          case "H2":
          case "H3": {
            const headingLevelMap = {
              H1: HeadingLevel.HEADING_1,
              H2: HeadingLevel.HEADING_2,
              H3: HeadingLevel.HEADING_3,
            } as const;
            const headingOptions: IParagraphOptions = {
              children: ensureRuns(buildRuns(node.childNodes)),
              heading: headingLevelMap[node.tagName as keyof typeof headingLevelMap],
            };
            const alignment = getParagraphAlignment(node);
            paragraphs.push(new Paragraph(alignment ? { ...headingOptions, alignment } : headingOptions));
            break;
          }
          case "BLOCKQUOTE": {
            const blockquoteOptions: IParagraphOptions = {
              children: ensureRuns(buildRuns(node.childNodes)),
              indent: { left: 720 },
              spacing: { before: 120, after: 120 },
              border: {
                left: {
                  color: "666666",
                  size: 12,
                  space: 6,
                  style: BorderStyle.SINGLE,
                },
              },
            };
            const alignment = getParagraphAlignment(node);
            paragraphs.push(new Paragraph(alignment ? { ...blockquoteOptions, alignment } : blockquoteOptions));
            break;
          }
          case "UL":
            processList(node, 0, "bullet");
            break;
          case "OL":
            processList(node, 0, "numbered");
            break;
          case "P":
          case "DIV": {
            const baseOptions: IParagraphOptions = {
              children: ensureRuns(buildRuns(node.childNodes)),
            };
            const alignment = getParagraphAlignment(node);
            paragraphs.push(new Paragraph(alignment ? { ...baseOptions, alignment } : baseOptions));
            break;
          }
          default: {
            const baseOptions: IParagraphOptions = {
              children: ensureRuns(buildRuns(node.childNodes)),
            };
            const alignment = getParagraphAlignment(node);
            paragraphs.push(new Paragraph(alignment ? { ...baseOptions, alignment } : baseOptions));
          }
        }
      });

      return paragraphs.length > 0 ? paragraphs : [new Paragraph({ children: [new TextRun("")] })];
    },
    [buildRuns, ensureRuns]
  );

  const handleExport = useCallback(async () => {
    if (!editorRef.current || isExporting) return;

    try {
      setIsExporting(true);

      const paragraphs = createParagraphs(editorRef.current.innerHTML);

      const doc = new DocxDocument({
        title: title || "Untitled document",
        creator: "Wordors",
        description: `Generated with Wordors (${formatLabel})`,
        numbering: {
          config: [
            {
              reference: "ordered-list",
              levels: [
                {
                  level: 0,
                  format: "decimal",
                  text: "%1.",
                  alignment: AlignmentType.LEFT,
                  style: {
                    paragraph: {
                      indent: { left: 720, hanging: 360 },
                    },
                  },
                },
              ],
            },
          ],
        },
        sections: [
          {
            properties: {
              page: {
                margin: { top: 720, bottom: 720, left: 720, right: 720 },
              },
            },
            children: paragraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "Untitled"}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export document", error);
    } finally {
      setIsExporting(false);
    }
  }, [createParagraphs, formatLabel, isExporting, title]);

  return (
    <div className="space-y-6">
      <EditorToolbar
        onExport={handleExport}
        onCommand={focusAndExec}
        isExporting={isExporting}
        selection={selectionState}
        onFontSizeChange={handleExactFontSizeChange}
        onFontFamilyChange={handleFontFamilyChange}
        fontOptions={FONT_OPTIONS}
      />

      <EditorCanvas
        html={html}
        title={title}
        onHtmlChange={setHtml}
        onTitleChange={setTitle}
        editorRef={editorRef}
      />
    </div>
  );
}

