import { profile } from "../../data/profile";
import { TailoredEntry } from "../../tailor/scoring";

interface Props {
  entries: TailoredEntry[];
  splitAt: number;
}

interface RoleGroup {
  role: string;
  company: string;
  yearStart: number;
  yearEnd: number;
  entries: TailoredEntry[];
}

function groupByRole(entries: TailoredEntry[]): RoleGroup[] {
  const map = new Map<string, RoleGroup>();
  for (const e of entries) {
    const key = `${e.company}::${e.role}`;
    const existing = map.get(key);
    if (existing) {
      existing.entries.push(e);
      existing.yearStart = Math.min(existing.yearStart, e.year);
      existing.yearEnd = Math.max(existing.yearEnd, e.year);
    } else {
      map.set(key, {
        role: e.role,
        company: e.company,
        yearStart: e.year,
        yearEnd: e.year,
        entries: [e],
      });
    }
  }
  return [...map.values()].sort((a, b) => b.yearEnd - a.yearEnd);
}

function yearRange(g: RoleGroup): string {
  return g.yearStart === g.yearEnd ? `${g.yearStart}` : `${g.yearStart}–${g.yearEnd}`;
}

function RoleSection({ group }: { group: RoleGroup }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div>
          <span className="font-semibold">{group.role}</span>
          <span className="text-gray-600"> — {group.company}</span>
        </div>
        <span className="text-xs text-gray-500">{yearRange(group)}</span>
      </div>
      <ul className="mt-1.5 list-disc pl-5 space-y-1">
        {group.entries.map((e) => (
          <li key={e.id}>{e.statement}</li>
        ))}
      </ul>
    </div>
  );
}

function PageFront({ entries }: { entries: TailoredEntry[] }) {
  const groups = groupByRole(entries);
  return (
    <div className="resume-page bg-white text-gray-900 aspect-[8.5/11] w-full shadow-sm border border-gray-200 dark:border-gray-800 text-[11px] leading-snug font-sans">
      <div className="h-full w-full p-[0.5in] flex flex-col">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-sm text-gray-600">{profile.title}</p>
          <p className="text-[10px] text-gray-500 mt-1">
            {profile.email} · {profile.github} · {profile.linkedin} · {profile.location}
          </p>
        </header>

        <section className="flex-1 min-h-0">
          <h2 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3">
            Experience
          </h2>
          {groups.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Select entries to build the resume.</p>
          ) : (
            <div className="space-y-3">
              {groups.map((g) => (
                <RoleSection key={`${g.company}-${g.role}`} group={g} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function PageBack({ entries }: { entries: TailoredEntry[] }) {
  const groups = groupByRole(entries);
  return (
    <div className="resume-page bg-white text-gray-900 aspect-[8.5/11] w-full shadow-sm border border-gray-200 dark:border-gray-800 text-[11px] leading-snug font-sans">
      <div className="h-full w-full p-[0.5in] flex flex-col">
        <header className="mb-4 flex items-baseline justify-between border-b border-gray-300 pb-1">
          <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            Experience (cont.)
          </span>
          <span className="text-[10px] text-gray-500">{profile.name} · page 2</span>
        </header>
        <section className="flex-1 min-h-0">
          {groups.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No overflow entries.</p>
          ) : (
            <div className="space-y-3">
              {groups.map((g) => (
                <RoleSection key={`${g.company}-${g.role}`} group={g} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ResumePreview({ entries, splitAt }: Props) {
  const clamp = Math.max(0, Math.min(splitAt, entries.length));
  const front = entries.slice(0, clamp);
  const back = entries.slice(clamp);

  return (
    <div className="resume-pages space-y-4">
      <PageFront entries={front} />
      <PageBack entries={back} />
    </div>
  );
}
