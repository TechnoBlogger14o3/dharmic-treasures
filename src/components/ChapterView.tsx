import { Chapter, TextType } from '../../types'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import ShareButton from './ShareButton'
import BookmarkButton from './BookmarkButton'
import ExportButton from './ExportButton'
import { saveProgress } from '../utils/storage'
import { useEffect } from 'react'

interface ChapterViewProps {
  chapter: Chapter
  currentVerse: number
  onVerseChange: (verseNumber: number) => void
  onBack: () => void
  fontSize: number
  textType?: TextType
  pathChapters?: Chapter[]
  onNavigate?: (chapterNumber: number, verseNumber: number) => void
}

export default function ChapterView({
  chapter,
  currentVerse,
  onVerseChange,
  onBack,
  fontSize,
  textType,
  pathChapters,
  onNavigate,
}: ChapterViewProps) {
  const showFullChapter = textType === 'satyanarayan'
  const verse = chapter.verses.find((v) => v.verse_number === currentVerse)
  const totalVerses = chapter.verses.length
  const pathIndex = pathChapters?.findIndex((item) => item.chapter_number === chapter.chapter_number) ?? -1
  const isPath = Boolean(pathChapters && onNavigate && pathIndex >= 0)
  const isFirstInPath = showFullChapter
    ? !isPath || pathIndex === 0
    : !isPath || (pathIndex === 0 && currentVerse === 1)
  const isLastInPath = showFullChapter
    ? !isPath || pathIndex === pathChapters!.length - 1
    : !isPath || (pathIndex === pathChapters!.length - 1 && currentVerse === totalVerses)

  // Save reading progress
  useEffect(() => {
    if (textType && chapter.chapter_number) {
      saveProgress({
        textType,
        chapterNumber: chapter.chapter_number,
        verseNumber: showFullChapter ? 1 : currentVerse,
        lastRead: Date.now(),
      })
    }
  }, [textType, chapter.chapter_number, currentVerse, showFullChapter])

  useEffect(() => {
    if (showFullChapter) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [chapter.chapter_number, showFullChapter])

  const handlePrevious = () => {
    if (showFullChapter) {
      if (isPath && pathIndex > 0) {
        onNavigate!(pathChapters![pathIndex - 1].chapter_number, 1)
      }
      return
    }
    if (currentVerse > 1) {
      onVerseChange(currentVerse - 1)
      return
    }
    if (isPath && pathIndex > 0) {
      const previousChapter = pathChapters![pathIndex - 1]
      onNavigate!(previousChapter.chapter_number, previousChapter.verses.length)
    }
  }

  const handleNext = () => {
    if (showFullChapter) {
      if (isPath && pathIndex < pathChapters!.length - 1) {
        onNavigate!(pathChapters![pathIndex + 1].chapter_number, 1)
      }
      return
    }
    if (currentVerse < totalVerses) {
      onVerseChange(currentVerse + 1)
      return
    }
    if (isPath && pathIndex < pathChapters!.length - 1) {
      const nextChapter = pathChapters![pathIndex + 1]
      onNavigate!(nextChapter.chapter_number, 1)
    }
  }

  if ((showFullChapter && !chapter.verses.length) || (!showFullChapter && !verse)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-ink/60">{showFullChapter ? 'पाठ नहीं मिला' : 'Verse not found'}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-saffron text-white rounded-lg hover:bg-saffron-dark"
        >
          {showFullChapter ? 'अध्यायों पर जाएँ' : 'Back to Chapters'}
        </button>
      </div>
    )
  }

  // Background image for Bhagavad Gita
  const isGita = textType === 'gita'
  // Construct path - same pattern as PDF viewer
  const baseUrl = import.meta.env.BASE_URL || '/'
  const imagePath = `${baseUrl}krishna-arjuna-bg.jpg`.replace(/\/\//g, '/')
  const backgroundImageUrl = isGita ? imagePath : undefined
  
  // Debug: log the image path (remove in production if needed)
  if (isGita && backgroundImageUrl) {
    console.log('Background image path:', backgroundImageUrl)
  }

  return (
    <div 
      className={`relative min-h-screen ${isGita ? '' : 'container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-4xl animate-fadeIn pb-20 sm:pb-8'}`}
    >
      {/* Background Image - Only for Bhagavad Gita */}
      {isGita && (
        <div 
          className="fixed inset-0 z-0 animate-fadeIn"
          style={{
            backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'linear-gradient(to bottom right, #fef3c7, #fed7aa, #fde68a)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            top: '40px',
            height: 'calc(100% - 40px)',
          }}
        >
          {/* Gradient fade overlays for smooth edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/5"></div>
          {/* Overlay for better text readability - reduced opacity to let image show through */}
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
      )}

      {/* Content Container */}
      <div className={`relative z-10 ${isGita ? 'container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-4xl animate-fadeIn pb-20 sm:pb-8' : ''}`}>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 transition-all duration-300 mb-3 sm:mb-4 py-2 -ml-2 pl-2 pr-4 rounded-lg touch-manipulation animate-slideInLeft ${isGita ? 'text-white hover:text-gold-light active:text-gold drop-shadow-md' : 'text-maroon hover:text-saffron active:text-saffron-dark'}`}
        >
          <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">{showFullChapter ? 'अध्यायों पर जाएँ' : 'Back to Chapters'}</span>
        </button>
        <div className={`${isGita ? 'bg-cream/90 backdrop-blur-sm' : 'folio'} rounded-xl p-4 sm:p-6 animate-scaleIn`}>
          <div className="text-center mb-4">
            <div className="text-xl sm:text-2xl font-bold text-saffron mb-2">
              {chapter.chapter_number}
            </div>
            <h1 className={`font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${isGita ? 'text-maroon drop-shadow-sm' : 'text-maroon'}`}>{chapter.name}</h1>
            <p className={`text-base sm:text-lg mb-3 sm:mb-4 ${isGita ? 'text-ink drop-shadow-sm font-semibold' : 'text-ink/70'}`}>{chapter.name_meaning}</p>
            {isPath && (
              <p className={`text-xs sm:text-sm font-medium mb-2 ${isGita ? 'text-saffron-dark' : 'text-saffron'}`}>
                {pathIndex + 1} / {pathChapters!.length} · {chapter.name}
              </p>
            )}
            <p className={`text-xs sm:text-sm ${isGita ? 'text-ink drop-shadow-sm font-medium' : 'text-ink/60'}`}>{chapter.summary}</p>
          </div>
        </div>
      </div>

      {/* Verse Content */}
      <div
        className={`${isGita ? 'bg-cream/90 backdrop-blur-sm border border-gold' : 'folio'} rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn`}
        style={{ fontSize: `${fontSize}px` }}
        key={showFullChapter ? chapter.chapter_number : currentVerse}
      >
        {!showFullChapter && (
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-block bg-saffron text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
              Verse {verse!.verse_number}
            </div>
          </div>
        )}

        {showFullChapter ? (
          <div className="mb-4 sm:mb-6">
            <div className="font-serif text-base sm:text-lg md:text-xl leading-[1.9] text-ink whitespace-pre-line text-left max-w-3xl mx-auto">
              {chapter.verses.map((item) => item.text).join('\n\n')}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 sm:mb-6">
              <div className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center mb-3 sm:mb-4 ${isGita ? 'text-maroon drop-shadow-sm font-bold' : 'text-maroon font-medium'}`}>
                {verse!.text}
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <div className={`text-xs sm:text-sm font-semibold mb-2 ${isGita ? 'text-ink drop-shadow-sm' : 'text-ink/70'}`}>Transliteration:</div>
              <div className={`text-base sm:text-lg italic leading-relaxed ${isGita ? 'text-ink drop-shadow-sm font-semibold' : 'text-ink'}`}>{verse!.transliteration}</div>
            </div>
            <div className="mb-4 sm:mb-6">
              <div className={`text-xs sm:text-sm font-semibold mb-2 ${isGita ? 'text-ink drop-shadow-sm' : 'text-ink/70'}`}>Hindi Meaning:</div>
              {textType === 'yakshaPrashna' && verse!.hindi_meaning.includes('\n\n') ? (
                <div className="font-serif text-base sm:text-lg text-ink leading-relaxed">
                  {verse!.hindi_meaning.split('\n\n').map((part, index) => {
                    if (part.includes('यक्ष प्रश्न:')) {
                      return (
                        <div key={index} className="mb-2">
                          <div className="font-medium text-saffron">{part.trim()}</div>
                        </div>
                      )
                    } else if (part.includes('युधिष्ठिर उत्तर:')) {
                      return (
                        <div key={index} className="ml-0">
                          <div className="font-medium text-maroon">{part.trim()}</div>
                        </div>
                      )
                    }
                    return (
                      <div key={index} className="mb-2">
                        {part.trim()}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className={`font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line ${isGita ? 'text-ink drop-shadow-sm font-semibold' : 'text-ink'}`}>{verse!.hindi_meaning}</div>
              )}
            </div>
            <div className="mb-4 sm:mb-6">
              <div className={`text-xs sm:text-sm font-semibold mb-2 ${isGita ? 'text-ink drop-shadow-sm' : 'text-ink/70'}`}>Meaning:</div>
              <div className={`text-base sm:text-lg leading-relaxed ${isGita ? 'text-ink drop-shadow-sm font-semibold' : 'text-ink'}`}>{verse!.meaning}</div>
            </div>
          </>
        )}

        {!showFullChapter && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <BookmarkButton
              textType={textType || ''}
              chapterNumber={chapter.chapter_number}
              verseNumber={verse!.verse_number}
              chapterName={chapter.name}
            />
            <ShareButton
              verse={verse!}
              chapterName={chapter.name}
              chapterNumber={chapter.chapter_number}
            />
            <ExportButton
              verse={verse!}
              chapterName={chapter.name}
              chapterNumber={chapter.chapter_number}
              textType={textType || ''}
            />
          </div>
        )}
      </div>

      {/* Navigation - Fixed on mobile, relative on desktop */}
      <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto flex items-center justify-between bg-cream/95 backdrop-blur-md sm:bg-cream rounded-t-xl sm:rounded-xl shadow-lg p-3 sm:p-4 border-t sm:border border-gold animate-slideInRight z-40">
        <button
          onClick={handlePrevious}
          disabled={isPath ? isFirstInPath : currentVerse === 1}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all touch-manipulation min-h-[44px] ${
            (isPath ? isFirstInPath : currentVerse === 1)
              ? 'bg-saffron-light text-ink/40 cursor-not-allowed'
              : 'bg-saffron text-white hover:bg-saffron-dark active:bg-saffron-dark'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">{showFullChapter ? 'पिछला' : 'Previous'}</span>
        </button>

        <div className="text-xs sm:text-sm text-ink/70 font-medium px-2">
          {showFullChapter && isPath
            ? `${pathIndex + 1} / ${pathChapters!.length}`
            : `${currentVerse} / ${totalVerses}`}
        </div>

        <button
          onClick={handleNext}
          disabled={isPath ? isLastInPath : currentVerse === totalVerses}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all touch-manipulation min-h-[44px] ${
            (isPath ? isLastInPath : currentVerse === totalVerses)
              ? 'bg-saffron-light text-ink/40 cursor-not-allowed'
              : 'bg-saffron text-white hover:bg-saffron-dark active:bg-saffron-dark'
          }`}
        >
          <span className="text-sm sm:text-base">{showFullChapter ? 'अगला' : 'Next'}</span>
          <ChevronRightIcon className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>
      </div>
    </div>
  )
}

