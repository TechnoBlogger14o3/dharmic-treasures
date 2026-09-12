import { useEffect, useMemo, useState } from 'react'
import { mainEventForDate } from '../utils/festivals.ts'
import {
  DEFAULT_CITY_ID,
  daysInMonth,
  formatIstClock,
  getPanchangCity,
  kolkataClock,
  kolkataYmd,
  monthGrid,
  PANCHANG_CITIES,
  panchangAtIst,
  panchangForDay,
  weekdayIst,
} from '../utils/panchang.ts'
import { getSettings, saveSettings } from '../utils/storage.ts'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WEEKDAYS = ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श']

export default function PanchangWidget() {
  const [now, setNow] = useState(() => new Date())
  const today = useMemo(() => kolkataYmd(now), [now])
  const [open, setOpen] = useState(false)
  const [year, setYear] = useState(() => kolkataYmd().year)
  const [month, setMonth] = useState(() => kolkataYmd().month)
  const [selected, setSelected] = useState(() => kolkataYmd())
  const [cityId, setCityId] = useState(() => getSettings().panchangCityId ?? DEFAULT_CITY_ID)
  const city = useMemo(() => getPanchangCity(cityId), [cityId])

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const grid = useMemo(() => monthGrid(year, month, city), [year, month, city])
  const clock = kolkataClock(now)
  const running = panchangAtIst(clock.year, clock.month, clock.day, clock.hourIst)
  const dayPanchang = useMemo(
    () => panchangForDay(selected.year, selected.month, selected.day, city),
    [selected, city],
  )
  const selectedEvent = useMemo(
    () => mainEventForDate(selected.year, selected.month, selected.day),
    [selected],
  )
  const todayEvent = mainEventForDate(today.year, today.month, today.day)
  const lead = weekdayIst(year, month, 1)
  const isToday = (day: number) => day === today.day && month === today.month && year === today.year
  const isSelected = (day: number) =>
    day === selected.day && month === selected.month && year === selected.year

  const chooseCity = (id: string) => {
    setCityId(id)
    saveSettings({ ...getSettings(), panchangCityId: id })
  }

  const jumpToToday = () => {
    const current = kolkataYmd(new Date())
    setNow(new Date())
    setYear(current.year)
    setMonth(current.month)
    setSelected(current)
  }

  const shiftMonth = (delta: number) => {
    const next = new Date(Date.UTC(year, month - 1 + delta, 1))
    const nextYear = next.getUTCFullYear()
    const nextMonth = next.getUTCMonth() + 1
    setYear(nextYear)
    setMonth(nextMonth)
    const maxDay = daysInMonth(nextYear, nextMonth)
    setSelected({
      year: nextYear,
      month: nextMonth,
      day: Math.min(selected.day, maxDay),
    })
  }

  const tithiUntil = formatIstClock(
    dayPanchang.tithi.untilHourIst,
    selected.year,
    selected.month,
    selected.day,
  )
  const rahuStart = formatIstClock(
    dayPanchang.rahuKaal.startHourIst,
    selected.year,
    selected.month,
    selected.day,
  )
  const rahuEnd = formatIstClock(
    dayPanchang.rahuKaal.endHourIst,
    selected.year,
    selected.month,
    selected.day,
  )

  return (
    <div className="fixed bottom-20 sm:bottom-4 left-4 z-40">
      {!open && (
        <button
          type="button"
          onClick={() => {
            jumpToToday()
            setOpen(true)
          }}
          className="folio border border-gold bg-cream/95 backdrop-blur-md rounded-xl px-3 py-2.5 text-left shadow-lg min-h-[44px] touch-manipulation"
          aria-label="Open panchang"
        >
          <div className="text-[10px] uppercase tracking-wide text-maroon/70">पंचांग</div>
          <div className="text-sm font-serif text-maroon">
            {todayEvent ? todayEvent.nameHindi : `${running.pakshaHindi.split(' ')[0]} ${running.nameHindi}`}
          </div>
        </button>
      )}

      {open && (
        <div className="folio border border-gold bg-cream/95 backdrop-blur-md rounded-xl w-[min(21rem,calc(100vw-2rem))] shadow-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-maroon/70">पंचांग · Panchang</div>
              <div className="font-serif text-maroon text-sm sm:text-base">
                {MONTHS[month - 1]} {year}
              </div>
              <label className="sr-only" htmlFor="panchang-city">
                City
              </label>
              <select
                id="panchang-city"
                value={city.id}
                onChange={(event) => chooseCity(event.target.value)}
                className="mt-1 max-w-full rounded-md border border-gold/70 bg-cream px-1.5 py-0.5 text-[11px] text-maroon"
              >
                {PANCHANG_CITIES.map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.nameHindi} · {place.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="min-w-[36px] min-h-[36px] rounded-lg text-maroon hover:bg-saffron-light"
                aria-label="Previous month"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="min-w-[36px] min-h-[36px] rounded-lg text-maroon hover:bg-saffron-light"
                aria-label="Next month"
              >
                ›
              </button>
              <button
                type="button"
                onClick={() => {
                  jumpToToday()
                  setOpen(false)
                }}
                className="min-w-[36px] min-h-[36px] rounded-lg text-maroon hover:bg-saffron-light"
                aria-label="Close panchang"
              >
                ×
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
            {WEEKDAYS.map((label) => (
              <div key={label} className="text-[10px] text-ink/50 py-1">
                {label}
              </div>
            ))}
            {Array.from({ length: lead }, (_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {grid.map((cell) => (
              <button
                key={cell.day}
                type="button"
                onClick={() => setSelected({ year, month, day: cell.day })}
                className={`rounded-md py-1 min-h-[40px] touch-manipulation ${
                  isSelected(cell.day)
                    ? 'bg-saffron text-white'
                    : isToday(cell.day)
                      ? 'bg-saffron-light text-maroon'
                      : 'text-ink hover:bg-gold-light'
                }`}
              >
                <div className="text-xs font-medium leading-none">{cell.day}</div>
                <div className="text-[9px] leading-tight opacity-80 mt-0.5">{cell.tithi.number}</div>
                {mainEventForDate(year, month, cell.day) && (
                  <div className="mx-auto mt-0.5 h-1 w-1 rounded-full bg-current opacity-80" />
                )}
              </button>
            ))}
          </div>

          <div className="border-t border-gold mt-2 pt-2 space-y-1.5">
            <div>
              {selectedEvent && (
                <div className="font-serif text-maroon text-sm mb-1">
                  उत्सव · {selectedEvent.nameHindi} · {selectedEvent.name}
                </div>
              )}
              <div className="font-serif text-maroon">
                {dayPanchang.tithi.nameHindi} · {dayPanchang.tithi.name}
              </div>
              <div className="text-xs text-ink/70">
                {dayPanchang.tithi.pakshaHindi} · till {tithiUntil} · then {dayPanchang.nextTithi.nameHindi}
              </div>
            </div>
            <dl className="grid grid-cols-[4.5rem_1fr] gap-x-2 gap-y-0.5 text-xs text-ink/80">
              <dt className="text-ink/45">नक्षत्र</dt>
              <dd>
                {dayPanchang.nakshatra.nameHindi} · {dayPanchang.nakshatra.name}
              </dd>
              <dt className="text-ink/45">योग</dt>
              <dd>
                {dayPanchang.yoga.nameHindi} · {dayPanchang.yoga.name}
              </dd>
              <dt className="text-ink/45">करण</dt>
              <dd>
                {dayPanchang.karana.nameHindi} · {dayPanchang.karana.name}
              </dd>
              <dt className="text-ink/45">वार</dt>
              <dd>
                {dayPanchang.vara.hi} · {dayPanchang.vara.en}
              </dd>
              <dt className="text-ink/45">राहुकाल</dt>
              <dd>
                {rahuStart} – {rahuEnd}
              </dd>
            </dl>
            <p className="text-[10px] text-ink/45">
              Udaya tithi at {city.name} sunrise. Confirm muhurat locally.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
