import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mainEventForDate, dateForNamedEvent, upcomingYearForEvent } from './festivals.ts'

test('8 Nov 2026 is Diwali', () => {
  const event = mainEventForDate(2026, 11, 8)
  assert.ok(event)
  assert.equal(event.name, 'Diwali')
  assert.equal(event.nameHindi, 'दीपावली')
})

test('15 Nov 2026 is Chhath Puja', () => {
  const event = mainEventForDate(2026, 11, 15)
  assert.ok(event)
  assert.equal(event.name, 'Chhath Puja')
})

test('4 Mar 2026 is Holi', () => {
  assert.equal(mainEventForDate(2026, 3, 4)?.name, 'Holi')
})

test('15 Feb 2026 is Maha Shivaratri', () => {
  assert.equal(mainEventForDate(2026, 2, 15)?.name, 'Maha Shivaratri')
})

test('14 Sep 2026 is Ganesh Chaturthi', () => {
  assert.equal(mainEventForDate(2026, 9, 14)?.name, 'Ganesh Chaturthi')
})

test('20 Oct 2026 is Dussehra', () => {
  assert.equal(mainEventForDate(2026, 10, 20)?.name, 'Dussehra')
})

test('26 Jan is Republic Day every year', () => {
  assert.equal(mainEventForDate(2026, 1, 26)?.name, 'Republic Day')
  assert.equal(mainEventForDate(2035, 1, 26)?.name, 'Republic Day')
})

test('20 Oct 2025 is Diwali', () => {
  assert.equal(mainEventForDate(2025, 10, 20)?.name, 'Diwali')
})

test('an ordinary date has no main event', () => {
  assert.equal(mainEventForDate(2026, 9, 12), null)
})

test('dateForNamedEvent finds Diwali 2026', () => {
  assert.equal(dateForNamedEvent(2026, 'Diwali'), '2026-11-08')
  assert.equal(dateForNamedEvent(2025, 'Dhanteras'), '2025-10-18')
})

test('upcomingYearForEvent stays on 2026 until after Diwali', () => {
  assert.equal(upcomingYearForEvent('Diwali', '2026-11-08'), 2026)
  assert.equal(upcomingYearForEvent('Diwali', '2026-11-09'), 2027)
})
