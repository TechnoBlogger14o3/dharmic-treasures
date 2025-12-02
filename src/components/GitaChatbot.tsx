import { useState, useRef, useEffect } from 'react'
import { Chapter, Verse } from '../../types'

interface ChatMessage {
  type: 'user' | 'bot' | 'loading'
  content: string
  verses?: Array<{ chapter: number; verse: number; meaning: string; chapterName: string; verseId?: number }>
}

const keywordMapping: Record<string, string[]> = {
  stress: ['anxiety', 'worry', 'fear', 'trouble', 'difficulty', 'sorrow', 'grief', 'distress', 'tension', 'pressure', 'strain'],
  duty: ['dharma', 'responsibility', 'obligation', 'work', 'action', 'karma', 'righteousness', 'purpose', 'calling'],
  happiness: ['joy', 'peace', 'bliss', 'contentment', 'satisfaction', 'delight', 'pleasure', 'cheer', 'gladness'],
  death: ['mortality', 'afterlife', 'soul', 'spirit', 'rebirth', 'reincarnation', 'moksha', 'liberation', 'immortality'],
  anger: ['rage', 'wrath', 'fury', 'irritation', 'temper', 'resentment', 'hostility', 'annoyance'],
  karma: ['action', 'deed', 'work', 'consequence', 'result', 'fate', 'destiny', 'deeds', 'activities'],
  meditation: ['yoga', 'contemplation', 'concentration', 'mindfulness', 'dhyana', 'samadhi', 'practice', 'sadhana'],
  love: ['devotion', 'affection', 'compassion', 'bhakti', 'attachment', 'care', 'kindness', 'mercy'],
  knowledge: ['wisdom', 'understanding', 'insight', 'jnana', 'awareness', 'learning', 'education', 'enlightenment'],
  detachment: ['renunciation', 'non-attachment', 'vairagya', 'indifference', 'dispassion', 'unattached'],
  self: ['soul', 'atman', 'self', 'ego', 'identity', 'individual', 'person', 'being'],
  god: ['krishna', 'lord', 'divine', 'supreme', 'brahman', 'ishvara', 'deity', 'almighty', 'creator'],
  path: ['way', 'method', 'practice', 'yoga', 'marga', 'route', 'approach', 'technique'],
  mind: ['thought', 'consciousness', 'intellect', 'buddhi', 'manas', 'mental', 'thinking', 'awareness'],
  control: ['discipline', 'restraint', 'mastery', 'regulation', 'self-control', 'willpower', 'restraint'],
  peace: ['tranquility', 'calm', 'serenity', 'shanti', 'quiet', 'stillness', 'harmony'],
  success: ['achievement', 'victory', 'triumph', 'accomplishment', 'prosperity', 'wealth'],
  failure: ['defeat', 'loss', 'mistake', 'error', 'defeat', 'downfall'],
  guidance: ['direction', 'advice', 'counsel', 'instruction', 'teaching', 'guidance'],
  purpose: ['meaning', 'goal', 'aim', 'objective', 'intention', 'reason'],
  suffering: ['pain', 'misery', 'agony', 'torment', 'hardship', 'adversity'],
  devotion: ['worship', 'prayer', 'bhakti', 'faith', 'dedication', 'surrender'],
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
  const lowerQuery = query.toLowerCase().trim()
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
      const chapterName = chapter.name_meaning.toLowerCase()
      
      // Exact phrase match in meaning (highest priority)
      if (meaning.includes(lowerQuery)) {
        score += 150
      }
      if (hindiMeaning.includes(lowerQuery)) {
        score += 120
      }
      
      // Exact phrase match in chapter name/summary
      if (chapterName.includes(lowerQuery) || chapterSummary.includes(lowerQuery)) {
        score += 80
      }
      
      // Word boundary matches (more precise)
      const wordBoundaryRegex = new RegExp(`\\b${lowerQuery.replace(/\s+/g, '\\s+')}\\b`, 'i')
      if (wordBoundaryRegex.test(meaning)) score += 50
      if (wordBoundaryRegex.test(hindiMeaning)) score += 40
      
      // Expanded keyword matches (weighted by importance)
      expandedKeywords.forEach((keyword) => {
        if (meaning.includes(keyword)) score += 15
        if (hindiMeaning.includes(keyword)) score += 12
        if (chapterSummary.includes(keyword)) score += 8
        if (chapterName.includes(keyword)) score += 10
      })
      
      // Original word matches
      queryWords.forEach((word) => {
        if (word.length > 3) { // Longer words are more significant
          if (meaning.includes(word)) score += 8
          if (hindiMeaning.includes(word)) score += 6
        } else {
          if (meaning.includes(word)) score += 4
          if (hindiMeaning.includes(word)) score += 3
        }
        if (transliteration.includes(word)) score += 3
        if (verseText.includes(word)) score += 2
        if (chapterSummary.includes(word)) score += 4
      })
      
      if (score > 0) {
        scoredVerses.push({ verse, chapter, score })
      }
    })
  })
  
  // Sort by score and return top 7 (increased from 5)
  return scoredVerses.sort((a, b) => b.score - a.score).slice(0, 7)
}

function generateResponse(
  query: string,
  chapters: Chapter[]
): Array<{ chapter: number; verse: number; meaning: string; chapterName: string; verseId: number }> {
  const relevantVerses = searchRelevantVerses(query, chapters)
  
  return relevantVerses.map(({ verse, chapter }) => ({
    chapter: chapter.chapter_number,
    verse: verse.verse_number,
    meaning: verse.meaning,
    chapterName: chapter.name_meaning,
    verseId: verse.id,
  }))
}

interface GitaChatbotProps {
  chapters: Chapter[]
  onNavigateToVerse?: (chapterNumber: number, verseNumber: number) => void
}

export default function GitaChatbot({ chapters, onNavigateToVerse }: GitaChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      content: 'Namaste! 🙏 I am the Gita Chatbot. Ask me questions about life, duty, karma, stress, happiness, or any topic, and I will find relevant verses from the Bhagavad Gita for you.',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      type: 'user',
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    const query = inputValue
    setInputValue('')
    setIsLoading(true)

    // Add loading message
    const loadingMessage: ChatMessage = {
      type: 'loading',
      content: 'Searching the Bhagavad Gita...',
    }
    setMessages((prev) => [...prev, loadingMessage])

    // Generate response
    setTimeout(() => {
      setIsLoading(false)
      const verses = generateResponse(query, chapters)
      
      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.type !== 'loading'))
      
      const botMessage: ChatMessage = {
        type: 'bot',
        content: verses.length > 0
          ? `I found ${verses.length} relevant verse${verses.length > 1 ? 's' : ''} from the Bhagavad Gita. Click on any verse to read it in detail:`
          : `I couldn't find specific verses matching "${query}". Try asking about:\n\n• Duty and Dharma\n• Karma and Actions\n• Stress and Worry\n• Happiness and Peace\n• Meditation and Yoga\n• Detachment and Renunciation\n• Knowledge and Wisdom\n• Devotion and Bhakti\n\nOr rephrase your question with different words.`,
        verses: verses.length > 0 ? verses : undefined,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 800)
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
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 bg-amber-500 text-white rounded-full p-4 shadow-lg hover:bg-amber-600 active:bg-amber-700 transition-all duration-300 z-50 animate-pulse-slow hover:animate-none touch-manipulation min-w-[56px] min-h-[56px] flex items-center justify-center"
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
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] sm:rounded-xl bg-white shadow-2xl flex flex-col z-50 border-0 sm:border border-gray-200">
          {/* Header */}
          <div className="bg-amber-500 text-white p-4 sm:rounded-t-xl flex items-center justify-between flex-shrink-0">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Gita Chatbot</h3>
              <p className="text-xs text-amber-100">Ask me anything</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-amber-100 active:text-amber-200 transition-colors p-2 -mr-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close Chatbot"
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
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                >
                  {message.type === 'loading' ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-500 border-t-transparent"></div>
                      <p className="text-sm text-gray-600">{message.content}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.verses && message.verses.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.verses.map((verse, vIndex) => (
                            <div
                              key={vIndex}
                              onClick={() => {
                                if (onNavigateToVerse) {
                                  setIsOpen(false)
                                  onNavigateToVerse(verse.chapter, verse.verse)
                                }
                              }}
                              className={`bg-amber-50 border border-amber-200 rounded p-2 text-xs ${
                                onNavigateToVerse ? 'cursor-pointer hover:bg-amber-100 hover:border-amber-300 transition-colors' : ''
                              }`}
                            >
                              <div className="font-semibold text-amber-700 mb-1">
                                Chapter {verse.chapter}: {verse.chapterName} - Verse {verse.verse}
                                {onNavigateToVerse && (
                                  <span className="ml-2 text-amber-600 text-[10px]">(Click to read)</span>
                                )}
                              </div>
                              <div className="text-gray-700">{verse.meaning}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white sm:rounded-b-xl flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm min-h-[44px]"
              />
              <button
                onClick={handleSend}
                className="bg-amber-500 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-amber-600 active:bg-amber-700 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Send message"
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

