import { taxonomy } from "../data/taxonomy";
import { normalizeText } from "./aliases";

const STOP_WORDS = new Set([
  "looking", "passionate", "team", "player", "must", "have", "we", "are", "you", "will",
  "the", "and", "for", "with", "our", "your", "this", "that", "from", "they", "their",
  "can", "has", "been", "also", "more", "such", "when", "than", "who", "not", "but",
  "what", "all", "would", "about", "into", "over", "some", "other", "any", "which",
  "new", "one", "how", "its", "him", "his", "her", "she", "he", "an", "a", "in",
  "of", "is", "to", "be", "as", "by", "on", "at", "it", "or", "if", "do",
  "join", "help", "build", "work", "strong", "great", "good", "love", "enjoy",
  "experience", "knowledge", "understanding", "ability", "skills", "years",
  "preferred", "required", "plus", "nice",
]);

// Pre-build a lowercase lookup for O(1) matching
const taxonomyLower = new Map<string, string>(
  taxonomy.map((term) => [term.toLowerCase(), term])
);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9.+#/\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export function extractKeywords(raw: string): string {
  const tokens = tokenize(raw);
  const matched = new Set<string>();

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];

    // Single token match
    if (taxonomyLower.has(tok)) {
      matched.add(taxonomyLower.get(tok)!);
      continue;
    }

    // Bigram match (e.g. "distributed systems", "domain driven")
    if (i + 1 < tokens.length) {
      const bigram = `${tok} ${tokens[i + 1]}`;
      if (taxonomyLower.has(bigram)) {
        matched.add(taxonomyLower.get(bigram)!);
        i++; // consume next token
        continue;
      }
    }

    // Trigram match (e.g. "domain driven design")
    if (i + 2 < tokens.length) {
      const trigram = `${tok} ${tokens[i + 1]} ${tokens[i + 2]}`;
      if (taxonomyLower.has(trigram)) {
        matched.add(taxonomyLower.get(trigram)!);
        i += 2;
        continue;
      }
    }
  }

  if (matched.size === 0) {
    return normalizeText(tokens.filter((t) => !STOP_WORDS.has(t)).join(" "));
  }

  return normalizeText(Array.from(matched).join(" "));
}
