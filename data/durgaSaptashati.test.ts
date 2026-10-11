import { test } from 'node:test'
import assert from 'node:assert/strict'
import { saptashatiPath } from './durgaSaptashati.ts'

test('Navratri path has the full Saptashati book order', () => {
  assert.equal(saptashatiPath.length, 26)
  assert.deepEqual(
    saptashatiPath.map((section) => section.nameHindi),
    [
      'देवी कवच',
      'अर्गल स्तोत्र',
      'कीलक',
      'वेदोक्त रात्रि सूक्त',
      'तन्त्रोक्त रात्रि सूक्त',
      'देव्यथर्वशीर्ष',
      'देवी सूक्त',
      'चण्डी प्रार्थना',
      'अध्याय १ — मधुकैटभवध',
      'अध्याय २ — महिषासुरसैन्यवध',
      'अध्याय ३ — महिषासुरवध',
      'अध्याय ४ — शक्रादिस्तुति',
      'अध्याय ५ — देवीदूतसंवाद',
      'अध्याय ६ — धूम्रलोचनवध',
      'अध्याय ७ — चण्डमुण्डवध',
      'अध्याय ८ — रक्तबीजवध',
      'अध्याय ९ — निशुम्भवध',
      'अध्याय १० — शुम्भवध',
      'अध्याय ११ — नारायणी स्तुति',
      'अध्याय १२ — फलश्रुति',
      'अध्याय १३ — सुरथ-वैश्य वरदान',
      'सिद्ध कुंजिका',
      'प्रधानिक रहस्य',
      'वैकृतिक रहस्य',
      'मूर्ति रहस्य',
      'क्षमा प्रार्थना',
    ],
  )
  assert.deepEqual(
    saptashatiPath.map((section) => section.chapter_number),
    Array.from({ length: 26 }, (_, index) => index + 1),
  )
  assert.deepEqual(
    saptashatiPath.map((section) => section.group),
    [
      ...Array(8).fill('purva'),
      ...Array(13).fill('madhya'),
      ...Array(5).fill('uttara'),
    ],
  )

  const minStanzas = [
    56, 25, 14, 8, 15, 26, 8, 8,
    90, 65, 40, 36, 118, 20, 24, 60, 38, 28, 50, 38, 24,
    12, 31, 39, 25, 8,
  ]
  for (const [index, section] of saptashatiPath.entries()) {
    assert.ok(section.stanzas.length >= minStanzas[index], `${section.nameHindi} is incomplete (${section.stanzas.length})`)
    assert.ok(section.stanzas.every((stanza) => stanza.text.trim().length > 12), `${section.nameHindi} has an empty line`)
  }

  const full = saptashatiPath.map((section) => section.stanzas.map((stanza) => stanza.text).join('\n')).join('\n')
  assert.match(full, /रूप दो, जय दो|रूपं देहि जयं देहि/)
  assert.match(full, /कीलक/)
  assert.match(full, /जो देवी सब प्राणियों में|जो देवी सब भूतों में|या देवी सर्वभूतेषु/)
  assert.match(full, /मधु.*कैटभ|मधुकैटभ/)
  assert.match(full, /महिषासुर/)
  assert.match(full, /धूम्रलोचन/)
  assert.match(full, /चण्ड.*मुण्ड|चण्डमुण्ड/)
  assert.match(full, /रक्तबीज/)
  assert.match(full, /निशुम्भ/)
  assert.match(full, /शुम्भ/)
  assert.match(full, /नारायणि|नारायणी/)
  assert.match(full, /कुंजिका|कुञ्जिका/)
  assert.match(full, /सुरथ/)
  assert.match(full, /समाधि/)
  assert.match(full, /अथर्वशीर्ष|महादेवी/)
})
