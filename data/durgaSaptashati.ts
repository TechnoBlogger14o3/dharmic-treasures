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

export const saptashatiCopyright = {
  holder: 'Aman Shekhar',
  hindi:
    '© {year} Aman Shekhar / Dharmic Treasures. वेबसाइट और डिज़ाइन का सर्वाधिकार सुरक्षित है। पाठ स्वयं पारंपरिक सार्वजनिक ग्रंथ है — सामग्री पर कोई दावा नहीं।',
  english:
    '© {year} Aman Shekhar / Dharmic Treasures. Copyright applies to the website and design only. Path text is traditional public scripture and is not claimed.',
}

export function saptashatiCopyrightYear(year = new Date().getFullYear()) {
  const stamp = String(year)
  return {
    hindi: saptashatiCopyright.hindi.replace(/\{year\}/g, stamp),
    english: saptashatiCopyright.english.replace(/\{year\}/g, stamp),
  }
}
