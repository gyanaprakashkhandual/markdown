import React from "react";
import {
  JavaScriptIcon,
  TypeScriptIcon,
  PythonIcon,
  RustIcon,
  GoIcon,
  CssIcon,
  BashIcon,
  TerminalIcon,
  DatabaseIcon,
  FileTextIcon,
  GlobeIcon,
  CpuIcon,
  DefaultLangIcon,
} from "../icons/Lang.icons";

/* Maps a lowercase language identifier to its corresponding icon node.
   Falls back to DefaultLangIcon for any unrecognised language string.      */
export function getLangIcon(lang: string): React.ReactNode {
  const map: Record<string, React.ReactNode> = {
    javascript: <JavaScriptIcon className="text-yellow-400" size={14} />,
    js: <JavaScriptIcon className="text-yellow-400" size={14} />,
    jsx: <JavaScriptIcon className="text-yellow-400" size={14} />,
    typescript: <TypeScriptIcon className="text-blue-400" size={14} />,
    ts: <TypeScriptIcon className="text-blue-400" size={14} />,
    tsx: <TypeScriptIcon className="text-blue-400" size={14} />,
    python: <PythonIcon className="text-blue-300" size={14} />,
    py: <PythonIcon className="text-blue-300" size={14} />,
    rust: <RustIcon className="text-orange-400" size={14} />,
    go: <GoIcon className="text-cyan-400" size={14} />,
    css: <CssIcon className="text-blue-500" size={14} />,
    bash: <BashIcon className="text-green-400" size={14} />,
    sh: <TerminalIcon className="text-green-400" size={14} />,
    shell: <TerminalIcon className="text-green-400" size={14} />,
    sql: <DatabaseIcon className="text-purple-400" size={14} />,
    json: <FileTextIcon className="text-orange-300" size={14} />,
    html: <GlobeIcon className="text-red-400" size={14} />,
    xml: <GlobeIcon className="text-red-400" size={14} />,
    cpp: <CpuIcon className="text-blue-300" size={14} />,
    c: <CpuIcon className="text-blue-300" size={14} />,
  };

  return (
    map[lang.toLowerCase()] ?? (
      <DefaultLangIcon
        className="text-slate-500 dark:text-slate-400"
        size={14}
      />
    )
  );
}
