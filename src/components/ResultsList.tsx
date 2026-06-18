import { SearchResult } from "../search/searchClient";
import ResultCard from "./ResultCard";
import { ViewMode } from "./ViewToggle";

interface Props {
  results: SearchResult[];
  hasQuery: boolean;
  viewMode: ViewMode;
}

function groupBy(
  results: SearchResult[],
  key: "context" | "role"
): [string, SearchResult[]][] {
  const map = new Map<string, SearchResult[]>();
  for (const r of results) {
    const k = r[key];
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(r);
  }
  // Sort groups by most recent year within the group
  return [...map.entries()].sort(([, a], [, b]) => {
    const maxA = Math.max(...a.map((r) => r.year));
    const maxB = Math.max(...b.map((r) => r.year));
    return maxB - maxA;
  });
}

function GroupedResults({
  results,
  groupKey,
}: {
  results: SearchResult[];
  groupKey: "context" | "role";
}) {
  const groups = groupBy(results, groupKey);
  const groupedBy = groupKey === "context" ? "project" : "role";

  return (
    <div className="space-y-8">
      {groups.map(([name, items]) => (
        <section key={name}>
          <div className="flex items-baseline gap-3 mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{name}</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {items.length} statement{items.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-2 pl-3 border-l-2 border-gray-100 dark:border-gray-800">
            {items.map((r) => (
              <ResultCard key={r.id} result={r} groupedBy={groupedBy} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function ResultsList({ results, hasQuery, viewMode }: Props) {
  if (results.length === 0 && hasQuery) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-500">
        <p className="text-lg font-medium">No matching experience found</p>
        <p className="text-sm mt-1">Try different keywords or a broader search</p>
      </div>
    );
  }

  const countLine = hasQuery ? (
    <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
      {results.length} result{results.length !== 1 ? "s" : ""} ranked by relevance
    </p>
  ) : null;

  if (viewMode === "by-project") {
    return (
      <>
        {countLine}
        <GroupedResults results={results} groupKey="context" />
      </>
    );
  }

  if (viewMode === "by-role") {
    return (
      <>
        {countLine}
        <GroupedResults results={results} groupKey="role" />
      </>
    );
  }

  return (
    <>
      {countLine}
      <div className="space-y-2">
        {results.map((r) => (
          <ResultCard key={r.id} result={r} />
        ))}
      </div>
    </>
  );
}
