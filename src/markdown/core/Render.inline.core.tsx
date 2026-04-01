/* ─── Render.main.tsx ────────────────────────────────────────────────────────
   Barrel file. Import anything inline-renderer related from here.           */

/* Core renderer */
export { renderInline } from "./Render.inline";

/* Types */
export type { InlinePattern, EarliestMatch } from "./Render.types";

/* Utilities */
export { HTML_ENTITIES } from "./Render.util";

/* Icons */
export { ExternalLinkIcon } from "./Render.icons";