/* Represents a single heading extracted from markdown content */
export interface TocItem {
  /* Heading level 1–6 matching the number of # characters */
  level: number;

  /* Plain text of the heading with markdown syntax stripped */
  text: string;

  /* URL-safe slug derived from the heading text */
  id: string;
}
