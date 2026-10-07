const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'openai/gpt-oss-20b'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })
}

function citeHit(hit) {
  return hit.page > 0 ? `${hit.title} p. ${hit.page}` : hit.title
}

function buildPayload(question, hits, history) {
  const passages = (hits || [])
    .slice(0, 6)
    .map((hit, i) => `[${i + 1}] ${citeHit(hit)}\n${String(hit.text || '').slice(0, 2000)}`)
    .join('\n\n')

  const earlier = (Array.isArray(history) ? history : [])
    .slice(-4)
    .map((turn) => `${turn.role === 'user' ? 'User' : 'Assistant'}: ${String(turn.text || '')}`)
    .join('\n')

  return {
    model: GROQ_MODEL,
    temperature: 0.2,
    max_tokens: 1200,
    messages: [
      {
        role: 'system',
        content:
          'You answer from Hindu scriptures and this site\'s notes, including homepage chapters, Shaktipeeths, Jyotirlingas, Char Dham, and festival pages (Chhath, Diwali, Navratri, Maha Shivaratri, Holi, Janmashtami, Ganesh Chaturthi, Karva Chauth). Prefer PDF passages when they answer the question. If they do not, you MUST use site passages. Never say the books do not say when a site passage answers. Cite PDFs as Title, p. N. Cite site passages as Title (site) or Title (homepage). Reply in 2-4 sentences unless the question asks for a list or a count; then give the list or the number from the passages. Resolve words like them, those, it, and list them from earlier turns. Do not invent verses, other books, or general knowledge beyond the passages.',
      },
      {
        role: 'user',
        content: `${earlier ? `Earlier:\n${earlier}\n\n` : ''}Question: ${question}\n\nPassages:\n${passages}`,
      },
    ],
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS })
    if (request.method !== 'POST') return json({ error: 'POST only' }, 405)

    if (!env.GROQ_API_KEY) return json({ error: 'missing Groq key' }, 500)

    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'invalid json' }, 400)
    }

    const question = String(body.question || '').trim()
    const hits = Array.isArray(body.hits) ? body.hits : []
    if (!question) return json({ error: 'question required' }, 400)
    if (!hits.length) return json({ answer: 'These books do not say.' })

    const history = Array.isArray(body.history) ? body.history : []

    const groq = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildPayload(question, hits, history)),
    })

    if (!groq.ok) {
      const detail = await groq.text()
      return json({ error: 'groq failed', detail: detail.slice(0, 300) }, 502)
    }

    const data = await groq.json()
    const answer = data.choices?.[0]?.message?.content?.trim()
    if (!answer) {
      const detail = JSON.stringify(data.choices?.[0]?.message || data).slice(0, 400)
      return json({ error: 'empty groq answer', detail }, 502)
    }
    return json({ answer })
  },
}
