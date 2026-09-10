export interface ShastraSource {
  id: string
  title: string
  titleHindi: string
  kind: string
  chunkCount: number
  skippedPages?: number
  publicPdf?: string
}

export interface ShastraChunk {
  id: string
  sourceId: string
  title: string
  page?: number
  chapter?: number
  verse?: number
  text: string
}

export interface ShastraIndex {
  version: number
  builtAt: string
  sources: ShastraSource[]
  chunks: ShastraChunk[]
}

export interface ShastraHit {
  chunk: ShastraChunk
  score: number
}

export interface ShastraAnswer {
  answer: string
  passages: ShastraChunk[]
}

const STOP = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'are', 'was', 'were',
  'what', 'when', 'who', 'how', 'why', 'you', 'your', 'about', 'of', 'a', 'an',
  'is', 'his', 'her', 'him', 'their', 'they', 'she', 'he', 'it', 'its', 'be',
  'been', 'have', 'has', 'had', 'did', 'does', 'do', 'not', 'but', 'or', 'if',
  'into', 'than', 'then', 'them', 'lord', 'shri', 'sri', 'shree', 'thee',
])

const ALIASES: Record<string, string[]> = {
  ram: ['राम', 'rama', 'raam', 'श्रीराम'],
  raam: ['राम', 'ram', 'rama', 'श्रीराम'],
  rama: ['राम', 'ram', 'raam', 'श्रीराम'],
  राम: ['ram', 'rama', 'raam', 'श्रीराम'],
  sita: ['सीता', 'seeta', 'janaki', 'जानकी'],
  seeta: ['सीता', 'sita', 'जानकी'],
  सीता: ['sita', 'seeta', 'janaki'],
  hanuman: ['हनुमान', 'hanumanji', 'मारुति', 'पवनपुत्र'],
  हनुमान: ['hanuman', 'hanumanji'],
  dasharath: ['दशरथ', 'dasharatha', 'dasaratha', 'dasarath'],
  dasharatha: ['दशरथ', 'dasharath', 'dasaratha'],
  दशरथ: ['dasharatha', 'dasharath', 'dasaratha'],
  father: ['पिता', 'पुत्र'],
  pita: ['पिता', 'father'],
  पिता: ['father'],
  mother: ['माता', 'माँ'],
  wife: ['पत्नी', 'स्त्री'],
  son: ['पुत्र', 'बेटा'],
  पुत्र: ['son'],
  shiva: ['शिव', 'शंकर', 'shiv', 'siva', 'महादेव', 'ȳशव', 'ȷशव'],
  shiv: ['शिव', 'शंकर', 'shiva', 'siva', 'महादेव'],
  siva: ['शिव', 'शंकर', 'shiva'],
  शिव: ['शंकर', 'shiva', 'shiv', 'महादेव'],
  shankar: ['शंकर', 'शिव', 'shiva'],
  शंकर: ['शिव', 'shiva', 'shankar'],
  parvati: ['पार्वती', 'गौरी', 'उमा'],
  पार्वती: ['parvati', 'गौरी', 'उमा'],
  vishnu: ['विष्णु', 'नारायण', 'हरी'],
  विष्णु: ['vishnu', 'नारायण'],
  narayan: ['नारायण', 'विष्णु', 'vishnu'],
}

const RELATIONS: Array<{ groups: string[][]; extra: string[] }> = [
  { groups: [['father', 'पिता', 'pita'], ['ram', 'raam', 'rama', 'राम', 'श्रीराम']], extra: ['दशरथ', 'dasharatha'] },
  { groups: [['mother', 'माता'], ['ram', 'raam', 'rama', 'राम', 'श्रीराम']], extra: ['कौशल्या', 'kaushalya'] },
  { groups: [['wife', 'पत्नी'], ['ram', 'raam', 'rama', 'राम', 'श्रीराम']], extra: ['सीता', 'sita'] },
  { groups: [['father', 'पिता', 'pita'], ['sita', 'सीता', 'seeta', 'janaki']], extra: ['जनक', 'janaka'] },
  { groups: [['father', 'पिता', 'pita'], ['hanuman', 'हनुमान']], extra: ['पवन', 'vayu', 'केसरी'] },
]

const GROUNDED_FACTS: Array<{
  wants: (terms: Set<string>) => boolean
  evidence: (text: string) => boolean
  answer: string
}> = [
  {
    wants: (terms) => hasAny(terms, ['father', 'पिता', 'pita']) && hasAny(terms, ['ram', 'raam', 'rama', 'राम', 'श्रीराम']),
    evidence: (text) => text.includes('दशरथ') && (text.includes('राम') || /rama/i.test(text)),
    answer: 'King Dasharatha (दशरथ) of Ayodhya was the father of Shri Rama.',
  },
  {
    wants: (terms) => hasAny(terms, ['mother', 'माता']) && hasAny(terms, ['ram', 'raam', 'rama', 'राम', 'श्रीराम']),
    evidence: (text) => text.includes('कौशल्या') && text.includes('राम'),
    answer: 'Kaushalya (कौशल्या) was the mother of Shri Rama.',
  },
  {
    wants: (terms) => hasAny(terms, ['father', 'पिता', 'pita']) && hasAny(terms, ['sita', 'सीता', 'seeta', 'janaki', 'जानकी']),
    evidence: (text) => text.includes('जनक') && text.includes('सीता'),
    answer: 'King Janaka (जनक) of Mithila was the father of Sita.',
  },
]

const RAMAYAN_HINTS = ['ram', 'raam', 'rama', 'राम', 'sita', 'सीता', 'hanuman', 'हनुमान', 'ayodhya', 'अयोध्या', 'lanka', 'लंका', 'dasharath', 'दशरथ']
const GITA_HINTS = ['krishna', 'कृष्ण', 'arjuna', 'अर्जुन', 'gita', 'गीता', 'kurukshetra', 'pandava']
const SHIV_HINTS = ['shiva', 'shiv', 'siva', 'शिव', 'शंकर', 'shankar', 'parvati', 'पार्वती', 'rudra', 'linga', 'lingam', 'महादेव', 'ȳशव', 'ȷशव']
const VISHNU_HINTS = ['vishnu', 'विष्णु', 'narayan', 'नारायण']

function hasAny(terms: Set<string>, candidates: string[]): boolean {
  return candidates.some((item) => terms.has(item))
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function tokens(query: string): string[] {
  return normalize(query)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => word.length > 1 && !STOP.has(word))
}

export function stripShastraGarbage(text: string): string {
  return [...text]
    .filter((char) => {
      const code = char.codePointAt(0) ?? 0
      if (/\s/u.test(char)) return true
      if (code >= 0x30 && code <= 0x39) return true
      if (code >= 0x0966 && code <= 0x096f) return true
      if (code >= 0x0900 && code <= 0x097f) return true
      if (code >= 0x41 && code <= 0x5a) return true
      if (code >= 0x61 && code <= 0x7a) return true
      if (code >= 0xc0 && code <= 0x024f) return true
      if ('.,;:!?()[]{}\'"“”‘’—–-/|'.includes(char)) return true
      return false
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}

function expandTerms(query: string): Set<string> {
  const words = tokens(query)
  const terms = new Set(words)
  for (const word of words) {
    for (const alias of ALIASES[word] ?? []) {
      terms.add(alias)
    }
  }
  for (const relation of RELATIONS) {
    const matched = relation.groups.every((group) => group.some((item) => terms.has(item)))
    if (matched) {
      for (const extra of relation.extra) terms.add(extra)
    }
  }
  return terms
}

function containsTerm(hay: string, term: string): boolean {
  if (term.length < 2) return false
  if (/[\u0900-\u097F]/.test(term)) {
    return hay.includes(term)
  }
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:[^a-z0-9]|$)`, 'i').test(hay)
}

function citation(chunk: ShastraChunk): string {
  if (chunk.chapter && chunk.verse) {
    return `${chunk.title} ${chunk.chapter}.${chunk.verse}`
  }
  if (chunk.page) {
    return `${chunk.title}, p. ${chunk.page}`
  }
  return chunk.title
}

function bestSnippet(text: string, terms: Set<string>): string {
  const parts = text.split(/(?<=[।.?!])\s+/).filter((part) => part.trim().length > 12)
  if (!parts.length) return text.slice(0, 280)
  let best = parts[0]
  let bestScore = -1
  for (const part of parts) {
    const hay = normalize(part)
    let score = 0
    for (const term of terms) {
      if (containsTerm(hay, term) || part.includes(term)) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = part
    }
  }
  return best.length > 320 ? `${best.slice(0, 317)}...` : best
}

function evidenceScore(chunk: ShastraChunk): number {
  const text = chunk.text
  let score = 0
  if (/राजा दशरथ|पिता दशरथ/.test(text)) score += 5
  if (text.includes('पुत्र') && text.includes('दशरथ')) score += 4
  if (chunk.page && chunk.page > 11) score += 2
  if (chunk.page && chunk.page <= 11) score -= 4
  return score
}

export function searchShastraIndex(
  query: string,
  index: ShastraIndex,
  sourceId: string | 'all' = 'all',
  limit = 5
): ShastraHit[] {
  const terms = expandTerms(query)
  if (!terms.size) return []

  const preferRamayan = hasAny(terms, RAMAYAN_HINTS) && !hasAny(terms, GITA_HINTS) && !hasAny(terms, SHIV_HINTS) && !hasAny(terms, VISHNU_HINTS)
  const preferGita = hasAny(terms, GITA_HINTS) && !hasAny(terms, RAMAYAN_HINTS) && !hasAny(terms, SHIV_HINTS)
  const preferShiv = hasAny(terms, SHIV_HINTS) && !hasAny(terms, RAMAYAN_HINTS) && !hasAny(terms, GITA_HINTS)
  const preferVishnu = hasAny(terms, VISHNU_HINTS) && !hasAny(terms, RAMAYAN_HINTS) && !hasAny(terms, GITA_HINTS) && !hasAny(terms, SHIV_HINTS)
  const hits: ShastraHit[] = []

  for (const chunk of index.chunks) {
    if (sourceId !== 'all' && chunk.sourceId !== sourceId) continue
    const cleaned = stripShastraGarbage(chunk.text)
    const hay = normalize(cleaned)
    if (!hay) continue

    let matched = 0
    let score = 0
    for (const term of terms) {
      if (containsTerm(hay, term) || cleaned.includes(term)) {
        matched += 1
        score += term.length > 3 ? 14 : 7
        if (['दशरथ', 'dasharatha', 'जनक', 'janaka', 'कौशल्या', 'सीता', 'राम', 'श्रीराम', 'शंकर', 'शिव', 'विष्णु'].includes(term)) {
          score += 18
        }
      }
    }
    if (matched === 0) continue

    score += matched * 8
    if (preferRamayan && chunk.sourceId === 'ramayan') score += 20
    if (preferGita && chunk.sourceId === 'gita') score += 20
    if (preferShiv && chunk.sourceId === 'shiv-puran') score += 24
    if (preferVishnu && chunk.sourceId === 'vishnu-puran') score += 24
    if (cleaned.length < 50) score -= 8
    if (chunk.page && chunk.page <= 11) score -= 28
    if (/राजा दशरथ|पिता दशरथ/.test(cleaned)) score += 24
    if (cleaned.includes('पुत्र') && cleaned.includes('दशरथ')) score += 16
    hits.push({ chunk, score })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}

export function composeShastraAnswer(query: string, hits: ShastraHit[]): ShastraAnswer {
  const terms = expandTerms(query)
  const passages = hits
    .map((hit) => ({
      ...hit.chunk,
      text: stripShastraGarbage(hit.chunk.text) || hit.chunk.text,
    }))
    .filter((chunk) => chunk.text.length > 12)
    .sort((a, b) => evidenceScore(b) - evidenceScore(a))
    .slice(0, 3)

  if (!hits.length || !passages.length) {
    return {
      answer: `I could not find a matching passage for "${query}". Try another word, or switch source. I only answer from the indexed books.`,
      passages: [],
    }
  }

  for (const fact of GROUNDED_FACTS) {
    if (fact.wants(terms) && hits.some((hit) => fact.evidence(stripShastraGarbage(hit.chunk.text)))) {
      return { answer: fact.answer, passages }
    }
  }

  const best = passages[0]
  return {
    answer: `According to ${citation(best)}:\n${bestSnippet(best.text, terms)}`,
    passages,
  }
}

let cached: Promise<ShastraIndex> | null = null

export function loadShastraIndex(): Promise<ShastraIndex> {
  if (!cached) {
    const url = `${import.meta.env.BASE_URL}rag/shastra-index.json`.replace(/\/{2,}/g, '/')
    cached = fetch(url).then(async (response) => {
      if (!response.ok) {
        throw new Error('Shastra index missing. Run npm run index:shastras')
      }
      return response.json() as Promise<ShastraIndex>
    })
  }
  return cached
}
