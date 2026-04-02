/* eslint-disable react-refresh/only-export-components */
import { useMemo } from "react";
import { parseMarkdown } from "./components/Parse.markdown.component";
import { TableOfContents } from "./components/TableOfTopic.component";
import { type MarkdownRendererProps } from "./types/Markdown.render.types";
import "./main.css";

export default function Markdown({
  content,
  className = "",
}: MarkdownRendererProps) {
  const nodes = useMemo(() => parseMarkdown(content), [content]);

  return (
    <>
      <TableOfContents content={content} />
      <article className={`md-article ${className}`}>{nodes}</article>
    </>
  );
}

export { parseMarkdown } from "./components/Parse.markdown.component";
export { renderInline } from "./components/Render.inline.component";
export { CodeBlock } from "./components/Code.block.component";
export { TableOfContents } from "./components/TableOfTopic.component";
export {
  HeadingBlock,
  BlockquoteBlock,
  TableBlock,
  ListBlock,
  DetailsBlock,
} from "./components/Block.component";
export * from "./index";
export { slugify } from "./utils/Table.util";
export { syntaxHighlight } from "./utils/Code.block.util";
export { getLangIcon } from "./utils/Lang.icon.util";