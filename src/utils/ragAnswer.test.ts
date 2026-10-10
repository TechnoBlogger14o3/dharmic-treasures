import { test } from 'node:test'
import assert from 'node:assert/strict'
import { answerFromHits, buildGroqPayload, GROQ_MODEL } from './ragAnswer.ts'

const hits = [
  {
    book: 'mahabharata',
    title: 'Mahabharata',
    page: 20,
    text: 'Arjuna and Vasudeva stood with Agni. Arjuna received celestial weapons.',
    score: 0.8,
  },
]

test('answerFromHits quotes the passage and cites book and page', () => {
  const answer = answerFromHits(hits)
  assert.match(answer, /celestial weapons/)
  assert.match(answer, /Mahabharata, p\. 20/)
  assert.doesNotMatch(answer, /Open page/)
})

test('answerFromHits says so when nothing matches', () => {
  assert.match(answerFromHits([]), /do not say/i)
})

test('answerFromHits quotes only the catalog for a list-or-count question', () => {
  const answer = answerFromHits(
    [
      {
        book: 'gita-site',
        title: 'Bhagavad Gita (homepage)',
        page: 0,
        text: "Bhagavad Gita (homepage) has 18 chapters:\n1. Arjuna's Despondency\n2. The Yoga of Knowledge",
        score: 1,
      },
      {
        book: 'gita-site',
        title: 'Bhagavad Gita (homepage)',
        page: 18,
        text: 'Chapter 18: Moksha-Sannyasa Yoga. The final chapter of the Bhagavad Gita.',
        score: 0.9,
      },
    ],
    'how many chaoters in bhagavad gita',
  )
  assert.match(answer, /18 chapters/)
  assert.match(answer, /Arjuna's Despondency/)
  assert.doesNotMatch(answer, /final chapter/)
  assert.doesNotMatch(answer, /p\. 18/)
})

test('buildGroqPayload uses gpt-oss and only the supplied hits', () => {
  const payload = buildGroqPayload('Who stood with Agni?', hits)
  assert.equal(payload.model, GROQ_MODEL)
  assert.equal(payload.messages[0].role, 'system')
  assert.match(payload.messages[0].content, /passages/i)
  assert.match(payload.messages[0].content, /site/i)
  assert.match(payload.messages[0].content, /MUST use site/i)
  assert.match(payload.messages[0].content, /list/i)
  assert.match(payload.messages[1].content, /Who stood with Agni/)
  assert.match(payload.messages[1].content, /Mahabharata p\. 20/)
  assert.match(payload.messages[1].content, /celestial weapons/)
})

test('buildGroqPayload includes prior turns so list them stays on the Gita', () => {
  const payload = buildGroqPayload(
    'list them',
    [
      {
        book: 'gita-site',
        title: 'Bhagavad Gita (homepage)',
        page: 0,
        text: "Bhagavad Gita (homepage) has 18 chapters:\n1. Arjuna's Despondency",
        score: 1,
      },
    ],
    [
      { role: 'user', text: 'how many chapters in Bhagavad Gita' },
      { role: 'assistant', text: 'There are 18 chapters (Bhagavad Gita (homepage)).' },
    ],
  )
  assert.match(payload.messages[1].content, /how many chapters in Bhagavad Gita/)
  assert.match(payload.messages[1].content, /18 chapters/)
  assert.match(payload.messages[1].content, /list them/)
  assert.match(payload.messages[0].content, /earlier/i)
})

test('buildGroqPayload cites homepage hits without a fake page number', () => {
  const payload = buildGroqPayload('list all chapters in bhagavad gita', [
    {
      book: 'gita-site',
      title: 'Bhagavad Gita (homepage)',
      page: 0,
      text: "1. Arjuna's Despondency",
      score: 1,
    },
  ])
  assert.match(payload.messages[1].content, /Bhagavad Gita \(homepage\)/)
  assert.doesNotMatch(payload.messages[1].content, /p\. 0/)
  assert.match(payload.messages[1].content, /Arjuna's Despondency/)
})
