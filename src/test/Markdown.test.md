# The Developer's Handbook

A concise reference covering the tools, patterns, and practices every modern developer should know.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [Data Structures](#data-structures)
- [Code Examples](#code-examples)
- [Media](#media)
- [Resources](#resources)

---

## Getting Started

> 💡 **Tip:** Always read the documentation before diving into code. A few minutes of reading can save hours of debugging.

Welcome to the handbook. This document covers everything from basic setup to advanced patterns used in production systems.

### Prerequisites

Before you begin, make sure you have the following installed:

- [x] Node.js `v20+`
- [x] Git `v2.40+`
- [ ] Docker _(optional but recommended)_
- [ ] A configured `.env` file

---

## Core Concepts

### What is a REST API?

A **REST API** (Representational State Transfer) is an architectural style for building web services. It relies on stateless communication over HTTP using standard methods.

> ⚠️ **Warning:** Never expose secret keys in client-side code. Use environment variables and server-side proxies.

### HTTP Methods

| Method   | Action           | Idempotent | Safe |
| -------- | ---------------- | ---------- | ---- |
| `GET`    | Read resource    | ✅         | ✅   |
| `POST`   | Create resource  | ❌         | ❌   |
| `PUT`    | Replace resource | ✅         | ❌   |
| `PATCH`  | Update resource  | ✅         | ❌   |
| `DELETE` | Remove resource  | ✅         | ❌   |

### Status Codes

| Code  | Meaning               | Category     |
| ----- | --------------------- | ------------ |
| `200` | OK                    | Success      |
| `201` | Created               | Success      |
| `400` | Bad Request           | Client Error |
| `401` | Unauthorized          | Client Error |
| `404` | Not Found             | Client Error |
| `500` | Internal Server Error | Server Error |

---

## Data Structures

### Comparison Table

| Structure   | Access   | Search   | Insert   | Delete   | Use Case                  |
| ----------- | -------- | -------- | -------- | -------- | ------------------------- |
| Array       | O(1)     | O(n)     | O(n)     | O(n)     | Ordered lists             |
| Hash Map    | O(1)     | O(1)     | O(1)     | O(1)     | Key-value lookups         |
| Linked List | O(n)     | O(n)     | O(1)     | O(1)     | Frequent insert/delete    |
| Binary Tree | O(log n) | O(log n) | O(log n) | O(log n) | Sorted data, search trees |
| Graph       | O(1)     | O(V+E)   | O(1)     | O(V+E)   | Networks, relationships   |

---

## Code Examples

### JavaScript — Fetch with Error Handling

```javascript
async function fetchUser(id) {
  try {
    const res = await fetch(`https://api.example.com/users/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    throw err;
  }
}
```

### TypeScript — Generic API Response Type

```typescript
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
  timestamp: string;
};

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

async function getUser(id: number): Promise<ApiResponse<User>> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```

### Bash — Project Setup Script

```bash
#!/bin/bash

echo "Setting up project..."

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

echo "✅ Setup complete. Run 'npm run dev' to start."
```

### Python — Simple HTTP Server

```python
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        payload = {"status": "ok", "message": "Hello, world!"}
        self.wfile.write(json.dumps(payload).encode())

if __name__ == "__main__":
    server = HTTPServer(("localhost", 8080), Handler)
    print("Server running at http://localhost:8080")
    server.serve_forever()
```

---

## Collapsible Sections

<details>
<summary>Advanced Git Commands</summary>

### Rebase workflow

```bash
# Interactive rebase — squash last 3 commits
git rebase -i HEAD~3

# Rebase onto main
git fetch origin
git rebase origin/main
```

### Stashing changes

```bash
git stash push -m "WIP: feature/auth"
git stash list
git stash pop
```

</details>

<details>
<summary>Environment Variable Reference</summary>

| Variable       | Required | Default | Description                |
| -------------- | -------- | ------- | -------------------------- |
| `PORT`         | No       | `3000`  | HTTP server port           |
| `DATABASE_URL` | Yes      | —       | Postgres connection string |
| `JWT_SECRET`   | Yes      | —       | Token signing secret       |
| `LOG_LEVEL`    | No       | `info`  | Logging verbosity          |
| `REDIS_URL`    | No       | —       | Cache layer connection     |

</details>

---

## Media

### Image

![A beautiful placeholder landscape](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)

_Figure 1 — A mountain landscape used as a placeholder image._

### Video

<video
src="https://www.w3schools.com/html/mov_bbb.mp4"
controls
width="100%"
style="border-radius: 0.5rem; margin-top: 0.5rem;"

> Your browser does not support the video tag.
> </video>

_Figure 2 — Sample video rendered inline._

---

## Task List

### Sprint Checklist

- [x] Define API contract
- [x] Set up CI/CD pipeline
- [x] Write unit tests for auth module
- [ ] Add rate limiting middleware
- [ ] Deploy staging environment
- [ ] Conduct code review
- [ ] Write release notes

---

## Blockquotes

> ❌ **Don't** commit `node_modules`, `.env`, or build artifacts to version control.

> ✅ **Do** write small, focused commits with clear messages following the [Conventional Commits](https://www.conventionalcommits.org) spec.

> 📌 **Note:** This handbook is a living document. Contributions and corrections are always welcome.

---

## Resources

### Official Docs

1. [MDN Web Docs](https://developer.mozilla.org)
2. [TypeScript Handbook](https://www.typescriptlang.org/docs/)
3. [Node.js Documentation](https://nodejs.org/en/docs)
4. [Prisma Docs](https://www.prisma.io/docs)
5. [React Documentation](https://react.dev)

### Recommended Reading

- _Clean Code_ — Robert C. Martin
- _The Pragmatic Programmer_ — David Thomas & Andrew Hunt
- _Designing Data-Intensive Applications_ — Martin Kleppmann

---

_Last updated: April 2026 · Maintained by the engineering team._
