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
}

export default function ChapterView({
  chapter,
  currentVerse,
  onVerseChange,
  onBack,
  fontSize,
  textType,
}: ChapterViewProps) {
  const verse = chapter.verses.find((v) => v.verse_number === currentVerse)
  const totalVerses = chapter.verses.length

  // Save reading progress
  useEffect(() => {
    if (textType && chapter.chapter_number && currentVerse) {
      saveProgress({
        textType,
        chapterNumber: chapter.chapter_number,
        verseNumber: currentVerse,
        lastRead: Date.now(),
      })
    }
  }, [textType, chapter.chapter_number, currentVerse])

  const handlePrevious = () => {
    if (currentVerse > 1) {
      onVerseChange(currentVerse - 1)
    }
  }

  const handleNext = () => {
    if (currentVerse < totalVerses) {
      onVerseChange(currentVerse + 1)
    }
  }

  if (!verse) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Verse not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Back to Chapters
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
          className={`flex items-center gap-2 transition-all duration-300 mb-3 sm:mb-4 py-2 -ml-2 pl-2 pr-4 rounded-lg touch-manipulation animate-slideInLeft ${isGita ? 'text-white hover:text-amber-200 active:text-amber-300 drop-shadow-md' : 'text-gray-700 hover:text-amber-600 active:text-amber-700'}`}
        >
          <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">Back to Chapters</span>
        </button>
        <div className={`${isGita ? 'bg-white/50 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} rounded-xl shadow-lg p-4 sm:p-6 border border-white/30 animate-scaleIn`}>
          <div className="text-center mb-4">
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mb-2">
              {chapter.chapter_number}
            </div>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${isGita ? 'text-gray-900 drop-shadow-sm' : 'text-gray-800'}`}>{chapter.name}</h1>
            <p className={`text-base sm:text-lg mb-3 sm:mb-4 ${isGita ? 'text-gray-800 drop-shadow-sm font-semibold' : 'text-gray-600'}`}>{chapter.name_meaning}</p>
            <p className={`text-xs sm:text-sm ${isGita ? 'text-gray-700 drop-shadow-sm font-medium' : 'text-gray-500'}`}>{chapter.summary}</p>
          </div>
        </div>
      </div>

      {/* Verse Content */}
      <div
        className={`${isGita ? 'bg-white/50 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-white/30 mb-4 sm:mb-6 animate-fadeIn`}
        style={{ fontSize: `${fontSize}px` }}
        key={currentVerse}
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-block bg-amber-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
            Verse {verse.verse_number}
          </div>
        </div>

        {/* Sanskrit Text */}
        <div className="mb-4 sm:mb-6">
          <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center mb-3 sm:mb-4 ${isGita ? 'text-gray-900 drop-shadow-sm font-bold' : 'text-gray-800 font-medium'}`}>
            {verse.text}
          </div>
        </div>

        {/* Transliteration */}
        <div className="mb-4 sm:mb-6">
          <div className={`text-xs sm:text-sm font-semibold mb-2 ${isGita ? 'text-gray-800 drop-shadow-sm' : 'text-gray-600'}`}>Transliteration:</div>
          <div className={`text-base sm:text-lg italic leading-relaxed ${isGita ? 'text-gray-800 drop-shadow-sm font-semibold' : 'text-gray-700'}`}>{verse.transliteration}</div>
        </div>

        {/* Hindi Meaning */}
        <div className="mb-4 sm:mb-6">
          <div className={`text-xs sm:text-sm font-semibold mb-2 ${isGita ? 'text-gray-800 drop-shadow-sm' : 'text-gray-600'}`}>Hindi Meaning:</div>
          {textType === 'yakshaPrashna' && verse.hindi_meaning.includes('\n\n') ? (
            <div className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {verse.hindi_meaning.split('\n\n').map((part, index) => {
                if (part.includes('यक्ष प्रश्न:')) {
                  return (
                    <div key={index} className="mb-2">
                      <div className="font-medium text-amber-700">{part.trim()}</div>
                    </div>
                  )
                } else if (part.includes('युधिष्ठिर उत्तर:')) {
                  return (
                    <div key={index} className="ml-0">
                      <div className="font-medium text-green-700">{part.trim()}</div>
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
            <div className={`text-base sm:text-lg leading-relaxed whitespace-pre-line ${isGita ? 'text-gray-800 drop-shadow-sm font-semibold' : 'text-gray-700'}`}>{verse.hindi_meaning}</div>
          )}
        </div>

        {/* English Meaning */}
        <div className="mb-4 sm:mb-6">
          <div className={`text-xs sm:text-sm font-semibold mb-2 ${isGita ? 'text-gray-800 drop-shadow-sm' : 'text-gray-600'}`}>Meaning:</div>
          <div className={`text-base sm:text-lg leading-relaxed ${isGita ? 'text-gray-800 drop-shadow-sm font-semibold' : 'text-gray-700'}`}>{verse.meaning}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <BookmarkButton
            textType={textType || ''}
            chapterNumber={chapter.chapter_number}
            verseNumber={verse.verse_number}
            chapterName={chapter.name}
          />
          <ShareButton
            verse={verse}
            chapterName={chapter.name}
            chapterNumber={chapter.chapter_number}
          />
          <ExportButton
            verse={verse}
            chapterName={chapter.name}
            chapterNumber={chapter.chapter_number}
            textType={textType || ''}
          />
        </div>
      </div>

      {/* Navigation - Fixed on mobile, relative on desktop */}
      <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto flex items-center justify-between bg-white/95 backdrop-blur-md sm:bg-white/90 sm:backdrop-blur-sm rounded-t-xl sm:rounded-xl shadow-lg sm:shadow-lg p-3 sm:p-4 border-t sm:border border-gray-200 animate-slideInRight z-40">
        <button
          onClick={handlePrevious}
          disabled={currentVerse === 1}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all touch-manipulation min-h-[44px] ${
            currentVerse === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">Previous</span>
        </button>

        <div className="text-xs sm:text-sm text-gray-600 font-medium px-2">
          {currentVerse} / {totalVerses}
        </div>

        <button
          onClick={handleNext}
          disabled={currentVerse === totalVerses}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all touch-manipulation min-h-[44px] ${
            currentVerse === totalVerses
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700'
          }`}
        >
          <span className="text-sm sm:text-base">Next</span>
          <ChevronRightIcon className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>
      </div>
    </div>
  )
}

