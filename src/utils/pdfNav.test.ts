import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  clampPage,
  pageFromScrollTop,
  pageHeightFromWidth,
  pageScrollOffset,
  parsePageInput,
  visiblePageWindow,
} from './pdfNav.ts'

test('clampPage stays inside the book', () => {
  assert.equal(clampPage(0, 300), 1)
  assert.equal(clampPage(1, 300), 1)
  assert.equal(clampPage(300, 300), 300)
  assert.equal(clampPage(999, 300), 300)
  assert.equal(clampPage(12.9, 300), 12)
  assert.equal(clampPage(Number.NaN, 300), 1)
  assert.equal(clampPage(5, 0), 1)
})

test('parsePageInput jumps to a typed page number', () => {
  assert.equal(parsePageInput('300', 1264), 300)
  assert.equal(parsePageInput(' 42 ', 1264), 42)
  assert.equal(parsePageInput('9999', 1264), 1264)
  assert.equal(parsePageInput('0', 1264), null)
  assert.equal(parsePageInput('abc', 1264), null)
  assert.equal(parsePageInput('', 1264), null)
})

test('visiblePageWindow only keeps nearby pages mounted', () => {
  assert.deepEqual(visiblePageWindow(1, 1264, 2), { start: 1, end: 3 })
  assert.deepEqual(visiblePageWindow(300, 1264, 2), { start: 298, end: 302 })
  assert.deepEqual(visiblePageWindow(1264, 1264, 2), { start: 1262, end: 1264 })
})

test('scroll offset and page-from-scroll stay in sync', () => {
  const height = 800
  const gap = 24
  const offset = pageScrollOffset(300, height, gap)
  assert.equal(offset, 299 * (height + gap))
  assert.equal(pageFromScrollTop(offset, height, gap), 300)
  assert.equal(pageFromScrollTop(0, height, gap), 1)
})

test('pageHeightFromWidth uses the measured aspect ratio', () => {
  assert.equal(pageHeightFromWidth(595, 842 / 595), 842)
})
