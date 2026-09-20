import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  mergeHits,
  searchSiteText,
  siteChunksFromChapters,
  siteChunksFromCollection,
} from './siteChunks.ts'

const sample = [
  {
    chapter_number: 1,
    name: 'अर्जुनविषादयोग',
    name_meaning: "Arjuna's Despondency",
    summary: 'On the battlefield of Kurukshetra, Arjuna faces a moral dilemma.',
  },
  {
    chapter_number: 2,
    name: 'सांख्ययोग',
    name_meaning: 'The Yoga of Knowledge',
    summary: 'Krishna explains the eternal nature of the soul and duty.',
  },
]

test('siteChunksFromChapters builds a catalog of every chapter name', () => {
  const chunks = siteChunksFromChapters(sample, {
    book: 'gita-site',
    title: 'Bhagavad Gita (homepage)',
  })
  assert.equal(chunks[0].page, 0)
  assert.match(chunks[0].text, /2 chapters/)
  assert.match(chunks[0].text, /Arjuna's Despondency/)
  assert.match(chunks[0].text, /The Yoga of Knowledge/)
  assert.equal(chunks.length, 3)
  assert.equal(chunks[1].page, 1)
  assert.match(chunks[1].text, /moral dilemma/)
})

test('gita homepage catalog lists all 18 chapter names', () => {
  const eighteen = Array.from({ length: 18 }, (_, i) => ({
    chapter_number: i + 1,
    name: `योग${i + 1}`,
    name_meaning: i === 0 ? "Arjuna's Despondency" : `Chapter ${i + 1} English`,
    summary: `Summary ${i + 1}`,
  }))
  const chunks = siteChunksFromChapters(eighteen, {
    book: 'gita-site',
    title: 'Bhagavad Gita (homepage)',
  })
  assert.match(chunks[0].text, /18 chapters/)
  assert.match(chunks[0].text, /Arjuna's Despondency/)
  assert.match(chunks[0].text, /Chapter 18 English/)
})

test('searchSiteText ranks the catalog for list-all-chapters', () => {
  const chunks = siteChunksFromChapters(sample, {
    book: 'gita-site',
    title: 'Bhagavad Gita (homepage)',
  })
  const hits = searchSiteText('list all chapters in bhagavad gita', chunks, 2)
  assert.ok(hits.length >= 1)
  assert.equal(hits[0].page, 0)
  assert.ok(hits[0].score >= 0.5)
})

test('mergeHits keeps PDF hits and adds a strong homepage match', () => {
  const merged = mergeHits(
    [
      {
        book: 'bhagavad-gita',
        title: 'Bhagavad Gita',
        page: 29,
        text: 'The Bhagavad Gita contains 18 chapters.',
        score: 0.9,
      },
    ],
    [
      {
        book: 'gita-site',
        title: 'Bhagavad Gita (homepage)',
        page: 0,
        text: "1. Arjuna's Despondency 2. The Yoga of Knowledge",
        score: 1,
      },
    ],
    6,
  )
  assert.equal(merged.some((hit) => hit.book === 'gita-site'), true)
  assert.equal(merged.some((hit) => hit.page === 29), true)
})

test('siteChunksFromCollection states how many Shaktipeeths there are', () => {
  const chunks = siteChunksFromCollection(
    [
      { id: 1, name: 'Hinglaj', extra: 'Top of Head, Balochistan' },
      { id: 2, name: 'Sharkarey', extra: 'Eyes, Karachi' },
    ],
    {
      book: 'shaktipeeths-site',
      title: 'Shaktipeeths (site)',
      kind: 'Shaktipeeths',
      intro: 'Shaktipeeths are sacred places from the story of Sati.',
    },
  )
  assert.match(chunks[0].text, /2 Shaktipeeths/)
  assert.match(chunks[0].text, /Hinglaj/)
  assert.match(chunks[1].text, /Balochistan/)
})

test('searchSiteText answers how many shaktipeeths from site JSON', () => {
  const chunks = siteChunksFromCollection(
    [
      { id: 1, name: 'Hinglaj', extra: 'Balochistan' },
      { id: 2, name: 'Sharkarey', extra: 'Karachi' },
    ],
    { book: 'shaktipeeths-site', title: 'Shaktipeeths (site)', kind: 'Shaktipeeths' },
  )
  const hits = searchSiteText('how many shaktipeeths are there', chunks, 2)
  assert.ok(hits.length >= 1)
  assert.equal(hits[0].page, 0)
  assert.match(hits[0].text, /2 Shaktipeeths/)
})

test('mergeHits keeps at most two PDF hits when site JSON matches', () => {
  const pdf = Array.from({ length: 6 }, (_, i) => ({
    book: 'shiva-purana-1',
    title: 'Shiva Purana — Part 1',
    page: i + 1,
    text: 'unrelated page text',
    score: 0.7,
  }))
  const merged = mergeHits(
    pdf,
    [
      {
        book: 'shaktipeeths-site',
        title: 'Shaktipeeths (site)',
        page: 0,
        text: 'There are 51 Shaktipeeths on this site.',
        score: 1,
      },
    ],
    6,
  )
  assert.equal(merged.filter((hit) => hit.book === 'shaktipeeths-site').length, 1)
  assert.equal(merged.filter((hit) => hit.book === 'shiva-purana-1').length, 2)
})

test('mergeHits ignores weak homepage matches', () => {
  const merged = mergeHits(
    [
      {
        book: 'bhagavad-gita',
        title: 'Bhagavad Gita',
        page: 22,
        text: 'Krishna speaks of duty.',
        score: 0.8,
      },
    ],
    [
      {
        book: 'gita-site',
        title: 'Bhagavad Gita (homepage)',
        page: 0,
        text: 'chapter catalog',
        score: 0.2,
      },
    ],
    6,
  )
  assert.equal(merged.every((hit) => hit.book !== 'gita-site'), true)
})
