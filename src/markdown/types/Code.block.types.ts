/* Props accepted by the CodeBlock component */
export interface CodeBlockProps {
  /* Raw source code string to display */
  code: string;

  /* Language identifier used for syntax highlighting and the lang label */
  language: string;
}
