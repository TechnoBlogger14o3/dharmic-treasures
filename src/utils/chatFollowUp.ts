const BOOK_ENTITIES: { book: string; names: RegExp }[] = [
  {
    book: 'ramayana',
    names:
      /\b(manthara?|manthra|kaikeyi|dasharath[ae]?|dasarath[ae]?|kausalya|sumitra|lakshman[ae]?|shatrughna|janaki|vaidehi|sita|ravana?|sugriva|vibhishan[ae]?|mandodari|maricha|jatayu|sampati)\b/i,
  },
]

export function inferBookHint(query: string): string | null {
  for (const row of BOOK_ENTITIES) {
    if (row.names.test(query)) return row.book
  }
  return null
}

export function expandSearchQuery(query: string): string {
  const q = query.trim()
  const book = inferBookHint(q)
  if (!book) return q
  const stem = book.replace(/a$/, '')
  if (new RegExp(stem, 'i').test(q)) return q
  return `${q} ${book}`
}

function bookStem(name: string): string {
  return name.split(/\s+/)[0].replace(/a$/, '')
}

const BOOK_HINT =
  /gita|gitā|ramayan|mahabharat|purana|shakti|jyotir|dham|chhath|diwali|navratri|durga|dussehra|chalisa|sunder|bajrang|yaksha|satyanarayan|vishnu|shiva|shivaratri|holi|holika|janmashtami|ganesh|karva|temple|mandir|tirupati|meenakshi|kashi|jagannath/i

const PRONOUN = /\b(them|those|these|it|that|this|they)\b/i
const NEW_PERSON = /^(who|what|where|when|why)\s+(is|was|were|are|did|does|do)\s+\S+/i

export function isFollowUp(question: string, topicQuery = ''): boolean {
  const words = question.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return false
  if (NEW_PERSON.test(question) && !PRONOUN.test(question)) return false
  const asked = inferBookHint(question)
  const prior = inferBookHint(topicQuery)
  if (asked && asked !== prior && !PRONOUN.test(question)) return false
  return PRONOUN.test(question) || (words.length <= 4 && !BOOK_HINT.test(question))
}

export function resolveChatQuery(
  question: string,
  topicQuery: string,
): { searchQuery: string; nextTopic: string; retrievalQuery: string } {
  const q = question.trim()
  if (!topicQuery.trim() || !isFollowUp(q, topicQuery)) {
    return { searchQuery: q, nextTopic: q, retrievalQuery: expandSearchQuery(q) }
  }
  const searchQuery = `${topicQuery.trim()} ${q}`
  return { searchQuery, nextTopic: topicQuery.trim(), retrievalQuery: expandSearchQuery(searchQuery) }
}

export function hintedBookStem(query: string): string | null {
  const book = inferBookHint(query)
  return book ? bookStem(book) : null
}
