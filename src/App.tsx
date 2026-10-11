import { useState, useEffect, lazy, Suspense, useRef } from 'react'
import { TextType, TextConfig } from '../types'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import SiteNav from './components/SiteNav'
import GitaChatbot, { type ShastraPdfTarget } from './components/GitaChatbot'
import PanchangWidget from './components/PanchangWidget'
import { getSettings, getProgress } from './utils/storage'
import { trackView, viewPath } from './utils/analytics'
import { parseShareQuery, shareSearch } from './utils/shareLink'

// Lazy load heavy components - only load when needed
const ChapterList = lazy(() => import('./components/ChapterList'))
const ChapterView = lazy(() => import('./components/ChapterView'))
const BookmarksView = lazy(() => import('./components/BookmarksView'))
const PDFViewer = lazy(() => import('./components/PDFViewer'))
const ShaktipeethsView = lazy(() => import('./components/ShaktipeethsView'))
const CharDhamView = lazy(() => import('./components/CharDhamView'))
const JyotirlingasView = lazy(() => import('./components/JyotirlingasView'))
const TemplesView = lazy(() => import('./components/TemplesView'))
const ChhathPujaView = lazy(() => import('./components/ChhathPujaView'))
const DiwaliView = lazy(() => import('./components/DiwaliView'))
const NavratriView = lazy(() => import('./components/NavratriView'))
const ShivaratriView = lazy(() => import('./components/ShivaratriView'))
const HoliView = lazy(() => import('./components/HoliView'))
const JanmashtamiView = lazy(() => import('./components/JanmashtamiView'))
const GaneshChaturthiView = lazy(() => import('./components/GaneshChaturthiView'))
const KarvaChauthView = lazy(() => import('./components/KarvaChauthView'))
const SatyanarayanChapterView = lazy(() => import('./components/SatyanarayanChapterView'))
const ShastrasView = lazy(() => import('./components/ShastrasView'))

const standaloneViews = {
  shaktipeeths: ShaktipeethsView,
  charDham: CharDhamView,
  jyotirlingas: JyotirlingasView,
  temples: TemplesView,
  chhath: ChhathPujaView,
  diwali: DiwaliView,
  navratri: NavratriView,
  shivaratri: ShivaratriView,
  holi: HoliView,
  janmashtami: JanmashtamiView,
  ganeshChaturthi: GaneshChaturthiView,
  karvaChauth: KarvaChauthView,
} as const

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
  temples: {
    name: 'Temples',
    nameHindi: 'मंदिर',
  },
  chhath: {
    name: 'Chhath Puja',
    nameHindi: 'छठ पूजा',
  },
  diwali: {
    name: 'Diwali',
    nameHindi: 'दीपावली',
  },
  navratri: {
    name: 'Navratri',
    nameHindi: 'नवरात्रि',
  },
  shivaratri: {
    name: 'Maha Shivaratri',
    nameHindi: 'महा शिवरात्रि',
  },
  holi: {
    name: 'Holi',
    nameHindi: 'होली',
  },
  janmashtami: {
    name: 'Janmashtami',
    nameHindi: 'जन्माष्टमी',
  },
  ganeshChaturthi: {
    name: 'Ganesh Chaturthi',
    nameHindi: 'गणेश चतुर्थी',
  },
  karvaChauth: {
    name: 'Karva Chauth',
    nameHindi: 'करवा चौथ',
  },
  shastras: {
    name: 'Shastras',
    nameHindi: 'शास्त्र',
  },
}

function App() {
  // Load settings from storage
  const savedSettings = getSettings()
  const boot = parseShareQuery(typeof window === 'undefined' ? '' : window.location.search)
  const [textType, setTextType] = useState<TextType>(boot?.textType ?? 'gita')
  const [selectedChapter, setSelectedChapter] = useState<number | null>(boot?.chapter ?? null)
  const [selectedVerse, setSelectedVerse] = useState<number>(boot?.verse ?? 1)
  const [showBookmarks, setShowBookmarks] = useState(Boolean(boot?.bookmarks))
  const fontSize = savedSettings.fontSize
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
    if (boot?.bookmarks || boot?.chapter != null) return
    const progress = getProgress(textType)
    if (progress) {
      setSelectedChapter(progress.chapterNumber)
      setSelectedVerse(progress.verseNumber)
    }
  }, [textType])

  useEffect(() => {
    const search = shareSearch({
      bookmarks: showBookmarks,
      textType,
      chapter: selectedChapter,
      verse: selectedVerse,
    })
    const next = `${window.location.pathname}${search}`
    if (`${window.location.pathname}${window.location.search}` !== next) {
      window.history.replaceState(null, '', next)
    }
    const title = showBookmarks
      ? 'Bookmarks'
      : selectedChapter
        ? `${textConfigsBase[textType].name} · ${selectedChapter}`
        : textConfigsBase[textType].name
    trackView(viewPath({ bookmarks: showBookmarks, textType, chapter: selectedChapter, verse: selectedVerse }), title)
  }, [textType, selectedChapter, selectedVerse, showBookmarks])

  const currentTextConfig = textConfigsBase[textType]
  const currentTextData = textDataCache[textType] || []
  const currentText: TextConfig = {
    ...currentTextConfig,
    data: currentTextData,
  }
  const StandaloneView = standaloneViews[textType as keyof typeof standaloneViews]
  const isShastrasView = textType === 'shastras'
  const isSpecialView = Boolean(StandaloneView) || isShastrasView
  const isHomePage = selectedChapter === null && !isSpecialView && !showBookmarks

  const openSection = (type: TextType, chapter: number | null = null, verse = 1) => {
    setShowBookmarks(false)
    setTextType(type)
    setSelectedChapter(chapter)
    setSelectedVerse(verse)
    setSourcePdf(null)
  }

  const handleChapterSelect = (chapterNumber: number, verseNumber?: number) => {
    setSelectedChapter(chapterNumber)
    setSelectedVerse(verseNumber || 1)
  }

  const handleBackToHome = () => {
    setSelectedChapter(null)
    setSelectedVerse(1)
    setSourcePdf(null)
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-cream paper-grain">
        <SiteNav
          currentType={textType}
          labels={textConfigsBase}
          onSelect={(type) => openSection(type)}
          bookmarksActive={showBookmarks}
          onOpenBookmarks={() => {
            setShowBookmarks(true)
            setSourcePdf(null)
          }}
          trailing={<PanchangWidget placement="header" onOpenSection={(type) => openSection(type)} />}
        />

        {/* Main Content */}
        <div className="relative z-10 flex-1 md:pl-64">
          {showBookmarks ? (
            <Suspense fallback={<LoadingSpinner />}>
              <BookmarksView
                onNavigate={(type, chapter, verse) => openSection(type, chapter, verse)}
                onBack={() => setShowBookmarks(false)}
              />
            </Suspense>
          ) : sourcePdf ? (
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
          ) : StandaloneView ? (
            <Suspense fallback={<LoadingSpinner />}>
              <div key={`${textType}-view`} className="animate-fadeIn">
                <StandaloneView />
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

        <GitaChatbot />

        <footer className="mt-auto border-t border-gold bg-cream md:pl-64">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-ink">
            <div className="text-xs uppercase tracking-[0.2em] text-maroon/80 font-serif">Connect & Explore</div>
            <div className="mt-2 text-base font-semibold text-maroon">
              Developed by Aman Shekhar
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://link.amazon/B0iBEnmNS"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold bg-cream px-4 py-2 text-xs font-medium text-maroon shadow-sm transition-all hover:border-saffron hover:bg-saffron-light"
              >
                My Books
              </a>
              <a
                href="https://technoblogger14o3.github.io/my-portfolio/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold bg-cream px-4 py-2 text-xs font-medium text-maroon shadow-sm transition-all hover:border-saffron hover:bg-saffron-light"
              >
                Portfolio
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
                Technical Blog
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

