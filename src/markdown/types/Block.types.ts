/* Represents a single item in an ordered or unordered list, including task lists.
   Children allow arbitrarily nested sub-lists at any depth. */
export interface ListItem {
  /* Raw indentation depth in characters — used to determine nesting level */
  depth: number;

  /* Inline markdown text content of the list item */
  text: string;

  /* null = regular item, true = checked task, false = unchecked task */
  checked: boolean | null;

  /* Nested child items parsed from deeper-indented lines */
  children: ListItem[];
}
