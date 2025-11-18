import { useState } from 'react'
import { Verse } from '../../types'

interface ShareButtonProps {
  verse: Verse
  chapterName: string
  chapterNumber: number
}

export default function ShareButton({ verse, chapterName, chapterNumber }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareText = `Chapter ${chapterNumber}: ${chapterName}\nVerse ${verse.verse_number}\n\n${verse.text}\n\n${verse.meaning}`
    const shareUrl = `${window.location.origin}${window.location.pathname}?chapter=${chapterNumber}&verse=${verse.verse_number}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bhagavad Gita - Chapter ${chapterNumber}, Verse ${verse.verse_number}`,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled')
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>Share</span>
        </>
      )}
    </button>
  )
}

