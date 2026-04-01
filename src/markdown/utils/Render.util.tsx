/* Named HTML entity → decoded character map.
   Used by the entity pattern handler in the inline renderer.               */
export const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  copy: "©",
  reg: "®",
  trade: "™",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  nbsp: "\u00A0",
};
