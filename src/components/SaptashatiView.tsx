import { useEffect, useState } from 'react'
import { saptashatiCopyrightYear, saptashatiPath } from '../../data/durgaSaptashati'
import { shareSearch } from '../utils/shareLink'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import BookmarkButton from './BookmarkButton'

interface SaptashatiViewProps {
  chapterNumber: number
  onBack: () => void
  onNavigate: (chapterNumber: number) => void
}

export default function SaptashatiView({ chapterNumber, onBack, onNavigate }: SaptashatiViewProps) {
  const index = saptashatiPath.findIndex((section) => section.chapter_number === chapterNumber)
  const section = saptashatiPath[index]
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [chapterNumber])

  if (!section) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-ink/70">यह पाठ नहीं मिला।</p>
        <button type="button" onClick={onBack} className="mt-4 text-maroon underline">
          नवरात्रि
        </button>
      </div>
    )
  }

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}${shareSearch({
      textType: 'navratri',
      chapter: section.chapter_number,
      verse: 1,
    })}`
    const text = `${section.nameHindi}\n\n${section.stanzas.map((stanza) => stanza.text).join('\n\n')}`
    if (navigator.share) {
      try {
        await navigator.share({ title: section.nameHindi, text, url })
      } catch {
        /* cancelled */
      }
      return
    }
    await navigator.clipboard.writeText(`${text}\n\n${url}`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-3xl">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-maroon hover:text-saffron mb-6 touch-manipulation min-h-[44px]"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>नवरात्रि</span>
      </button>

      <div className="text-center mb-8">
        <div className="text-4xl mb-2" aria-hidden="true">
          🪔
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon mt-2">{section.nameHindi}</h1>
        <p className="text-sm text-ink/60 mt-2">{section.summary}</p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <BookmarkButton
            textType="navratri"
            chapterNumber={section.chapter_number}
            verseNumber={1}
            chapterName={section.nameHindi}
          />
          <button
            type="button"
            onClick={share}
            className="px-4 py-2.5 bg-saffron text-white rounded-lg text-sm font-medium hover:bg-saffron-dark touch-manipulation min-h-[44px]"
          >
            {copied ? 'प्रतिलिपि' : 'साझा करें'}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {section.stanzas.map((stanza) => (
          <article key={stanza.id} className="folio border border-gold/50 rounded-2xl p-5 sm:p-6">
            <p className="font-serif text-xl sm:text-2xl text-maroon leading-relaxed whitespace-pre-line text-center">
              {stanza.text}
            </p>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 mt-8 mb-4">
        <button
          type="button"
          disabled={index <= 0}
          onClick={() => onNavigate(saptashatiPath[index - 1].chapter_number)}
          className="px-4 py-2.5 rounded-lg border border-gold text-maroon disabled:opacity-40 touch-manipulation min-h-[44px]"
        >
          पिछला पाठ
        </button>
        <button
          type="button"
          disabled={index >= saptashatiPath.length - 1}
          onClick={() => onNavigate(saptashatiPath[index + 1].chapter_number)}
          className="px-4 py-2.5 rounded-lg border border-gold text-maroon disabled:opacity-40 touch-manipulation min-h-[44px]"
        >
          अगला पाठ
        </button>
      </div>
      <p className="text-xs text-ink/45 leading-relaxed text-center mb-6">{saptashatiCopyrightYear().hindi}</p>
    </div>
  )
}
