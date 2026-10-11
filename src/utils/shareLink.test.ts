import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseShareQuery, shareSearch } from './shareLink.ts'

test('legacy chapter and verse query opens the Gita', () => {
  assert.deepEqual(parseShareQuery('?chapter=3&verse=1'), {
    bookmarks: false,
    textType: 'gita',
    chapter: 3,
    verse: 1,
  })
})

test('text query opens a festival with no chapter', () => {
  assert.deepEqual(parseShareQuery('?text=navratri'), {
    bookmarks: false,
    textType: 'navratri',
    chapter: null,
    verse: 1,
  })
  assert.deepEqual(parseShareQuery('?text=navratri&chapter=3&verse=1'), {
    bookmarks: false,
    textType: 'navratri',
    chapter: 3,
    verse: 1,
  })
})

test('view=bookmarks opens the bookmark list', () => {
  assert.deepEqual(parseShareQuery('?view=bookmarks'), {
    bookmarks: true,
    textType: null,
    chapter: null,
    verse: 1,
  })
})

test('unknown text is ignored', () => {
  assert.equal(parseShareQuery('?text=unknown&chapter=1'), null)
  assert.equal(parseShareQuery(''), null)
})

test('text=aarti opens the aarti list or one hymn', () => {
  assert.deepEqual(parseShareQuery('?text=aarti'), {
    bookmarks: false,
    textType: 'aarti',
    chapter: null,
    verse: 1,
  })
  assert.deepEqual(parseShareQuery('?text=aarti&chapter=3&verse=1'), {
    bookmarks: false,
    textType: 'aarti',
    chapter: 3,
    verse: 1,
  })
})

test('shareSearch writes a Gita verse link', () => {
  assert.equal(
    shareSearch({ textType: 'gita', chapter: 3, verse: 1 }),
    '?text=gita&chapter=3&verse=1',
  )
})
