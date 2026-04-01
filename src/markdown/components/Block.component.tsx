import React, { useState } from "react";
import { renderInline } from "./Render.inline.component";
import { parseMarkdown } from "./Parse.markdown.component";
import { type ListItem } from "..";
import {
  alignClass,
  parseTableRow,
  parseTableAlignments,
} from "../utils/Block.util";
import { headingSizeMap } from "../main/Block.main";
import { HashIcon, ChevronRightIcon, CheckIcon } from "../icons/Block.icons";
import { type JSX } from "react/jsx-dev-runtime";
import "../styles/Block.style.css";

export function HeadingBlock({
  level,
  text,
  id,
}: {
  level: number;
  text: string;
  id: string;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      id={id}
      className={`heading-block group relative flex items-center gap-2 text-stone-800 dark:text-slate-100 ${headingSizeMap[level]}`}
    >
      {/* Anchor link — visibility controlled by .heading-block:hover .heading-anchor in CSS */}
      <a
        href={`#${id}`}
        className="heading-anchor absolute -left-6 text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-slate-100 transition-colors"
      >
        <HashIcon size={14} />
      </a>
      {renderInline(text)}
    </Tag>
  );
}

/* ─── BlockquoteBlock ────────────────────────────────────────────────────────
   Renders either a coloured callout card (when the first line contains a
   recognised emoji) or a standard left-bordered blockquote.                   */

/* Emoji → background + border colour pairs for callout blocks */
const calloutTypes: Record<string, { bg: string; border: string }> = {
  "💡": {
    bg: "bg-yellow-100 dark:bg-yellow-950",
    border: "border-yellow-300 dark:border-yellow-900",
  },
  "⚠️": {
    bg: "bg-orange-100 dark:bg-orange-950",
    border: "border-orange-300 dark:border-orange-900",
  },
  "❌": {
    bg: "bg-red-100 dark:bg-red-950",
    border: "border-red-300 dark:border-red-900",
  },
  "✅": {
    bg: "bg-green-100 dark:bg-green-950",
    border: "border-green-300 dark:border-green-900",
  },
  "📌": {
    bg: "bg-blue-100 dark:bg-blue-950",
    border: "border-blue-300 dark:border-blue-900",
  },
  "🔥": {
    bg: "bg-orange-100 dark:bg-orange-950",
    border: "border-orange-400 dark:border-orange-900",
  },
  ℹ️: {
    bg: "bg-blue-100 dark:bg-blue-950",
    border: "border-blue-300 dark:border-blue-900",
  },
};

export function BlockquoteBlock({ content }: { content: string }) {
  const firstLine = content.split("\n")[0];

  /* Find a matching callout emoji in the first line */
  let callout: { bg: string; border: string } | null = null;
  for (const [emoji, styles] of Object.entries(calloutTypes)) {
    if (firstLine.includes(emoji)) {
      callout = styles;
      break;
    }
  }

  if (callout) {
    return (
      <div
        className={`my-3 px-4 py-3 rounded-lg border ${callout.bg} ${callout.border} text-stone-800 dark:text-slate-100`}
      >
        {parseMarkdown(content)}
      </div>
    );
  }

  return (
    <blockquote className="my-3 pl-4 border-l-[3px] border-stone-300 dark:border-slate-700 text-stone-600 dark:text-slate-400">
      {parseMarkdown(content)}
    </blockquote>
  );
}

/* ─── TableBlock ─────────────────────────────────────────────────────────────
   Renders a GFM pipe table. Expects raw markdown lines including the
   separator row so alignment can be derived.                                  */

export function TableBlock({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null;

  const headers = parseTableRow(lines[0]);
  const alignments = parseTableAlignments(lines[1]);
  const rows = lines.slice(2).map(parseTableRow);

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-gray-300 dark:border-slate-700">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-800">
            {headers.map((header, colIdx) => (
              <th
                key={colIdx}
                className={`px-4 py-2.5 font-semibold text-stone-800 dark:text-slate-100 border-b border-gray-300 dark:border-slate-700 ${alignClass(alignments[colIdx])}`}
              >
                {renderInline(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-gray-200 dark:border-slate-700 ${rowIdx % 2 === 0 ? "bg-white dark:bg-slate-900/50" : "bg-gray-50 dark:bg-slate-900/80"} hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors`}
            >
              {headers.map((_, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-4 py-2.5 text-stone-600 dark:text-slate-400 ${alignClass(alignments[colIdx])}`}
                >
                  {renderInline(row[colIdx] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── ListBlock ──────────────────────────────────────────────────────────────
   Parses and renders ordered, unordered, and task lists with arbitrary nesting. */

export function ListBlock({
  lines,
  ordered,
}: {
  lines: string[];
  ordered: boolean;
}) {
  /* Converts flat lines into a nested ListItem tree using an indent-tracking stack */
  function parseItems(ls: string[]): ListItem[] {
    const items: ListItem[] = [];
    const stack: ListItem[] = [];

    for (const line of ls) {
      if (line.trim() === "") continue;

      const unorderedMatch = line.match(/^(\s*)[-*+]\s+(\[[ xX]\]\s+)?(.*)$/);
      const orderedMatch = line.match(/^(\s*)\d+\.\s+(\[[ xX]\]\s+)?(.*)$/);
      const match = unorderedMatch || orderedMatch;

      /* Continuation line — append text to the most recent item */
      if (!match) {
        if (stack.length > 0) stack[stack.length - 1].text += " " + line.trim();
        continue;
      }

      const depth = match[1].length;
      const checkStr = match[2];
      const text = match[3];

      /* Determine checked state: null = not a task item */
      const checked: boolean | null =
        checkStr != null
          ? checkStr.trim().toLowerCase() === "[x]" ||
            checkStr.trim().toLowerCase() === "[x] "
            ? true
            : false
          : null;

      const item: ListItem = { depth, text, checked, children: [] };

      /* Pop stack until we find the correct parent depth */
      while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
        stack.pop();
      }

      if (stack.length === 0) {
        items.push(item);
      } else {
        stack[stack.length - 1].children.push(item);
      }

      stack.push(item);
    }

    return items;
  }

  /* Recursively renders a ListItem tree into <ul>/<ol> elements */
  function renderItems(
    items: ListItem[],
    ord: boolean,
    depth = 0,
  ): React.ReactNode {
    const Tag = ord ? "ol" : "ul";
    return (
      <Tag
        className={`my-1 space-y-0.5 ${depth === 0 ? "my-3" : "mt-1 ml-5"} ${ord ? "list-decimal list-inside" : ""}`}
      >
        {items.map((item, idx) => {
          const isTask = item.checked !== null;
          return (
            <li
              key={idx}
              className={`flex items-start gap-2 leading-7 text-stone-800 dark:text-slate-100 ${!ord && !isTask ? "before:content-['•'] before:text-stone-400 dark:before:text-stone-500 before:mt-0.5 before:shrink-0" : ""}`}
            >
              {/* Checkbox square for task list items */}
              {isTask && (
                <div
                  className={`mt-1.5 w-4 h-4 rounded shrink-0 flex items-center justify-center border-2 transition-colors ${item.checked ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-950"}`}
                >
                  {item.checked && (
                    <CheckIcon
                      size={10}
                      strokeWidth={3}
                      className="text-white"
                    />
                  )}
                </div>
              )}

              <div
                className={`flex-1 ${item.checked ? "line-through text-stone-400 dark:text-stone-500" : ""}`}
              >
                <span>{renderInline(item.text)}</span>
                {item.children.length > 0 &&
                  renderItems(item.children, ord, depth + 1)}
              </div>
            </li>
          );
        })}
      </Tag>
    );
  }

  return <div>{renderItems(parseItems(lines), ordered)}</div>;
}

/* ─── DetailsBlock ───────────────────────────────────────────────────────────
   Collapsible accordion. The chevron rotates via CSS class toggle and the
   content panel expands with a CSS max-height transition.                     */

export function DetailsBlock({
  summary,
  content,
}: {
  summary: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-3 border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden">
      {/* Toggle button — aria-expanded conveys state to assistive technology */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 px-4 py-3 text-left bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      >
        {/* Chevron rotates 90° when the panel is open via the .chevron-open CSS class */}
        <span
          className={`details-chevron ${open ? "details-chevron--open" : ""}`}
        >
          <ChevronRightIcon
            size={14}
            className="text-stone-400 dark:text-stone-500"
          />
        </span>

        <span className="text-sm font-medium text-stone-800 dark:text-slate-100">
          {renderInline(summary)}
        </span>
      </button>

      {/* Content panel — max-height animates between 0 and a large value via CSS */}
      <div className={`details-panel ${open ? "details-panel--open" : ""}`}>
        <div className="px-4 py-3 text-sm text-stone-800 dark:text-slate-100">
          {parseMarkdown(content)}
        </div>
      </div>
    </div>
  );
}
