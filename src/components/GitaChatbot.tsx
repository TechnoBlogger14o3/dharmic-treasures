import { useState } from 'react'

export interface ShastraPdfTarget {
  path: string
  title: string
  titleHindi: string
  page: number
}

export default function GitaChatbot() {
  const [isOpen, setIsOpen] = useState(false)

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
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[420px] sm:rounded-xl bg-cream shadow-2xl flex flex-col z-50 border-0 sm:border border-gold">
          <div className="bg-saffron text-white p-4 sm:rounded-t-xl flex items-center justify-between flex-shrink-0">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Shastra Chat</h3>
              <p className="text-xs text-cream">Coming next</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-cream transition-colors p-2 -mr-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close Chatbot"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-saffron-light/40 flex items-center justify-center">
            <div className="bg-cream border border-gold rounded-xl p-5 text-center max-w-sm">
              <p className="font-serif text-xl text-maroon mb-2">Coming Next</p>
              <p className="text-sm text-ink/70">
                The shastra chatbot is a work in progress. Meanwhile, read the books from the{' '}
                <span className="font-medium text-maroon">Shastras</span> tab.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
