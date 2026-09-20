import type { RagChunk } from './ragChunk'
import type { RagHit } from './ragSearch'

export interface SiteChapter {
  chapter_number: number
  name: string
  name_meaning: string
  summary: string
}

export interface SiteItem {
  id: number
  name: string
  extra?: string
}

const STOP = new Set([
  'the',
  'and',
  'for',
  'are',
  'was',
  'were',
  'how',
  'many',
  'what',
  'who',
  'when',
  'where',
  'why',
  'does',
  'did',
  'all',
  'about',
  'there',
])

function tokenMatches(hay: string, token: string): boolean {
  if (hay.includes(token)) return true
  if (token.endsWith('s') && token.length > 4 && hay.includes(token.slice(0, -1))) return true
  if (!token.endsWith('s') && hay.includes(`${token}s`)) return true
  return false
}

export function siteChunksFromChapters(
  chapters: SiteChapter[],
  meta: { book: string; title: string },
): RagChunk[] {
  const catalog = chapters
    .map((chapter) => `${chapter.chapter_number}. ${chapter.name} — ${chapter.name_meaning}`)
    .join('\n')
  const chunks: RagChunk[] = [
    {
      book: meta.book,
      title: meta.title,
      page: 0,
      text: `${meta.title} has ${chapters.length} chapters:\n${catalog}`,
    },
  ]
  for (const chapter of chapters) {
    chunks.push({
      book: meta.book,
      title: meta.title,
      page: chapter.chapter_number,
      text: `Chapter ${chapter.chapter_number}: ${chapter.name} (${chapter.name_meaning}). ${chapter.summary}`,
    })
  }
  return chunks
}

export function siteChunksFromCollection(
  items: SiteItem[],
  meta: { book: string; title: string; kind: string; intro?: string },
): RagChunk[] {
  const catalog = items.map((item) => `${item.id}. ${item.name}`).join('\n')
  const chunks: RagChunk[] = [
    {
      book: meta.book,
      title: meta.title,
      page: 0,
      text: [`There are ${items.length} ${meta.kind} on this site.`, catalog, meta.intro]
        .filter(Boolean)
        .join('\n'),
    },
  ]
  for (const item of items) {
    chunks.push({
      book: meta.book,
      title: meta.title,
      page: item.id,
      text: `${item.name}${item.extra ? `. ${item.extra}` : ''}`,
    })
  }
  return chunks
}

export function searchSiteText(query: string, chunks: RagChunk[], limit = 3): RagHit[] {
  const tokens = query
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter((token) => token.length > 2 && !STOP.has(token)) ?? []
  if (!tokens.length) return []
  return chunks
    .map((chunk) => {
      const hay = chunk.text.toLowerCase()
      const hits = tokens.filter((token) => tokenMatches(hay, token)).length
      return { ...chunk, score: hits / tokens.length }
    })
    .filter((hit) => hit.score >= 0.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function mergeHits(pdfHits: RagHit[], siteHits: RagHit[], limit = 6): RagHit[] {
  const strongSite = siteHits.filter((hit) => hit.score >= 0.5)
  const pdfBudget = strongSite.length ? 2 : limit
  const merged: RagHit[] = []
  const seen = new Set<string>()
  const push = (hit: RagHit) => {
    const key = `${hit.book}:${hit.page}:${hit.text.slice(0, 40)}`
    if (seen.has(key) || merged.length >= limit) return
    seen.add(key)
    merged.push(hit)
  }
  strongSite.forEach(push)
  pdfHits.slice(0, pdfBudget).forEach(push)
  return merged
}
