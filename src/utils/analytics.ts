import type { TextType } from '../../types.ts'

export const GA_MEASUREMENT_ID = 'G-4ZWWE5XN4E'

export function viewPath(input: {
  bookmarks?: boolean
  textType?: TextType | null
  chapter?: number | null
  verse?: number
}): string {
  if (input.bookmarks) return '/bookmarks'
  if (!input.textType) return '/'
  if (input.chapter == null) return `/${input.textType}`
  if (input.verse && input.verse > 1) return `/${input.textType}/${input.chapter}/${input.verse}`
  return `/${input.textType}/${input.chapter}`
}

export function trackView(path: string, title: string): void {
  const gtag = typeof window !== 'undefined' ? window.gtag : undefined
  if (typeof gtag !== 'function') return
  gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
  })
}
