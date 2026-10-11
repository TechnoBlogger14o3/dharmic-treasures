import type { PathSection } from '../types.ts'
import { saptashatiChapters } from './durgaSaptashatiChapters.ts'
import { saptashatiPurva } from './durgaSaptashatiPurva.ts'
import { saptashatiUttara } from './durgaSaptashatiUttara.ts'

export const saptashatiPath: PathSection[] = [
  ...saptashatiPurva,
  ...saptashatiChapters,
  ...saptashatiUttara,
]

export const saptashatiGroups: { id: PathSection['group']; nameHindi: string }[] = [
  { id: 'purva', nameHindi: 'पूर्व पाठ' },
  { id: 'madhya', nameHindi: 'सप्तशती — तेरह अध्याय' },
  { id: 'uttara', nameHindi: 'उत्तर पाठ' },
]
