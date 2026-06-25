import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResumeHeader from "../components/ResumeHeader";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import ViewToggle, { ViewMode } from "../components/ViewToggle";
import { search, SearchResult } from "../search/searchClient";
import { useDarkMode } from "../hooks/useDarkMode";

export default function SearchPage() {
  const { dark, toggle } = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [results, setResults] = useState<SearchResult[]>(() => search(initialQuery));
  const [hasQuery, setHasQuery] = useState(initialQuery.trim().length > 0);
  const [viewMode, setViewMode] = useState<ViewMode>("flat");

  function handleSearch(query: string) {
    setHasQuery(query.trim().length > 0);
    setResults(search(query));

    const next = new URLSearchParams(searchParams);
    if (query.trim()) {
      next.set("q", query);
    } else {
      next.delete("q");
    }
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <ResumeHeader dark={dark} onToggleDark={toggle} />
        <SearchBar initialValue={initialQuery} onChange={handleSearch} />
        <ViewToggle active={viewMode} onChange={setViewMode} />
        <ResultsList results={results} hasQuery={hasQuery} viewMode={viewMode} />
      </div>
    </div>
  );
}
