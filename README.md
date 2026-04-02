# write-markdown

A React library that renders raw Markdown content into a clean, beautiful UI. Drop it into any React or Next.js project and display `.md` files without writing a single line of parsing logic.

**NPM:** [@gyanaprakashkhandual/usemarkdown](https://www.npmjs.com/package/usemarkdown)  
**Repository:** [github.com/gyanaprakashkhandual/markdown](https://github.com/gyanaprakashkhandual/markdown)

---

## Installation

```bash
npm install @gyanaprakashkhandual/usemarkdown
```

---

## Usage

```tsx
import Markdown from "@gyanaprakashkhandual/usemarkdown";
import content from "./README.md?raw";

export default function App() {
  return <Markdown content={content} />;
}
```

Pass any raw Markdown string to the `content` prop. The component handles the rest.

---

## Props

| Prop      | Type     | Required | Description                   |
| --------- | -------- | -------- | ----------------------------- |
| `content` | `string` | Yes      | Raw Markdown string to render |

---

## Features

- Renders headings, paragraphs, lists, blockquotes, tables, and code blocks
- Syntax highlighting for code
- Clean, minimal default styling
- TypeScript support out of the box
- Works with React 19 and Next.js

---

## Development

```bash
git clone https://github.com/gyanaprakashkhandual/markdown.git
cd markdown
npm install
npm run dev
```

To build the library:

```bash
npm run build
```

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

---

## License

MIT — see [LICENSE](./LICENSE) for details.
