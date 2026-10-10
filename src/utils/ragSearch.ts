import { hintedBookStem } from './chatFollowUp.ts'
import type { RagChunk } from './ragChunk'
import { lexicalScore, queryTokens } from './siteChunks.ts'

const BOOK_HINTS: [RegExp, RegExp][] = [
  [/gita|bhagavad/i, /gita/i],
  [/ramayan/i, /ramayan/i],
  [/mahabharat/i, /mahabharat/i],
  [/shiva\s*purana|purana/i, /shiva/i],
  [/temple|mandir|tirupati|meenakshi|kashi|jagannath/i, /temple/i],
  [
    /navratri|diwali|chhath|holi|shivaratri|janmashtami|ganesh|karva/i,
    /navratri|diwali|chhath|holi|shivaratri|janmashtami|ganesh|karva/i,
  ],
]

export function bookBoost(query: string, book: string): number {
  if (BOOK_HINTS.some(([ask, id]) => ask.test(query) && id.test(book))) return 1.35
  const stem = hintedBookStem(query)
  return stem && new RegExp(stem, 'i').test(book) ? 1.35 : 1
}

export interface EmbeddedChunk extends RagChunk {
  vector: number[]
}

export interface RagHit extends RagChunk {
  score: number
}

export function cosine(a: ArrayLike<number>, b: ArrayLike<number>): number {
  let dot = 0
  let na = 0
  let nb = 0
  const n = Math.min(a.length, b.length)
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  if (!na || !nb) return 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

export function searchChunks(query: number[], chunks: EmbeddedChunk[], limit = 6): RagHit[] {
  return chunks
    .map((chunk) => ({
      book: chunk.book,
      title: chunk.title,
      page: chunk.page,
      text: chunk.text,
      score: cosine(query, chunk.vector),
    }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function searchMatrix(
  query: ArrayLike<number>,
  embeddings: Float32Array,
  dims: number,
  chunks: RagChunk[],
  limit = 6,
): RagHit[] {
  const scored = chunks.map((chunk, i) => {
    const offset = i * dims
    return {
      book: chunk.book,
      title: chunk.title,
      page: chunk.page,
      text: chunk.text,
      score: cosine(query, embeddings.subarray(offset, offset + dims)),
    }
  })
  return scored.filter((hit) => hit.score > 0).sort((a, b) => b.score - a.score).slice(0, limit)
}

export function searchHybrid(
  queryText: string,
  query: ArrayLike<number>,
  embeddings: Float32Array,
  dims: number,
  chunks: RagChunk[],
  limit = 6,
): RagHit[] {
  const hasLex = queryTokens(queryText).length > 0
  return chunks
    .map((chunk, i) => {
      const dense = cosine(query, embeddings.subarray(i * dims, i * dims + dims))
      const lex = hasLex ? lexicalScore(queryText, chunk.text) : 0
      const mix = hasLex ? 0.4 * dense + 0.6 * lex : dense
      return {
        book: chunk.book,
        title: chunk.title,
        page: chunk.page,
        text: chunk.text,
        score: mix * bookBoost(queryText, chunk.book),
      }
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
