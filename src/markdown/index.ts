export interface ListItem {
  depth: number;
  text: string;
  checked: boolean | null;
  children: ListItem[];
}

export interface CodeBlockProps {
  code: string;
  language: string;
}

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export type FootnoteMap = Record<string, string>;

export interface ReferenceLink {
  href: string;
  title?: string;
}

export type ReferenceLinkMap = Record<string, ReferenceLink>;

import React from "react";

export type InlinePattern = [
  RegExp,
  (match: RegExpMatchArray) => React.ReactNode,
];

export interface EarliestMatch {
  index: number;
  match: RegExpMatchArray;
  node: React.ReactNode;
}

export interface TocItem {
  level: number;
  text: string;
  id: string;
}
