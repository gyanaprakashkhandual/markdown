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
    <div className="code-block">
      {/* ── Header bar — traffic lights, language label, copy button ── */}
      <div className="code-block__header">
        <div className="code-block__header-left">
          {/* macOS-style traffic light dots */}
          <div className="code-block__traffic-lights">
            <div className="code-block__dot code-block__dot--red" />
            <div className="code-block__dot code-block__dot--yellow" />
            <div className="code-block__dot code-block__dot--green" />
          </div>

          {/* Language icon + label */}
          <div className="code-block__lang">
            {getLangIcon(lang)}
            <span className="code-block__lang-label">
              {lang || "plain text"}
            </span>
          </div>
        </div>

        {/* Copy button — scale on hover/active via CSS, label swaps via opacity */}
        <button onClick={handleCopy} className="copy-button">
          <span className="copy-button-inner">
            {/* "Copied!" label — visible when copied is true */}
            <span
              className={`copy-label copy-label--success ${copied ? "copy-label--visible" : "copy-label--hidden"}`}
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
      <div className="code-block__scroll">
        <table className="code-block__table">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="code-block__row">
                {/* Line number — non-selectable gutter */}
                <td className="code-block__line-number">{i + 1}</td>
                {/* Syntax-highlighted line content */}
                <td className="code-block__line-content">
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
