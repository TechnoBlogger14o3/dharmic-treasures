import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  composeShastraAnswer,
  searchShastraIndex,
  stripShastraGarbage,
  type ShastraIndex,
} from './shastraSearch.ts'

function index(chunks: ShastraIndex['chunks']): ShastraIndex {
  return {
    version: 1,
    builtAt: 'test',
    sources: [],
    chunks,
  }
}

const fixture = index([
  {
    id: 'gita-1-11',
    sourceId: 'gita',
    title: 'Bhagavad Gita',
    chapter: 1,
    verse: 11,
    text: 'Now all of you must protect Bhishma. The grandfather (पितामह) stood at the head of the army.',
  },
  {
    id: 'ramayan-p5',
    sourceId: 'ramayan',
    title: 'Shrimad Valmiki Ramayan',
    page: 5,
    text: 'रामं रामानुजं सीतां भरतं भरतानुजम्। जाते दशरथात्मजे।',
  },
  {
    id: 'ramayan-p11',
    sourceId: 'ramayan',
    title: 'Shrimad Valmiki Ramayan',
    page: 11,
    text: "A curious Ms. is that of ‘Rāmāyaṇatātparyadīpikā which is said to have been an exposition of the meaning of the Rāmāyaṇa’.",
  },
  {
    id: 'ramayan-p80',
    sourceId: 'ramayan',
    title: 'Shrimad Valmiki Ramayan',
    page: 80,
    text: 'इक्ष्वाकुकुलके स्वामी राजा दशरथ अयोध्यापुरीकी रक्षा करते थे। श्रीराम उनके पुत्र हैं।',
  },
])

test('English "father of Shri Raam" ranks the Dasharatha passage, not Gita "of" or the English preface', () => {
  const hits = searchShastraIndex('who was the father of shri raam', fixture, 'all', 3)
  assert.ok(hits.length > 0, 'expected hits')
  assert.equal(hits[0].chunk.id, 'ramayan-p80')
})

test('strips non-Devanagari junk so citations stay readable', () => {
  const cleaned = stripShastraGarbage('राजा दशरथका िव᳡ािमᮢ ᮰ीराम')
  assert.match(cleaned, /राजा दशरथ/)
  assert.doesNotMatch(cleaned, /᳡|ᮢ|᮰/)
})

test('English "who is Shiva" ranks the Shiv Puran over a Ramayan mention', () => {
  const mixed = index([
    ...fixture.chunks,
    {
      id: 'shiv-p40',
      sourceId: 'shiv-puran',
      title: 'Shiv Puran',
      page: 40,
      text: 'भगवान शंकर कैलास पर विराजमान हैं। यह शिव पुराण का कथन है।',
    },
    {
      id: 'ramayan-shiva-aside',
      sourceId: 'ramayan',
      title: 'Shrimad Valmiki Ramayan',
      page: 200,
      text: 'राम ने शिव की आराधना की।',
    },
  ])
  const hits = searchShastraIndex('who is shiva', mixed, 'all', 3)
  assert.ok(hits.length > 0, 'expected hits')
  assert.equal(hits[0].chunk.id, 'shiv-p40')
})

test('answers the father-of-Rama question in a sentence and keeps the citation', () => {
  const hits = searchShastraIndex('who was the father of shri raam', fixture, 'all', 3)
  const result = composeShastraAnswer('who was the father of shri raam', hits)
  assert.match(result.answer, /Dasharatha/i)
  assert.doesNotMatch(result.answer, /I found \d+ passage/i)
  assert.equal(result.passages[0]?.id, 'ramayan-p80')
})
