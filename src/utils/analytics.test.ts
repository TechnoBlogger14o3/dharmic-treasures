import { test } from 'node:test'
import assert from 'node:assert/strict'
import { viewPath } from './analytics.ts'

test('viewPath names festivals and Gita verses', () => {
  assert.equal(viewPath({ textType: 'navratri' }), '/navratri')
  assert.equal(viewPath({ textType: 'gita', chapter: 3, verse: 1 }), '/gita/3')
  assert.equal(viewPath({ textType: 'gita', chapter: 3, verse: 12 }), '/gita/3/12')
  assert.equal(viewPath({ bookmarks: true }), '/bookmarks')
})
