import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveChatQuery } from './chatFollowUp.ts'
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
