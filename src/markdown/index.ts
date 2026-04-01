/* Represents a single item in an ordered or unordered list, including task lists.
   Children allow arbitrarily nested sub-lists at any depth. */
export interface ListItem {
  /* Raw indentation depth in characters — used to determine nesting level */
  depth: number;

  /* Inline markdown text content of the list item */
  text: string;

  /* null = regular item, true = checked task, false = unchecked task */
  checked: boolean | null;

  /* Nested child items parsed from deeper-indented lines */
  children: ListItem[];
}
/* Props accepted by the CodeBlock component */
export interface CodeBlockProps {
  /* Raw source code string to display */
  code: string;

  /* Language identifier used for syntax highlighting and the lang label */
  language: string;
}
export interface MarkdownRendererProps {
  content: string;
  className?: string;
}
/* Parsed footnote definitions keyed by their reference id.
   Example: [^1]: Some footnote text  →  { "1": "Some footnote text" }     */
export type FootnoteMap = Record<string, string>;

/* Parsed reference-link definitions keyed by their label.
   Example: [label]: https://example.com "title"                            */
export interface ReferenceLink {
  href: string;
  title?: string;
}

export type ReferenceLinkMap = Record<string, ReferenceLink>;
import React from "react";

/* A single pattern entry: regex to match + factory that returns a React node */
export type InlinePattern = [
  RegExp,
  (match: RegExpMatchArray) => React.ReactNode,
];

/* Tracks the earliest regex match found during a scan of remaining text */
export interface EarliestMatch {
  index: number;
  match: RegExpMatchArray;
  node: React.ReactNode;
}
/* Represents a single heading extracted from markdown content */
export interface TocItem {
  /* Heading level 1–6 matching the number of # characters */
  level: number;

  /* Plain text of the heading with markdown syntax stripped */
  text: string;

  /* URL-safe slug derived from the heading text */
  id: string;
}
