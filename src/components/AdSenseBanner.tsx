import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

const DEFAULT_CLIENT = 'ca-pub-8542326322762354'

/**
 * Display ad unit. Create a unit in AdSense → Ads → By ad unit → copy the **data-ad-slot** value
 * into VITE_ADSENSE_AD_SLOT (see .env.example).
 */
export default function AdSenseBanner({ className = '' }: { className?: string }) {
  const insRef = useRef<HTMLModElement>(null)
  const client = import.meta.env.VITE_ADSENSE_CLIENT_ID || DEFAULT_CLIENT
  const slot = import.meta.env.VITE_ADSENSE_AD_SLOT?.trim()

  useEffect(() => {
    if (!slot || !insRef.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense push failed:', e)
    }
  }, [slot])

  if (!slot) {
    if (import.meta.env.DEV) {
      return (
        <div
          className={`rounded-lg border border-dashed border-amber-300 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 ${className}`}
        >
          AdSense: set <code className="rounded bg-white/80 px-1">VITE_ADSENSE_AD_SLOT</code> in{' '}
          <code className="rounded bg-white/80 px-1">.env</code> (from AdSense → Ad units).
        </div>
      )
    }
    return null
  }

  return (
    <div className={`mx-auto max-w-4xl overflow-hidden ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle block min-h-[100px] w-full"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={import.meta.env.DEV ? 'on' : undefined}
      />
      {import.meta.env.DEV && (
        <p className="mt-2 text-left text-[11px] text-gray-500">
          Dev mode: <code className="rounded bg-gray-100 px-1">data-adtest=&quot;on&quot;</code> is set. Google often still does
          not fill ads on <code className="rounded bg-gray-100 px-1">localhost</code> — check the live site, or run{' '}
          <code className="rounded bg-gray-100 px-1">npm run build && npm run preview</code> and test on your domain via
          hosts / staging.
        </p>
      )}
    </div>
  )
}
