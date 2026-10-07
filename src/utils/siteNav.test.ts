import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NAV_GROUPS, groupIdForType } from './siteNav.ts'
import type { TextType } from '../../types.ts'

const ALL_TYPES: TextType[] = [
  'gita',
  'hanumanChalisa',
  'sunderkand',
  'bajrangBaan',
  'yakshaPrashna',
  'satyanarayan',
  'shaktipeeths',
  'charDham',
  'jyotirlingas',
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

test('festivals sit under Utsav and texts under Path', () => {
  assert.equal(groupIdForType('navratri'), 'utsav')
  assert.equal(groupIdForType('karvaChauth'), 'utsav')
  assert.equal(groupIdForType('hanumanChalisa'), 'path')
  assert.equal(groupIdForType('jyotirlingas'), 'tirtha')
  assert.equal(groupIdForType('gita'), 'gita')
  assert.equal(groupIdForType('shastras'), 'shastras')
})
