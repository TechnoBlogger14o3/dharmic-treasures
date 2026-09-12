import { useMemo, useState } from 'react'
import {
  daysInMonth,
  kolkataYmd,
  monthGrid,
  tithiAtSunrise,
  weekdayIst,
  VARA,
} from '../utils/panchang.ts'

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
  const today = useMemo(() => kolkataYmd(), [])
  const [open, setOpen] = useState(false)
  const [year, setYear] = useState(today.year)
  const [month, setMonth] = useState(today.month)
  const [selected, setSelected] = useState(today)

  const grid = useMemo(() => monthGrid(year, month), [year, month])
  const todayTithi = tithiAtSunrise(today.year, today.month, today.day)
  const selectedTithi = tithiAtSunrise(selected.year, selected.month, selected.day)
  const selectedVara = VARA[weekdayIst(selected.year, selected.month, selected.day)]
  const lead = weekdayIst(year, month, 1)
  const isToday = (day: number) => day === today.day && month === today.month && year === today.year
  const isSelected = (day: number) =>
    day === selected.day && month === selected.month && year === selected.year

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

  return (
    <div className="fixed bottom-20 sm:bottom-4 left-4 z-40">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="folio border border-gold bg-cream/95 backdrop-blur-md rounded-xl px-3 py-2.5 text-left shadow-lg min-h-[44px] touch-manipulation"
          aria-label="Open panchang"
        >
          <div className="text-[10px] uppercase tracking-wide text-maroon/70">पंचांग</div>
          <div className="text-sm font-serif text-maroon">
            {todayTithi.pakshaHindi.split(' ')[0]} {todayTithi.nameHindi}
          </div>
        </button>
      )}

      {open && (
        <div className="folio border border-gold bg-cream/95 backdrop-blur-md rounded-xl w-[min(20rem,calc(100vw-2rem))] shadow-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-maroon/70">पंचांग · Panchang</div>
              <div className="font-serif text-maroon text-sm sm:text-base">
                {MONTHS[month - 1]} {year}
              </div>
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
                onClick={() => setOpen(false)}
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
              </button>
            ))}
          </div>

          <div className="border-t border-gold mt-2 pt-2">
            <div className="font-serif text-maroon">
              {selectedTithi.nameHindi} · {selectedTithi.name}
            </div>
            <div className="text-xs text-ink/70">
              {selectedTithi.pakshaHindi} · {selectedVara.hi} · {selected.day} {MONTHS[selected.month - 1]}{' '}
              {selected.year}
            </div>
            <p className="text-[10px] text-ink/45 mt-1">
              Udaya tithi, India (approx.). Confirm muhurat with a local panchang.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
