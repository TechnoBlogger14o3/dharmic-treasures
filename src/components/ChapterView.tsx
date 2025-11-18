import { Chapter, TextType } from '../../types'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import ProgressIndicator from './ProgressIndicator'
import ShareButton from './ShareButton'

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
  const progress = (currentVerse / totalVerses) * 100

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-all duration-300 mb-4 animate-slideInLeft"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Chapters</span>
        </button>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 animate-scaleIn">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-amber-600 mb-2">
              {chapter.chapter_number}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{chapter.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{chapter.name_meaning}</p>
            <p className="text-sm text-gray-500">{chapter.summary}</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator progress={progress} currentVerse={currentVerse} totalVerses={totalVerses} />

      {/* Verse Content */}
      <div
        className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 mb-6 animate-fadeIn"
        style={{ fontSize: `${fontSize}px` }}
        key={currentVerse}
      >
        <div className="text-center mb-6">
          <div className="inline-block bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Verse {verse.verse_number}
          </div>
        </div>

        {/* Sanskrit Text */}
        <div className="mb-6">
          <div className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed text-center mb-4">
            {verse.text}
          </div>
        </div>

        {/* Transliteration */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 mb-2">Transliteration:</div>
          <div className="text-lg text-gray-700 italic leading-relaxed">{verse.transliteration}</div>
        </div>

        {/* Hindi Meaning */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 mb-2">Hindi Meaning:</div>
          {textType === 'yakshaPrashna' && verse.hindi_meaning.includes('\n\n') ? (
            <div className="text-lg text-gray-700 leading-relaxed">
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
            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{verse.hindi_meaning}</div>
          )}
        </div>

        {/* English Meaning */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 mb-2">Meaning:</div>
          <div className="text-lg text-gray-700 leading-relaxed">{verse.meaning}</div>
        </div>

        {/* Share Button */}
        <div className="flex justify-center mt-6">
          <ShareButton
            verse={verse}
            chapterName={chapter.name}
            chapterNumber={chapter.chapter_number}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200 animate-slideInRight">
        <button
          onClick={handlePrevious}
          disabled={currentVerse === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            currentVerse === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="text-sm text-gray-600">
          {currentVerse} / {totalVerses}
        </div>

        <button
          onClick={handleNext}
          disabled={currentVerse === totalVerses}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            currentVerse === totalVerses
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          <span>Next</span>
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

