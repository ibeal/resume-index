# resume-index

A client-side searchable index of my work experience — built because a traditional resume can't surface the full depth of what I've done. Paste a job listing, type a skill, or browse by project or role.

**Live at [resume.ianbeal.dev](https://resume.ianbeal.dev)**

## How it works

Search is handled entirely in the browser with [MiniSearch](https://github.com/lucasolia/minisearch). There's no backend, no API calls, and no build-time data fetching.

Typing a query runs it through a keyword extraction layer that matches tokens against a taxonomy of ~200 canonical skill and tool terms before passing the result to MiniSearch. This means pasting a job description works roughly as well as typing a specific skill — filler phrases are stripped, known terms are extracted and boosted, and the results are ranked by field-weighted relevance (`statement` > `skills` > `tags`).

Special-character terms (`C#`, `.NET`, `Bun.js`) are normalized to MiniSearch-safe equivalents at both index and query time, then denormalized for display so highlighting still works correctly.

## Views

| Mode | Description |
|---|---|
| **Statements** | Flat list of individual achievements, ranked by relevance or recency |
| **By Project** | Achievements grouped by initiative, sections sorted by most recent year |
| **By Role** | Achievements grouped by job title |

## Stack

- **Vite + React + TypeScript**
- **MiniSearch** — client-side full-text search
- **Tailwind CSS** — styling and dark mode
- No backend, no routing, no external API calls

## Development

```bash
npm install
npm run dev
```

## Deployment

Pushes to `main` automatically deploy to [resume.ianbeal.dev](https://resume.ianbeal.dev) via GitHub Actions + GitHub Pages.

## Data

Experience is stored as individual achievement statements in `src/data/experience.ts`. Each entry has a `context` field (the initiative it belongs to) used for grouped views. The taxonomy lives in `src/data/taxonomy.ts` and the alias normalization map in `src/search/aliases.ts`.
