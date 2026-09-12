const TITHI_NAMES = [
  'Pratipada',
  'Dwitiya',
  'Tritiya',
  'Chaturthi',
  'Panchami',
  'Shashthi',
  'Saptami',
  'Ashtami',
  'Navami',
  'Dashami',
  'Ekadashi',
  'Dwadashi',
  'Trayodashi',
  'Chaturdashi',
] as const

const TITHI_HINDI = [
  'प्रतिपदा',
  'द्वितीया',
  'तृतीया',
  'चतुर्थी',
  'पंचमी',
  'षष्ठी',
  'सप्तमी',
  'अष्टमी',
  'नवमी',
  'दशमी',
  'एकादशी',
  'द्वादशी',
  'त्रयोदशी',
  'चतुर्दशी',
] as const

export const VARA = [
  { en: 'Sunday', hi: 'रविवार' },
  { en: 'Monday', hi: 'सोमवार' },
  { en: 'Tuesday', hi: 'मंगलवार' },
  { en: 'Wednesday', hi: 'बुधवार' },
  { en: 'Thursday', hi: 'गुरुवार' },
  { en: 'Friday', hi: 'शुक्रवार' },
  { en: 'Saturday', hi: 'शनिवार' },
] as const

export type Paksha = 'shukla' | 'krishna'

export interface TithiInfo {
  index: number
  number: number
  name: string
  nameHindi: string
  paksha: Paksha
  pakshaHindi: string
}

export interface CalendarDay {
  day: number
  weekday: number
  tithi: TithiInfo
}

function norm(deg: number): number {
  const x = deg % 360
  return x < 0 ? x + 360 : x
}

function sind(deg: number): number {
  return Math.sin((deg * Math.PI) / 180)
}

export function julianDate(year: number, month: number, day: number, hourUtc: number): number {
  let y = year
  let m = month
  if (m <= 2) {
    y -= 1
    m += 12
  }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  const dayFrac = day + hourUtc / 24
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFrac + B - 1524.5
}

function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const L0 = 280.4664567 + 36000.76982779 * T + 0.0003032028 * T * T
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T
  const C =
    (1.9146 - 0.004817 * T - 0.000014 * T * T) * sind(M) +
    (0.019993 - 0.000101 * T) * sind(2 * M) +
    0.00029 * sind(3 * M)
  return norm(L0 + C)
}

function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const L1 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + (T * T * T) / 538841
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T
  const E = 1 - 0.002516 * T - 0.0000074 * T * T
  const sum =
    6.288774 * sind(Mp) +
    1.274027 * sind(2 * D - Mp) +
    0.658314 * sind(2 * D) +
    0.213618 * sind(2 * Mp) -
    0.185116 * E * sind(M) -
    0.114332 * sind(2 * F) +
    0.058793 * sind(2 * D - 2 * Mp) +
    0.057066 * E * sind(2 * D - M - Mp) +
    0.053322 * sind(2 * D + Mp) +
    0.045758 * E * sind(2 * D - M) -
    0.040923 * E * sind(M - Mp) -
    0.03472 * sind(D) -
    0.030383 * E * sind(M + Mp)
  return norm(L1 + sum)
}

export function tithiFromJulian(jd: number): TithiInfo {
  const elong = norm(moonLongitude(jd) - sunLongitude(jd))
  const index = Math.min(29, Math.floor(elong / 12))
  const shukla = index < 15
  const number = shukla ? index + 1 : index - 14
  const special = index === 14 || index === 29
  const name = index === 14 ? 'Purnima' : index === 29 ? 'Amavasya' : TITHI_NAMES[number - 1]
  const nameHindi = index === 14 ? 'पूर्णिमा' : index === 29 ? 'अमावस्या' : TITHI_HINDI[number - 1]
  return {
    index,
    number: special ? 15 : number,
    name,
    nameHindi,
    paksha: shukla ? 'shukla' : 'krishna',
    pakshaHindi: shukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
  }
}

/** hourIst defaults to 6.5 — typical North-India sunrise used as udaya tithi. */
export function tithiAtSunrise(year: number, month: number, day: number, hourIst = 6.5): TithiInfo {
  return tithiFromJulian(julianDate(year, month, day, hourIst - 5.5))
}

export function weekdayIst(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

export function monthGrid(year: number, month: number): CalendarDay[] {
  const count = daysInMonth(year, month)
  const days: CalendarDay[] = []
  for (let day = 1; day <= count; day++) {
    days.push({
      day,
      weekday: weekdayIst(year, month, day),
      tithi: tithiAtSunrise(year, month, day),
    })
  }
  return days
}

export function kolkataYmd(now = new Date()): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now)
  const num = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  return { year: num('year'), month: num('month'), day: num('day') }
}

export function formatIso(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
