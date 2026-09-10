export interface ShastraBook {
  id: string
  title: string
  titleHindi: string
  path: string
  note: string
}

const SHASTRA_BOOKS: ShastraBook[] = [
  {
    id: 'gita-pdf',
    title: 'Bhagavad Gita (Sadhak Sanjeevani)',
    titleHindi: 'भगवद्गीता — साधक संजीवनी',
    path: 'pdfs/sadhak-sanjeevani.pdf',
    note: 'Gita Press commentary — open the PDF to read.',
  },
  {
    id: 'shiv-puran',
    title: 'Shiv Puran',
    titleHindi: 'शिव पुराण',
    path: 'pdfs/shiv-puran.pdf',
    note: 'Hindi edition — open the PDF to read.',
  },
  {
    id: 'vishnu-puran',
    title: 'Vishnu Puran',
    titleHindi: 'विष्णु पुराण',
    path: 'pdfs/vishnu-puran.pdf',
    note: 'Gita Press edition — open the PDF to read.',
  },
  {
    id: 'ramayan',
    title: 'Shrimad Valmiki Ramayan',
    titleHindi: 'श्रीमद् वाल्मीकि रामायण',
    path: 'pdfs/valmiki-ramayan.pdf',
    note: 'Itihasa — open the PDF to read.',
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Open PDF
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
