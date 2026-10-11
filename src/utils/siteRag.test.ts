import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildAllSiteChunks } from './siteRag.ts'
import { searchSiteText } from './siteChunks.ts'

test('buildAllSiteChunks catalogs Gita chapters and major temples', async () => {
  const chunks = await buildAllSiteChunks()
  const gita = chunks.filter((chunk) => chunk.book === 'gita-site')
  assert.ok(gita.length >= 19)
  assert.match(gita[0].text, /18 chapters/)
  assert.match(gita.map((chunk) => chunk.text).join('\n'), /Arjuna's Despondency/)

  const temples = chunks.filter((chunk) => chunk.book === 'temples-site')
  assert.ok(temples.length >= 2)
  assert.match(temples[0].text, /major temples/)
  const hits = searchSiteText('tirupati venkateswara andhra', temples, 2)
  assert.ok(hits.length >= 1)
  assert.match(hits.map((hit) => hit.text).join('\n'), /Tirumala Venkateswara/)
})

test('site search lists the Saptashati path on Navratri', async () => {
  const chunks = await buildAllSiteChunks()
  const path = chunks.filter((chunk) => chunk.book === 'saptashati-site')
  assert.match(path[0].text, /Saptashati path/)
  const hits = searchSiteText('kilakam argala durga saptashati', path, 3)
  assert.ok(hits.length >= 1)
  assert.match(hits.map((hit) => hit.text).join('\n'), /Kilakam/)
})

test('site search lists the seven home aartis', async () => {
  const chunks = await buildAllSiteChunks()
  const aarti = chunks.filter((chunk) => chunk.book === 'aarti-site')
  assert.match(aarti[0].text, /7 aartis/)
  const hits = searchSiteText('list aartis jagdish ganesh hanuman', aarti, 3)
  assert.ok(hits.length >= 1)
  assert.match(hits.map((hit) => hit.text).join('\n'), /Om Jai Jagdish Hare/)
})
