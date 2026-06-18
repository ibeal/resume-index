// Alias entries: [original (lowercase), normalized] sorted longest-first so
// multi-word forms match before their substrings (e.g. ".net framework" before ".net").
const ALIAS_ENTRIES: [string, string][] = [
  [".net framework", "dotnetframework"],
  [".net 8",         "dotnet8"],
  ["asp.net",        "aspnet"],
  ["bun.js",         "bunjs"],
  ["node.js",        "nodejs"],
  ["next.js",        "nextjs"],
  [".net",           "dotnet"],
  ["c#",             "csharp"],
  ["c++",            "cplusplus"],
];

// Pre-compile case-insensitive regex patterns for each alias
const ALIAS_PATTERNS: [RegExp, string][] = ALIAS_ENTRIES.map(
  ([original, normalized]) => [
    new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
    normalized,
  ]
);

// Map normalized form → canonical display name (used for highlighting in UI)
export const REVERSE_ALIASES: Record<string, string> = Object.fromEntries(
  ALIAS_ENTRIES.map(([original, normalized]) => [normalized, original])
);

/** Apply all alias substitutions to a text string (lowercases the result). */
export function normalizeText(text: string): string {
  let result = text.toLowerCase();
  for (const [pattern, replacement] of ALIAS_PATTERNS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
