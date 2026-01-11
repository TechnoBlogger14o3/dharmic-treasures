/**
 * Storage utilities for bookmarks, progress, and settings
 * Uses localStorage for web, can be enhanced with Tauri's file system for desktop
 */

export interface Bookmark {
  textType: string
  chapterNumber: number
  verseNumber: number
  chapterName: string
  timestamp: number
}

export interface ReadingProgress {
  textType: string
  chapterNumber: number
  verseNumber: number
  lastRead: number
}

export interface AppSettings {
  fontSize: number
  backgroundTheme: string
  notificationsEnabled: boolean
  dailyVerseTime?: string
}

const STORAGE_KEYS = {
  BOOKMARKS: 'dharmic-treasures-bookmarks',
  PROGRESS: 'dharmic-treasures-progress',
  SETTINGS: 'dharmic-treasures-settings',
}

// Bookmarks
export function getBookmarks(): Bookmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveBookmark(bookmark: Bookmark): void {
  const bookmarks = getBookmarks()
  // Check if bookmark already exists
  const exists = bookmarks.some(
    (b) =>
      b.textType === bookmark.textType &&
      b.chapterNumber === bookmark.chapterNumber &&
      b.verseNumber === bookmark.verseNumber
  )
  if (!exists) {
    bookmarks.push(bookmark)
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks))
  }
}

export function removeBookmark(textType: string, chapterNumber: number, verseNumber: number): void {
  const bookmarks = getBookmarks()
  const filtered = bookmarks.filter(
    (b) =>
      !(
        b.textType === textType &&
        b.chapterNumber === chapterNumber &&
        b.verseNumber === verseNumber
      )
  )
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered))
}

export function isBookmarked(textType: string, chapterNumber: number, verseNumber: number): boolean {
  const bookmarks = getBookmarks()
  return bookmarks.some(
    (b) =>
      b.textType === textType &&
      b.chapterNumber === chapterNumber &&
      b.verseNumber === verseNumber
  )
}

// Reading Progress
export function getProgress(textType: string): ReadingProgress | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS)
    const allProgress: ReadingProgress[] = stored ? JSON.parse(stored) : []
    return allProgress.find((p) => p.textType === textType) || null
  } catch {
    return null
  }
}

export function saveProgress(progress: ReadingProgress): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS)
    const allProgress: ReadingProgress[] = stored ? JSON.parse(stored) : []
    const index = allProgress.findIndex((p) => p.textType === progress.textType)
    if (index >= 0) {
      allProgress[index] = progress
    } else {
      allProgress.push(progress)
    }
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

// Settings
export function getSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return stored
      ? JSON.parse(stored)
      : {
          fontSize: 16,
          backgroundTheme: 'gradient-1',
          notificationsEnabled: false,
        }
  } catch {
    return {
      fontSize: 16,
      backgroundTheme: 'gradient-1',
      notificationsEnabled: false,
    }
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}
