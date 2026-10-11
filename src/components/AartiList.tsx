import { aartis } from '../../data/aarti'

interface AartiListProps {
  onSelect: (chapterNumber: number) => void
}

export default function AartiList({ onSelect }: AartiListProps) {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 max-w-5xl">
      <h1 className="sr-only">आरती</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {aartis.map((hymn) => (
          <button
            key={hymn.id}
            type="button"
            onClick={() => onSelect(hymn.chapter_number)}
            className="folio text-left rounded-2xl p-5 sm:p-6 hover:shadow-2xl active:scale-[0.99] transition-all touch-manipulation border border-gold/60"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-saffron/15 border border-gold flex items-center justify-center text-2xl"
                aria-hidden="true"
              >
                🪔
              </div>
              <div className="min-w-0">
                <div className="text-[11px] tracking-wide text-saffron">{hymn.deityHindi}</div>
                <h2 className="font-serif text-xl text-maroon mt-1">{hymn.nameHindi}</h2>
                <p className="text-xs text-ink/55 mt-2 leading-relaxed">{hymn.summary}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
