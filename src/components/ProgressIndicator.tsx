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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Reading Progress</span>
        <span className="text-sm text-gray-600">
          {currentVerse} / {totalVerses}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-amber-500 h-2.5 rounded-full transition-all duration-500 ease-out animate-fadeIn"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

