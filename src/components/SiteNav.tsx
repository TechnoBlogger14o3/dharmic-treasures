import { useEffect, useState } from 'react'
import type { TextType } from '../../types'
import { NAV_GROUPS } from '../utils/siteNav'

interface SiteNavProps {
  currentType: TextType
  labels: Record<TextType, { name: string; nameHindi: string }>
  onSelect: (type: TextType) => void
}

export default function SiteNav({ currentType, labels, onSelect }: SiteNavProps) {
  const [open, setOpen] = useState(false)
  const current = labels[currentType]

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (type: TextType) => {
    onSelect(type)
    setOpen(false)
  }

  return (
    <>
      <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
          className="flex-shrink-0 bg-cream rounded-lg border border-gold min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation hover:bg-saffron-light"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <div className="min-w-0">
          <div className="font-serif text-cream text-base sm:text-lg leading-tight truncate">{current.nameHindi}</div>
          <div className="text-cream/80 text-[11px] sm:text-xs truncate">{current.name}</div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60]" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="site-menu"
            aria-label="Site sections"
            className="absolute inset-y-0 left-0 w-[min(20rem,88vw)] bg-cream border-r border-gold shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 bg-saffron text-cream px-4 py-4 border-b border-gold flex items-center justify-between">
              <div>
                <div className="text-lg leading-none">ॐ</div>
                <div className="font-serif text-sm mt-1">धर्मिक निधि</div>
                <div className="text-[11px] text-cream/80">Dharmic Treasures</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-saffron-dark touch-manipulation"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-3 pb-24 space-y-4">
              {NAV_GROUPS.map((group) => {
                if (group.kind === 'item') {
                  const selected = currentType === group.type
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => choose(group.type)}
                      className={`w-full text-left px-3 py-3 rounded-xl border touch-manipulation min-h-[48px] ${
                        selected
                          ? 'bg-saffron text-white border-gold'
                          : 'bg-cream border-gold/70 text-ink hover:bg-saffron-light'
                      }`}
                    >
                      <div className="font-serif text-base">{labels[group.type].nameHindi}</div>
                      <div className={`text-xs ${selected ? 'text-cream/80' : 'text-ink/60'}`}>
                        {labels[group.type].name}
                      </div>
                    </button>
                  )
                }

                return (
                  <div key={group.id}>
                    <div className="px-1 mb-2">
                      <div className="font-serif text-maroon text-sm">{group.nameHindi}</div>
                      <div className="text-[11px] uppercase tracking-wide text-ink/50">{group.name}</div>
                    </div>
                    <div className="space-y-1.5">
                      {group.types.map((type) => {
                        const selected = currentType === type
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => choose(type)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg border touch-manipulation min-h-[44px] ${
                              selected
                                ? 'bg-saffron-light border-gold text-maroon'
                                : 'bg-cream border-gold/50 text-ink hover:bg-saffron-light/70'
                            }`}
                          >
                            <div className="font-serif text-sm">{labels[type].nameHindi}</div>
                            <div className="text-[11px] text-ink/60">{labels[type].name}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}
