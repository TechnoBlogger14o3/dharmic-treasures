import type { RagHit } from './ragSearch'

export const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
export const GROQ_MODEL = 'openai/gpt-oss-20b'

export interface GroqPayload {
  model: string
  temperature: number
  max_tokens: number
  messages: { role: 'system' | 'user'; content: string }[]
}

function citeHit(hit: RagHit): string {
  return hit.page > 0 ? `${hit.title} p. ${hit.page}` : hit.title
}

export function answerFromHits(hits: RagHit[]): string {
  if (!hits.length) return 'These books do not say.'
  return hits
    .slice(0, 2)
    .map((hit) => `${hit.text}\n\n— ${hit.page > 0 ? `${hit.title}, p. ${hit.page}` : hit.title}`)
    .join('\n\n')
}

export function buildGroqPayload(question: string, hits: RagHit[]): GroqPayload {
  const passages = hits
    .slice(0, 6)
    .map((hit, i) => `[${i + 1}] ${citeHit(hit)}\n${hit.text}`)
    .join('\n\n')

  return {
    model: GROQ_MODEL,
    temperature: 0.2,
    max_tokens: 1200,
    messages: [
      {
        role: 'system',
        content:
          'You answer from Hindu scriptures and this site\'s notes, including homepage chapters, Shaktipeeths, Jyotirlingas, Char Dham, and festival pages. Prefer PDF passages when they answer the question. If they do not, you MUST use site passages. Never say the books do not say when a site passage answers. Cite PDFs as Title, p. N. Cite site passages as Title (site) or Title (homepage). Reply in 2-4 sentences unless the question asks for a list or a count; then give the list or the number from the passages. Do not invent verses, other books, or general knowledge beyond the passages.',
      },
      {
        role: 'user',
        content: `Question: ${question}\n\nPassages:\n${passages}`,
      },
    ],
  }
}
