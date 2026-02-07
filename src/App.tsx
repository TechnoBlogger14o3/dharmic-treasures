import { useState, useEffect, lazy, Suspense } from 'react'
import { TextType, TextConfig } from '../types'
import ErrorBoundary from './components/ErrorBoundary'
import BackgroundSelector from './components/BackgroundSelector'
import FontSizeControl from './components/FontSizeControl'
import LoadingSpinner from './components/LoadingSpinner'
import { getSettings, saveSettings, getProgress } from './utils/storage'

// Lazy load heavy components - only load when needed
const ChapterList = lazy(() => import('./components/ChapterList'))
const ChapterView = lazy(() => import('./components/ChapterView'))
const PDFViewer = lazy(() => import('./components/PDFViewer'))
const ShaktipeethsView = lazy(() => import('./components/ShaktipeethsView'))
const CharDhamView = lazy(() => import('./components/CharDhamView'))
const JyotirlingasView = lazy(() => import('./components/JyotirlingasView'))

// Lazy load data files - load only when text type is selected
const loadGitaData = () => import('../data/gita').then(m => ({ default: m.gitaChapters }))
const loadHanumanChalisaData = () => import('../data/hanumanChalisa').then(m => ({ default: m.hanumanChalisa }))
const loadSunderkandData = () => import('../data/sunderkand').then(m => ({ default: m.sunderkandChapters }))
const loadBajrangBaanData = () => import('../data/bajrangBaan').then(m => ({ default: m.bajrangBaan }))
const loadYakshaPrashnaData = () => import('../data/yakshaPrashn').then(m => ({ default: m.yakshaPrashna }))

// Text configs without data - data will be loaded lazily
const textConfigsBase: Record<TextType, Omit<TextConfig, 'data'> & { dataLoader?: () => Promise<any> }> = {
  gita: {
    name: 'Bhagavad Gita',
    nameHindi: 'भगवद्गीता',
    dataLoader: loadGitaData,
  },
  hanumanChalisa: {
    name: 'Hanuman Chalisa',
    nameHindi: 'हनुमान चालीसा',
    dataLoader: loadHanumanChalisaData,
  },
  sunderkand: {
    name: 'Sunderkand',
    nameHindi: 'सुन्दरकाण्ड',
    dataLoader: loadSunderkandData,
  },
  bajrangBaan: {
    name: 'Bajrang Baan',
    nameHindi: 'बजरंग बाण',
    dataLoader: loadBajrangBaanData,
  },
  yakshaPrashna: {
    name: 'Yaksha Prashna',
    nameHindi: 'यक्ष प्रश्न',
    dataLoader: loadYakshaPrashnaData,
  },
  shaktipeeths: {
    name: 'Shaktipeeths',
    nameHindi: 'शक्तिपीठ',
  },
  charDham: {
    name: 'Char Dham',
    nameHindi: 'चार धाम',
  },
  jyotirlingas: {
    name: 'Jyotirlingas',
    nameHindi: 'ज्योतिर्लिंग',
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
  const [textDataCache, setTextDataCache] = useState<Record<TextType, any[]>>({} as Record<TextType, any[]>)
  const [isLoadingData, setIsLoadingData] = useState(false)

  // Lazy load data when text type changes
  useEffect(() => {
    const config = textConfigsBase[textType]
    
    // If data is already cached, skip loading
    if (textDataCache[textType] && textDataCache[textType].length > 0) {
      setIsLoadingData(false)
      return
    }
    
    // If it's a special view (no data), skip
    if (!config.dataLoader) {
      setIsLoadingData(false)
      return
    }
    
    // Load data lazily
    setIsLoadingData(true)
    config.dataLoader()
      .then((data) => {
        const loadedData = data.default || data
        setTextDataCache((prev) => ({
          ...prev,
          [textType]: loadedData,
        }))
      })
      .catch((error) => {
        console.error(`Error loading data for ${textType}:`, error)
      })
      .finally(() => {
        setIsLoadingData(false)
      })
  }, [textType])

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

  const currentTextConfig = textConfigsBase[textType]
  const currentTextData = textDataCache[textType] || []
  const currentText: TextConfig = {
    ...currentTextConfig,
    data: currentTextData,
  }
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
                  {(Object.keys(textConfigsBase) as TextType[]).map((type) => (
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
                      <div className="text-xs sm:text-sm md:text-base whitespace-nowrap">{textConfigsBase[type].nameHindi}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">{textConfigsBase[type].name}</div>
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
            <Suspense fallback={<LoadingSpinner />}>
              <div key="shaktipeeths-view" className="animate-fadeIn">
                <ShaktipeethsView />
              </div>
            </Suspense>
          ) : isCharDhamView ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key="char-dham-view" className="animate-fadeIn">
                <CharDhamView />
              </div>
            </Suspense>
          ) : isJyotirlingasView ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key="jyotirlingas-view" className="animate-fadeIn">
                <JyotirlingasView />
              </div>
            </Suspense>
          ) : isPDFViewer ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key="pdf-viewer" className="animate-fadeIn">
                <PDFViewer
                  pdfPath={pdfPaths[textType]!}
                  title={currentText.name}
                  titleHindi={currentText.nameHindi}
                  onBack={handleBackToHome}
                />
              </div>
            </Suspense>
          ) : isLoadingData || (currentTextConfig.dataLoader && !currentTextData.length) ? (
            <LoadingSpinner />
          ) : isHomePage ? (
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
          )}
        </div>

        {/* Controls */}
        {!isHomePage && !isPDFViewer && (
          <div className="fixed bottom-20 sm:bottom-4 right-4 z-40">
            <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
          </div>
        )}

        <footer className="mt-12 border-t border-amber-200/60 bg-gradient-to-r from-amber-50/80 via-white/80 to-orange-50/80">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-700/70">Connect & Explore</div>
            <div className="mt-2 text-base font-semibold text-gray-700">
              Developed by Aman Shekhar
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://technoblogger14o3.github.io/my-portfolio/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs font-medium text-amber-800 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
              >
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/aman-shekhar/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs font-medium text-amber-800 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
              >
                LinkedIn
              </a>
              <a
                href="https://debunkmythology.blogspot.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs font-medium text-amber-800 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
              >
                Dharmic Blog
              </a>
              <a
                href="https://shekhar14.medium.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs font-medium text-amber-800 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
              >
                Medium
              </a>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Sharing sacred wisdom with devotion. © {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App

