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

  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl px-5 py-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50
                        transition-shadow">
      {/* Statement */}
      <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed mb-3">
        {highlight(statement, highlightTerms)}
      </p>

      {/* Footer row: skills + metadata */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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

        {/* Divider */}
        {skills.length > 0 && (
          <span className="text-gray-200 dark:text-gray-700 hidden sm:inline">|</span>
        )}

        {/* Context · role · company · year — suppress the grouped dimension */}
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
          {groupedBy !== "project" && (
            <>
              {context}
              <span className="mx-1.5 text-gray-300 dark:text-gray-700">·</span>
            </>
          )}
          {groupedBy !== "role" && (
            <>
              {role}
              <span className="mx-1.5 text-gray-300 dark:text-gray-700">·</span>
            </>
          )}
          {company}
          <span className="mx-1.5 text-gray-300 dark:text-gray-700">·</span>
          {year}
        </span>

        {/* Tags */}
        {tags.length > 0 && (
          <>
            <span className="text-gray-200 dark:text-gray-700 hidden sm:inline">|</span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="text-xs text-gray-400 dark:text-gray-500 italic">
                  #{tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
