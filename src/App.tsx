import { useState, useEffect, lazy, Suspense, useRef } from 'react'
import { TextType, TextConfig } from '../types'
import ErrorBoundary from './components/ErrorBoundary'
import BackgroundSelector from './components/BackgroundSelector'
import LoadingSpinner from './components/LoadingSpinner'
import GitaChatbot, { type ShastraPdfTarget } from './components/GitaChatbot'
import PanchangWidget from './components/PanchangWidget'
import { getSettings, saveSettings, getProgress } from './utils/storage'

// Lazy load heavy components - only load when needed
const ChapterList = lazy(() => import('./components/ChapterList'))
const ChapterView = lazy(() => import('./components/ChapterView'))
const PDFViewer = lazy(() => import('./components/PDFViewer'))
const ShaktipeethsView = lazy(() => import('./components/ShaktipeethsView'))
const CharDhamView = lazy(() => import('./components/CharDhamView'))
const JyotirlingasView = lazy(() => import('./components/JyotirlingasView'))
const ChhathPujaView = lazy(() => import('./components/ChhathPujaView'))
const SatyanarayanChapterView = lazy(() => import('./components/SatyanarayanChapterView'))
const ShastrasView = lazy(() => import('./components/ShastrasView'))

// Lazy load data files - load only when text type is selected
const loadGitaData = () => import('../data/gita').then(m => ({ default: m.gitaChapters }))
const loadHanumanChalisaData = () => import('../data/hanumanChalisa').then(m => ({ default: m.hanumanChalisa }))
const loadSunderkandData = () => import('../data/sunderkand').then(m => ({ default: m.sunderkandChapters }))
const loadBajrangBaanData = () => import('../data/bajrangBaan').then(m => ({ default: m.bajrangBaan }))
const loadYakshaPrashnaData = () => import('../data/yakshaPrashn').then(m => ({ default: m.yakshaPrashna }))
const loadSatyanarayanData = () => import('../data/satyanarayan').then(m => ({ default: m.satyanarayanChapters }))

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
  satyanarayan: {
    name: 'Satyanarayan Vrat Katha',
    nameHindi: 'सत्यनारायण व्रत कथा',
    dataLoader: loadSatyanarayanData,
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
  chhath: {
    name: 'Chhath Puja',
    nameHindi: 'छठ पूजा',
  },
  shastras: {
    name: 'Shastras',
    nameHindi: 'शास्त्र',
  },
}

function App() {
  // Load settings from storage
  const savedSettings = getSettings()
  const [textType, setTextType] = useState<TextType>('gita')
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const [selectedVerse, setSelectedVerse] = useState<number>(1)
  const [backgroundTheme, setBackgroundTheme] = useState<string>(savedSettings.backgroundTheme)
  const fontSize = savedSettings.fontSize
  const [viewMode, setViewMode] = useState<'text' | 'pdf'>('text')
  const [textDataCache, setTextDataCache] = useState<Record<TextType, any[]>>({} as Record<TextType, any[]>)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [sourcePdf, setSourcePdf] = useState<ShastraPdfTarget | null>(null)

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

  // Restore last-read verse only on first load, not when switching texts
  const didRestoreInitialProgress = useRef(false)
  useEffect(() => {
    if (didRestoreInitialProgress.current) return
    didRestoreInitialProgress.current = true
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
  const isShaktipeethsView = textType === 'shaktipeeths'
  const isCharDhamView = textType === 'charDham'
  const isJyotirlingasView = textType === 'jyotirlingas'
  const isChhathView = textType === 'chhath'
  const isShastrasView = textType === 'shastras'
  const isSpecialView = isShaktipeethsView || isCharDhamView || isJyotirlingasView || isChhathView || isShastrasView
  const isHomePage = selectedChapter === null && !isSpecialView

  const handleChapterSelect = (chapterNumber: number, verseNumber?: number) => {
    setSelectedChapter(chapterNumber)
    setSelectedVerse(verseNumber || 1)
  }

  const handleBackToHome = () => {
    setSelectedChapter(null)
    setSelectedVerse(1)
    setViewMode('text')
    setSourcePdf(null)
  }

  const backgroundClasses: Record<string, string> = {
    'gradient-1': 'bg-cream paper-grain',
    'gradient-2': 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    'gradient-3': 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
    'gradient-4': 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50',
    'gradient-5': 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50',
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-500 ${backgroundClasses[backgroundTheme]}`}>
        {/* Header with Text Type Selector */}
        <div className="sticky top-0 z-50 bg-saffron shadow-md border-b border-gold">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              <span className="flex-shrink-0 text-cream text-lg sm:text-xl leading-none pr-1 sm:pr-2" aria-hidden="true">ॐ</span>
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
                        setSourcePdf(null)
                      }}
                      className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer touch-manipulation min-w-[80px] sm:min-w-0 flex-shrink-0 ${
                        textType === type && viewMode === 'text'
                          ? 'bg-cream text-maroon shadow-lg border-2 border-gold underline decoration-gold decoration-2 underline-offset-4'
                          : 'bg-cream/90 text-ink hover:bg-saffron-light active:bg-saffron-light border border-gold/70'
                      }`}
                    >
                      <div className="font-serif text-xs sm:text-sm md:text-base whitespace-nowrap">{textConfigsBase[type].nameHindi}</div>
                      <div className={`text-[10px] sm:text-xs whitespace-nowrap ${textType === type && viewMode === 'text' ? 'text-saffron-dark' : 'text-ink/60'}`}>{textConfigsBase[type].name}</div>
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
          {sourcePdf ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key={`source-pdf-${sourcePdf.path}-${sourcePdf.page}`} className="animate-fadeIn">
                <PDFViewer
                  pdfPath={sourcePdf.path}
                  title={sourcePdf.title}
                  titleHindi={sourcePdf.titleHindi}
                  initialPage={sourcePdf.page}
                  onBack={() => setSourcePdf(null)}
                />
              </div>
            </Suspense>
          ) : isShaktipeethsView ? (
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
          ) : isChhathView ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key="chhath-view" className="animate-fadeIn">
                <ChhathPujaView />
              </div>
            </Suspense>
          ) : isShastrasView ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key="shastras-view" className="animate-fadeIn">
                <ShastrasView
                  onOpenBook={(book) => {
                    setSourcePdf({
                      path: book.path,
                      title: book.title,
                      titleHindi: book.titleHindi,
                      page: 1,
                    })
                  }}
                />
              </div>
            </Suspense>
          ) : isLoadingData || (currentTextConfig.dataLoader && !currentTextData.length) ? (
            <LoadingSpinner />
          ) : isHomePage ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key={`chapter-list-${textType}`} className="animate-fadeIn">
                <ChapterList
                  chapters={currentText.data}
                  textName={currentText.name}
                  textNameHindi={currentText.nameHindi}
                  onChapterSelect={handleChapterSelect}
                  textType={textType}
                />
              </div>
            </Suspense>
          ) : textType === 'satyanarayan' ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key="satyanarayan-chapter-view" className="animate-fadeIn">
                <SatyanarayanChapterView
                  chapter={currentText.data.find((ch) => ch.chapter_number === selectedChapter)!}
                  chapters={currentText.data}
                  fontSize={fontSize}
                  onBack={handleBackToHome}
                  onNavigate={(chapterNumber) => handleChapterSelect(chapterNumber, 1)}
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

        <PanchangWidget />
        <GitaChatbot />

        <footer className="mt-12 border-t border-gold bg-cream">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-ink">
            <div className="text-xs uppercase tracking-[0.2em] text-maroon/80 font-serif">Connect & Explore</div>
            <div className="mt-2 text-base font-semibold text-maroon">
              Developed by Aman Shekhar
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://technoblogger14o3.github.io/my-portfolio/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold bg-cream px-4 py-2 text-xs font-medium text-maroon shadow-sm transition-all hover:border-saffron hover:bg-saffron-light"
              >
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/aman-shekhar/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold bg-cream px-4 py-2 text-xs font-medium text-maroon shadow-sm transition-all hover:border-saffron hover:bg-saffron-light"
              >
                LinkedIn
              </a>
              <a
                href="https://debunkmythology.blogspot.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold bg-cream px-4 py-2 text-xs font-medium text-maroon shadow-sm transition-all hover:border-saffron hover:bg-saffron-light"
              >
                Dharmic Blog
              </a>
              <a
                href="https://shekhar14.medium.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold bg-cream px-4 py-2 text-xs font-medium text-maroon shadow-sm transition-all hover:border-saffron hover:bg-saffron-light"
              >
                Medium
              </a>
            </div>
            <div className="mt-4 text-xs text-ink/60">
              Sharing sacred wisdom with devotion. © {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App

