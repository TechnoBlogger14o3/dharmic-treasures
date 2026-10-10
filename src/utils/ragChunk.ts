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

const HEADING = /^(chapter\s+\d+\b(?:[:.\s]+[A-Za-z][^.!]{0,60})?)/i
const UNIT_SPLIT = /(?=\b(?:Chapter\s+\d+|\d{1,3}\.\s+[A-Za-z]))/

function wordsOf(text: string): string[] {
  return text.split(/\s+/).filter(Boolean)
}

function windowBodies(words: string[], target: number, overlap: number): string[] {
  if (words.length <= target) return [words.join(' ')]
  const bodies: string[] = []
  let start = 0
  while (start < words.length) {
    bodies.push(words.slice(start, start + target).join(' '))
    if (start + target >= words.length) break
    start += target - overlap
  }
  return bodies
}

function headingOf(unit: string, previous: string): string {
  const match = unit.match(HEADING)
  return match ? match[1].replace(/[.:]+$/, '').trim() : previous
}

function formatChunk(title: string, page: number, heading: string, body: string): string {
  const needsHeading = Boolean(heading) && !body.toLowerCase().startsWith(heading.toLowerCase())
  const prefix = `${title}, p. ${page}. ${needsHeading ? `${heading}. ` : ''}`
  return `${prefix}${body}`.replace(/\s+/g, ' ').trim()
}

export function chunkPages(pages: RagPage[], meta: RagChunkMeta): RagChunk[] {
  const target = meta.targetWords ?? 400
  const overlap = meta.overlapWords ?? 60
  const chunks: RagChunk[] = []

  for (const page of pages) {
    if (isJunkPage(page.text)) continue
    const cleaned = cleanPageText(page.text)
    if (!cleaned) continue

    const units = cleaned.split(UNIT_SPLIT).map((unit) => unit.trim()).filter(Boolean)
    let heading = ''
    let buffer: string[] = []
    let bufferWords = 0
    let bufferHeading = ''

    const flush = () => {
      if (!buffer.length) return
      for (const body of windowBodies(wordsOf(buffer.join(' ')), target, overlap)) {
        chunks.push({
          book: meta.book,
          title: meta.title,
          page: page.page,
          text: formatChunk(meta.title, page.page, bufferHeading, body),
        })
      }
      buffer = []
      bufferWords = 0
    }

    for (const unit of units) {
      heading = headingOf(unit, heading)
      const count = wordsOf(unit).length
      if (bufferWords && bufferWords + count > target) flush()
      if (!buffer.length) bufferHeading = heading
      buffer.push(unit)
      bufferWords += count
      if (count >= target) flush()
    }
    flush()
  }

  return chunks
}
