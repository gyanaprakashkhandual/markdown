import Markdown from "./markdown/Markdown";

const content = `# Getting Started with TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Why TypeScript?

TypeScript adds optional static typing and class-based object-oriented programming to the language. Here are the key benefits:

- **Type Safety** — catch errors at compile time, not runtime
- **Better IDE Support** — rich autocomplete, refactoring, and navigation
- **Scalability** — easier to maintain large codebases
- **Interoperability** — works with existing JavaScript code

## Installation

\`\`\`bash
npm install -g typescript
tsc --version
\`\`\`

## Basic Types

\`\`\`typescript
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let scores: number[] = [98, 87, 95];
let tuple: [string, number] = ["hello", 42];
\`\`\`

## Interfaces

Interfaces define the shape of an object:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  role?: "admin" | "viewer";
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

## Generics

Generics allow you to write reusable, type-safe code:

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>("TypeScript");
\`\`\`

## Async / Await

\`\`\`typescript
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data: User = await response.json();
  return data;
}
\`\`\`

## Type Utilities

TypeScript ships with powerful built-in utility types:

| Utility | Description |
|---------|-------------|
| \`Partial<T>\` | Makes all properties optional |
| \`Required<T>\` | Makes all properties required |
| \`Readonly<T>\` | Makes all properties read-only |
| \`Pick<T, K>\` | Picks a subset of properties |
| \`Omit<T, K>\` | Omits a subset of properties |

## Enums

\`\`\`typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

const move = (dir: Direction) => console.log(dir);
move(Direction.Up);
\`\`\`

## Summary

> TypeScript is not a replacement for JavaScript — it's a superset that compiles down to plain JavaScript. You can adopt it incrementally in any existing project.

Start small, add types where they help most, and let the compiler guide you toward safer, more maintainable code.
`;

export default function App() {
  return (
    <div>
      <Markdown content={content} />
    </div>
  );
}
