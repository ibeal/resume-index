import { TailoredEntry } from "../../tailor/scoring";

interface Props {
  entries: TailoredEntry[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  hasPosting: boolean;
}

function scoreBar(score: number): string {
  const pct = Math.round(score * 100);
  return `${pct}%`;
}

export default function RankedEntryList({ entries, selected, onToggle, hasPosting }: Props) {
  if (entries.length === 0) {
    return <p className="text-sm text-gray-400 italic">No entries.</p>;
  }

  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
      {entries.map((e) => {
        const isSelected = selected.has(e.id);
        return (
          <li key={e.id} className="py-2.5 flex gap-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(e.id)}
              className="mt-1 accent-blue-600 shrink-0"
              aria-label={`Include ${e.id}`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-900 dark:text-gray-100 leading-snug">
                {e.statement}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
                <span>{e.company} · {e.year}</span>
                {hasPosting && (
                  <>
                    <span className="text-gray-300 dark:text-gray-700">·</span>
                    <span title={`relevance ${scoreBar(e.relevance)}, recency ${scoreBar(e.recency)}`}>
                      score {scoreBar(e.score)}
                    </span>
                  </>
                )}
                {e.matchedTerms.length > 0 && (
                  <span className="text-blue-500 dark:text-blue-400">
                    {e.matchedTerms.slice(0, 4).join(", ")}
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
