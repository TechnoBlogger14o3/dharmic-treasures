import { useState } from 'react'
import { Verse } from '../../types'
import { saveTextToFile, printContent, isTauri } from '../utils/tauri'

interface ExportButtonProps {
  verse: Verse
  chapterName: string
  chapterNumber: number
  textType: string
}

export default function ExportButton({ verse, chapterName, chapterNumber, textType }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const formatVerseForExport = (): string => {
    return `Chapter ${chapterNumber}: ${chapterName}
Verse ${verse.verse_number}

${verse.text}

Transliteration:
${verse.transliteration}

Hindi Meaning:
${verse.hindi_meaning}

English Meaning:
${verse.meaning}

---
Exported from Dharmic Treasures
${new Date().toLocaleString()}
`
  }

  const handleExport = async (format: 'file' | 'print') => {
    setExporting(true)
    try {
      const content = formatVerseForExport()
      const filename = `${textType}-chapter${chapterNumber}-verse${verse.verse_number}.txt`

      if (format === 'file') {
        const success = await saveTextToFile(content, filename)
        if (success) {
          // Show success message (could use toast notification)
          console.log('Verse exported successfully')
        }
      } else {
        await printContent(`
          <div style="font-family: serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1>Chapter ${chapterNumber}: ${chapterName}</h1>
            <h2>Verse ${verse.verse_number}</h2>
            <div style="font-size: 18px; margin: 20px 0; text-align: center;">
              ${verse.text}
            </div>
            <div style="margin: 20px 0; font-style: italic;">
              <strong>Transliteration:</strong><br/>
              ${verse.transliteration}
            </div>
            <div style="margin: 20px 0;">
              <strong>Hindi Meaning:</strong><br/>
              ${verse.hindi_meaning}
            </div>
            <div style="margin: 20px 0;">
              <strong>English Meaning:</strong><br/>
              ${verse.meaning}
            </div>
            <div style="margin-top: 40px; font-size: 12px; color: #666; text-align: center;">
              Exported from Dharmic Treasures - ${new Date().toLocaleString()}
            </div>
          </div>
        `)
      }
    } catch (error) {
      console.error('Export error:', error)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleExport('file')}
        disabled={exporting}
        className="flex items-center gap-2 px-4 py-2.5 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 transition-colors text-sm font-medium touch-manipulation min-h-[44px] disabled:opacity-50"
        title="Save verse to file"
      >
        {exporting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>{isTauri() ? 'Save' : 'Download'}</span>
          </>
        )}
      </button>
      <button
        onClick={() => handleExport('print')}
        disabled={exporting}
        className="flex items-center gap-2 px-4 py-2.5 sm:py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 active:bg-purple-700 transition-colors text-sm font-medium touch-manipulation min-h-[44px] disabled:opacity-50"
        title="Print verse"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        <span>Print</span>
      </button>
    </div>
  )
}
