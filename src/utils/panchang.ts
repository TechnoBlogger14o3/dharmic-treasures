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

const NAKSHATRA = [
  { en: 'Ashwini', hi: 'अश्विनी' },
  { en: 'Bharani', hi: 'भरणी' },
  { en: 'Krittika', hi: 'कृत्तिका' },
  { en: 'Rohini', hi: 'रोहिणी' },
  { en: 'Mrigashira', hi: 'मृगशिरा' },
  { en: 'Ardra', hi: 'आर्द्रा' },
  { en: 'Punarvasu', hi: 'पुनर्वसु' },
  { en: 'Pushya', hi: 'पुष्य' },
  { en: 'Ashlesha', hi: 'अश्लेषा' },
  { en: 'Magha', hi: 'मघा' },
  { en: 'Purva Phalguni', hi: 'पूर्व फाल्गुनी' },
  { en: 'Uttara Phalguni', hi: 'उत्तर फाल्गुनी' },
  { en: 'Hasta', hi: 'हस्त' },
  { en: 'Chitra', hi: 'चित्रा' },
  { en: 'Swati', hi: 'स्वाती' },
  { en: 'Vishakha', hi: 'विशाखा' },
  { en: 'Anuradha', hi: 'अनुराधा' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा' },
  { en: 'Mula', hi: 'मूल' },
  { en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा' },
  { en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा' },
  { en: 'Shravana', hi: 'श्रवण' },
  { en: 'Dhanishta', hi: 'धनिष्ठा' },
  { en: 'Shatabhisha', hi: 'शतभिषा' },
  { en: 'Purva Bhadrapada', hi: 'पूर्व भाद्रपद' },
  { en: 'Uttara Bhadrapada', hi: 'उत्तर भाद्रपद' },
  { en: 'Revati', hi: 'रेवती' },
] as const

const YOGA = [
  { en: 'Vishkambha', hi: 'विष्कम्भ' },
  { en: 'Priti', hi: 'प्रीति' },
  { en: 'Ayushman', hi: 'आयुष्मान' },
  { en: 'Saubhagya', hi: 'सौभाग्य' },
  { en: 'Shobhana', hi: 'शोभन' },
  { en: 'Atiganda', hi: 'अतिगण्ड' },
  { en: 'Sukarma', hi: 'सुकर्मा' },
  { en: 'Dhriti', hi: 'धृति' },
  { en: 'Shula', hi: 'शूल' },
  { en: 'Ganda', hi: 'गण्ड' },
  { en: 'Vriddhi', hi: 'वृद्धि' },
  { en: 'Dhruva', hi: 'ध्रुव' },
  { en: 'Vyaghata', hi: 'व्याघात' },
  { en: 'Harshana', hi: 'हर्षण' },
  { en: 'Vajra', hi: 'वज्र' },
  { en: 'Siddhi', hi: 'सिद्धि' },
  { en: 'Vyatipata', hi: 'व्यतीपात' },
  { en: 'Variyan', hi: 'वरीयान्' },
  { en: 'Parigha', hi: 'परिघ' },
  { en: 'Shiva', hi: 'शिव' },
  { en: 'Siddha', hi: 'सिद्ध' },
  { en: 'Sadhya', hi: 'साध्य' },
  { en: 'Shubha', hi: 'शुभ' },
  { en: 'Shukla', hi: 'शुक्ल' },
  { en: 'Brahma', hi: 'ब्रह्म' },
  { en: 'Indra', hi: 'इन्द्र' },
  { en: 'Vaidhriti', hi: 'वैधृति' },
] as const

const KARANA_MOVABLE = [
  { en: 'Bava', hi: 'बव' },
  { en: 'Balava', hi: 'बालव' },
  { en: 'Kaulava', hi: 'कौलव' },
  { en: 'Taitila', hi: 'तैतिल' },
  { en: 'Gara', hi: 'गर' },
  { en: 'Vanija', hi: 'वणिज' },
  { en: 'Vishti', hi: 'विष्टि' },
] as const

const KARANA_FIXED = [
  { en: 'Kimstughna', hi: 'किंस्तुघ्न' },
  { en: 'Shakuni', hi: 'शकुनि' },
  { en: 'Chatushpada', hi: 'चतुष्पद' },
  { en: 'Naga', hi: 'नाग' },
] as const

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Saturday is slot 3 of 8 from sunrise — Sun=8, Mon=2, … */
const RAHU_SLOT = [8, 2, 7, 5, 6, 4, 3] as const

export const VARA = [
  { en: 'Sunday', hi: 'रविवार' },
  { en: 'Monday', hi: 'सोमवार' },
  { en: 'Tuesday', hi: 'मंगलवार' },
  { en: 'Wednesday', hi: 'बुधवार' },
  { en: 'Thursday', hi: 'गुरुवार' },
  { en: 'Friday', hi: 'शुक्रवार' },
  { en: 'Saturday', hi: 'शनिवार' },
] as const

export interface GeoPlace {
  id: string
  name: string
  nameHindi: string
  lat: number
  lon: number
}

export const PANCHANG_CITIES: GeoPlace[] = [
  { id: 'delhi', name: 'Delhi', nameHindi: 'दिल्ली', lat: 28.6139, lon: 77.209 },
  { id: 'patna', name: 'Patna', nameHindi: 'पटना', lat: 25.5941, lon: 85.1376 },
  { id: 'varanasi', name: 'Varanasi', nameHindi: 'वाराणसी', lat: 25.3176, lon: 82.9739 },
  { id: 'kolkata', name: 'Kolkata', nameHindi: 'कोलकाता', lat: 22.5726, lon: 88.3639 },
  { id: 'mumbai', name: 'Mumbai', nameHindi: 'मुंबई', lat: 19.076, lon: 72.8777 },
  { id: 'ujjain', name: 'Ujjain', nameHindi: 'उज्जैन', lat: 23.1765, lon: 75.7885 },
  { id: 'chennai', name: 'Chennai', nameHindi: 'चेन्नई', lat: 13.0827, lon: 80.2707 },
  { id: 'bengaluru', name: 'Bengaluru', nameHindi: 'बेंगलुरु', lat: 12.9716, lon: 77.5946 },
]

export const DEFAULT_CITY_ID = 'delhi'

export function getPanchangCity(id?: string | null): GeoPlace {
  return PANCHANG_CITIES.find((city) => city.id === id) ?? PANCHANG_CITIES[0]
}

export type Paksha = 'shukla' | 'krishna'

export interface NamedAnga {
  name: string
  nameHindi: string
  untilHourIst: number
}

export interface TithiInfo {
  index: number
  number: number
  name: string
  nameHindi: string
  paksha: Paksha
  pakshaHindi: string
}

export interface TithiSpan extends TithiInfo {
  untilHourIst: number
}

export interface CalendarDay {
  day: number
  weekday: number
  tithi: TithiInfo
}

export interface DayPanchang {
  tithi: TithiSpan
  nextTithi: TithiInfo
  nakshatra: NamedAnga
  yoga: NamedAnga
  karana: NamedAnga
  vara: (typeof VARA)[number]
  sunriseHourIst: number
  sunsetHourIst: number
  rahuKaal: { startHourIst: number; endHourIst: number }
}

function norm(deg: number): number {
  const x = deg % 360
  return x < 0 ? x + 360 : x
}

function sind(deg: number): number {
  return Math.sin((deg * Math.PI) / 180)
}

function cosd(deg: number): number {
  return Math.cos((deg * Math.PI) / 180)
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
  return norm(L0 + C - 0.00569)
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
    0.030383 * E * sind(M + Mp) +
    0.015326 * sind(2 * D - 2 * F) +
    0.012528 * sind(Mp + 2 * F) +
    0.01098 * sind(Mp - 2 * F) +
    0.010674 * sind(4 * D - Mp) +
    0.010034 * sind(3 * Mp) +
    0.008548 * sind(4 * D - 2 * Mp)
  return norm(L1 + sum)
}

function lahiriAyanamsa(jd: number): number {
  return 23.853014 + 0.013956236 * ((jd - 2451545.0) / 365.25)
}

function elongation(jd: number): number {
  return norm(moonLongitude(jd) - sunLongitude(jd))
}

function siderealMoon(jd: number): number {
  return norm(moonLongitude(jd) - lahiriAyanamsa(jd))
}

function siderealSun(jd: number): number {
  return norm(sunLongitude(jd) - lahiriAyanamsa(jd))
}

function yogaAngle(jd: number): number {
  return norm(siderealSun(jd) + siderealMoon(jd))
}

function tithiFromElong(elong: number): TithiInfo {
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

export function tithiFromJulian(jd: number): TithiInfo {
  return tithiFromElong(elongation(jd))
}

function karanaFromElong(elong: number): { name: string; nameHindi: string } {
  const k = Math.floor(elong / 6) % 60
  const row = k === 0 ? KARANA_FIXED[0] : k >= 57 ? KARANA_FIXED[k - 56] : KARANA_MOVABLE[(k - 1) % 7]
  return { name: row.en, nameHindi: row.hi }
}

function nextStepCrossing(jd0: number, valueAt: (jd: number) => number, step: number): number {
  const v0 = valueAt(jd0)
  const target = (Math.floor(v0 / step) + 1) * step
  let lo = jd0
  let hi = jd0 + 2.5
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2
    let v = valueAt(mid)
    if (v < v0 - 1) v += 360
    if (v < target) lo = mid
    else hi = mid
  }
  return hi
}

function jdToHourIstFromMidnight(jd: number, year: number, month: number, day: number): number {
  const midnight = julianDate(year, month, day, -5.5)
  return (jd - midnight) * 24
}

function solarDeclination(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const eps = 23.439291 - 0.0130042 * T
  return Math.asin(sind(eps) * sind(sunLongitude(jd))) * (180 / Math.PI)
}

function equationOfTimeMinutes(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const L = sunLongitude(jd)
  const eps = 23.439291 - 0.0130042 * T
  const ra = (Math.atan2(cosd(eps) * sind(L), cosd(L)) * 180) / Math.PI
  const raNorm = ra < 0 ? ra + 360 : ra
  const mean = norm(280.4664567 + 36000.76982779 * T)
  let eot = 4 * (mean - raNorm)
  if (eot > 720) eot -= 1440
  if (eot < -720) eot += 1440
  return eot
}

function sunEventIst(
  year: number,
  month: number,
  day: number,
  rising: boolean,
  place: GeoPlace,
): number {
  let hourUtc = 1.5
  for (let i = 0; i < 6; i++) {
    const jd = julianDate(year, month, day, hourUtc)
    const dec = solarDeclination(jd)
    const num = sind(-0.833) - sind(place.lat) * sind(dec)
    const den = cosd(place.lat) * cosd(dec)
    const cosH = Math.min(1, Math.max(-1, num / den))
    const H = (Math.acos(cosH) * 180) / Math.PI
    const eot = equationOfTimeMinutes(jd)
    const solarNoonUtc = 12 - place.lon / 15 - eot / 60
    hourUtc = rising ? solarNoonUtc - H / 15 : solarNoonUtc + H / 15
  }
  return hourUtc + 5.5
}

export function sunriseIst(year: number, month: number, day: number, place: GeoPlace = getPanchangCity()): number {
  return sunEventIst(year, month, day, true, place)
}

export function sunsetIst(year: number, month: number, day: number, place: GeoPlace = getPanchangCity()): number {
  return sunEventIst(year, month, day, false, place)
}

export function delhiSunriseIst(year: number, month: number, day: number): number {
  return sunriseIst(year, month, day, getPanchangCity('delhi'))
}

export function delhiSunsetIst(year: number, month: number, day: number): number {
  return sunsetIst(year, month, day, getPanchangCity('delhi'))
}

/** hourIst defaults to that city's sunrise — udaya tithi. */
export function tithiAtSunrise(
  year: number,
  month: number,
  day: number,
  hourIst?: number,
  place: GeoPlace = getPanchangCity(),
): TithiInfo {
  const hour = hourIst ?? sunriseIst(year, month, day, place)
  return tithiFromJulian(julianDate(year, month, day, hour - 5.5))
}

export function weekdayIst(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

export function monthGrid(year: number, month: number, place: GeoPlace = getPanchangCity()): CalendarDay[] {
  const count = daysInMonth(year, month)
  const days: CalendarDay[] = []
  for (let day = 1; day <= count; day++) {
    days.push({
      day,
      weekday: weekdayIst(year, month, day),
      tithi: tithiAtSunrise(year, month, day, undefined, place),
    })
  }
  return days
}

function namedFromAngle(
  jd0: number,
  hourBase: { year: number; month: number; day: number },
  valueAt: (jd: number) => number,
  step: number,
  table: readonly { en: string; hi: string }[],
): NamedAnga {
  const idx = Math.min(table.length - 1, Math.floor(valueAt(jd0) / step))
  const untilJd = nextStepCrossing(jd0, valueAt, step)
  return {
    name: table[idx].en,
    nameHindi: table[idx].hi,
    untilHourIst: jdToHourIstFromMidnight(untilJd, hourBase.year, hourBase.month, hourBase.day),
  }
}

export function panchangForDay(
  year: number,
  month: number,
  day: number,
  place: GeoPlace = getPanchangCity(),
): DayPanchang {
  const sunrise = sunriseIst(year, month, day, place)
  const sunset = sunsetIst(year, month, day, place)
  const jd = julianDate(year, month, day, sunrise - 5.5)
  const elong = elongation(jd)
  const tithi = tithiFromElong(elong)
  const untilJd = nextStepCrossing(jd, elongation, 12)
  const untilHourIst = jdToHourIstFromMidnight(untilJd, year, month, day)
  const nextTithi = tithiFromElong(norm(elongation(untilJd) + 0.01))
  const karanaNow = karanaFromElong(elong)
  const karanaUntil = nextStepCrossing(jd, elongation, 6)
  const weekday = weekdayIst(year, month, day)
  const slot = RAHU_SLOT[weekday]
  const eighth = (sunset - sunrise) / 8

  return {
    tithi: { ...tithi, untilHourIst },
    nextTithi,
    nakshatra: namedFromAngle(jd, { year, month, day }, siderealMoon, 360 / 27, NAKSHATRA),
    yoga: namedFromAngle(jd, { year, month, day }, yogaAngle, 360 / 27, YOGA),
    karana: {
      name: karanaNow.name,
      nameHindi: karanaNow.nameHindi,
      untilHourIst: jdToHourIstFromMidnight(karanaUntil, year, month, day),
    },
    vara: VARA[weekday],
    sunriseHourIst: sunrise,
    sunsetHourIst: sunset,
    rahuKaal: {
      startHourIst: sunrise + (slot - 1) * eighth,
      endHourIst: sunrise + slot * eighth,
    },
  }
}

export function panchangAtIst(year: number, month: number, day: number, hourIst: number): TithiInfo {
  return tithiFromJulian(julianDate(year, month, day, hourIst - 5.5))
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

export function kolkataClock(now = new Date()): { year: number; month: number; day: number; hourIst: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now)
  const num = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  return {
    year: num('year'),
    month: num('month'),
    day: num('day'),
    hourIst: num('hour') + num('minute') / 60,
  }
}

export function formatIso(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function addDays(year: number, month: number, day: number, extra: number): { year: number; month: number; day: number } {
  const utc = Date.UTC(year, month - 1, day + extra)
  const d = new Date(utc)
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() }
}

export function formatIstClock(hourIst: number, year: number, month: number, day: number): string {
  const dayOffset = Math.floor(hourIst / 24)
  let minutes = Math.round((hourIst - dayOffset * 24) * 60)
  let extraDays = dayOffset
  if (minutes >= 24 * 60) {
    extraDays += 1
    minutes = 0
  }
  const h24 = Math.floor(minutes / 60)
  const min = minutes % 60
  const suffix = h24 >= 12 ? 'PM' : 'AM'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  const clock = `${h12}:${String(min).padStart(2, '0')} ${suffix}`
  if (extraDays <= 0) return clock
  const next = addDays(year, month, day, extraDays)
  return `${clock}, ${next.day} ${MONTH_SHORT[next.month - 1]}`
}
