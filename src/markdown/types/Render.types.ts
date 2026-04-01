import React from "react";

/* A single pattern entry: regex to match + factory that returns a React node */
export type InlinePattern = [
  RegExp,
  (match: RegExpMatchArray) => React.ReactNode,
];

/* Tracks the earliest regex match found during a scan of remaining text */
export interface EarliestMatch {
  index: number;
  match: RegExpMatchArray;
  node: React.ReactNode;
}
