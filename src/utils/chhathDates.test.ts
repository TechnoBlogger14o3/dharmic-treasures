import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chhathDatesForYear, upcomingChhathYear } from './chhathDates.ts'

test('2025 Kartik Chhath is 25–28 Oct', () => {
  const days = chhathDatesForYear(2025)
  assert.ok(days)
  assert.equal(days.nahayKhay, '2025-10-25')
  assert.equal(days.kharna, '2025-10-26')
  assert.equal(days.sandhyaArghya, '2025-10-27')
  assert.equal(days.ushaArghya, '2025-10-28')
})

test('2026 Kartik Chhath is 13–16 Nov', () => {
  const days = chhathDatesForYear(2026)
  assert.ok(days)
  assert.equal(days.nahayKhay, '2026-11-13')
  assert.equal(days.kharna, '2026-11-14')
  assert.equal(days.sandhyaArghya, '2026-11-15')
  assert.equal(days.ushaArghya, '2026-11-16')
})

test('2027 Kartik Chhath is 2–5 Nov', () => {
  const days = chhathDatesForYear(2027)
  assert.ok(days)
  assert.equal(days.nahayKhay, '2027-11-02')
  assert.equal(days.sandhyaArghya, '2027-11-04')
  assert.equal(days.ushaArghya, '2027-11-05')
})

test('before Usha Arghya 2026 still shows 2026', () => {
  assert.equal(upcomingChhathYear('2026-09-12'), 2026)
  assert.equal(upcomingChhathYear('2026-11-16'), 2026)
})

test('the day after Usha Arghya rolls to the next Kartik', () => {
  assert.equal(upcomingChhathYear('2026-11-17'), 2027)
})
