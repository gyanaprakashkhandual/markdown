/* Shared props for every language icon */
interface IconProps {
  size?: number;
  className?: string;
}

/* JavaScript — classic JS yellow shield/square logo */
export function JavaScriptIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="2" fill="currentColor" opacity="0.15" />
      <path d="M7 17.5c.4.7 1 1.2 2.1 1.2 1.2 0 1.9-.6 1.9-1.5 0-1-.7-1.4-1.9-1.9L8.5 15c-1.6-.7-2.7-1.5-2.7-3.3 0-1.6 1.2-2.8 3.1-2.8 1.3 0 2.3.5 3 1.5l-1.6 1c-.4-.6-.8-.9-1.4-.9-.6 0-1 .4-1 .9 0 .6.4 .9 1.3 1.3l.6.3c1.9.8 3 1.6 3 3.5 0 2-1.5 3.2-3.6 3.2-2 0-3.3-1-4-2.2L7 17.5zm8.5.2c.3.5.6.9 1.3.9.6 0 1-.3 1-1.2V9h2v8.4c0 2-1.2 2.9-2.9 2.9-1.5 0-2.4-.8-2.9-1.8l1.5-.8z" />
    </svg>
  );
}

/* TypeScript — TS blue logo */
export function TypeScriptIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="2" fill="currentColor" opacity="0.15" />
      <path d="M3 3h18v18H3V3zm10.5 12.5v1.3c.3.2.8.3 1.3.3 1.4 0 2.3-.8 2.3-2 0-1-.6-1.6-1.8-2.1-.8-.3-1.1-.6-1.1-1 0-.4.3-.7.9-.7.5 0 .9.2 1.2.5l.8-1c-.5-.5-1.2-.7-2-.7-1.3 0-2.2.8-2.2 1.9 0 1 .6 1.6 1.8 2 .8.3 1.1.6 1.1 1.1 0 .5-.4.8-1 .8-.6 0-1.1-.3-1.3-.5l-.8 1.1zM9 10.5H6.5V9h6.5v1.5H10.5V17H9v-6.5z" />
    </svg>
  );
}

/* Python — snake logo simplified */
export function PythonIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C9 2 7 3.5 7 5.5V9h5v1H5.5C3.5 10 2 11.5 2 14s1.5 4 3.5 4H7v-2.5C7 13.5 9 12 12 12s5 1.5 5 3.5V18h1.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H13V9h-1V5.5C12 3.5 14.5 2 12 2z" />
      <circle cx="9.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="18.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Rust — gear/cog representing systems programming */
export function RustIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      <path d="M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" />
    </svg>
  );
}

/* Go — simple terminal arrow representing the Go gopher feel */
export function GoIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12h10" />
      <path d="M10 8l4 4-4 4" />
      <circle cx="18" cy="12" r="2" />
      <path d="M2 7c0-1 .5-2 2-2h4" />
      <path d="M2 17c0 1 .5 2 2 2h4" />
    </svg>
  );
}

/* CSS — styling brackets */
export function CssIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 3l1.5 16L12 21l6.5-2L20 3H4z" />
      <path d="M8 8h8l-.5 5-3.5 1-3.5-1-.2-2.5H14" />
    </svg>
  );
}

/* Bash — hash-bang prompt */
export function BashIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

/* Terminal — generic shell prompt > _ */
export function TerminalIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

/* SQL / Database — cylinder stack */
export function DatabaseIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

/* JSON / FileText — document with lines */
export function FileTextIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

/* HTML / XML — globe */
export function GlobeIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* C / C++ — CPU chip */
export function CpuIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="9" width="6" height="6" />
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}

/* Default fallback — generic terminal prompt */
export function DefaultLangIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
