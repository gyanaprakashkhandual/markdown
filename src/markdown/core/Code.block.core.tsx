/* eslint-disable react-refresh/only-export-components */
/* ─── CodeBlock.main.tsx ─────────────────────────────────────────────────────
   Barrel file. Import anything CodeBlock-related from here instead of
   reaching into individual files directly.                                   */

/* Types */
export type { CodeBlockProps } from "../types/Code.block.types";

/* Utilities */
export { decodeHtmlEntities } from "../utils/Code.block.util";

/* Icons */
export { CopyIcon, CheckIcon } from "../icons/Code.block.icons";
