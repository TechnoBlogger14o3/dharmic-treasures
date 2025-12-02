import { useState } from 'react'

interface BackgroundSelectorProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
  themes: string[]
}

const themeLabels: Record<string, string> = {
  'gradient-1': 'Warm',
  'gradient-2': 'Cool',
  'gradient-3': 'Nature',
  'gradient-4': 'Rose',
  'gradient-5': 'Neutral',
}

export default function BackgroundSelector({
  currentTheme,
  onThemeChange,
  themes,
}: BackgroundSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/95 backdrop-blur-md sm:bg-white/90 sm:backdrop-blur-sm rounded-lg p-2.5 sm:p-3 shadow-lg hover:shadow-xl active:shadow-md transition-all border border-gray-200 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Change Background Theme"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50 min-w-[160px]">
            <div className="text-xs font-semibold text-gray-600 mb-2 px-2">Background Theme</div>
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => {
                  onThemeChange(theme)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors touch-manipulation min-h-[44px] ${
                  currentTheme === theme
                    ? 'bg-amber-100 text-amber-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                {themeLabels[theme] || theme}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

