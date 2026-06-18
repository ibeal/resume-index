import { useEffect, useRef, useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

const PLACEHOLDERS = [
  "e.g. Elixir experience",
  "e.g. paste a job listing",
];

export default function SearchBar({ onChange }: Props) {
  const [value, setValue] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setValue(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(v), 300);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onChange(value);
    }
  }

  return (
    <div className="mb-8">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={PLACEHOLDERS[placeholderIdx]}
        className="w-full px-4 py-3 text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors placeholder-gray-400 dark:placeholder-gray-500"
        aria-label="Search experience"
      />
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        Try a skill, tool, or paste a job listing
      </p>
    </div>
  );
}
