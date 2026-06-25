import { experience, StatementEntry } from "../data/experience";
import { search, SearchResult } from "../search/searchClient";

export interface TailoredEntry extends StatementEntry {
  relevance: number;
  recency: number;
  score: number;
  matchedTerms: string[];
}

export interface TailorWeights {
  relevance: number;
  recency: number;
  halfLifeYears: number;
}

export const DEFAULT_WEIGHTS: TailorWeights = {
  relevance: 0.7,
  recency: 0.3,
  halfLifeYears: 4,
};

const REFERENCE_YEAR = Math.max(...experience.map((e) => e.year));

function recencyScore(year: number, halfLife: number): number {
  const yearsBack = Math.max(0, REFERENCE_YEAR - year);
  return Math.pow(0.5, yearsBack / halfLife);
}

function normalize(values: number[]): number[] {
  const max = Math.max(...values, 0);
  if (max === 0) return values.map(() => 0);
  return values.map((v) => v / max);
}

export function rankForPosting(
  posting: string,
  weights: TailorWeights = DEFAULT_WEIGHTS
): TailoredEntry[] {
  const trimmed = posting.trim();
  const hits: SearchResult[] = trimmed ? search(trimmed) : [];

  const hitById = new Map(hits.map((h) => [h.id, h]));
  const rawRelevance = experience.map((e) => hitById.get(e.id)?.score ?? 0);
  const normRelevance = normalize(rawRelevance);

  const entries: TailoredEntry[] = experience.map((e, i) => {
    const relevance = normRelevance[i];
    const recency = recencyScore(e.year, weights.halfLifeYears);
    const score = weights.relevance * relevance + weights.recency * recency;
    return {
      ...e,
      relevance,
      recency,
      score,
      matchedTerms: hitById.get(e.id)?.matchedTerms ?? [],
    };
  });

  entries.sort((a, b) => b.score - a.score || b.year - a.year);
  return entries;
}
