import { useEffect, useState } from 'react'
import { aartis } from '../../data/aarti'
import { shareSearch } from '../utils/shareLink'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import BookmarkButton from './BookmarkButton'

interface AartiViewProps {
  chapterNumber: number
  onBack: () => void
  onNavigate: (chapterNumber: number) => void
}

export default function AartiView({ chapterNumber, onBack, onNavigate }: AartiViewProps) {
  const index = aartis.findIndex((hymn) => hymn.chapter_number === chapterNumber)
  const hymn = aartis[index]
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [chapterNumber])

  if (!hymn) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-ink/70">यह आरती नहीं मिली।</p>
        <button type="button" onClick={onBack} className="mt-4 text-maroon underline">
          सभी आरती
        </button>
      </div>
    )
  }

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}${shareSearch({
      textType: 'aarti',
      chapter: hymn.chapter_number,
      verse: 1,
    })}`
    const text = `${hymn.nameHindi}\n\n${hymn.stanzas.map((stanza) => stanza.text).join('\n\n')}`
    if (navigator.share) {
      try {
        await navigator.share({ title: hymn.nameHindi, text, url })
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
        <span>सभी आरती</span>
      </button>

      <div className="text-center mb-8">
        <div className="text-4xl mb-2" aria-hidden="true">
          🪔
        </div>
        <div className="text-xs tracking-[0.2em] text-saffron">{hymn.deityHindi}</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon mt-2">{hymn.nameHindi}</h1>
        <div className="mt-5 flex items-center justify-center gap-2">
          <BookmarkButton
            textType="aarti"
            chapterNumber={hymn.chapter_number}
            verseNumber={1}
            chapterName={hymn.nameHindi}
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
        {hymn.stanzas.map((stanza) => (
          <article
            key={stanza.id}
            className={`rounded-2xl p-5 sm:p-6 ${
              stanza.refrain
                ? 'bg-saffron/10 border-2 border-gold shadow-md'
                : 'folio border border-gold/50'
            }`}
          >
            {stanza.refrain ? (
              <div className="text-[11px] tracking-[0.18em] text-saffron mb-3"></div>
            ) : null}
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
          onClick={() => onNavigate(aartis[index - 1].chapter_number)}
          className="px-4 py-2.5 rounded-lg border border-gold text-maroon disabled:opacity-40 touch-manipulation min-h-[44px]"
        >
          पिछली आरती
        </button>
        <button
          type="button"
          disabled={index >= aartis.length - 1}
          onClick={() => onNavigate(aartis[index + 1].chapter_number)}
          className="px-4 py-2.5 rounded-lg border border-gold text-maroon disabled:opacity-40 touch-manipulation min-h-[44px]"
        >
          अगली आरती
        </button>
      </div>
    </div>
  )
}
