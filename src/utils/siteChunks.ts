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
  'them',
  'those',
  'these',
  'please',
])

export function queryTokens(query: string): string[] {
  return (
    query
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      ?.filter((token) => token.length > 2 && !STOP.has(token)) ?? []
  )
}

export function lexicalScore(query: string, text: string): number {
  const tokens = queryTokens(query)
  if (!tokens.length) return 0
  const hay = text.toLowerCase()
  return tokens.filter((token) => tokenMatches(hay, token)).length / tokens.length
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0
  const max = a.length >= 8 || b.length >= 8 ? 2 : 1
  if (Math.abs(a.length - b.length) > max) return max + 1
  const prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0]
    prev[0] = i
    let rowMin = prev[0]
    for (let j = 1; j <= b.length; j++) {
      const cur = prev[j]
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + cost)
      last = cur
      if (prev[j] < rowMin) rowMin = prev[j]
    }
    if (rowMin > max) return max + 1
  }
  return prev[b.length]
}

function tokenMatches(hay: string, token: string): boolean {
  if (hay.includes(token)) return true
  if (token.endsWith('s') && token.length > 4 && hay.includes(token.slice(0, -1))) return true
  if (!token.endsWith('s') && hay.includes(`${token}s`)) return true
  if (token.length < 5) return false
  const max = token.length >= 8 ? 2 : 1
  const words = hay.match(/[a-z0-9]+/g) ?? []
  return words.some((word) => word.length >= 4 && editDistance(word, token) <= max)
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

export function isListOrCountQuery(query: string): boolean {
  return /\b(how many|list|chapters|nights)\b/i.test(query)
}

function isCatalogHit(hit: RagHit): boolean {
  return hit.page === 0 && /\b(?:has|there are)\s+\d+/i.test(hit.text)
}

export function searchSiteText(query: string, chunks: RagChunk[], limit = 3): RagHit[] {
  if (!queryTokens(query).length) return []
  return chunks
    .map((chunk) => ({ ...chunk, score: lexicalScore(query, chunk.text) }))
    .filter((hit) => hit.score >= 0.5)
    .sort((a, b) => b.score - a.score || a.page - b.page)
    .slice(0, limit)
}

export function mergeHits(pdfHits: RagHit[], siteHits: RagHit[], limit = 6, query = ''): RagHit[] {
  let strongSite = siteHits.filter((hit) => hit.score >= 0.5)
  const catalog = strongSite.filter(isCatalogHit)
  const listQuery = Boolean(query) && isListOrCountQuery(query)
  if (listQuery && catalog.length) strongSite = catalog
  const pdfBudget = listQuery && catalog.length ? 0 : strongSite.length ? 2 : limit
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
