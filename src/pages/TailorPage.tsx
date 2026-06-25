import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { DEFAULT_WEIGHTS, rankForPosting, TailorWeights } from "../tailor/scoring";
import RankedEntryList from "../components/Tailor/RankedEntryList";
import ResumePreview from "../components/Tailor/ResumePreview";

const DEFAULT_TOP_N = 24;

export default function TailorPage() {
  const { dark, toggle: toggleDark } = useDarkMode();
  const [posting, setPosting] = useState("");
  const [weights, setWeights] = useState<TailorWeights>(DEFAULT_WEIGHTS);
  const [topN, setTopN] = useState(DEFAULT_TOP_N);
  const [selected, setSelected] = useState<Set<string> | null>(null);
  const [splitOverride, setSplitOverride] = useState<number | null>(null);

  const ranked = useMemo(() => rankForPosting(posting, weights), [posting, weights]);

  const effectiveSelected = useMemo(() => {
    if (selected) return selected;
    return new Set(ranked.slice(0, topN).map((e) => e.id));
  }, [selected, ranked, topN]);

  const selectedEntries = useMemo(
    () => ranked.filter((e) => effectiveSelected.has(e.id)),
    [ranked, effectiveSelected]
  );

  const splitAt = splitOverride ?? Math.ceil(selectedEntries.length / 2);

  function toggleSelected(id: string) {
    const next = new Set(effectiveSelected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function resetSelection() {
    setSelected(null);
  }

  const hasPosting = posting.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-6 print:hidden">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tailor</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Paste a posting; rank and assemble a tailored resume.
            </p>
          </div>
          <nav className="flex items-center gap-3 text-sm print:hidden">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Search
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
            >
              Print / PDF
            </button>
            <button
              type="button"
              onClick={toggleDark}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              aria-label="Toggle dark mode"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 print:hidden">
            <textarea
              value={posting}
              onChange={(e) => setPosting(e.target.value)}
              placeholder="Paste a job posting…"
              className="w-full h-44 p-3 text-sm rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <details className="text-xs text-gray-500 dark:text-gray-400">
              <summary className="cursor-pointer select-none">Tuning</summary>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-3">
                  <span className="w-28">Relevance weight</span>
                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={weights.relevance}
                    onChange={(e) => setWeights({ ...weights, relevance: Number(e.target.value) })}
                  />
                  <span className="tabular-nums">{weights.relevance.toFixed(2)}</span>
                </label>
                <label className="flex items-center gap-3">
                  <span className="w-28">Recency weight</span>
                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={weights.recency}
                    onChange={(e) => setWeights({ ...weights, recency: Number(e.target.value) })}
                  />
                  <span className="tabular-nums">{weights.recency.toFixed(2)}</span>
                </label>
                <label className="flex items-center gap-3">
                  <span className="w-28">Half-life (yrs)</span>
                  <input
                    type="range" min={1} max={10} step={1}
                    value={weights.halfLifeYears}
                    onChange={(e) => setWeights({ ...weights, halfLifeYears: Number(e.target.value) })}
                  />
                  <span className="tabular-nums">{weights.halfLifeYears}</span>
                </label>
                <label className="flex items-center gap-3">
                  <span className="w-28">Default top-N</span>
                  <input
                    type="range" min={1} max={40} step={1}
                    value={topN}
                    onChange={(e) => {
                      setTopN(Number(e.target.value));
                      setSelected(null);
                    }}
                  />
                  <span className="tabular-nums">{topN}</span>
                </label>
              </div>
            </details>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedEntries.length} of {ranked.length} selected
              </p>
              {selected && (
                <button
                  type="button"
                  onClick={resetSelection}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reset to top {topN}
                </button>
              )}
            </div>

            <RankedEntryList
              entries={ranked}
              selected={effectiveSelected}
              onToggle={toggleSelected}
              hasPosting={hasPosting}
            />
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start space-y-3">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 print:hidden">
              <span className="shrink-0">Page break after entry</span>
              <input
                type="range"
                min={0}
                max={selectedEntries.length}
                step={1}
                value={Math.min(splitAt, selectedEntries.length)}
                onChange={(e) => setSplitOverride(Number(e.target.value))}
                className="flex-1"
                disabled={selectedEntries.length === 0}
              />
              <span className="tabular-nums shrink-0">
                {Math.min(splitAt, selectedEntries.length)} / {selectedEntries.length}
              </span>
              {splitOverride !== null && (
                <button
                  type="button"
                  onClick={() => setSplitOverride(null)}
                  className="text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                >
                  Auto
                </button>
              )}
            </div>
            <ResumePreview entries={selectedEntries} splitAt={splitAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
