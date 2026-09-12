export const PDF_PAGE_GAP = 24
export const PDF_PAGE_BUFFER = 2
export const PDF_DEFAULT_ASPECT = 1.414

export function clampPage(page: number, numPages: number): number {
  if (!Number.isFinite(page) || numPages < 1) return 1
  return Math.min(Math.max(Math.trunc(page), 1), numPages)
}

export function parsePageInput(raw: string, numPages: number): number | null {
  const n = Number.parseInt(raw.trim(), 10)
  if (!Number.isFinite(n) || n < 1) return null
  return clampPage(n, numPages)
}

export function visiblePageWindow(
  center: number,
  numPages: number,
  buffer = PDF_PAGE_BUFFER,
): { start: number; end: number } {
  const c = clampPage(center, numPages)
  return {
    start: Math.max(1, c - buffer),
    end: Math.min(numPages, c + buffer),
  }
}

export function pageScrollOffset(page: number, pageHeight: number, gap = PDF_PAGE_GAP): number {
  return (clampPage(page, Number.MAX_SAFE_INTEGER) - 1) * (pageHeight + gap)
}

export function pageFromScrollTop(scrollTop: number, pageHeight: number, gap = PDF_PAGE_GAP): number {
  const stride = pageHeight + gap
  if (stride <= 0) return 1
  return Math.floor((Math.max(0, scrollTop) + pageHeight / 2) / stride) + 1
}

export function pageHeightFromWidth(width: number, aspect = PDF_DEFAULT_ASPECT): number {
  return Math.max(1, width) * Math.max(0.2, aspect)
}
