import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

const DEFAULT_CLIENT = 'ca-pub-8542326322762354'

type AdsenseJson = { slot?: string }

function configUrl(): string {
  const base = import.meta.env.BASE_URL || '/'
  const name = 'adsense-config.json'
  return base.endsWith('/') ? `${base}${name}` : `${base}/${name}`
}

/**
 * Display ad unit. Slot can be set at **build time** via `VITE_ADSENSE_AD_SLOT` in `.env`,
 * or at **runtime** by uploading `public/adsense-config.json` next to `index.html` (no rebuild).
 * Create `adsense-config.json` from `public/adsense-config.example.json`.
 */
export default function AdSenseBanner({ className = '' }: { className?: string }) {
  const insRef = useRef<HTMLModElement>(null)
  const client = import.meta.env.VITE_ADSENSE_CLIENT_ID || DEFAULT_CLIENT
  const envSlot = import.meta.env.VITE_ADSENSE_AD_SLOT?.trim()
  const [runtimeSlot, setRuntimeSlot] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    if (envSlot) return
    let cancelled = false
    fetch(configUrl(), { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<AdsenseJson>
      })
      .then((data) => {
        if (cancelled || !data?.slot) return
        const s = String(data.slot).trim()
        if (s) setRuntimeSlot(s)
      })
      .catch(() => {
        if (!cancelled && import.meta.env.DEV) {
          setFetchError('Optional adsense-config.json not found or invalid (OK if you use .env only).')
        }
      })
    return () => {
      cancelled = true
    }
  }, [envSlot])

  const slot = envSlot || runtimeSlot

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
          <p>
            AdSense: set <code className="rounded bg-white/80 px-1">VITE_ADSENSE_AD_SLOT</code> in{' '}
            <code className="rounded bg-white/80 px-1">.env</code> and rebuild, <strong>or</strong> add{' '}
            <code className="rounded bg-white/80 px-1">adsense-config.json</code> to <code className="rounded bg-white/80 px-1">public/</code>{' '}
            (see <code className="rounded bg-white/80 px-1">adsense-config.example.json</code>) and rebuild once, or upload that JSON to the server with <code className="rounded bg-white/80 px-1">index.html</code>.
          </p>
          {fetchError && <p className="mt-1 text-amber-800">{fetchError}</p>}
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
