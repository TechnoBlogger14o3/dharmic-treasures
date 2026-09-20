export interface RagPage {
  page: number
  text: string
}

export interface RagChunkMeta {
  book: string
  title: string
  targetWords?: number
  overlapWords?: number
}

export interface RagChunk {
  book: string
  title: string
  page: number
  text: string
}

const HEADER =
  /^(the bhagavad gita|bala kanda|ayodhya kanda|aranya kanda|kishkindha kanda|sundara kanda|yuddha kanda|uttara kanda|the ramayana of valmiki|chapter \d+|page \d+( of \d+)?)$/i

export function cleanPageText(text: string): string {
  return text
    .replace(/OceanofPDF\.com/gi, ' ')
    .replace(/^Page \d+ of \d+\s*/i, '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !HEADER.test(line))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function latinLetterRatio(text: string): number {
  const letters = text.match(/\p{L}/gu) || []
  if (!letters.length) return 0
  const latin = letters.filter((ch) => /[A-Za-z]/.test(ch)).length
  return latin / letters.length
}

function looksLikeOcrCover(text: string): boolean {
  const compact = text.replace(/\s+/g, '')
  if (compact.length < 80) return false
  const weird = (text.match(/[^A-Za-z0-9\s.,;:'"()\-]/g) || []).length
  return weird / Math.max(text.length, 1) > 0.18 && latinLetterRatio(text) > 0.7
}

export function isJunkPage(text: string): boolean {
  const cleaned = cleanPageText(text)
  if (cleaned.length < 120) return true
  if (looksLikeOcrCover(cleaned)) return true
  return false
}

function wordsOf(text: string): string[] {
  return text.split(/\s+/).filter(Boolean)
}

export function chunkPages(pages: RagPage[], meta: RagChunkMeta): RagChunk[] {
  const target = meta.targetWords ?? 400
  const overlap = meta.overlapWords ?? 60
  const chunks: RagChunk[] = []

  for (const page of pages) {
    if (isJunkPage(page.text)) continue
    const words = wordsOf(cleanPageText(page.text))
    if (words.length <= target) {
      chunks.push({
        book: meta.book,
        title: meta.title,
        page: page.page,
        text: words.join(' '),
      })
      continue
    }
    let start = 0
    while (start < words.length) {
      const slice = words.slice(start, start + target)
      chunks.push({
        book: meta.book,
        title: meta.title,
        page: page.page,
        text: slice.join(' '),
      })
      if (start + target >= words.length) break
      start += target - overlap
    }
  }

  return chunks
}
