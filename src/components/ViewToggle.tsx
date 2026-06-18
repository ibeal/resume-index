export type ViewMode = "flat" | "by-project" | "by-role";

const MODES: { mode: ViewMode; label: string }[] = [
  { mode: "flat", label: "Statements" },
  { mode: "by-project", label: "By Project" },
  { mode: "by-role", label: "By Role" },
];

interface Props {
  active: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      {MODES.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
            active === mode
              ? "bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100 text-white dark:text-gray-900"
              : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
