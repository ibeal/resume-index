import { useState } from "react";
import ResumeHeader from "./components/ResumeHeader";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import ViewToggle, { ViewMode } from "./components/ViewToggle";
import { search, SearchResult } from "./search/searchClient";
import { useDarkMode } from "./hooks/useDarkMode";

export default function App() {
  const { dark, toggle } = useDarkMode();
  const [results, setResults] = useState<SearchResult[]>(() => search(""));
  const [hasQuery, setHasQuery] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("flat");

  function handleSearch(query: string) {
    setHasQuery(query.trim().length > 0);
    setResults(search(query));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <ResumeHeader dark={dark} onToggleDark={toggle} />
        <SearchBar onChange={handleSearch} />
        <ViewToggle active={viewMode} onChange={setViewMode} />
        <ResultsList results={results} hasQuery={hasQuery} viewMode={viewMode} />
      </div>
    </div>
  );
}
