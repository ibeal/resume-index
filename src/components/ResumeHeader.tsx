import { Link } from "react-router-dom";
import { profile } from "../data/profile";

interface Props {
  dark: boolean;
  onToggleDark: () => void;
}

export default function ResumeHeader({ dark, onToggleDark }: Props) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            {profile.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{profile.title}</p>
        </div>
        <div className="flex items-center gap-2 mt-1 shrink-0">
        <Link
          to="/tailor"
          className="px-3 py-1.5 text-sm rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Tailor
        </Link>
        <button
          onClick={onToggleDark}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500
                     dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-colors"
        >
          {dark ? (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          ) : (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          )}
        </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
        <a href={`mailto:${profile.email}`}
          className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          {profile.email}
        </a>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          {profile.github}
        </a>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          {profile.linkedin}
        </a>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <span>{profile.location}</span>
      </div>
    </header>
  );
}
