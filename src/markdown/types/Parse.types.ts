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
