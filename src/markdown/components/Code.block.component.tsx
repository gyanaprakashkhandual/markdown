import { useState, useCallback } from "react";
import { getLangIcon } from "../utils/Lang.icon.util";
import { syntaxHighlight } from "../utils/Code.block.util";
import { type CodeBlockProps } from "../types/Code.block.types";
import { decodeHtmlEntities } from "../utils/Code.block.util";
import { CopyIcon, CheckIcon } from "../icons/Code.block.icons";
import "../styles/Code.block.style.css";

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lang = language.toLowerCase().trim();

  /* Writes code to clipboard; falls back to execCommand for older browsers */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const lines = decodeHtmlEntities(code).split("\n");

  return (
    /* code-block class drives the mount fade-in via CSS animation */
    <div className="code-block group my-4 rounded-lg overflow-hidden border border-gray-300 dark:border-slate-700 bg-slate-950 shadow-sm">
      {/* ── Header bar — traffic lights, language label, copy button ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700 bg-slate-900/80">
        <div className="flex items-center gap-2">
          {/* macOS-style traffic light dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Language icon + label */}
          <div className="flex items-center gap-1.5 ml-2">
            {getLangIcon(lang)}
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-mono tracking-wide uppercase">
              {lang || "plain text"}
            </span>
          </div>
        </div>

        {/* Copy button — scale on hover/active via CSS, label swaps via opacity */}
        <button
          onClick={handleCopy}
          className="copy-button flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-slate-500 dark:text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all duration-150 font-medium"
        >
          <span className="copy-button-inner">
            {/* "Copied!" label — visible when copied is true */}
            <span
              className={`copy-label text-green-400 ${copied ? "copy-label--visible" : "copy-label--hidden"}`}
            >
              <CheckIcon size={12} />
              Copied!
            </span>

            {/* "Copy" label — visible when copied is false */}
            <span
              className={`copy-label ${!copied ? "copy-label--visible" : "copy-label--hidden"}`}
            >
              <CopyIcon size={12} />
              Copy
            </span>
          </span>
        </button>
      </div>

      {/* ── Code table — line numbers + syntax-highlighted lines ── */}
      <div className="overflow-x-auto pt-2 pb-2">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-slate-800/30">
                {/* Line number — non-selectable gutter */}
                <td className="select-none text-right text-slate-600 text-xs px-3 py-0 font-mono w-10 min-w-10 border-r border-slate-700">
                  {i + 1}
                </td>
                {/* Syntax-highlighted line content */}
                <td className="px-4 py-0 font-mono text-[13px] leading-6 text-slate-200 whitespace-pre">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: syntaxHighlight(line, lang),
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
