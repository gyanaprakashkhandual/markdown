import React from "react";
import { CodeBlock } from "../components/Code.block.component";
import { renderInline } from "../components/Render.inline.component";
import {
  HeadingBlock,
  BlockquoteBlock,
  TableBlock,
  ListBlock,
  DetailsBlock,
} from "../core/Block.core";
import { slugify } from "../utils/Table.util";
import { type FootnoteMap, type ReferenceLinkMap } from "../types/Parse.types";
import "./Parse.css";

export function parseMarkdown(markdown: string): React.ReactNode[] {
  const lines = markdown.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let nodeKey = 0;
  const nk = () => nodeKey++;

  /* Pre-scan all lines to collect footnote and reference-link definitions.
     These are stripped from output during the main loop.                   */
  const footnotes: FootnoteMap = {};
  const referenceLinks: ReferenceLinkMap = {};

  for (const line of lines) {
    const fn = line.match(/^\[\^(\w+)\]:\s*(.+)/);
    if (fn) footnotes[fn[1]] = fn[2];
    const rl = line.match(/^\[(\w+)\]:\s*(\S+)(?:\s+"([^"]*)")?/);
    if (rl) referenceLinks[rl[1]] = { href: rl[2], title: rl[3] };
  }

  while (i < lines.length) {
    const line = lines[i];

    /* Skip footnote definition lines — already collected above */
    if (/^\[\^[\w]+\]:/.test(line) || /^\[[\w]+\]:/.test(line)) {
      i++;
      continue;
    }

    /* Skip abbreviation definition lines — *[abbr]: expansion */
    if (/^\*\[.+\]:/.test(line)) {
      i++;
      continue;
    }

    /* <details> / <summary> accordion block */
    if (line.trim().startsWith("<details>")) {
      const contentLines: string[] = [];
      let summaryText = "";
      i++;
      if (lines[i]?.trim().startsWith("<summary>")) {
        summaryText = lines[i].replace(/<\/?summary>/g, "").trim();
        i++;
      }
      while (i < lines.length && !lines[i].trim().startsWith("</details>")) {
        contentLines.push(lines[i]);
        i++;
      }
      i++;
      nodes.push(
        <DetailsBlock
          key={nk()}
          summary={summaryText}
          content={contentLines.join("\n")}
        />,
      );
      continue;
    }

    /* Fenced code block — ``` or ~~~ with optional language tag */
    const fenceMatch = line.match(/^(`{3,}|~{3,})([\w-]*)/);
    if (fenceMatch) {
      const fence = fenceMatch[1];
      const lang = fenceMatch[2] || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(fence)) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      nodes.push(
        <CodeBlock key={nk()} code={codeLines.join("\n")} language={lang} />,
      );
      continue;
    }

    /* Thematic break — ---, ***, or ___ */
    if (/^(\s*[-*_]){3,}\s*$/.test(line)) {
      nodes.push(<hr key={nk()} className="pm-hr" />);
      i++;
      continue;
    }

    /* ATX heading — # through ###### */
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = slugify(text.replace(/[*_`]/g, ""));
      nodes.push(<HeadingBlock key={nk()} level={level} text={text} id={id} />);
      i++;
      continue;
    }

    /* Setext heading — underline with === (H1) or --- (H2) */
    if (i + 1 < lines.length) {
      if (/^={3,}\s*$/.test(lines[i + 1]) && line.trim()) {
        const id = slugify(line.replace(/[*_`]/g, ""));
        nodes.push(<HeadingBlock key={nk()} level={1} text={line} id={id} />);
        i += 2;
        continue;
      }
      if (
        /^-{3,}\s*$/.test(lines[i + 1]) &&
        line.trim() &&
        !/^\s*[-*+]/.test(line)
      ) {
        const id = slugify(line.replace(/[*_`]/g, ""));
        nodes.push(<HeadingBlock key={nk()} level={2} text={line} id={id} />);
        i += 2;
        continue;
      }
    }

    /* Blockquote — lines starting with > */
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith(">") || lines[i].trim() === "")
      ) {
        if (lines[i].startsWith(">")) quoteLines.push(lines[i]);
        else if (quoteLines.length > 0) quoteLines.push("");
        i++;
      }
      const content = quoteLines.map((l) => l.replace(/^>\s?/, "")).join("\n");
      nodes.push(<BlockquoteBlock key={nk()} content={content} />);
      continue;
    }

    /* GFM pipe table — detected by | in current line and separator in next */
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      /^\|?[\s:|-]+\|/.test(lines[i + 1])
    ) {
      const tableLines: string[] = [line];
      i++;
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      nodes.push(<TableBlock key={nk()} lines={tableLines} />);
      continue;
    }

    /* Unordered list — lines starting with -, *, or + */
    if (/^(\s*)[-*+]\s/.test(line)) {
      const listLines: string[] = [];
      while (
        i < lines.length &&
        (/^(\s*)[-*+]\s/.test(lines[i]) ||
          /^\s{2,}/.test(lines[i]) ||
          lines[i].trim() === "")
      ) {
        if (lines[i].trim() !== "" || listLines.length > 0)
          listLines.push(lines[i]);
        i++;
      }
      nodes.push(<ListBlock key={nk()} lines={listLines} ordered={false} />);
      continue;
    }

    /* Ordered list — lines starting with a number and dot */
    if (/^(\s*)\d+\.\s/.test(line)) {
      const listLines: string[] = [];
      while (
        i < lines.length &&
        (/^\s*\d+\.\s/.test(lines[i]) ||
          /^\s{3,}/.test(lines[i]) ||
          lines[i].trim() === "")
      ) {
        if (lines[i].trim() !== "" || listLines.length > 0)
          listLines.push(lines[i]);
        i++;
      }
      nodes.push(<ListBlock key={nk()} lines={listLines} ordered={true} />);
      continue;
    }

    /* Definition list — term followed by one or more ": definition" lines */
    if (i + 1 < lines.length && lines[i + 1].match(/^:\s+/)) {
      const term = line.trim();
      const defs: string[] = [];
      i++;
      while (i < lines.length && lines[i].match(/^:\s+/)) {
        defs.push(lines[i].replace(/^:\s+/, ""));
        i++;
      }
      nodes.push(
        <dl key={nk()} className="pm-dl">
          <dt className="pm-dt">{renderInline(term)}</dt>
          {defs.map((d, di) => (
            <dd key={di} className="pm-dd">
              {renderInline(d)}
            </dd>
          ))}
        </dl>,
      );
      continue;
    }

    /* Skip blank lines */
    if (line.trim() === "") {
      i++;
      continue;
    }

    /* Paragraph — consume consecutive non-special lines */
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^#{1,6}\s/) &&
      !lines[i].match(/^(`{3,}|~{3,})/) &&
      !lines[i].startsWith(">") &&
      !/^(\s*[-*+]|\d+\.)\s/.test(lines[i]) &&
      !/^(\s*[-*_]){3,}\s*$/.test(lines[i]) &&
      !lines[i].includes("|") &&
      !lines[i].trim().startsWith("<details>") &&
      !lines[i].match(/^\[\^[\w]+\]:/) &&
      !lines[i].match(/^\[[\w]+\]:/) &&
      !lines[i].match(/^\*\[/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      /* Two trailing spaces before a newline produce a <br> */
      const paraText = paraLines.join("\n").replace(/ {2}\n/g, "\n");
      const segments = paraText.split(/\n/);
      nodes.push(
        <p key={nk()} className="pm-p">
          {segments.map((seg, si) => (
            <React.Fragment key={si}>
              {renderInline(seg)}
              {si < segments.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>,
      );
    }
  }

  /* Footnotes section — rendered at the end when definitions were found */
  if (Object.keys(footnotes).length > 0) {
    nodes.push(
      <div key={nk()} className="pm-footnotes">
        <p className="pm-footnotes-label">Footnotes</p>
        <ol className="pm-footnotes-list">
          {Object.entries(footnotes).map(([ref, text]) => (
            <li key={ref} id={`fn-${ref}`} className="pm-footnotes-item">
              {renderInline(text)}
            </li>
          ))}
        </ol>
      </div>,
    );
  }

  return nodes;
}
