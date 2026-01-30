import { useState, useEffect } from 'react'
import { TextType, TextConfig } from '../types'
import { gitaChapters } from '../data/gita'
import { hanumanChalisa } from '../data/hanumanChalisa'
import { sunderkandChapters } from '../data/sunderkand'
import { bajrangBaan } from '../data/bajrangBaan'
import { yakshaPrashna } from '../data/yakshaPrashn'
import ChapterList from './components/ChapterList'
import ChapterView from './components/ChapterView'
import PDFViewer from './components/PDFViewer'
import ShaktipeethsView from './components/ShaktipeethsView'
import CharDhamView from './components/CharDhamView'
import JyotirlingasView from './components/JyotirlingasView'
import ErrorBoundary from './components/ErrorBoundary'
import BackgroundSelector from './components/BackgroundSelector'
import FontSizeControl from './components/FontSizeControl'
import { getSettings, saveSettings, getProgress } from './utils/storage'

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
  sunderkand: {
    name: 'Sunderkand',
    nameHindi: 'सुन्दरकाण्ड',
    data: sunderkandChapters,
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
  shaktipeeths: {
    name: 'Shaktipeeths',
    nameHindi: 'शक्तिपीठ',
    data: [], // Special view, not chapter-based
  },
  charDham: {
    name: 'Char Dham',
    nameHindi: 'चार धाम',
    data: [], // Special view, not chapter-based
  },
  jyotirlingas: {
    name: 'Jyotirlingas',
    nameHindi: 'ज्योतिर्लिंग',
    data: [], // Special view, not chapter-based
  },
}

// PDF paths for texts that have PDF versions
const pdfPaths: Partial<Record<TextType, string>> = {
  gita: 'sadhak-sanjeevani.pdf', // Bhagavad Gita PDF
}

function App() {
  // Load settings from storage
  const savedSettings = getSettings()
  const [textType, setTextType] = useState<TextType>('gita')
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const [selectedVerse, setSelectedVerse] = useState<number>(1)
  const [backgroundTheme, setBackgroundTheme] = useState<string>(savedSettings.backgroundTheme)
  const [fontSize, setFontSize] = useState<number>(savedSettings.fontSize)
  const [viewMode, setViewMode] = useState<'text' | 'pdf'>('text')

  // Restore reading progress on mount
  useEffect(() => {
    const progress = getProgress(textType)
    if (progress) {
      setSelectedChapter(progress.chapterNumber)
      setSelectedVerse(progress.verseNumber)
    }
  }, [textType])

  // Save settings when they change
  useEffect(() => {
    saveSettings({
      fontSize,
      backgroundTheme,
      notificationsEnabled: savedSettings.notificationsEnabled,
      dailyVerseTime: savedSettings.dailyVerseTime,
    })
  }, [fontSize, backgroundTheme])

  const currentText = textConfigs[textType]
  const hasPDF = pdfPaths[textType] !== undefined
  const isPDFViewer = viewMode === 'pdf' && hasPDF
  const isShaktipeethsView = textType === 'shaktipeeths'
  const isCharDhamView = textType === 'charDham'
  const isJyotirlingasView = textType === 'jyotirlingas'
  const isSpecialView = isShaktipeethsView || isCharDhamView || isJyotirlingasView
  const isHomePage = selectedChapter === null && !isPDFViewer && !isSpecialView

  const handleChapterSelect = (chapterNumber: number, verseNumber?: number) => {
    setSelectedChapter(chapterNumber)
    setSelectedVerse(verseNumber || 1)
  }

  const handleBackToHome = () => {
    setSelectedChapter(null)
    setSelectedVerse(1)
    setViewMode('text')
  }

  const handleViewPDF = () => {
    setViewMode('pdf')
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
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              {/* Text Type Selector - Scrollable on mobile */}
              <div className="flex-1 overflow-x-auto scrollbar-hide -mx-3 sm:mx-0 px-3 sm:px-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-max sm:flex-wrap sm:justify-center">
                  {(Object.keys(textConfigs) as TextType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTextType(type)
                        setSelectedChapter(null)
                        setSelectedVerse(1)
                        setViewMode('text')
                      }}
                      className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer touch-manipulation min-w-[80px] sm:min-w-0 flex-shrink-0 ${
                        textType === type && viewMode === 'text'
                          ? 'bg-amber-500 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 hover:bg-amber-100 active:bg-amber-200 border border-gray-200'
                      }`}
                    >
                      <div className="text-xs sm:text-sm md:text-base whitespace-nowrap">{textConfigs[type].nameHindi}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">{textConfigs[type].name}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Background Selector */}
              <div className="flex-shrink-0">
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
          {isShaktipeethsView ? (
            <div key="shaktipeeths-view" className="animate-fadeIn">
              <ShaktipeethsView />
            </div>
          ) : isCharDhamView ? (
            <div key="char-dham-view" className="animate-fadeIn">
              <CharDhamView />
            </div>
          ) : isJyotirlingasView ? (
            <div key="jyotirlingas-view" className="animate-fadeIn">
              <JyotirlingasView />
            </div>
          ) : isPDFViewer ? (
            <div key="pdf-viewer" className="animate-fadeIn">
              <PDFViewer
                pdfPath={pdfPaths[textType]!}
                title={currentText.name}
                titleHindi={currentText.nameHindi}
                onBack={handleBackToHome}
              />
            </div>
          ) : isHomePage ? (
            <div key="chapter-list" className="animate-fadeIn">
              <ChapterList
                chapters={currentText.data}
                textName={currentText.name}
                textNameHindi={currentText.nameHindi}
                onChapterSelect={handleChapterSelect}
                textType={textType}
                hasPDF={hasPDF}
                onViewPDF={handleViewPDF}
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
                textType={textType}
              />
            </div>
          )}
        </div>

        {/* Controls */}
        {!isHomePage && !isPDFViewer && (
          <div className="fixed bottom-20 sm:bottom-4 right-4 z-40">
            <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
          </div>
        )}

        <footer className="mt-10 border-t border-gray-200 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
            <div className="mb-2 font-medium text-gray-700">
              Developed by Aman Shekhar aka Techno Blogger
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <a
                href="https://technoblogger14o3.github.io/my-portfolio/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-600 transition-colors"
              >
                Portfolio
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://www.linkedin.com/in/aman-shekhar/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-600 transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://debunkmythology.blogspot.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-600 transition-colors"
              >
                Dharmic Blog
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://shekhar14.medium.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-600 transition-colors"
              >
                Medium
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App

