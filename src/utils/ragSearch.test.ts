import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cosine, searchChunks, searchMatrix, type EmbeddedChunk } from './ragSearch.ts'

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
