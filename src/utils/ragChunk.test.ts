import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chunkPages, cleanPageText, isJunkPage } from './ragChunk.ts'

test('cleanPageText strips OceanofPDF and running headers', () => {
  const cleaned = cleanPageText(
    'The Bhagavad Gita\nOceanofPDF.com\nKrishna speaks to Arjuna on the battlefield of Kurukshetra about duty.',
  )
  assert.doesNotMatch(cleaned, /OceanofPDF/i)
  assert.match(cleaned, /Krishna speaks/)
})

test('isJunkPage rejects short watermark pages and OCR covers', () => {
  assert.equal(isJunkPage('The Skanda Purana Segment OceanofPDF.com'), true)
  assert.equal(isJunkPage('The IIIDIJIII Ol VIIIDiki <2Yf CC?any>kie'), true)
  assert.equal(
    isJunkPage(
      'Shiva’s command, they wished to kill Ganesha. Each one approached and with force released the specific weapon towards Ganesha.',
    ),
    false,
  )
})

test('chunkPages skips junk and keeps book plus page on each chunk', () => {
  const chunks = chunkPages(
    [
      { page: 1, text: 'OceanofPDF.com' },
      {
        page: 100,
        text: 'Shiva’s command, they wished to kill Ganesha. Each one approached and with force, released the specific weapon towards Ganesha. There were great sounds of lamentation in the three worlds.',
      },
    ],
    { book: 'shiva-purana-1', title: 'Shiva Purana — Part 1' },
  )
  assert.equal(chunks.length, 1)
  assert.equal(chunks[0].book, 'shiva-purana-1')
  assert.equal(chunks[0].page, 100)
  assert.match(chunks[0].text, /^Shiva Purana — Part 1, p\. 100\./)
  assert.match(chunks[0].text, /Ganesha/)
})

test('chunkPages splits a long page into overlapping windows', () => {
  const words = Array.from({ length: 900 }, (_, i) => `word${i}`)
  const chunks = chunkPages([{ page: 7, text: words.join(' ') }], {
    book: 'mahabharata',
    title: 'Mahabharata',
    targetWords: 400,
    overlapWords: 50,
  })
  assert.ok(chunks.length >= 2)
  assert.equal(chunks[0].page, 7)
  assert.match(chunks[0].text, /^Mahabharata, p\. 7\./)
  const firstWords = chunks[0].text.replace(/^Mahabharata, p\. 7\. /, '').split(/\s+/)
  const secondWords = chunks[1].text.replace(/^Mahabharata, p\. 7\. /, '').split(/\s+/)
  assert.equal(firstWords.length, 400)
  assert.deepEqual(firstWords.slice(-50), secondWords.slice(0, 50))
})

test('chunkPages keeps a chapter heading on the windows that follow it', () => {
  const body = Array.from({ length: 80 }, (_, i) => `duty${i}`).join(' ')
  const chunks = chunkPages(
    [{ page: 12, text: `Chapter 2 The Yoga of Knowledge. ${body}` }],
    { book: 'bhagavad-gita-pdf', title: 'The Bhagavad Gita', targetWords: 40, overlapWords: 8 },
  )
  assert.ok(chunks.length >= 1)
  assert.match(chunks[0].text, /Chapter 2/)
  assert.match(chunks[0].text, /The Yoga of Knowledge/)
})

test('chunkPages does not break a numbered verse across two windows', () => {
  const verse1 = `1. ${Array.from({ length: 30 }, (_, i) => `first${i}`).join(' ')}`
  const verse2 = `2. ${Array.from({ length: 30 }, (_, i) => `second${i}`).join(' ')}`
  const chunks = chunkPages([{ page: 3, text: `${verse1} ${verse2}` }], {
    book: 'bhagavad-gita-pdf',
    title: 'The Bhagavad Gita',
    targetWords: 40,
    overlapWords: 5,
  })
  const joined = chunks.map((chunk) => chunk.text).join('\n')
  assert.match(joined, /1\. first0/)
  assert.match(joined, /2\. second0/)
  for (const chunk of chunks) {
    const body = chunk.text.replace(/^The Bhagavad Gita, p\. 3\. /, '')
    assert.equal(body.includes('first29 second0'), false)
  }
})
