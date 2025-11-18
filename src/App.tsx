import { useState } from 'react'
import { TextType, TextConfig } from '../types'
import { gitaChapters } from '../data/gita'
import { hanumanChalisa } from '../data/hanumanChalisa'
import { bajrangBaan } from '../data/bajrangBaan'
import { yakshaPrashna } from '../data/yakshaPrashn'
import ChapterList from './components/ChapterList'
import ChapterView from './components/ChapterView'
import ErrorBoundary from './components/ErrorBoundary'
import BackgroundSelector from './components/BackgroundSelector'
import FontSizeControl from './components/FontSizeControl'

const textConfigs: Record<TextType, TextConfig> = {
  gita: {
    name: 'Bhagavad Gita',
    nameHindi: 'भगवद्गीता',
    data: gitaChapters,
  },
  hanumanChalisa: {
    name: 'Hanuman Chalisa',
    nameHindi: 'हनुमान चालीसा',
    data: hanumanChalisa,
  },
  bajrangBaan: {
    name: 'Bajrang Baan',
    nameHindi: 'बजरंग बाण',
    data: bajrangBaan,
  },
  yakshaPrashna: {
    name: 'Yaksha Prashna',
    nameHindi: 'यक्ष प्रश्न',
    data: yakshaPrashna,
  },
}

function App() {
  const [textType, setTextType] = useState<TextType>('gita')
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const [selectedVerse, setSelectedVerse] = useState<number>(1)
  const [backgroundTheme, setBackgroundTheme] = useState<string>('gradient-1')
  const [fontSize, setFontSize] = useState<number>(16)

  const currentText = textConfigs[textType]
  const isHomePage = selectedChapter === null

  const handleChapterSelect = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber)
    setSelectedVerse(1)
  }

  const handleBackToHome = () => {
    setSelectedChapter(null)
    setSelectedVerse(1)
  }

  const backgroundClasses: Record<string, string> = {
    'gradient-1': 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
    'gradient-2': 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    'gradient-3': 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
    'gradient-4': 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50',
    'gradient-5': 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50',
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-500 ${backgroundClasses[backgroundTheme]}`}>
        {/* Header with Text Type Selector */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 flex-1">
                {(Object.keys(textConfigs) as TextType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTextType(type)
                      setSelectedChapter(null)
                      setSelectedVerse(1)
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer touch-manipulation ${
                      textType === type
                        ? 'bg-amber-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-amber-100 active:bg-amber-200 border border-gray-200'
                    }`}
                  >
                    <div className="text-sm md:text-base">{textConfigs[type].nameHindi}</div>
                    <div className="text-xs text-gray-500">{textConfigs[type].name}</div>
                  </button>
                ))}
              </div>
              <div className="ml-4">
                <BackgroundSelector
                  currentTheme={backgroundTheme}
                  onThemeChange={setBackgroundTheme}
                  themes={Object.keys(backgroundClasses)}
                />
              </div>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="relative z-10">
          {isHomePage ? (
            <div key="chapter-list" className="animate-fadeIn">
              <ChapterList
                chapters={currentText.data}
                textName={currentText.name}
                textNameHindi={currentText.nameHindi}
                onChapterSelect={handleChapterSelect}
                textType={textType}
              />
            </div>
          ) : (
            <div key="chapter-view" className="animate-fadeIn">
              <ChapterView
                chapter={currentText.data.find((ch) => ch.chapter_number === selectedChapter)!}
                currentVerse={selectedVerse}
                onVerseChange={setSelectedVerse}
                onBack={handleBackToHome}
                fontSize={fontSize}
              />
            </div>
          )}
        </div>

        {/* Controls */}
        {!isHomePage && (
          <div className="fixed bottom-4 right-4 z-50">
            <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App

