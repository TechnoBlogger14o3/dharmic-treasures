import type { TextType } from '../../types.ts'

export type NavGroup =
  | { id: string; kind: 'item'; type: TextType; name: string; nameHindi: string }
  | { id: string; kind: 'menu'; name: string; nameHindi: string; types: TextType[] }

export const NAV_GROUPS: NavGroup[] = [
  { id: 'gita', kind: 'item', type: 'gita', name: 'Gita', nameHindi: 'गीता' },
  {
    id: 'path',
    kind: 'menu',
    name: 'Path',
    nameHindi: 'पाठ',
    types: ['hanumanChalisa', 'sunderkand', 'bajrangBaan', 'yakshaPrashna', 'satyanarayan'],
  },
  {
    id: 'tirtha',
    kind: 'menu',
    name: 'Tirtha',
    nameHindi: 'तीर्थ',
    types: ['shaktipeeths', 'charDham', 'jyotirlingas', 'temples'],
  },
  {
    id: 'utsav',
    kind: 'menu',
    name: 'Utsav',
    nameHindi: 'उत्सव',
    types: [
      'navratri',
      'karvaChauth',
      'diwali',
      'chhath',
      'shivaratri',
      'holi',
      'janmashtami',
      'ganeshChaturthi',
    ],
  },
  { id: 'shastras', kind: 'item', type: 'shastras', name: 'Shastras', nameHindi: 'शास्त्र' },
]

export function groupIdForType(type: TextType): string {
  for (const group of NAV_GROUPS) {
    if (group.kind === 'item' && group.type === type) return group.id
    if (group.kind === 'menu' && group.types.includes(type)) return group.id
  }
  return type
}
