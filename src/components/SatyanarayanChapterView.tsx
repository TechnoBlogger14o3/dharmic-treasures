import { useEffect } from 'react'
import { Chapter } from '../../types'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import { saveProgress } from '../utils/storage'

interface SatyanarayanChapterViewProps {
  chapter: Chapter
  chapters: Chapter[]
  fontSize: number
  onBack: () => void
  onNavigate: (chapterNumber: number) => void
}

export default function SatyanarayanChapterView({
  chapter,
  chapters,
  fontSize,
  onBack,
  onNavigate,
}: SatyanarayanChapterViewProps) {
  const pathIndex = chapters.findIndex((item) => item.chapter_number === chapter.chapter_number)
  const hindiText = chapter.verses.map((item) => item.text).join('\n\n')
  const isFirst = pathIndex <= 0
  const isLast = pathIndex === chapters.length - 1

  useEffect(() => {
    saveProgress({
      textType: 'satyanarayan',
      chapterNumber: chapter.chapter_number,
      verseNumber: 1,
      lastRead: Date.now(),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [chapter.chapter_number])

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-4xl animate-fadeIn pb-20 sm:pb-8">
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-amber-600 active:text-amber-700 transition-all duration-300 mb-3 sm:mb-4 py-2 -ml-2 pl-2 pr-4 rounded-lg touch-manipulation"
        >
          <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">अध्यायों पर जाएँ</span>
        </button>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-white/30">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mb-2">{chapter.chapter_number}</div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">{chapter.name}</h1>
            <p className="text-xs sm:text-sm font-medium text-amber-700">
              {pathIndex + 1} / {chapters.length} · {chapter.name}
            </p>
          </div>
        </div>
      </div>

      <div
        className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-white/30 mb-4 sm:mb-6"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="text-base sm:text-lg md:text-xl leading-[1.9] text-gray-800 font-medium whitespace-pre-line text-left max-w-3xl mx-auto">
          {hindiText}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex items-center justify-between bg-white/95 backdrop-blur-md sm:bg-white/90 rounded-t-xl sm:rounded-xl shadow-lg p-3 sm:p-4 border-t sm:border border-gray-200 z-40">
        <button
          onClick={() => !isFirst && onNavigate(chapters[pathIndex - 1].chapter_number)}
          disabled={isFirst}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium touch-manipulation min-h-[44px] ${
            isFirst
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">पिछला</span>
        </button>
        <div className="text-xs sm:text-sm text-gray-600 font-medium px-2">
          {pathIndex + 1} / {chapters.length}
        </div>
        <button
          onClick={() => !isLast && onNavigate(chapters[pathIndex + 1].chapter_number)}
          disabled={isLast}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium touch-manipulation min-h-[44px] ${
            isLast
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700'
          }`}
        >
          <span className="text-sm sm:text-base">अगला</span>
          <ChevronRightIcon className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>
    </div>
  )
}
