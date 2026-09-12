export interface ChhathCivilDates {
  nahayKhay: string
  kharna: string
  sandhyaArghya: string
  ushaArghya: string
}

/** Kartik Shukla Shashthi (Sandhya Arghya) in Asia/Kolkata, from published panchangs. */
const SANDHYA_ARGHYA: Record<number, string> = {
  2024: '2024-11-07',
  2025: '2025-10-27',
  2026: '2026-11-15',
  2027: '2027-11-04',
  2028: '2028-10-23',
  2029: '2029-11-11',
  2030: '2030-11-01',
  2031: '2031-11-20',
  2032: '2032-11-09',
  2033: '2033-10-29',
  2034: '2034-11-17',
}

export function addIsoDays(iso: string, days: number): string {
  const [year, month, day] = iso.split('-').map(Number)
  const next = new Date(Date.UTC(year, month - 1, day + days))
  return next.toISOString().slice(0, 10)
}

export function chhathDatesForYear(year: number): ChhathCivilDates | null {
  const sandhya = SANDHYA_ARGHYA[year]
  if (!sandhya) return null
  return {
    nahayKhay: addIsoDays(sandhya, -2),
    kharna: addIsoDays(sandhya, -1),
    sandhyaArghya: sandhya,
    ushaArghya: addIsoDays(sandhya, 1),
  }
}

export function upcomingChhathYear(todayIso: string): number {
  const years = Object.keys(SANDHYA_ARGHYA)
    .map(Number)
    .sort((a, b) => a - b)
  for (const year of years) {
    const usha = addIsoDays(SANDHYA_ARGHYA[year], 1)
    if (todayIso <= usha) return year
  }
  return years[years.length - 1] + 1
}

export function kolkataTodayIso(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now)
}

export function formatChhathDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function civilDateForDay(
  dates: ChhathCivilDates | null,
  dayId: number
): string | null {
  if (!dates) return null
  if (dayId === 1) return dates.nahayKhay
  if (dayId === 2) return dates.kharna
  if (dayId === 3) return dates.sandhyaArghya
  if (dayId === 4) return dates.ushaArghya
  return null
}
