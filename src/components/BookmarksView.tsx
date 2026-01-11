import { useState, useEffect } from 'react'
import { getBookmarks, removeBookmark, type Bookmark } from '../utils/storage'
import { TextType } from '../../types'
import ArrowLeftIcon from './icons/ArrowLeftIcon'

interface BookmarksViewProps {
  onNavigate: (textType: TextType, chapterNumber: number, verseNumber: number) => void
  onBack: () => void
}

export default function BookmarksView({ onNavigate, onBack }: BookmarksViewProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  const handleRemove = (bookmark: Bookmark) => {
    removeBookmark(bookmark.textType, bookmark.chapterNumber, bookmark.verseNumber)
    setBookmarks(getBookmarks())
  }

  const handleNavigate = (bookmark: Bookmark) => {
    onNavigate(bookmark.textType as TextType, bookmark.chapterNumber, bookmark.verseNumber)
  }

  const textTypeNames: Record<string, string> = {
    gita: 'Bhagavad Gita',
    hanumanChalisa: 'Hanuman Chalisa',
    sunderkand: 'Sunderkand',
    bajrangBaan: 'Bajrang Baan',
    yakshaPrashna: 'Yaksha Prashna',
  }

  if (bookmarks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-amber-600 mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookmarks Yet</h2>
          <p className="text-gray-600">
            Bookmark your favorite verses to access them quickly later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-amber-600 mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Bookmarks</h1>
        <p className="text-gray-600 text-sm">{bookmarks.length} saved verse{bookmarks.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="space-y-4">
        {bookmarks.map((bookmark, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded">
                    {textTypeNames[bookmark.textType] || bookmark.textType}
                  </span>
                  <span className="text-sm text-gray-500">
                    Chapter {bookmark.chapterNumber}, Verse {bookmark.verseNumber}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{bookmark.chapterName}</h3>
                <p className="text-xs text-gray-500">
                  Bookmarked {new Date(bookmark.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigate(bookmark)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                >
                  Open
                </button>
                <button
                  onClick={() => handleRemove(bookmark)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Remove bookmark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
