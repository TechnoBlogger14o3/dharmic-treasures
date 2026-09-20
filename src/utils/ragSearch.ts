import type { RagChunk } from './ragChunk'

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
