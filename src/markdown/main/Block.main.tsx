/* eslint-disable react-refresh/only-export-components */
/* ─── Block.main.tsx ─────────────────────────────────────────────────────────
   Central barrel file. Import anything block-related from this single entry
   point instead of reaching into individual files directly.                  */

/* Components */
export {
  HeadingBlock,
  BlockquoteBlock,
  TableBlock,
  ListBlock,
  DetailsBlock,
} from "../components/Block.component";

/* Types */
export type { ListItem } from "../types/Block.types";

/* Utility functions */
export {
  alignClass,
  parseTableRow,
  parseTableAlignments,
} from "../utils/Block.util";

export type { ColumnAlignment } from "../utils/Block.util";

/* Heading size map */
export { headingSizeMap } from "../core/Block.core";

/* Icons */
export { HashIcon, ChevronRightIcon, CheckIcon } from "../icons/Block.icons";
