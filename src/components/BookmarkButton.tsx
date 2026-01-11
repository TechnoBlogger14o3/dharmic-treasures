import { useState, useEffect } from 'react'
import { isBookmarked, saveBookmark, removeBookmark, type Bookmark } from '../utils/storage'

interface BookmarkButtonProps {
  textType: string
  chapterNumber: number
  verseNumber: number
  chapterName: string
}

export default function BookmarkButton({
  textType,
  chapterNumber,
  verseNumber,
  chapterName,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    setBookmarked(isBookmarked(textType, chapterNumber, verseNumber))
  }, [textType, chapterNumber, verseNumber])

  const handleToggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(textType, chapterNumber, verseNumber)
      setBookmarked(false)
    } else {
      const bookmark: Bookmark = {
        textType,
        chapterNumber,
        verseNumber,
        chapterName,
        timestamp: Date.now(),
      }
      saveBookmark(bookmark)
      setBookmarked(true)
    }
  }

  return (
    <button
      onClick={handleToggleBookmark}
      className={`flex items-center gap-2 px-4 py-2.5 sm:py-2 rounded-lg transition-colors text-sm font-medium touch-manipulation min-h-[44px] ${
        bookmarked
          ? 'bg-amber-500 text-white hover:bg-amber-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span>Bookmarked</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>Bookmark</span>
        </>
      )}
    </button>
  )
}
