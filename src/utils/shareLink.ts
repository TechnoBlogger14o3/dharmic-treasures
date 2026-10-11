import type { TextType } from '../../types.ts'

const TEXT_TYPES = new Set<TextType>([
  'gita',
  'aarti',
  'hanumanChalisa',
  'sunderkand',
  'bajrangBaan',
  'yakshaPrashna',
  'satyanarayan',
  'shaktipeeths',
  'charDham',
  'jyotirlingas',
  'temples',
  'chhath',
  'diwali',
  'navratri',
  'shivaratri',
  'holi',
  'janmashtami',
  'ganeshChaturthi',
  'karvaChauth',
  'shastras',
])

export type ShareTarget = {
  bookmarks: boolean
  textType: TextType | null
  chapter: number | null
  verse: number
}

function asTextType(value: string | null): TextType | null {
  if (!value || !TEXT_TYPES.has(value as TextType)) return null
  return value as TextType
}

function asPositiveInt(value: string | null): number | null {
  if (!value) return null
  const n = Number(value)
  if (!Number.isInteger(n) || n < 1) return null
  return n
}

export function parseShareQuery(search: string): ShareTarget | null {
  const query = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  if (query.get('view') === 'bookmarks') {
    return { bookmarks: true, textType: null, chapter: null, verse: 1 }
  }

  const chapter = asPositiveInt(query.get('chapter'))
  const verse = asPositiveInt(query.get('verse')) ?? 1
  const rawText = query.get('text')
  if (rawText) {
    const textType = asTextType(rawText)
    if (!textType) return null
    return { bookmarks: false, textType, chapter, verse }
  }
  if (!chapter) return null
  return { bookmarks: false, textType: 'gita', chapter, verse }
}

export function shareSearch(input: {
  bookmarks?: boolean
  textType?: TextType | null
  chapter?: number | null
  verse?: number
}): string {
  if (input.bookmarks) return '?view=bookmarks'
  if (!input.textType) return ''
  const query = new URLSearchParams()
  query.set('text', input.textType)
  if (input.chapter != null) {
    query.set('chapter', String(input.chapter))
    query.set('verse', String(input.verse ?? 1))
  }
  return `?${query.toString()}`
}
