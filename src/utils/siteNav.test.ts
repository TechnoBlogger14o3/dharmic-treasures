import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NAV_GROUPS, groupIdForType } from './siteNav.ts'
import type { TextType } from '../../types.ts'

const ALL_TYPES: TextType[] = [
  'gita',
  'aarti',
  'hanumanChalisa',
  'sunderkand',
  'bajrangBaan',
  'yakshaPrashna',
  'satyanarayan',
  'shaktipeeths',
  'charDham',
  'jyotirlingas',
  'temples',
  'chhath',
  'diwali',
  'navratri',
  'shivaratri',
  'holi',
  'janmashtami',
  'ganeshChaturthi',
  'karvaChauth',
  'shastras',
]

test('nav groups list every section once', () => {
  const listed = NAV_GROUPS.flatMap((group) => (group.kind === 'item' ? [group.type] : group.types))
  assert.deepEqual([...listed].sort(), [...ALL_TYPES].sort())
  assert.equal(listed.length, new Set(listed).size)
})

test('grouped sections are Tirtha, then Utsav, then Path', () => {
  assert.deepEqual(
    NAV_GROUPS.filter((group) => group.kind === 'menu').map((group) => group.id),
    ['tirtha', 'utsav', 'path'],
  )
})

test('festivals sit under Utsav and texts under Path', () => {
  assert.equal(groupIdForType('navratri'), 'utsav')
  assert.equal(groupIdForType('karvaChauth'), 'utsav')
  assert.equal(groupIdForType('hanumanChalisa'), 'path')
  assert.equal(groupIdForType('jyotirlingas'), 'tirtha')
  assert.equal(groupIdForType('gita'), 'gita')
  assert.equal(groupIdForType('aarti'), 'aarti')
  assert.equal(groupIdForType('shastras'), 'shastras')
})

test('Aarti sits as its own rail item after Gita', () => {
  const ids = NAV_GROUPS.map((group) => group.id)
  assert.ok(ids.indexOf('gita') < ids.indexOf('aarti'))
  assert.ok(ids.indexOf('aarti') < ids.indexOf('tirtha'))
  assert.equal(NAV_GROUPS.find((group) => group.id === 'aarti')?.kind, 'item')
})
