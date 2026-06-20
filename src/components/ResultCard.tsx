import { useState } from "react";
import { SearchResult } from "../search/searchClient";
import { normalizeText, REVERSE_ALIASES } from "../search/aliases";

interface Props {
  result: SearchResult;
  groupedBy?: "project" | "role";
}

// Build highlight patterns from matched terms, expanding each normalized term
// back to its original form so "csharp" highlights "C#" in prose text.
function buildHighlightTerms(matchedTerms: string[]): string[] {
  const terms = new Set<string>();
  for (const t of matchedTerms) {
    terms.add(t);
    const original = REVERSE_ALIASES[t];
    if (original) terms.add(original);
  }
  return [...terms];
}

function highlight(text: string, terms: string[]): React.ReactNode {
  if (terms.length === 0) return text;

  const pattern = terms
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-200 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function ResultCard({ result, groupedBy }: Props) {
  const { statement, context, role, company, year, skills, tags, matchedTerms } = result;
  const highlightTerms = buildHighlightTerms(matchedTerms);
  const [expanded, setExpanded] = useState(false);

  const showContext = groupedBy !== "project";
  const showRole = groupedBy !== "role";
  const hasDetails = skills.length > 0 || tags.length > 0 || showContext || showRole;

  return (
    <article className="group py-3">
      <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
        {highlight(statement, highlightTerms)}
      </p>

      <div className="mt-1.5 flex items-center gap-3">
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
          {company} · {year}
        </span>

        {hasDetails && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="text-xs text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
          >
            {expanded ? "Hide details" : "Details"}
          </button>
        )}
      </div>

      {hasDetails && (
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
            expanded
              ? "max-h-40 opacity-100 mt-2"
              : "max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2"
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 border-t border-gray-100 dark:border-gray-800/60">
            {/* Skill pills */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => {
                  const isMatched = matchedTerms.some(
                    (t) => t === normalizeText(skill)
                  );
                  return (
                    <span
                      key={skill}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                        isMatched
                          ? "bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                          : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Project / role — suppress the grouped dimension */}
            {(showContext || showRole) && (
              <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                {showContext && context}
                {showContext && showRole && (
                  <span className="mx-1.5 text-gray-300 dark:text-gray-700">·</span>
                )}
                {showRole && role}
              </span>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs text-gray-400 dark:text-gray-500 italic">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
