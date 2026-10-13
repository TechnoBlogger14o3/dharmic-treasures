import { test } from 'node:test'
import assert from 'node:assert/strict'
import { aartis } from './aarti.ts'

test('the home aarti set has eight hymns and a refrain each', () => {
  assert.equal(aartis.length, 8)
  assert.deepEqual(
    aartis.map((hymn) => hymn.name),
    [
      'Om Jai Jagdish Hare',
      'Jai Ganesh Deva',
      'Om Jai Shiv Omkara',
      'Om Jai Lakshmi Mata',
      'Om Jai Ambe Gauri',
      'Durga Chalisa',
      'Aarti Kije Hanuman Lala Ki',
      'Aarti Kunj Bihari Ki',
    ],
  )
  assert.equal(aartis[5].deity, 'Durga')
  assert.equal(aartis[5].nameHindi, 'दुर्गा चालीसा')
  const minStanzas = [10, 6, 12, 8, 13, 41, 12, 5]
  for (const [index, hymn] of aartis.entries()) {
    assert.ok(hymn.stanzas.some((stanza) => stanza.refrain), `${hymn.name} needs a refrain`)
    assert.ok(hymn.stanzas.length >= minStanzas[index], `${hymn.name} is incomplete`)
    assert.equal(hymn.chapter_number, hymn.id)
  }
  const full = aartis.map((hymn) => hymn.stanzas.map((stanza) => stanza.text).join('\n')).join('\n')
  assert.match(full, /तन मन धन सब/)
  assert.match(full, /तेरा तुझको अर्पण/)
  assert.match(full, /शिवानन्द स्वामी/)
  assert.match(full, /दीनन की लाज/)
  assert.match(full, /अहिरावण/)
  assert.match(full, /तुलसीदास स्वामी कीर्ति/)
  assert.match(full, /चण्ड-मुण्ड/)
  assert.match(full, /चौंसठ योगिनी/)
  assert.match(full, /क्षीरोदधि/)
  assert.match(full, /काशी में विराजे विश्वनाथ/)
  assert.match(full, /जटा में गंग/)
  assert.match(full, /टेर सुन दीन दुखारी/)
  assert.match(full, /लतन में ठाढ़े बनमाली/)
  assert.match(full, /नमो नमो दुर्गे सुख करनी/)
  assert.match(full, /धरयो रूप नरसिंह/)
  assert.match(full, /रक्तबीज/)
  assert.match(full, /जय जय जय जगदम्ब भवानी/)
  assert.match(full, /देवीदास शरण निज जानी/)
})
