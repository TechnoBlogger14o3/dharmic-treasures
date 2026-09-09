/**
 * Loading spinner component for Suspense fallbacks
 */
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-saffron border-t-transparent"></div>
        <p className="text-ink/70 text-sm">Loading...</p>
      </div>
    </div>
  )
}
