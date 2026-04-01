/* Maps a GFM table alignment cell (e.g. ":---:", "---:", ":---") to a Tailwind class */
export function alignClass(alignment: string): string {
  if (alignment === "center") return "text-center";
  if (alignment === "right") return "text-right";
  return "text-left";
}

/* Strips leading/trailing pipe characters then splits on "|" to extract cell strings */
export function parseTableRow(line: string): string[] {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

/* Reads a GFM separator row and returns the alignment for each column */
export type ColumnAlignment = "left" | "center" | "right" | "none";

export function parseTableAlignments(line: string): ColumnAlignment[] {
  return parseTableRow(line).map((cell) => {
    if (/^:-+:$/.test(cell)) return "center";
    if (/^-+:$/.test(cell)) return "right";
    if (/^:-+$/.test(cell)) return "left";
    return "none";
  });
}
