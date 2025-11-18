import { useState, useEffect } from 'react'
import { Chapter, TextType } from '../../types'
import SearchBar from './SearchBar'
import GitaChatbot from './GitaChatbot'

interface ChapterListProps {
  chapters: Chapter[]
  textName: string
  textNameHindi: string
  onChapterSelect: (chapterNumber: number, verseNumber?: number) => void
  textType: TextType
}

export default function ChapterList({
  chapters,
  textName,
  textNameHindi,
  onChapterSelect,
  textType,
}: ChapterListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>(chapters)

  // Update filtered chapters when chapters prop changes
  useEffect(() => {
    setFilteredChapters(chapters)
    setSearchQuery('')
  }, [chapters, textType])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredChapters(chapters)
      return
    }

    const lowerQuery = query.toLowerCase()
    const filtered = chapters.filter((chapter) => {
      const matchesName = chapter.name.toLowerCase().includes(lowerQuery)
      const matchesMeaning = chapter.name_meaning.toLowerCase().includes(lowerQuery)
      const matchesSummary = chapter.summary.toLowerCase().includes(lowerQuery)
      const matchesVerse = chapter.verses.some(
        (verse) =>
          verse.text.toLowerCase().includes(lowerQuery) ||
          verse.transliteration.toLowerCase().includes(lowerQuery) ||
          verse.meaning.toLowerCase().includes(lowerQuery) ||
          verse.hindi_meaning.toLowerCase().includes(lowerQuery)
      )
      return matchesName || matchesMeaning || matchesSummary || matchesVerse
    })
    setFilteredChapters(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">{textNameHindi}</h1>
        <p className="text-xl md:text-2xl text-gray-600">{textName}</p>
      </div>

      {/* Search Bar - Only for Bhagavad Gita */}
      {textType === 'gita' && (
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={handleSearch} placeholder={`Search ${textName}...`} />
        </div>
      )}

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredChapters.map((chapter, index) => (
          <div
            key={chapter.id}
            onClick={() => onChapterSelect(chapter.chapter_number)}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 p-6 animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {chapter.chapter_number}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{chapter.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{chapter.name_meaning}</p>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{chapter.summary}</p>
              <div className="text-xs text-amber-600 font-medium">
                {chapter.verses_count} {chapter.verses_count === 1 ? 'verse' : 'verses'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No chapters found matching "{searchQuery}"</p>
        </div>
      )}

      {/* Gita Chatbot - Only for Bhagavad Gita */}
      {textType === 'gita' && (
        <GitaChatbot
          chapters={chapters}
          onNavigateToVerse={(chapterNumber, verseNumber) => {
            onChapterSelect(chapterNumber, verseNumber)
          }}
        />
      )}
    </div>
  )
}

