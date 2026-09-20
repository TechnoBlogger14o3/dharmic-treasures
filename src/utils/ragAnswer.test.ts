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
