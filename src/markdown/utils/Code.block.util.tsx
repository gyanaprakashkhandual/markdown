/* Converts HTML-escaped entities back to their raw characters.
   Required before splitting code into lines so entity sequences like
   &lt; are not counted as multiple characters by the highlighter.   */
export function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
