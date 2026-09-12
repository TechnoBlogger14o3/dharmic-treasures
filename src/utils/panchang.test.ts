import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  tithiAtSunrise,
  monthGrid,
  delhiSunriseIst,
  panchangForDay,
  formatIstClock,
  sunriseIst,
  PANCHANG_CITIES,
  getPanchangCity,
} from './panchang.ts'

function hoursClose(got: number, expected: number, minutes = 20) {
  assert.ok(
    Math.abs(got - expected) <= minutes / 60,
    `expected ~${expected}h, got ${got}h (${(got * 60).toFixed(1)} min)`,
  )
}

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

test('Delhi sunrise 12 Sep 2026 is about 6:04', () => {
  hoursClose(delhiSunriseIst(2026, 9, 12), 6 + 4 / 60, 12)
})

test('12 Sep 2026 Delhi panchang matches Drik five limbs', () => {
  const p = panchangForDay(2026, 9, 12)
  assert.equal(p.tithi.name, 'Pratipada')
  assert.equal(p.tithi.paksha, 'shukla')
  assert.equal(p.nakshatra.name, 'Uttara Phalguni')
  assert.equal(p.yoga.name, 'Shubha')
  assert.equal(p.karana.name, 'Bava')
  assert.equal(p.vara.en, 'Saturday')
  hoursClose(p.tithi.untilHourIst, 7 + 46 / 60, 20)
  assert.equal(p.nextTithi.name, 'Dwitiya')
  hoursClose(p.rahuKaal.startHourIst, 9 + 10 / 60, 20)
  hoursClose(p.rahuKaal.endHourIst, 10 + 44 / 60, 20)
})

test('8 Nov 2026 sunrise is Chaturdashi; Amavasya begins late morning', () => {
  const p = panchangForDay(2026, 11, 8)
  assert.equal(p.tithi.name, 'Chaturdashi')
  assert.equal(p.tithi.paksha, 'krishna')
  hoursClose(p.tithi.untilHourIst, 11 + 27 / 60, 20)
  assert.equal(p.nextTithi.name, 'Amavasya')
})

test('15 Nov 2026 Shashthi holds through the Chhath evening', () => {
  const p = panchangForDay(2026, 11, 15)
  assert.equal(p.tithi.name, 'Shashthi')
  assert.equal(p.nextTithi.name, 'Saptami')
  assert.equal(p.nakshatra.name, 'Uttara Ashadha')
  assert.equal(p.yoga.name, 'Ganda')
  assert.equal(p.karana.name, 'Kaulava')
  assert.ok(p.tithi.untilHourIst > 24, 'Shashthi should end after midnight')
  hoursClose(p.tithi.untilHourIst, 26, 25)
})

test('15 Jan 2026 sunrise is Krishna Dwadashi', () => {
  const p = panchangForDay(2026, 1, 15)
  assert.equal(p.tithi.paksha, 'krishna')
  assert.equal(p.tithi.name, 'Dwadashi')
  hoursClose(p.tithi.untilHourIst, 20 + 16 / 60, 25)
})

test('formatIstClock writes 12-hour IST and next-day dates', () => {
  assert.equal(formatIstClock(7 + 46 / 60, 2026, 9, 12), '7:46 AM')
  assert.equal(formatIstClock(26, 2026, 11, 15), '2:00 AM, 16 Nov')
})

test('Mumbai sunrise is later than Delhi; Kolkata is earlier (12 Sep 2026)', () => {
  const delhi = sunriseIst(2026, 9, 12, getPanchangCity('delhi'))
  const mumbai = sunriseIst(2026, 9, 12, getPanchangCity('mumbai'))
  const kolkata = sunriseIst(2026, 9, 12, getPanchangCity('kolkata'))
  assert.ok(mumbai > delhi + 0.1, `Mumbai ${mumbai} should be west of Delhi ${delhi}`)
  assert.ok(kolkata < delhi - 0.15, `Kolkata ${kolkata} should be east of Delhi ${delhi}`)
})

test('panchangForDay uses the given city sunrise', () => {
  const patna = panchangForDay(2026, 9, 12, getPanchangCity('patna'))
  const delhi = panchangForDay(2026, 9, 12, getPanchangCity('delhi'))
  assert.notEqual(patna.sunriseHourIst, delhi.sunriseHourIst)
  assert.ok(PANCHANG_CITIES.length >= 6)
})
