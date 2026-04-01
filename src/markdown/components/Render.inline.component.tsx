import React from "react";
import { ExternalLinkIcon } from "./Render.icons";
import { HTML_ENTITIES } from "./Render.util";
import { type InlinePattern, type EarliestMatch } from "./Render.types";
import "./Render.css";

export function renderInline(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  /* Ordered list of inline patterns. Each entry is [regex, render factory].
     Patterns are tested left-to-right; the earliest match in the remaining
     string wins on each iteration.                                          */
  const patterns: InlinePattern[] = [

    /* Inline code — `code` */
    [
      /`([^`]+)`/,
      (m) => <code key={key++} className="ri-code">{m[1]}</code>,
    ],

    /* Bold + italic combined — ***text*** or ___text___ */
    [
      /\*\*\*(.+?)\*\*\*/,
      (m) => <strong key={key++}><em>{renderInline(m[1])}</em></strong>,
    ],

    /* Bold — **text** */
    [
      /\*\*(.+?)\*\*/,
      (m) => <strong key={key++} className="ri-bold">{renderInline(m[1])}</strong>,
    ],

    /* Italic — *text* */
    [
      /\*(.+?)\*/,
      (m) => <em key={key++} className="ri-italic">{renderInline(m[1])}</em>,
    ],

    /* Bold + italic combined — ___text___ */
    [
      /___(.+?)___/,
      (m) => <strong key={key++}><em>{renderInline(m[1])}</em></strong>,
    ],

    /* Bold — __text__ */
    [
      /__(.+?)__/,
      (m) => <strong key={key++} className="ri-bold">{renderInline(m[1])}</strong>,
    ],

    /* Italic — _text_ */
    [
      /_(.+?)_/,
      (m) => <em key={key++}>{renderInline(m[1])}</em>,
    ],

    /* Strikethrough — ~~text~~ */
    [
      /~~(.+?)~~/,
      (m) => <del key={key++} className="ri-del">{renderInline(m[1])}</del>,
    ],

    /* Highlight — ==text== */
    [
      /==(.+?)==/,
      (m) => <mark key={key++} className="ri-mark">{m[1]}</mark>,
    ],

    /* Superscript — ^text^ */
    [
      /\^(.+?)\^/,
      (m) => <sup key={key++} className="ri-sup">{m[1]}</sup>,
    ],

    /* Subscript — ~text~ */
    [
      /~(.+?)~/,
      (m) => <sub key={key++} className="ri-sub">{m[1]}</sub>,
    ],

    /* Keyboard key — <kbd>key</kbd> */
    [
      /<kbd>(.+?)<\/kbd>/,
      (m) => <kbd key={key++} className="ri-kbd">{m[1]}</kbd>,
    ],

    /* Inline image — ![alt](src) */
    [
      /!\[([^\]]*)\]\(([^)]+)\)/,
      (m) => (
        <span key={key++} className="ri-img-wrap">
          <img src={m[2]} alt={m[1]} className="ri-img" />
          {m[1] && (
            <span className="ri-img-caption">{m[1]}</span>
          )}
        </span>
      ),
    ],

    /* Inline link — [text](href "optional title") */
    [
      /\[([^\]]+)\]\(([^)"]+)(?:\s+"([^"]*)")?\)/,
      (m) => (
        <a
          key={key++}
          href={m[2]}
          title={m[3]}
          target={m[2].startsWith("http") ? "_blank" : undefined}
          rel={m[2].startsWith("http") ? "noopener noreferrer" : undefined}
          className="ri-link"
        >
          {m[1]}
          {m[2].startsWith("http") && (
            <ExternalLinkIcon size={11} className="ri-link-icon" />
          )}
        </a>
      ),
    ],

    /* Reference-style link — [text][ref] */
    [
      /\[([^\]]+)\]\[([^\]]*)\]/,
      (m) => (
        <span key={key++} className="ri-ref-link">{m[1]}</span>
      ),
    ],

    /* Footnote reference — [^id] */
    [
      /\[\^(\w+)\]/,
      (m) => (
        <sup key={key++}>
          <a href={`#fn-${m[1]}`} className="ri-footnote">[{m[1]}]</a>
        </sup>
      ),
    ],

    /* Bare URL — https?://... (not already inside a link bracket) */
    [
      /(?<!\[)(https?:\/\/[^\s<>"]+)/,
      (m) => (
        <a
          key={key++}
          href={m[1]}
          target="_blank"
          rel="noopener noreferrer"
          className="ri-url"
        >
          {m[1]}
          <ExternalLinkIcon size={11} className="ri-url-icon" />
        </a>
      ),
    ],

    /* Named HTML entities — &amp; &lt; &copy; etc. */
    [
      /&(amp|lt|gt|quot|copy|reg|trade|mdash|ndash|hellip|nbsp);/,
      (m) => <span key={key++}>{HTML_ENTITIES[m[1]] || m[0]}</span>,
    ],
  ];

  /* Scan remaining text, find the earliest matching pattern, emit any plain
     text before it, emit the matched node, then advance past the match.     */
  while (remaining.length > 0) {
    let earliest: EarliestMatch | null = null;

    for (const [pattern, render] of patterns) {
      const match = remaining.match(pattern);
      if (match && match.index !== undefined) {
        if (!earliest || match.index < earliest.index) {
          earliest = { index: match.index, match, node: render(match) };
        }
      }
    }

    /* No pattern matched — push the rest as a plain text string and stop */
    if (!earliest) {
      result.push(remaining);
      break;
    }

    /* Emit any plain text that precedes the match */
    if (earliest.index > 0) {
      result.push(remaining.slice(0, earliest.index));
    }

    result.push(earliest.node);
    remaining = remaining.slice(earliest.index + earliest.match[0].length);
  }

  return result;
}