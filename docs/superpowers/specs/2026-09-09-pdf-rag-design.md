# PDF / shastra RAG (v1)

Date: 2026-09-09

## Goal

Let people ask a question and get **quoted passages** from the shastras, with a citation (book + page, or Gita chapter/verse). No cloud LLM in v1. No extra server. Stays static on Hostinger.

## Decisions

- Product: one chatbot, many sources (Gita, Ramayan, later more PDFs).
- Index: **build-time**. A script extracts text, chunks it, writes JSON the site ships.
- Answers: **retrieval only** — matching quotes + citations. The existing in-browser LLM stays optional and off by default.
- Gita *reader* stays JSON. RAG does not replace the chapter UI.

## Source constraint (important)

Gita Press PDFs in `data/` (`श्रीमद्भगवतगीता.pdf`, `Sadhak Sanjeevani.pdf`) do **not** extract as Unicode Hindi. pdf.js yields a private font encoding, so they cannot be searched as-is.

v1 corpus:

| Source | Origin | Citation |
|---|---|---|
| Bhagavad Gita | existing `data/gita.ts` (Unicode) | Chapter · verse |
| Valmiki Ramayan | `data/Shrimad Valmiki Ramayan.pdf` | Book · page |

Add a new PDF later by listing it in `scripts/shastra-sources.json` and re-running the indexer. Pages whose text is not mostly Devanagari/Latin (garbled font dumps) are skipped.

Use a Unicode PDF if you want page-level Gita citations from a file.

## Architecture

1. `scripts/shastra-sources.json` — id, title, file path, kind (`pdf` | `gita-json`).
2. `scripts/build-shastra-index.mjs` — pdf.js extract, chunk, write `public/rag/shastra-index.json`.
3. `src/utils/shastraSearch.ts` — keyword score (Hindi + English), filter by source, top 5 chunks.
4. Chatbot (app-wide, not Gita-only) loads the index once, searches, shows quotes.

Do **not** copy the 8–14MB PDFs into `public/` for search. Only the index ships.

## Chunks

```ts
{
  id: string
  sourceId: string
  title: string
  page?: number
  chapter?: number
  verse?: number
  text: string
}
```

PDF: one page → one or more chunks (~800 characters, split on `।` / newlines).  
Gita JSON: one verse → one chunk (Sanskrit + Hindi + English).

## UI

- FAB on all main views (not only Gita).
- Source chips: All · Gita · Ramayan (more ids as sources grow).
- Bot message: short “I found N passages” plus cards with quote + citation.
- Gita cards still jump to the verse. Ramayan cards show page only (v1).
- Temple chrome: saffron / cream / gold, not amber.

## Errors

- Missing index: tell the user to run `npm run index:shastras`.
- No hits: say so; do not invent an answer.
- Empty PDF pages / encoding garbage: skip at index time.

## Out of scope (v1)

- Cloud LLM rewrite
- OCR / KrutiDev conversion of Gita Press PDFs
- Vector embeddings
- Opening Ramayan at a given PDF page in the viewer

## Verification

1. `npm run index:shastras` finishes; Gita verses and Ramayan pages are in the index; garbled Gita Press PDFs are skipped or near-empty.
2. Ask “राम” / “Sita” with source Ramayan → Hindi/English-ish quotes + page.
3. Ask “duty” / “कर्म” with source Gita → verse cards that navigate.
4. All → mixed citations.
5. Empty query does not search. Unknown topic says no match.

## Success

A question returns only text that exists in the index, with a clear source label.
