import { useState, useRef, useEffect } from 'react'
import { Chapter, Verse } from '../../types'

interface GitaChatbotProps {
  chapters: Chapter[]
}

interface ChatMessage {
  type: 'user' | 'bot'
  content: string
  verses?: Array<{ chapter: number; verse: number; meaning: string; chapterName: string }>
}

const keywordMapping: Record<string, string[]> = {
  stress: ['anxiety', 'worry', 'fear', 'trouble', 'difficulty', 'sorrow', 'grief', 'distress'],
  duty: ['dharma', 'responsibility', 'obligation', 'work', 'action', 'karma', 'righteousness'],
  happiness: ['joy', 'peace', 'bliss', 'contentment', 'satisfaction', 'delight'],
  death: ['mortality', 'afterlife', 'soul', 'spirit', 'rebirth', 'reincarnation'],
  anger: ['rage', 'wrath', 'fury', 'irritation', 'temper'],
  karma: ['action', 'deed', 'work', 'consequence', 'result'],
  meditation: ['yoga', 'contemplation', 'concentration', 'mindfulness', 'dhyana'],
  love: ['devotion', 'affection', 'compassion', 'bhakti', 'attachment'],
  knowledge: ['wisdom', 'understanding', 'insight', 'jnana', 'awareness'],
  detachment: ['renunciation', 'non-attachment', 'vairagya', 'indifference'],
  self: ['soul', 'atman', 'self', 'ego', 'identity'],
  god: ['krishna', 'lord', 'divine', 'supreme', 'brahman', 'ishvara'],
  path: ['way', 'method', 'practice', 'yoga', 'marga'],
  mind: ['thought', 'consciousness', 'intellect', 'buddhi', 'manas'],
  control: ['discipline', 'restraint', 'mastery', 'regulation'],
  peace: ['tranquility', 'calm', 'serenity', 'shanti'],
}

function expandKeywords(query: string): string[] {
  const lowerQuery = query.toLowerCase()
  const keywords = [lowerQuery]
  
  for (const [key, expansions] of Object.entries(keywordMapping)) {
    if (lowerQuery.includes(key)) {
      keywords.push(...expansions)
    }
    for (const expansion of expansions) {
      if (lowerQuery.includes(expansion)) {
        keywords.push(key, ...expansions)
      }
    }
  }
  
  return [...new Set(keywords)]
}

function searchRelevantVerses(
  query: string,
  chapters: Chapter[]
): Array<{ verse: Verse; chapter: Chapter; score: number }> {
  const expandedKeywords = expandKeywords(query)
  const lowerQuery = query.toLowerCase()
  const queryWords = lowerQuery.split(/\s+/).filter((w) => w.length > 2)
  
  const scoredVerses: Array<{ verse: Verse; chapter: Chapter; score: number }> = []
  
  chapters.forEach((chapter) => {
    chapter.verses.forEach((verse) => {
      let score = 0
      const verseText = verse.text.toLowerCase()
      const transliteration = verse.transliteration.toLowerCase()
      const meaning = verse.meaning.toLowerCase()
      const hindiMeaning = verse.hindi_meaning.toLowerCase()
      const chapterSummary = chapter.summary.toLowerCase()
      
      // Exact phrase match (highest priority)
      if (meaning.includes(lowerQuery) || hindiMeaning.includes(lowerQuery)) {
        score += 100
      }
      
      // Expanded keyword matches
      expandedKeywords.forEach((keyword) => {
        if (meaning.includes(keyword)) score += 10
        if (hindiMeaning.includes(keyword)) score += 10
        if (chapterSummary.includes(keyword)) score += 5
      })
      
      // Original word matches
      queryWords.forEach((word) => {
        if (meaning.includes(word)) score += 5
        if (hindiMeaning.includes(word)) score += 5
        if (transliteration.includes(word)) score += 3
        if (verseText.includes(word)) score += 2
        if (chapterSummary.includes(word)) score += 3
      })
      
      if (score > 0) {
        scoredVerses.push({ verse, chapter, score })
      }
    })
  })
  
  // Sort by score and return top 5
  return scoredVerses.sort((a, b) => b.score - a.score).slice(0, 5)
}

function generateResponse(
  query: string,
  chapters: Chapter[]
): Array<{ chapter: number; verse: number; meaning: string; chapterName: string }> {
  const relevantVerses = searchRelevantVerses(query, chapters)
  
  return relevantVerses.map(({ verse, chapter }) => ({
    chapter: chapter.chapter_number,
    verse: verse.verse_number,
    meaning: verse.meaning,
    chapterName: chapter.name_meaning,
  }))
}

export default function GitaChatbot({ chapters }: GitaChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      content: 'Namaste! I am the Gita Chatbot. Ask me questions about life, duty, karma, stress, or any topic, and I will find relevant verses from the Bhagavad Gita for you.',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      type: 'user',
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Generate response
    setTimeout(() => {
      const verses = generateResponse(inputValue, chapters)
      const botMessage: ChatMessage = {
        type: 'bot',
        content: verses.length > 0
          ? `Here are ${verses.length} relevant verse${verses.length > 1 ? 's' : ''} from the Bhagavad Gita:`
          : "I couldn't find specific verses matching your query. Try rephrasing or asking about topics like duty, karma, stress, happiness, meditation, or detachment.",
        verses: verses.length > 0 ? verses : undefined,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-amber-500 text-white rounded-full p-4 shadow-lg hover:bg-amber-600 transition-all duration-300 z-50"
          aria-label="Open Chatbot"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-amber-500 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Gita Chatbot</h3>
              <p className="text-xs text-amber-100">Ask me anything</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-amber-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.verses && message.verses.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.verses.map((verse, vIndex) => (
                        <div
                          key={vIndex}
                          className="bg-amber-50 border border-amber-200 rounded p-2 text-xs"
                        >
                          <div className="font-semibold text-amber-700 mb-1">
                            Chapter {verse.chapter}: {verse.chapterName} - Verse {verse.verse}
                          </div>
                          <div className="text-gray-700">{verse.meaning}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

