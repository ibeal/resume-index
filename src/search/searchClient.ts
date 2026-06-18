import MiniSearch from "minisearch";
import { experience, StatementEntry } from "../data/experience";
import { extractKeywords } from "./extractKeywords";
import { normalizeText } from "./aliases";

export interface SearchResult extends StatementEntry {
  score: number;
  matchedTerms: string[];
}

interface IndexDoc {
  id: string;
  statement: string;
  context: string;
  role: string;
  company: string;
  year: number;
  skills: string;
  tags: string;
}

const miniSearch = new MiniSearch<IndexDoc>({
  fields: ["statement", "skills", "tags", "context", "role", "company"],
  storeFields: ["id"],
  idField: "id",
  searchOptions: {
    boost: { statement: 4, skills: 3, tags: 2, context: 1 },
    fuzzy: 0.2,
    prefix: true,
  },
});

miniSearch.addAll(
  experience.map((e) => ({
    id: e.id,
    statement: normalizeText(e.statement),
    context: e.context,
    role: e.role,
    company: e.company,
    year: e.year,
    skills: normalizeText(e.skills.join(" ")),
    tags: normalizeText(e.tags.join(" ")),
  }))
);

const byYearDesc = [...experience].sort((a, b) => b.year - a.year);

const byId = new Map(experience.map((e) => [e.id, e]));

export function search(rawQuery: string): SearchResult[] {
  const trimmed = rawQuery.trim();

  if (!trimmed) {
    return byYearDesc.map((e) => ({ ...e, score: 0, matchedTerms: [] }));
  }

  const query = extractKeywords(trimmed);
  return miniSearch
    .search(query)
    .filter((hit) => byId.has(hit.id))
    .map((hit) => ({
      ...byId.get(hit.id)!,
      score: hit.score,
      matchedTerms: Object.keys(hit.match),
    }));
}
