import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tithiAtSunrise, monthGrid } from './panchang.ts'

test('12 Sep 2026 sunrise is Shukla Pratipada', () => {
  const t = tithiAtSunrise(2026, 9, 12)
  assert.equal(t.paksha, 'shukla')
  assert.equal(t.name, 'Pratipada')
})

test('15 Nov 2026 sunrise is Shukla Shashthi (Chhath Sandhya)', () => {
  const t = tithiAtSunrise(2026, 11, 15)
  assert.equal(t.paksha, 'shukla')
  assert.equal(t.name, 'Shashthi')
})

test('8 Nov 2026 evening is Amavasya (Diwali)', () => {
  const t = tithiAtSunrise(2026, 11, 8, 18)
  assert.equal(t.name, 'Amavasya')
  assert.equal(t.paksha, 'krishna')
})

test('monthGrid for Sep 2026 starts on Tuesday and has 30 days', () => {
  const grid = monthGrid(2026, 9)
  assert.equal(grid[0].weekday, 2)
  assert.equal(grid.length, 30)
  assert.equal(grid[11].day, 12)
})
