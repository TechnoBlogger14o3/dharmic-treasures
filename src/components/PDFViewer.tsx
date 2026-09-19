import { Component, useEffect, useMemo, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import {
  PDF_DEFAULT_ASPECT,
  PDF_PAGE_BUFFER,
  PDF_PAGE_GAP,
  clampPage,
  pageFromScrollTop,
  pageHeightFromWidth,
  pageScrollOffset,
  parsePageInput,
  visiblePageWindow,
} from '../utils/pdfNav'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

interface PDFViewerProps {
  pdfPath: string
  title: string
  titleHindi: string
  onBack: () => void
  initialPage?: number
}

class PdfPaneErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PDF viewer crashed:', error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="py-16 text-center">
          <div className="text-maroon text-lg mb-2">Could not open this PDF</div>
          <p className="text-sm text-ink/60 mb-4">{this.state.error.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="px-4 py-2 bg-saffron text-white rounded-lg hover:bg-saffron-dark"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function PDFViewer({ pdfPath, title, titleHindi, onBack, initialPage = 1 }: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(initialPage > 0 ? initialPage : 1)
  const [pageInput, setPageInput] = useState(String(initialPage > 0 ? initialPage : 1))
  const [editingInput, setEditingInput] = useState(false)
  const [pageWidth, setPageWidth] = useState(800)
  const [pageAspect, setPageAspect] = useState(PDF_DEFAULT_ASPECT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ignoreScrollRef = useRef(false)
  const placedInitialRef = useRef(false)
  const measuredAspectRef = useRef(false)

  const file = useMemo(
    () => `${import.meta.env.BASE_URL}${pdfPath}`.replace(/\/{2,}/g, '/'),
    [pdfPath],
  )
  const pageHeight = pageHeightFromWidth(pageWidth, pageAspect)
  const windowed = visiblePageWindow(pageNumber, numPages, PDF_PAGE_BUFFER)

  useEffect(() => {
    const calculateWidth = () => {
      const viewportWidth = window.innerWidth
      const padding = 48
      const maxWidth = 860
      if (viewportWidth < 640) {
        setPageWidth(viewportWidth - padding)
      } else if (viewportWidth < 1024) {
        setPageWidth(Math.min(viewportWidth - padding, maxWidth))
      } else {
        setPageWidth(maxWidth)
      }
    }

    calculateWidth()
    window.addEventListener('resize', calculateWidth)
    return () => window.removeEventListener('resize', calculateWidth)
  }, [])

  useEffect(() => {
    if (!editingInput) setPageInput(String(pageNumber))
  }, [pageNumber, editingInput])

  const scrollToPage = (page: number) => {
    const el = scrollRef.current
    if (!el || !numPages) return
    const next = clampPage(page, numPages)
    ignoreScrollRef.current = true
    el.scrollTo({ top: pageScrollOffset(next, pageHeight, PDF_PAGE_GAP), behavior: 'auto' })
    window.setTimeout(() => {
      ignoreScrollRef.current = false
    }, 80)
  }

  useEffect(() => {
    placedInitialRef.current = false
    measuredAspectRef.current = false
  }, [file, initialPage])

  useEffect(() => {
    if (!numPages || loading || placedInitialRef.current) return
    placedInitialRef.current = true
    const startPage = clampPage(initialPage || 1, numPages)
    setPageNumber(startPage)
    scrollToPage(startPage)
  }, [numPages, initialPage, loading])

  const onDocumentLoadSuccess = (data: { numPages: number }) => {
    setNumPages(data.numPages)
    setPageNumber(clampPage(initialPage || 1, data.numPages))
    setLoading(false)
    setError(null)
  }

  const onDocumentLoadError = (loadError: Error) => {
    console.error('PDF load error:', loadError, file)
    setError(
      `This PDF is not on the server yet (deploy only uploads files that are in git under public/pdfs/). ${loadError.message}`,
    )
    setLoading(false)
  }

  const goToPage = (page: number) => {
    if (!numPages) return
    const next = clampPage(page, numPages)
    setPageNumber(next)
    scrollToPage(next)
  }

  const commitPageInput = () => {
    setEditingInput(false)
    const parsed = parsePageInput(pageInput, numPages)
    if (parsed == null) {
      setPageInput(String(pageNumber))
      return
    }
    goToPage(parsed)
  }

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el || !numPages || ignoreScrollRef.current) return
    setPageNumber(clampPage(pageFromScrollTop(el.scrollTop, pageHeight, PDF_PAGE_GAP), numPages))
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-6xl animate-fadeIn">
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-maroon hover:text-saffron active:text-saffron-dark transition-all duration-300 mb-3 sm:mb-4 py-2 -ml-2 pl-2 pr-4 rounded-lg touch-manipulation animate-slideInLeft"
        >
          <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">Back</span>
        </button>
        <div className="folio rounded-xl p-4 sm:p-6 animate-scaleIn">
          <div className="text-center">
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-maroon mb-2">{titleHindi}</h1>
            <p className="text-base sm:text-lg text-ink/70">{title}</p>
          </div>
        </div>
      </div>

      <div className="folio rounded-xl p-3 sm:p-4 mb-4">
        {error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-2">Error</div>
              <div className="text-sm text-gray-600">{error}</div>
              <div className="text-xs text-gray-500 mt-2">Path: {file}</div>
            </div>
          </div>
        ) : (
          <PdfPaneErrorBoundary>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-pulse-slow text-saffron text-lg mb-2">Loading PDF...</div>
                    <div className="text-sm text-ink/50">Please wait</div>
                  </div>
                </div>
              }
            >
              {numPages > 0 && (
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="overflow-y-auto overscroll-contain rounded-lg bg-ink/5"
                  style={{ height: 'min(70dvh, calc(100dvh - 22rem))' }}
                >
                  <div style={{ height: pageScrollOffset(windowed.start, pageHeight, PDF_PAGE_GAP) }} />
                  {Array.from({ length: windowed.end - windowed.start + 1 }, (_, i) => windowed.start + i).map((n) => (
                    <div
                      key={n}
                      className="flex justify-center"
                      style={{ height: pageHeight, marginBottom: PDF_PAGE_GAP }}
                    >
                      <Page
                        pageNumber={n}
                        width={pageWidth}
                        renderTextLayer
                        renderAnnotationLayer={false}
                        className="shadow-2xl"
                        onLoadSuccess={(page) => {
                          if (measuredAspectRef.current) return
                          const viewport = page.getViewport({ scale: 1 })
                          if (viewport.width > 0) {
                            measuredAspectRef.current = true
                            setPageAspect(viewport.height / viewport.width)
                          }
                        }}
                      />
                    </div>
                  ))}
                  <div
                    style={{
                      height: Math.max(0, (numPages - windowed.end) * (pageHeight + PDF_PAGE_GAP)),
                    }}
                  />
                </div>
              )}
            </Document>
          </PdfPaneErrorBoundary>
        )}
      </div>

      <div className="flex items-center justify-between bg-cream rounded-xl shadow-lg p-3 sm:p-4 border border-gold">
        <button
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber <= 1 || loading}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all duration-200 touch-manipulation min-h-[44px] ${
            pageNumber <= 1 || loading
              ? 'bg-saffron-light text-ink/40 cursor-not-allowed'
              : 'bg-saffron text-white hover:bg-saffron-dark active:bg-saffron-dark shadow-md'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">Previous</span>
        </button>

        <form
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-ink/70 font-medium px-1"
          onSubmit={(event) => {
            event.preventDefault()
            commitPageInput()
          }}
        >
          <label className="sr-only" htmlFor="pdf-page-input">
            Go to page
          </label>
          <input
            id="pdf-page-input"
            type="number"
            min={1}
            max={numPages || undefined}
            inputMode="numeric"
            value={pageInput}
            disabled={loading || !numPages}
            onFocus={() => setEditingInput(true)}
            onBlur={commitPageInput}
            onChange={(event) => setPageInput(event.target.value)}
            className="w-16 sm:w-20 rounded-lg border border-gold bg-cream px-2 py-2 text-center text-sm sm:text-base text-maroon font-semibold tabular-nums"
          />
          <span>/ {numPages || '…'}</span>
        </form>

        <button
          onClick={() => goToPage(pageNumber + 1)}
          disabled={pageNumber >= numPages || loading}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all duration-200 touch-manipulation min-h-[44px] ${
            pageNumber >= numPages || loading
              ? 'bg-saffron-light text-ink/40 cursor-not-allowed'
              : 'bg-saffron text-white hover:bg-saffron-dark active:bg-saffron-dark shadow-md'
          }`}
        >
          <span className="text-sm sm:text-base">Next</span>
          <ChevronRightIcon className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>
    </div>
  )
}
