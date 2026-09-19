export interface ShastraBook {
  id: string
  title: string
  titleHindi: string
  path: string
  note: string
}

const SHASTRA_BOOKS: ShastraBook[] = [
  {
    id: 'bhagavad-gita-pdf',
    title: 'The Bhagavad Gita',
    titleHindi: 'भगवद्गीता',
    path: 'pdfs/bhagavad-gita.pdf',
    note: 'English PDF — open to read.',
  },
  {
    id: 'mahabharata',
    title: 'Mahabharata',
    titleHindi: 'महाभारत',
    path: 'pdfs/mahabharata.pdf',
    note: 'English PDF — open to read.',
  },
  {
    id: 'ramayana',
    title: 'Ramayana',
    titleHindi: 'रामायण',
    path: 'pdfs/ramayana.pdf',
    note: 'English PDF — open to read.',
  },
  {
    id: 'shiva-purana-1',
    title: 'Shiva Purana — Part 1',
    titleHindi: 'शिव पुराण — भाग १',
    path: 'pdfs/shiva-purana-1.pdf',
    note: 'English PDF — open to read.',
  },
  {
    id: 'shiva-purana-2',
    title: 'Shiva Purana — Part 2',
    titleHindi: 'शिव पुराण — भाग २',
    path: 'pdfs/shiva-purana-2.pdf',
    note: 'English PDF — open to read.',
  },
  {
    id: 'shiva-purana-3',
    title: 'Shiva Purana — Part 3',
    titleHindi: 'शिव पुराण — भाग ३',
    path: 'pdfs/shiva-purana-3.pdf',
    note: 'English PDF — open to read.',
  },
]

interface ShastrasViewProps {
  onOpenBook: (book: ShastraBook) => void
}

export default function ShastrasView({ onOpenBook }: ShastrasViewProps) {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-maroon mb-2">शास्त्र</h1>
        <p className="text-base sm:text-lg text-ink/70">Shastras</p>
        <p className="mt-3 text-sm text-ink/60">Choose a scripture to read the PDF.</p>
      </div>

      <div className="grid gap-4 sm:gap-5">
        {SHASTRA_BOOKS.map((book) => (
          <button
            key={book.id}
            type="button"
            onClick={() => onOpenBook(book)}
            className="folio rounded-xl p-5 sm:p-6 text-left border border-gold hover:bg-saffron-light/60 transition-colors touch-manipulation"
          >
            <div className="font-serif text-xl sm:text-2xl text-maroon">{book.titleHindi}</div>
            <div className="text-sm sm:text-base text-ink/70 mt-1">{book.title}</div>
            <div className="text-xs text-ink/50 mt-2">{book.note}</div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-saffron">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Open PDF
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
