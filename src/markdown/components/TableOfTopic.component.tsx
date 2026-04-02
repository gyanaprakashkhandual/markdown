import { useState, useEffect, useMemo } from "react";
import { slugify } from "../utils/Table.util";
import { type TocItem } from "../types/Table.types";

import "../styles/Table.style.css";
import "../styles/Switch.theme.style.css";
/*
type Theme =
  | "light"
  | "dark"
  | "system"
  | "purple"
  | "studio"
  | "nord"
  | "parchment"
  | "ink"
  | "green";

const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light", icon: <SunIcon size={13} /> },
  { id: "dark", label: "Dark", icon: <MoonIcon size={13} /> },
  { id: "system", label: "System", icon: <SystemIcon size={13} /> },
  { id: "purple", label: "Purple", icon: <PurpleIcon size={13} /> },
  { id: "studio", label: "Studio", icon: <LinenStudioIcon size={13} /> },
  { id: "nord", label: "Nord", icon: <NordFrostIcon size={13} /> },
  { id: "parchment", label: "Parchment", icon: <ParchmentIcon size={13} /> },
  { id: "ink", label: "Ink", icon: <ObsidianInkIcon size={13} /> },
  { id: "green", label: "Green", icon: <TerminalGreenIcon size={13} /> },
];

function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "system",
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    document.documentElement.setAttribute("data-theme", resolved);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const active = THEMES.find((t) => t.id === theme)!;

  return (
    <div className="ts-root" ref={ref}>
      <button
        className="ts-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch theme"
        aria-expanded={open}
      >
        <span className="ts-trigger-icon">{active.icon}</span>
        <span className="ts-trigger-label">{active.label}</span>
        <span className="ts-trigger-chevron" data-open={open}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2,3.5 5,6.5 8,3.5" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="ts-menu" role="menu">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`ts-item${theme === t.id ? " ts-item--active" : ""}`}
              role="menuitem"
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
            >
              <span className="ts-item-icon">{t.icon}</span>
              <span className="ts-item-label">{t.label}</span>
              {theme === t.id && (
                <span className="ts-item-check">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
*/
export function TableOfContents({ content }: { content: string }) {
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

  if (items.length === 0) return null;

  function indentClass(level: number): string {
    if (level === 1) return "toc-link--l1";
    if (level === 2) return "toc-link--l2";
    if (level === 3) return "toc-link--l3";
    return "toc-link--l4";
  }

  return (
    <nav className="toc-nav">
      <div className="toc-header">
        <p className="toc-label">On this page</p>
        {/* <ThemeSwitcher /> */}
      </div>
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
