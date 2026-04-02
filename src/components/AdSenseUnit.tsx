import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, ADSENSE_SLOTS } from '../constants/adsense'

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

export type AdSenseVariant = 'display' | 'multiplex' | 'inArticle'

type Props = {
  variant: AdSenseVariant
  className?: string
}

/**
 * Single AdSense unit. Script loads once from index.html. One slot per instance per page.
 */
export default function AdSenseUnit({ variant, className = '' }: Props) {
  const ref = useRef<HTMLModElement>(null)
  const slot = ADSENSE_SLOTS[variant]
  const adtest = import.meta.env.DEV ? 'on' : undefined

  useEffect(() => {
    if (!ref.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense push failed:', e)
    }
  }, [variant, slot])

  if (variant === 'display') {
    return (
      <div className={`mx-auto max-w-4xl overflow-hidden ${className}`}>
        <ins
          ref={ref}
          className="adsbygoogle block min-h-[90px] w-full"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-adtest={adtest}
        />
      </div>
    )
  }

  if (variant === 'multiplex') {
    return (
      <div className={`mx-auto max-w-4xl overflow-hidden ${className}`}>
        <ins
          ref={ref}
          className="adsbygoogle block min-h-[120px] w-full"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="autorelaxed"
          data-adtest={adtest}
        />
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-4xl overflow-hidden ${className}`}>
      <ins
        ref={ref}
        className="adsbygoogle block w-full"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-adtest={adtest}
      />
    </div>
  )
}
