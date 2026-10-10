import { test } from 'node:test'
import assert from 'node:assert/strict'
import { expandSearchQuery, inferBookHint, resolveChatQuery } from './chatFollowUp.ts'
import { searchSiteText, siteChunksFromChapters } from './siteChunks.ts'

const gitaChunks = siteChunksFromChapters(
  [
    {
      chapter_number: 1,
      name: 'अर्जुनविषादयोग',
      name_meaning: "Arjuna's Despondency",
      summary: 'Arjuna faces a moral dilemma.',
    },
    {
      chapter_number: 2,
      name: 'सांख्ययोग',
      name_meaning: 'The Yoga of Knowledge',
      summary: 'Krishna explains the soul and duty.',
    },
  ],
  { book: 'gita-site', title: 'Bhagavad Gita (homepage)' },
)

test('bare follow-up list them does not retrieve the Gita catalog', () => {
  const hits = searchSiteText('list them', gitaChunks, 2)
  assert.equal(hits.length, 0)
})

test('first Gita question stays as the search query and topic', () => {
  const resolved = resolveChatQuery('how many chapters in Bhagavad Gita', '')
  assert.equal(resolved.searchQuery, 'how many chapters in Bhagavad Gita')
  assert.equal(resolved.nextTopic, 'how many chapters in Bhagavad Gita')
})

test('list them reuses the Gita topic so site search finds the catalog', () => {
  const first = resolveChatQuery('how many chapters in Bhagavad Gita', '')
  const follow = resolveChatQuery('list them', first.nextTopic)
  assert.match(follow.searchQuery, /Bhagavad Gita/i)
  assert.match(follow.searchQuery, /list them/i)
  assert.equal(follow.nextTopic, first.nextTopic)

  const hits = searchSiteText(follow.searchQuery, gitaChunks, 2)
  assert.ok(hits.length >= 1)
  assert.equal(hits[0].page, 0)
  assert.match(hits[0].text, /Arjuna's Despondency/)
  assert.match(hits[0].text, /The Yoga of Knowledge/)
})

test('list them after a typo Gita question still finds the catalog', () => {
  const first = resolveChatQuery('how many chapoters in bhagvad gita', '')
  const follow = resolveChatQuery('list them please', first.nextTopic)
  const hits = searchSiteText(follow.searchQuery, gitaChunks, 2)
  assert.ok(hits.length >= 1)
  assert.equal(hits[0].page, 0)
  assert.match(hits[0].text, /Arjuna's Despondency/)
})

test('a new book question replaces the topic', () => {
  const follow = resolveChatQuery('how many shaktipeeths', 'how many chapters in Bhagavad Gita')
  assert.equal(follow.searchQuery, 'how many shaktipeeths')
  assert.equal(follow.nextTopic, 'how many shaktipeeths')
})

test('a Navratri question is a new topic, not a Gita follow-up', () => {
  const follow = resolveChatQuery('how many nights in navratri', 'how many chapters in Bhagavad Gita')
  assert.equal(follow.searchQuery, 'how many nights in navratri')
  assert.equal(follow.nextTopic, 'how many nights in navratri')
})

test('a temple question is a new topic, not a Gita follow-up', () => {
  const follow = resolveChatQuery('tirupati temple history', 'how many chapters in Bhagavad Gita')
  assert.equal(follow.searchQuery, 'tirupati temple history')
  assert.equal(follow.nextTopic, 'tirupati temple history')
})

test('who was manthra is a new question, not a Gita list follow-up', () => {
  const follow = resolveChatQuery('who was manthra', 'how many chaoters in bhagavad gita')
  assert.equal(follow.searchQuery, 'who was manthra')
  assert.match(follow.retrievalQuery, /ramayan/i)
  assert.doesNotMatch(follow.searchQuery, /gita/i)
  assert.equal(follow.nextTopic, 'who was manthra')
  const hits = searchSiteText(follow.searchQuery, gitaChunks, 2)
  assert.equal(hits.some((hit) => hit.page === 0), false)
})

test('a bare Manthra question after Gita still routes to the Ramayana', () => {
  assert.equal(inferBookHint('who was manthra'), 'ramayana')
  assert.match(expandSearchQuery('Manthra'), /ramayan/i)
  const follow = resolveChatQuery('Manthra', 'how many chaoters in Bhagavad Gita')
  assert.equal(follow.searchQuery, 'Manthra')
  assert.match(follow.retrievalQuery, /ramayan/i)
  assert.doesNotMatch(follow.searchQuery, /gita/i)
})

test('list all of them please still reuses the Gita topic', () => {
  const follow = resolveChatQuery('list all of them please', 'how many chaoters in bhagavad gita')
  assert.match(follow.searchQuery, /bhagavad gita/i)
  assert.equal(follow.nextTopic, 'how many chaoters in bhagavad gita')
})
