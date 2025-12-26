import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'

// Set up PDF.js worker - use local worker file
const workerPath = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`
pdfjs.GlobalWorkerOptions.workerSrc = workerPath
console.log('PDF.js worker path:', workerPath)

interface PDFViewerProps {
  pdfPath: string
  title: string
  titleHindi: string
  onBack: () => void
}

export default function PDFViewer({ pdfPath, title, titleHindi, onBack }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageWidth, setPageWidth] = useState<number>(800)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  const fullPdfPath = `${import.meta.env.BASE_URL}${pdfPath}`.replace(/\/\//g, '/')

  // Calculate page width based on viewport
  useEffect(() => {
    const calculateWidth = () => {
      const viewportWidth = window.innerWidth
      const padding = 32 // 16px on each side
      const maxWidth = 900
      
      if (viewportWidth < 640) {
        // Mobile
        setPageWidth(viewportWidth - padding)
      } else if (viewportWidth < 1024) {
        // Tablet
        setPageWidth(Math.min(viewportWidth - padding, maxWidth))
      } else {
        // Desktop
        setPageWidth(maxWidth)
      }
    }

    calculateWidth()
    window.addEventListener('resize', calculateWidth)
    return () => window.removeEventListener('resize', calculateWidth)
  }, [])

  const onDocumentLoadSuccess = (data: { numPages: number }) => {
    setNumPages(data.numPages)
    setLoading(false)
    setError(null)
  }

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error)
    console.error('PDF path:', fullPdfPath)
    const errorMessage = error.message || 'Unknown error'
    setError(`Failed to load PDF: ${errorMessage}. Please check if the file exists.`)
    setLoading(false)
  }

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNext = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  // Handle page click/tap for navigation
  const handlePageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (loading) return
    
    const pageElement = event.currentTarget
    const clickX = event.clientX - pageElement.getBoundingClientRect().left
    const pageWidth = pageElement.offsetWidth
    
    // Left side (40% of page) = previous, Right side (60% of page) = next
    if (clickX < pageWidth * 0.4) {
      handlePrevious()
    } else {
      handleNext()
    }
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-6xl animate-fadeIn pb-20 sm:pb-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-amber-600 active:text-amber-700 transition-all duration-300 mb-3 sm:mb-4 py-2 -ml-2 pl-2 pr-4 rounded-lg touch-manipulation animate-slideInLeft"
        >
          <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">Back</span>
        </button>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 animate-scaleIn">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">{titleHindi}</h1>
            <p className="text-base sm:text-lg text-gray-600">{title}</p>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 mb-4 sm:mb-6">
        {error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-2">Error</div>
              <div className="text-sm text-gray-600">{error}</div>
              <div className="text-xs text-gray-500 mt-2">Path: {fullPdfPath}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div 
              className="mb-4 relative cursor-pointer"
              onClick={handlePageClick}
            >
              <Document
                file={fullPdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className="spinner-pulse">
                          <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="animate-pulse-slow text-amber-500 text-lg mb-2">Loading PDF...</div>
                      <div className="text-sm text-gray-500">Please wait</div>
                    </div>
                  </div>
                }
              >
                {numPages > 0 && (
                  <>
                    <div className="relative">
                      <Page
                        pageNumber={pageNumber}
                        width={pageWidth}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-2xl"
                      />
                      {/* Clickable overlay hints - invisible but functional */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-[40%] opacity-0 hover:opacity-5 bg-blue-400 transition-opacity duration-200"
                        style={{ 
                          pointerEvents: pageNumber > 1 ? 'auto' : 'none',
                          cursor: pageNumber > 1 ? 'w-resize' : 'default'
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (pageNumber > 1) handlePrevious()
                        }}
                        title="Click to go to previous page"
                      />
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-[60%] opacity-0 hover:opacity-5 bg-green-400 transition-opacity duration-200"
                        style={{ 
                          pointerEvents: pageNumber < numPages ? 'auto' : 'none',
                          cursor: pageNumber < numPages ? 'e-resize' : 'default'
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (pageNumber < numPages) handleNext()
                        }}
                        title="Click to go to next page"
                      />
                    </div>
                    {/* Page Info */}
                    <div className="text-sm sm:text-base text-gray-600 font-medium mb-4 mt-4">
                      Page {pageNumber} of {numPages}
                      <span className="text-xs text-gray-400 ml-2 block sm:inline">(Tap left/right side to turn page)</span>
                    </div>
                  </>
                )}
              </Document>
            </div>
          </div>
        )}
      </div>

      {/* Navigation - Fixed on mobile, relative on desktop */}
      <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto flex items-center justify-between bg-white/95 backdrop-blur-md sm:bg-white/90 sm:backdrop-blur-sm rounded-t-xl sm:rounded-xl shadow-lg sm:shadow-lg p-3 sm:p-4 border-t sm:border border-gray-200 animate-slideInRight z-40">
        <button
          onClick={handlePrevious}
          disabled={pageNumber === 1 || loading}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all duration-200 touch-manipulation min-h-[44px] transform hover:scale-105 active:scale-95 ${
            pageNumber === 1 || loading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-md hover:shadow-lg'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
          <span className="text-sm sm:text-base">Previous</span>
        </button>

        <div className="text-xs sm:text-sm text-gray-600 font-medium px-2">
          {pageNumber} / {numPages || '...'}
        </div>

        <button
          onClick={handleNext}
          disabled={pageNumber === numPages || loading}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all duration-200 touch-manipulation min-h-[44px] transform hover:scale-105 active:scale-95 ${
            pageNumber === numPages || loading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-md hover:shadow-lg'
          }`}
        >
          <span className="text-sm sm:text-base">Next</span>
          <ChevronRightIcon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

