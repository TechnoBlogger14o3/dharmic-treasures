interface ProgressIndicatorProps {
  progress: number
  currentVerse: number
  totalVerses: number
}

export default function ProgressIndicator({
  progress,
  currentVerse,
  totalVerses,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-ink">Reading Progress</span>
        <span className="text-xs sm:text-sm text-ink/70">
          {currentVerse} / {totalVerses}
        </span>
      </div>
      <div className="w-full bg-saffron-light rounded-full h-2 sm:h-2.5 overflow-hidden">
        <div
          className="bg-saffron h-2 sm:h-2.5 rounded-full transition-all duration-500 ease-out animate-fadeIn"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

