import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  dateForFestivalDay,
  dateForNamedEvent,
  dateForNavratriNight,
  mainEventForDate,
  upcomingYearForEvent,
} from './festivals.ts'

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

test('11 Oct 2026 is Sharad Navratri begins', () => {
  assert.equal(mainEventForDate(2026, 10, 11)?.name, 'Navratri begins')
  assert.equal(dateForNamedEvent(2026, 'Navratri begins'), '2026-10-11')
})

test('Navratri nights are counted from the published start date', () => {
  assert.equal(dateForNavratriNight(2026, 1), '2026-10-11')
  assert.equal(dateForNavratriNight(2026, 9), '2026-10-19')
  assert.equal(dateForNavratriNight(2025, 1), '2025-09-22')
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

test('2027 lists Holika Dahan, Karva Chauth, and Anant Chaturdashi', () => {
  assert.equal(dateForNamedEvent(2027, 'Holika Dahan'), '2027-03-21')
  assert.equal(dateForNamedEvent(2027, 'Karva Chauth'), '2027-10-18')
  assert.equal(dateForNamedEvent(2027, 'Anant Chaturdashi'), '2027-09-14')
  assert.equal(dateForNamedEvent(2026, 'Anant Chaturdashi'), '2026-09-25')
})

test('dateForFestivalDay uses a named event or an offset from one', () => {
  assert.equal(dateForFestivalDay(2026, { eventName: 'Holi' }), '2026-03-04')
  assert.equal(dateForFestivalDay(2026, { offsetFrom: 'Janmashtami', offsetDays: 1 }), '2026-09-04')
  assert.equal(dateForFestivalDay(2026, {}), null)
})
