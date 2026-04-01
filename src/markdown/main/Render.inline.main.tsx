/* eslint-disable react-refresh/only-export-components */
/* ─── Render.main.tsx ────────────────────────────────────────────────────────
   Barrel file. Import anything inline-renderer related from here.           */

/* Core renderer */
export { renderInline } from "../core/Render.inline.core";

/* Types */
export type { InlinePattern, EarliestMatch } from "../types/Render.types";

/* Utilities */
export { HTML_ENTITIES } from "../utils/Render.util";

/* Icons */
export { ExternalLinkIcon } from "../icons/Render.inline.icons";
