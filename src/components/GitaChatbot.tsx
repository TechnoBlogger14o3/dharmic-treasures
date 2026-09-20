import { FormEvent, useEffect, useRef, useState } from 'react'
import { answerFromHits } from '../utils/ragAnswer'
import type { RagChunk } from '../utils/ragChunk'
import { searchMatrix, type RagHit } from '../utils/ragSearch'
import { mergeHits, searchSiteText, siteChunksFromChapters, siteChunksFromCollection } from '../utils/siteChunks'

export interface ShastraPdfTarget {
  path: string
  title: string
  titleHindi: string
  page: number
}

interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  text: string
}

interface RagMeta {
  model: string
  dims: number
  count: number
}

interface RagStore {
  meta: RagMeta
  chunks: RagChunk[]
  embeddings: Float32Array
}

let storePromise: Promise<RagStore> | null = null
let sitePromise: Promise<RagChunk[]> | null = null
let embedderPromise: Promise<(text: string) => Promise<Float32Array>> | null = null

async function loadStore(): Promise<RagStore> {
  if (!storePromise) {
    storePromise = (async () => {
      const base = import.meta.env.BASE_URL
      const [metaRes, chunkRes, binRes] = await Promise.all([
        fetch(`${base}rag/shastra-meta.json`),
        fetch(`${base}rag/shastra-chunks.json`),
        fetch(`${base}rag/shastra-embeddings.bin`),
      ])
      if (!metaRes.ok || !chunkRes.ok || !binRes.ok) throw new Error('missing-index')
      const meta = (await metaRes.json()) as RagMeta
      const chunks = (await chunkRes.json()) as RagChunk[]
      const embeddings = new Float32Array(await binRes.arrayBuffer())
      return { meta, chunks, embeddings }
    })().catch((error) => {
      storePromise = null
      throw error
    })
  }
  return storePromise
}

async function loadSiteChunks(): Promise<RagChunk[]> {
  if (!sitePromise) {
    sitePromise = Promise.all([
      import('../../data/gita'),
      import('../../data/hanumanChalisa'),
      import('../../data/sunderkand'),
      import('../../data/bajrangBaan'),
      import('../../data/yakshaPrashn'),
      import('../../data/satyanarayan'),
      import('../../data/shaktipeeths'),
      import('../../data/jyotirlingas'),
      import('../../data/charDham'),
      import('../../data/chhathPuja'),
      import('../../data/diwali'),
    ]).then(
      ([
        gita,
        chalisa,
        sunderkand,
        bajrang,
        yaksha,
        satyanarayan,
        shakti,
        jyoti,
        dham,
        chhath,
        diwali,
      ]) => {
        const chaptersOf = (
          rows: { chapter_number: number; name: string; name_meaning: string; summary: string }[],
          book: string,
          title: string,
        ) =>
          siteChunksFromChapters(
            rows.map(({ chapter_number, name, name_meaning, summary }) => ({
              chapter_number,
              name,
              name_meaning,
              summary,
            })),
            { book, title },
          )

        return [
          ...chaptersOf(gita.gitaChapters, 'gita-site', 'Bhagavad Gita (homepage)'),
          ...chaptersOf(chalisa.hanumanChalisa, 'hanuman-chalisa-site', 'Hanuman Chalisa (site)'),
          ...chaptersOf(sunderkand.sunderkandChapters, 'sunderkand-site', 'Sunderkand (site)'),
          ...chaptersOf(bajrang.bajrangBaan, 'bajrang-baan-site', 'Bajrang Baan (site)'),
          ...chaptersOf(yaksha.yakshaPrashna, 'yaksha-prashna-site', 'Yaksha Prashna (site)'),
          ...chaptersOf(satyanarayan.satyanarayanChapters, 'satyanarayan-site', 'Satyanarayan Vrat Katha (site)'),
          ...siteChunksFromCollection(
            shakti.shaktipeeths.map((item) => ({
              id: item.id,
              name: item.name,
              extra: `${item.deviName}, ${item.bodyPart}, ${item.location}, ${item.state}, ${item.country}. ${item.description}`,
            })),
            {
              book: 'shaktipeeths-site',
              title: 'Shaktipeeths (site)',
              kind: 'Shaktipeeths',
              intro: shakti.shaktipeethIntroduction.contentEnglish,
            },
          ),
          ...siteChunksFromCollection(
            jyoti.jyotirlingas.map((item) => ({
              id: item.id,
              name: item.name,
              extra: `${item.nameHindi}, ${item.location}, ${item.state}. ${item.significance}. ${item.description}`,
            })),
            {
              book: 'jyotirlingas-site',
              title: 'Jyotirlingas (site)',
              kind: 'Jyotirlingas',
              intro: jyoti.jyotirlingaIntroduction.contentEnglish,
            },
          ),
          ...siteChunksFromCollection(
            dham.charDham.map((item) => ({
              id: item.id,
              name: item.name,
              extra: `${item.nameHindi}, ${item.deity}, ${item.location}, ${item.state}. ${item.significance}. ${item.description}`,
            })),
            {
              book: 'char-dham-site',
              title: 'Char Dham (site)',
              kind: 'Char Dham sites',
              intro: dham.charDhamIntroduction.contentEnglish,
            },
          ),
          ...siteChunksFromCollection(
            chhath.chhathDays.map((item) => ({
              id: item.id,
              name: item.name,
              extra: `${item.nameHindi}, ${item.tithi}. ${item.summary}`,
            })),
            {
              book: 'chhath-site',
              title: 'Chhath Puja (site)',
              kind: 'Chhath days',
              intro: chhath.chhathIntroduction.contentEnglish,
            },
          ),
          ...siteChunksFromCollection(
            diwali.diwaliDays.map((item) => ({
              id: item.id,
              name: item.name,
              extra: `${item.nameHindi}, ${item.tithi}. ${item.summary}`,
            })),
            {
              book: 'diwali-site',
              title: 'Diwali (site)',
              kind: 'Diwali days',
              intro: diwali.diwaliIntroduction.contentEnglish,
            },
          ),
        ]
      },
    ).catch((error) => {
      sitePromise = null
      throw error
    })
  }
  return sitePromise
}

async function embedQuery(text: string, model: string): Promise<Float32Array> {
  if (!embedderPromise) {
    embedderPromise = import('@huggingface/transformers').then(async ({ pipeline }) => {
      const extractor = await pipeline('feature-extraction', model)
      return async (value: string) => {
        const output = await extractor(value, { pooling: 'mean', normalize: true })
        const listed = typeof output.tolist === 'function' ? output.tolist() : null
        const data = listed ? (Array.isArray(listed[0]) ? listed[0] : listed) : output.data
        return Float32Array.from(data as ArrayLike<number>)
      }
    })
  }
  const embed = await embedderPromise
  return embed(text)
}

async function askWorker(question: string, hits: RagHit[]): Promise<string | null> {
  const url = import.meta.env.VITE_CHAT_URL || 'https://shastra-chat.dharmic-treasures.workers.dev'
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question,
      hits: hits.map(({ book, title, page, text }) => ({ book, title, page, text })),
    } satisfies { question: string; hits: RagChunk[] }),
  })
  if (!response.ok) throw new Error('worker-failed')
  const data = (await response.json()) as { answer?: string }
  return data.answer ?? null
}

export default function GitaChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const nextId = useRef(0)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, pending])

  const closePanel = () => {
    setIsOpen(false)
    setDraft('')
    setMessages([])
    setPending(false)
  }

  const handleSend = async (event: FormEvent) => {
    event.preventDefault()
    const question = draft.trim()
    if (!question || pending) return

    const userId = ++nextId.current
    setDraft('')
    setPending(true)
    setMessages((prev) => [...prev, { id: userId, role: 'user', text: question }])

    try {
      const store = await loadStore()
      const siteChunks = await loadSiteChunks().catch(() => [])
      const query = await embedQuery(question, store.meta.model)
      const pdfHits = searchMatrix(query, store.embeddings, store.meta.dims, store.chunks, 6)
      const siteHits = searchSiteText(question, siteChunks, 4)
      const hits = mergeHits(pdfHits, siteHits, 6)
      let text = ''
      try {
        text = (await askWorker(question, hits)) ?? answerFromHits(hits)
      } catch {
        text = answerFromHits(hits)
      }
      setMessages((prev) => [...prev, { id: ++nextId.current, role: 'assistant', text }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: ++nextId.current,
          role: 'assistant',
          text: 'Index not built yet. Run npm run index:rag, then refresh.',
        },
      ])
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 bg-saffron text-white rounded-full p-4 shadow-lg hover:bg-saffron-dark active:bg-saffron-dark transition-all duration-300 z-50 touch-manipulation min-w-[56px] min-h-[56px] flex items-center justify-center"
          aria-label="Open Chatbot"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[520px] sm:rounded-xl bg-cream shadow-2xl flex flex-col z-50 border-0 sm:border border-gold">
          <div className="bg-saffron text-white p-4 sm:rounded-t-xl flex items-center justify-between flex-shrink-0">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Shastra Chat</h3>
              <p className="text-xs text-cream">Answers from the PDFs and this site</p>
            </div>
            <button
              onClick={closePanel}
              className="text-white hover:text-cream transition-colors p-2 -mr-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close Chatbot"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-saffron-light/40 space-y-3">
            {messages.length === 0 ? (
              <div className="bg-cream border border-gold rounded-xl p-5 text-sm text-ink/70">
                Ask in English. The reply is grounded in the Gita, Mahabharata, Ramayana, and Shiva Purana. Try:{' '}
                <span className="text-maroon">Who was Kansa?</span> or{' '}
                <span className="text-maroon">What does Krishna tell Arjuna about duty?</span>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <p
                    className={`max-w-[90%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-saffron text-white'
                        : 'bg-cream border border-gold text-ink'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))
            )}
            {pending ? <p className="text-sm text-ink/60">Looking in the books…</p> : null}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="flex-shrink-0 border-t border-gold bg-cream p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask the shastras…"
              aria-label="Ask the shastras"
              className="flex-1 min-w-0 px-3 py-2 border border-gold rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent outline-none bg-cream text-ink text-base sm:text-sm min-h-[56px]"
            />
            <button
              type="submit"
              disabled={pending}
              className="bg-saffron text-white rounded-lg px-3 shadow-sm hover:bg-saffron-dark disabled:opacity-50 touch-manipulation min-w-[56px] min-h-[56px] text-sm font-medium"
            >
              Ask
            </button>
          </form>
        </div>
      )}
    </>
  )
}
