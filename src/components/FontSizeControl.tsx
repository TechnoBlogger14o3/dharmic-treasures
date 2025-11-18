import { useState } from 'react'

interface FontSizeControlProps {
  fontSize: number
  onFontSizeChange: (size: number) => void
}

export default function FontSizeControl({ fontSize, onFontSizeChange }: FontSizeControlProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sizes = [12, 14, 16, 18, 20, 22, 24]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:shadow-xl transition-all border border-gray-200"
        aria-label="Adjust Font Size"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50 min-w-[120px]">
            <div className="text-xs font-semibold text-gray-600 mb-2 px-2">Font Size</div>
            <div className="space-y-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    onFontSizeChange(size)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    fontSize === size
                      ? 'bg-amber-100 text-amber-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{ fontSize: `${size}px` }}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

