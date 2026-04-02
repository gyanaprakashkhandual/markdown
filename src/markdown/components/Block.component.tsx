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
    <Tag id={id} className={`heading-block ${headingSizeMap[level]}`}>
      <a href={`#${id}`} className="heading-anchor">
        <HashIcon size={14} />
      </a>
      {renderInline(text)}
    </Tag>
  );
}

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

  let callout: { bg: string; border: string } | null = null;
  for (const [emoji, styles] of Object.entries(calloutTypes)) {
    if (firstLine.includes(emoji)) {
      callout = styles;
      break;
    }
  }

  if (callout) {
    return (
      <div className={`${callout.bg} ${callout.border}`}>
        {parseMarkdown(content)}
      </div>
    );
  }

  return <blockquote>{parseMarkdown(content)}</blockquote>;
}

export function TableBlock({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null;

  const headers = parseTableRow(lines[0]);
  const alignments = parseTableAlignments(lines[1]);
  const rows = lines.slice(2).map(parseTableRow);

  return (
    <div>
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

export function ListBlock({
  lines,
  ordered,
}: {
  lines: string[];
  ordered: boolean;
}) {
  function parseItems(ls: string[]): ListItem[] {
    const items: ListItem[] = [];
    const stack: ListItem[] = [];

    for (const line of ls) {
      if (line.trim() === "") continue;

      const unorderedMatch = line.match(/^(\s*)[-*+]\s+(\[[ xX]\]\s+)?(.*)$/);
      const orderedMatch = line.match(/^(\s*)\d+\.\s+(\[[ xX]\]\s+)?(.*)$/);
      const match = unorderedMatch || orderedMatch;

      if (!match) {
        if (stack.length > 0) stack[stack.length - 1].text += " " + line.trim();
        continue;
      }

      const depth = match[1].length;
      const checkStr = match[2];
      const text = match[3];

      const checked: boolean | null =
        checkStr != null
          ? checkStr.trim().toLowerCase() === "[x]" ||
            checkStr.trim().toLowerCase() === "[x] "
            ? true
            : false
          : null;

      const item: ListItem = { depth, text, checked, children: [] };

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

  function renderItems(
    items: ListItem[],
    ord: boolean,
    depth = 0,
  ): React.ReactNode {
    const Tag = ord ? "ol" : "ul";
    return (
      <Tag>
        {items.map((item, idx) => {
          const isTask = item.checked !== null;
          return (
            <li key={idx}>
              {isTask && (
                <div>
                  {item.checked && <CheckIcon size={10} strokeWidth={3} />}
                </div>
              )}

              <div>
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

export function DetailsBlock({
  summary,
  content,
}: {
  summary: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <span
          className={`details-chevron ${open ? "details-chevron--open" : ""}`}
        >
          <ChevronRightIcon size={14} />
        </span>

        <span>{renderInline(summary)}</span>
      </button>

      <div className={`details-panel ${open ? "details-panel--open" : ""}`}>
        <div>{parseMarkdown(content)}</div>
      </div>
    </div>
  );
}
