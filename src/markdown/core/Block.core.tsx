/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { renderInline } from "../main/Render.inline.main";
import { parseMarkdown } from "../Markdown";
import { type ListItem } from "../types/Block.types";
import {
  alignClass,
  parseTableRow,
  parseTableAlignments,
} from "../utils/Block.util";
import { HashIcon, ChevronRightIcon, CheckIcon } from "../icons/Block.icons";
import "../styles/Block.style.css";
import { type JSX } from "react/jsx-dev-runtime";

/* Maps H1–H6 level numbers to plain CSS class names.
   Each class is defined in Block.style.css.                                 */
export const headingSizeMap: Record<number, string> = {
  1: "heading-h1",
  2: "heading-h2",
  3: "heading-h3",
  4: "heading-h4",
  5: "heading-h5",
  6: "heading-h6",
};

/* ─── HeadingBlock ───────────────────────────────────────────────────────────
   Renders H1–H6 with a hash anchor link that fades in on hover via CSS.    */

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
    <Tag id={id} className={`heading-block ${headingSizeMap[level]}`}>
      {/* Anchor link — visibility controlled by .heading-block:hover .heading-anchor in CSS */}
      <a href={`#${id}`} className="heading-anchor">
        <HashIcon size={14} />
      </a>
      {renderInline(text)}
    </Tag>
  );
}

/* ─── BlockquoteBlock ────────────────────────────────────────────────────────
   Renders a coloured callout card when the first line contains a recognised
   emoji, otherwise renders a standard left-bordered blockquote.            */

const calloutTypes: Record<string, string> = {
  "💡": "blockquote-callout blockquote-callout--tip",
  "⚠️": "blockquote-callout blockquote-callout--warning",
  "❌": "blockquote-callout blockquote-callout--error",
  "✅": "blockquote-callout blockquote-callout--success",
  "📌": "blockquote-callout blockquote-callout--pin",
  "🔥": "blockquote-callout blockquote-callout--fire",
  ℹ️: "blockquote-callout blockquote-callout--info",
};

export function BlockquoteBlock({ content }: { content: string }) {
  const firstLine = content.split("\n")[0];

  /* Find a matching callout emoji in the first line */
  let calloutClass: string | null = null;
  for (const [emoji, cls] of Object.entries(calloutTypes)) {
    if (firstLine.includes(emoji)) {
      calloutClass = cls;
      break;
    }
  }

  if (calloutClass) {
    return <div className={calloutClass}>{parseMarkdown(content)}</div>;
  }

  return (
    <blockquote className="blockquote-standard">
      {parseMarkdown(content)}
    </blockquote>
  );
}

/* ─── TableBlock ─────────────────────────────────────────────────────────────
   Renders a GFM pipe table. Expects raw markdown lines including the
   separator row so alignment can be derived.                                */

export function TableBlock({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null;

  const headers = parseTableRow(lines[0]);
  const alignments = parseTableAlignments(lines[1]);
  const rows = lines.slice(2).map(parseTableRow);

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {headers.map((header, colIdx) => (
              <th key={colIdx} className={alignClass(alignments[colIdx])}>
                {renderInline(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {headers.map((_, colIdx) => (
                <td key={colIdx} className={alignClass(alignments[colIdx])}>
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
      <Tag className={depth === 0 ? "list-root" : "list-nested"}>
        {items.map((item, idx) => {
          const isTask = item.checked !== null;
          return (
            <li
              key={idx}
              className={`list-item${!ord && !isTask ? " list-item--bullet" : ""}`}
            >
              {/* Checkbox square for task list items */}
              {isTask && (
                <div
                  className={`task-checkbox ${item.checked ? "task-checkbox--checked" : "task-checkbox--unchecked"}`}
                >
                  {item.checked && (
                    <CheckIcon
                      size={10}
                      strokeWidth={3}
                      className="task-checkbox__icon"
                    />
                  )}
                </div>
              )}
              <div
                className={`list-item__content${item.checked ? " list-item__content--checked" : ""}`}
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
   Collapsible accordion. Chevron rotates and panel expands via CSS classes. */

export function DetailsBlock({
  summary,
  content,
}: {
  summary: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="details-wrapper">
      {/* Toggle button — aria-expanded conveys state to assistive technology */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="details-toggle"
      >
        {/* Chevron rotates 90° when open via .details-chevron--open CSS class */}
        <span
          className={`details-chevron ${open ? "details-chevron--open" : ""}`}
        >
          <ChevronRightIcon size={14} className="details-chevron-icon" />
        </span>
        <span className="details-summary-text">{renderInline(summary)}</span>
      </button>

      {/* Content panel — max-height animates between 0 and full via CSS */}
      <div className={`details-panel ${open ? "details-panel--open" : ""}`}>
        <div className="details-panel__inner">{parseMarkdown(content)}</div>
      </div>
    </div>
  );
}
