import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cosine, searchChunks, searchHybrid, searchMatrix, type EmbeddedChunk } from './ragSearch.ts'

test('cosine is 1 for identical vectors and 0 for orthogonal', () => {
  assert.equal(cosine([1, 0], [1, 0]), 1)
  assert.equal(cosine([1, 0], [0, 1]), 0)
})

test('searchChunks ranks the embedding closest to the query', () => {
  const chunks: EmbeddedChunk[] = [
    {
      book: 'ramayana',
      title: 'Ramayana',
      page: 80,
      text: 'Rama goes to the forest.',
      vector: [0, 1, 0],
    },
    {
      book: 'mahabharata',
      title: 'Mahabharata',
      page: 20,
      text: 'Arjuna stands on the battlefield.',
      vector: [1, 0, 0],
    },
  ]
  const hits = searchChunks([0.9, 0.1, 0], chunks, 1)
  assert.equal(hits.length, 1)
  assert.equal(hits[0].book, 'mahabharata')
  assert.equal(hits[0].page, 20)
  assert.ok((hits[0].score ?? 0) > 0.8)
})

test('searchMatrix reads packed float embeddings', () => {
  const embeddings = Float32Array.from([0, 1, 0, 1, 0, 0])
  const hits = searchMatrix(
    [1, 0, 0],
    embeddings,
    3,
    [
      { book: 'ramayana', title: 'Ramayana', page: 1, text: 'Rama' },
      { book: 'mahabharata', title: 'Mahabharata', page: 2, text: 'Arjuna' },
    ],
    1,
  )
  assert.equal(hits[0].book, 'mahabharata')
})

test('searchHybrid lifts a lexical name match over a closer but unrelated vector', () => {
  const embeddings = Float32Array.from([1, 0, 0, 0.2, 0.98, 0])
  const hits = searchHybrid(
    'tirupati venkateswara temple',
    [1, 0, 0],
    embeddings,
    3,
    [
      { book: 'shiva-purana-1', title: 'Shiva Purana — Part 1', page: 10, text: 'The linga of light stands on the sea.' },
      {
        book: 'temples-site',
        title: 'Major temples (site)',
        page: 1,
        text: 'Tirumala Venkateswara. Tirupati, Andhra Pradesh. The Lord of the Seven Hills.',
      },
    ],
    2,
  )
  assert.equal(hits[0].book, 'temples-site')
  assert.match(hits[0].text, /Tirupati/)
})

test('searchHybrid boosts Ramayana when the query names Manthara', () => {
  const embeddings = Float32Array.from([0.9, 0.1, 0, 0.85, 0.2, 0])
  const hits = searchHybrid(
    'who was manthra',
    [0.9, 0.15, 0],
    embeddings,
    3,
    [
      { book: 'bhagavad-gita-pdf', title: 'The Bhagavad Gita', page: 22, text: 'The soul is not slain when the body is slain.' },
      { book: 'ramayana', title: 'Ramayana', page: 183, text: 'The nurse spoke to the queen in the inner chamber.' },
    ],
    1,
  )
  assert.equal(hits[0].book, 'ramayana')
})

test('searchHybrid boosts the named book', () => {
  const embeddings = Float32Array.from([0.9, 0.1, 0, 0.85, 0.2, 0])
  const hits = searchHybrid(
    'what does the gita say about the soul',
    [0.9, 0.15, 0],
    embeddings,
    3,
    [
      { book: 'ramayana', title: 'Ramayana', page: 4, text: 'The soul of Rama walks in the forest.' },
      { book: 'bhagavad-gita-pdf', title: 'The Bhagavad Gita', page: 22, text: 'The soul is not slain when the body is slain.' },
    ],
    1,
  )
  assert.equal(hits[0].book, 'bhagavad-gita-pdf')
})
