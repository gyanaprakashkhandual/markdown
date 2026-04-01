import { useState, useEffect, useMemo } from "react";
import { slugify } from "./utils";
import { type TocItem } from "./Toc.types";
import "./Toc.component.css";

export function TableOfContents({ content }: { content: string }) {
  /* Parse all H1–H6 headings from raw markdown into TocItem objects */
  const items: TocItem[] = useMemo(() => {
    return content
      .split("\n")
      .filter((l) => /^#{1,6}\s/.test(l))
      .map((l) => {
        const m = l.match(/^(#{1,6})\s+(.+)/);
        if (!m) return null;
        const level = m[1].length;
        const text = m[2].replace(/[*_`]/g, "");
        const id = slugify(text);
        return { level, text, id };
      })
      .filter(Boolean) as TocItem[];
  }, [content]);

  const [activeId, setActiveId] = useState("");

  /* Observe each heading element and mark its id as active when it enters
     the viewport at the defined root margin threshold                       */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  /* Render nothing when there are no headings to show */
  if (items.length === 0) return null;

  /* Resolves the correct indent class for a given heading level */
  function indentClass(level: number): string {
    if (level === 1) return "toc-link--l1";
    if (level === 2) return "toc-link--l2";
    if (level === 3) return "toc-link--l3";
    return "toc-link--l4";
  }

  return (
    <nav className="toc-nav">
      <p className="toc-label">On this page</p>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`toc-link ${indentClass(item.level)} ${activeId === item.id ? "toc-link--active" : ""}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
