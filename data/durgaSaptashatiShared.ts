import type { PathSection, PathStanza } from '../types.ts'

export function pathSection(
  id: number,
  group: PathSection['group'],
  name: string,
  nameHindi: string,
  summary: string,
  lines: string[],
): PathSection {
  const stanzas: PathStanza[] = lines.map((text, index) => ({ id: index + 1, text }))
  return { id, chapter_number: id, group, name, nameHindi, summary, stanzas }
}
