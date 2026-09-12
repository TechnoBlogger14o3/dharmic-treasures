import { chhathDatesForYear } from './chhathDates.ts'
import { formatIso } from './panchang.ts'

export interface DayEvent {
  name: string
  nameHindi: string
  rank: number
}

function civil(name: string, nameHindi: string, rank: number): DayEvent {
  return { name, nameHindi, rank }
}

const FIXED: Record<string, DayEvent> = {
  '01-01': civil('New Year', 'नव वर्ष', 20),
  '01-26': civil('Republic Day', 'गणतंत्र दिवस', 40),
  '08-15': civil('Independence Day', 'स्वतंत्रता दिवस', 40),
  '10-02': civil('Gandhi Jayanti', 'गाँधी जयंती', 35),
  '12-25': civil('Christmas', 'क्रिसमस', 25),
}

/** North-India / Delhi observances from published panchangs. */
const BY_ISO: Record<string, DayEvent> = {
  '2025-01-14': { name: 'Makar Sankranti', nameHindi: 'मकर संक्रांति', rank: 70 },
  '2025-02-03': { name: 'Vasant Panchami', nameHindi: 'वसंत पंचमी', rank: 65 },
  '2025-02-26': { name: 'Maha Shivaratri', nameHindi: 'महा शिवरात्रि', rank: 90 },
  '2025-03-13': { name: 'Holika Dahan', nameHindi: 'होलिका दहन', rank: 72 },
  '2025-03-14': { name: 'Holi', nameHindi: 'होली', rank: 95 },
  '2025-03-30': { name: 'Ugadi / Gudi Padwa', nameHindi: 'उगादि / गुड़ी पड़वा', rank: 75 },
  '2025-04-06': { name: 'Ram Navami', nameHindi: 'राम नवमी', rank: 85 },
  '2025-04-12': { name: 'Hanuman Jayanti', nameHindi: 'हनुमान जयंती', rank: 70 },
  '2025-04-30': { name: 'Akshaya Tritiya', nameHindi: 'अक्षय तृतीया', rank: 70 },
  '2025-05-12': { name: 'Buddha Purnima', nameHindi: 'बुद्ध पूर्णिमा', rank: 70 },
  '2025-07-10': { name: 'Guru Purnima', nameHindi: 'गुरु पूर्णिमा', rank: 75 },
  '2025-08-09': { name: 'Raksha Bandhan', nameHindi: 'रक्षा बंधन', rank: 85 },
  '2025-08-16': { name: 'Janmashtami', nameHindi: 'जन्माष्टमी', rank: 92 },
  '2025-08-27': { name: 'Ganesh Chaturthi', nameHindi: 'गणेश चतुर्थी', rank: 90 },
  '2025-09-22': { name: 'Navratri begins', nameHindi: 'नवरात्रि आरंभ', rank: 80 },
  '2025-10-02': { name: 'Dussehra', nameHindi: 'दशहरा', rank: 90 },
  '2025-10-10': { name: 'Karva Chauth', nameHindi: 'करवा चौथ', rank: 78 },
  '2025-10-18': { name: 'Dhanteras', nameHindi: 'धनतेरस', rank: 80 },
  '2025-10-20': { name: 'Diwali', nameHindi: 'दीपावली', rank: 100 },
  '2025-10-22': { name: 'Govardhan Puja', nameHindi: 'गोवर्धन पूजा', rank: 76 },
  '2025-10-23': { name: 'Bhai Dooj', nameHindi: 'भाई दूज', rank: 74 },

  '2026-01-14': { name: 'Makar Sankranti', nameHindi: 'मकर संक्रांति', rank: 70 },
  '2026-01-23': { name: 'Vasant Panchami', nameHindi: 'वसंत पंचमी', rank: 65 },
  '2026-02-15': { name: 'Maha Shivaratri', nameHindi: 'महा शिवरात्रि', rank: 90 },
  '2026-03-03': { name: 'Holika Dahan', nameHindi: 'होलिका दहन', rank: 72 },
  '2026-03-04': { name: 'Holi', nameHindi: 'होली', rank: 95 },
  '2026-03-19': { name: 'Ugadi / Gudi Padwa', nameHindi: 'उगादि / गुड़ी पड़वा', rank: 75 },
  '2026-03-26': { name: 'Ram Navami', nameHindi: 'राम नवमी', rank: 85 },
  '2026-04-02': { name: 'Hanuman Jayanti', nameHindi: 'हनुमान जयंती', rank: 70 },
  '2026-04-19': { name: 'Akshaya Tritiya', nameHindi: 'अक्षय तृतीया', rank: 70 },
  '2026-05-01': { name: 'Buddha Purnima', nameHindi: 'बुद्ध पूर्णिमा', rank: 70 },
  '2026-07-29': { name: 'Guru Purnima', nameHindi: 'गुरु पूर्णिमा', rank: 75 },
  '2026-08-28': { name: 'Raksha Bandhan', nameHindi: 'रक्षा बंधन', rank: 85 },
  '2026-09-03': { name: 'Janmashtami', nameHindi: 'जन्माष्टमी', rank: 92 },
  '2026-09-14': { name: 'Ganesh Chaturthi', nameHindi: 'गणेश चतुर्थी', rank: 90 },
  '2026-10-11': { name: 'Navratri begins', nameHindi: 'नवरात्रि आरंभ', rank: 80 },
  '2026-10-20': { name: 'Dussehra', nameHindi: 'दशहरा', rank: 90 },
  '2026-10-29': { name: 'Karva Chauth', nameHindi: 'करवा चौथ', rank: 78 },
  '2026-11-06': { name: 'Dhanteras', nameHindi: 'धनतेरस', rank: 80 },
  '2026-11-08': { name: 'Diwali', nameHindi: 'दीपावली', rank: 100 },
  '2026-11-10': { name: 'Govardhan Puja', nameHindi: 'गोवर्धन पूजा', rank: 76 },
  '2026-11-11': { name: 'Bhai Dooj', nameHindi: 'भाई दूज', rank: 74 },

  '2027-01-14': { name: 'Makar Sankranti', nameHindi: 'मकर संक्रांति', rank: 70 },
  '2027-03-06': { name: 'Maha Shivaratri', nameHindi: 'महा शिवरात्रि', rank: 90 },
  '2027-03-22': { name: 'Holi', nameHindi: 'होली', rank: 95 },
  '2027-04-08': { name: 'Ugadi / Gudi Padwa', nameHindi: 'उगादि / गुड़ी पड़वा', rank: 75 },
  '2027-04-15': { name: 'Ram Navami', nameHindi: 'राम नवमी', rank: 85 },
  '2027-07-18': { name: 'Guru Purnima', nameHindi: 'गुरु पूर्णिमा', rank: 75 },
  '2027-08-24': { name: 'Janmashtami', nameHindi: 'जन्माष्टमी', rank: 92 },
  '2027-09-04': { name: 'Ganesh Chaturthi', nameHindi: 'गणेश चतुर्थी', rank: 90 },
  '2027-09-30': { name: 'Navratri begins', nameHindi: 'नवरात्रि आरंभ', rank: 80 },
  '2027-10-09': { name: 'Dussehra', nameHindi: 'दशहरा', rank: 90 },
  '2027-10-28': { name: 'Diwali', nameHindi: 'दीपावली', rank: 100 },
}

function chhathEvent(year: number, month: number, day: number): DayEvent | null {
  const dates = chhathDatesForYear(year)
  if (!dates) return null
  const iso = formatIso(year, month, day)
  if (iso === dates.nahayKhay) return { name: 'Nahay Khay', nameHindi: 'नहाय खाय', rank: 68 }
  if (iso === dates.kharna) return { name: 'Kharna', nameHindi: 'खरना', rank: 69 }
  if (iso === dates.sandhyaArghya) return { name: 'Chhath Puja', nameHindi: 'छठ पूजा', rank: 88 }
  if (iso === dates.ushaArghya) return { name: 'Usha Arghya', nameHindi: 'उषा अर्घ्य', rank: 82 }
  return null
}

function mmdd(month: number, day: number): string {
  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function eventsForDate(year: number, month: number, day: number): DayEvent[] {
  const iso = formatIso(year, month, day)
  const found: DayEvent[] = []
  if (BY_ISO[iso]) found.push(BY_ISO[iso])
  const chhath = chhathEvent(year, month, day)
  if (chhath) found.push(chhath)
  const fixed = FIXED[mmdd(month, day)]
  if (fixed) found.push(fixed)
  found.sort((a, b) => b.rank - a.rank)
  return found
}

export function mainEventForDate(year: number, month: number, day: number): DayEvent | null {
  return eventsForDate(year, month, day)[0] ?? null
}

export function dateForNamedEvent(year: number, name: string): string | null {
  for (const [iso, event] of Object.entries(BY_ISO)) {
    if (event.name === name && iso.startsWith(`${year}-`)) return iso
  }
  return null
}

export function upcomingYearForEvent(name: string, todayIso: string): number {
  const years = [...new Set(Object.keys(BY_ISO).map((iso) => Number(iso.slice(0, 4))))].sort((a, b) => a - b)
  for (const year of years) {
    const iso = dateForNamedEvent(year, name)
    if (iso && todayIso <= iso) return year
  }
  return years[years.length - 1] ?? Number(todayIso.slice(0, 4))
}
