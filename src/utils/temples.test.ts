import { test } from 'node:test'
import assert from 'node:assert/strict'
import { templeIntroduction, temples, templesGrouped } from '../../data/temples.ts'
import { searchSiteText, siteChunksFromCollection } from './siteChunks.ts'

test('the temple catalog covers every Indian state and is grouped by state', () => {
  assert.ok(temples.length >= 80)
  const grouped = templesGrouped()
  const states = grouped.map((group) => group.state)
  assert.equal(states.length, new Set(states).size)
  assert.ok(states.includes('Tamil Nadu'))
  assert.ok(states.includes('Uttar Pradesh'))
  assert.ok(states.includes('Nagaland'))
  assert.ok(states.includes('Mizoram'))
  assert.ok(states.includes('Ladakh'))
  assert.equal(
    grouped.reduce((sum, group) => sum + group.temples.length, 0),
    temples.length,
  )
  for (const temple of temples) {
    assert.ok(temple.nameHindi)
    assert.ok(temple.katha)
    assert.ok(temple.history)
    assert.ok(Number.isFinite(temple.coordinates.lat))
    assert.ok(Number.isFinite(temple.coordinates.lng))
  }
})

test('searchSiteText answers how many temples and finds Tirupati from site JSON', () => {
  const chunks = siteChunksFromCollection(
    temples.map((item) => ({
      id: item.id,
      name: item.name,
      extra: `${item.nameHindi}, ${item.deity}, ${item.location}, ${item.state}. ${item.history}`,
    })),
    {
      book: 'temples-site',
      title: 'Major temples (site)',
      kind: 'major temples',
      intro: templeIntroduction.contentEnglish,
    },
  )
  const countHits = searchSiteText('how many major temples', chunks, 2)
  assert.ok(countHits.length >= 1)
  assert.equal(countHits[0].page, 0)
  assert.match(countHits[0].text, new RegExp(`${temples.length} major temples`))

  const tirupati = searchSiteText('tirupati venkateswara andhra', chunks, 2)
  assert.ok(tirupati.length >= 1)
  assert.match(tirupati.map((hit) => hit.text).join('\n'), /Tirumala Venkateswara/)
})
