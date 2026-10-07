import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { FestivalPage } from '../../data/festivalTypes'
import { formatChhathDate, kolkataTodayIso } from '../utils/chhathDates.ts'
import { dateForFestivalDay, upcomingYearForEvent } from '../utils/festivals.ts'
import 'leaflet/dist/leaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

export default function FestivalView({ page }: { page: FestivalPage }) {
  const [showMap, setShowMap] = useState(false)
  const year = upcomingYearForEvent(page.upcomingEventName, kolkataTodayIso())
  const hasDate = page.days.some((day) => dateForFestivalDay(year, day))
  const centerLat = page.places.reduce((sum, place) => sum + place.coordinates.lat, 0) / page.places.length
  const centerLng = page.places.reduce((sum, place) => sum + place.coordinates.lng, 0) / page.places.length

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-5xl animate-fadeIn pb-20 sm:pb-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-maroon mb-2">
          {page.introduction.title}
        </h1>
        <p className="text-base sm:text-lg text-ink/70">{page.introduction.titleEnglish}</p>
        <p className="mt-3 text-sm text-ink/60">{page.tagline}</p>
      </div>

      <div className="folio rounded-xl p-4 sm:p-6 md:p-8 mb-6 animate-scaleIn">
        <p className="font-serif text-ink leading-relaxed whitespace-pre-line">{page.introduction.content}</p>
        <div className="border-t border-gold pt-4 mt-4">
          <p className="text-ink/80 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {page.introduction.contentEnglish}
          </p>
        </div>
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">{page.daysHeading}</h2>
      <p className="text-sm text-ink/60 mb-4">
        {hasDate
          ? `${page.monthLabel} ${year} civil dates (North India list). A tithi can spill a day — confirm locally.`
          : 'Tithi names stay the same. Civil dates after 2027 are not listed yet — use a local panchang.'}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {page.days.map((day) => {
          const iso = dateForFestivalDay(year, day)
          return (
            <div key={day.id} className="folio lotus-corner rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-saffron text-white px-2.5 py-0.5 rounded-lg font-bold text-sm">{day.id}</span>
                <div>
                  <div className="font-serif text-lg text-maroon">{day.nameHindi}</div>
                  <div className="text-xs text-ink/60">{day.name}</div>
                </div>
              </div>
              <div className="text-xs text-saffron-dark mb-2">
                {day.tithi}
                {iso ? ` · ${formatChhathDate(iso)}` : ''}
              </div>
              <p className="text-sm text-ink leading-relaxed mb-2">{day.summaryHindi}</p>
              <p className="text-sm text-ink/70 leading-relaxed">{day.summary}</p>
            </div>
          )
        })}
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">किन्हें पूजा जाता है · Who is worshipped</h2>
      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {page.deities.map((deity) => (
          <div key={deity.name} className="folio rounded-xl p-4">
            <div className="font-serif text-lg text-maroon">{deity.nameHindi}</div>
            <div className="text-xs text-ink/60 mb-2">{deity.name}</div>
            <p className="text-sm text-ink mb-1">{deity.noteHindi}</p>
            <p className="text-sm text-ink/70">{deity.note}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">{page.kathaHeading}</h2>
      <div className="folio rounded-xl p-4 sm:p-6 mb-8">
        <p className="font-serif text-ink leading-relaxed mb-3">{page.kathaHindi}</p>
        <p className="text-sm text-ink/70 leading-relaxed">{page.kathaEnglish}</p>
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">इतिहास और कथा · History and story</h2>
      <p className="text-sm text-ink/60 mb-4">Three layers get mixed in popular talk. They are not the same kind of evidence.</p>
      <div className="space-y-3 mb-8">
        {page.history.map((item) => (
          <div key={item.layer} className="folio rounded-xl p-4 sm:p-5">
            <div className="font-serif text-maroon mb-1">
              {item.layerHindi} · {item.layer}
            </div>
            <p className="text-sm text-ink mb-1">{item.claimHindi}</p>
            <p className="text-sm text-ink/70 mb-2">{item.claim}</p>
            <div className="border-t border-gold pt-2">
              <p className="text-sm text-ink">{item.verdictHindi}</p>
              <p className="text-sm text-ink/70 mt-1">{item.verdict}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">भूमि · Land</h2>
      <div className="flex justify-center mb-4">
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="px-6 py-3 bg-saffron text-white rounded-lg hover:bg-saffron-dark transition-colors font-medium"
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
      {showMap && (
        <div className="folio rounded-xl p-4 sm:p-6 mb-4 h-96">
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={page.mapZoom ?? 5}
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {page.places.map((place) => (
              <Marker key={place.id} position={[place.coordinates.lat, place.coordinates.lng]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold">{place.nameHindi}</h3>
                    <p className="text-sm">{place.name}</p>
                    <p className="text-xs text-gray-600">
                      {place.location}, {place.state}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
      <div className="grid gap-4 mb-8">
        {page.places.map((place) => (
          <div key={place.id} className="folio lotus-corner rounded-xl p-4 sm:p-5">
            <div className="font-serif text-lg text-maroon">{place.nameHindi}</div>
            <div className="text-sm text-ink/70">
              {place.name} · {place.location}, {place.state}
            </div>
            <p className="text-sm text-ink mt-2">{place.noteHindi}</p>
            <p className="text-sm text-ink/70 mt-1">{place.note}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">विधि · How it is kept</h2>
      <div className="space-y-3 mb-8">
        <div className="folio rounded-xl p-4 sm:p-5">
          <div className="text-xs uppercase tracking-wide text-maroon/70 mb-1">Puja</div>
          <p className="text-sm text-ink mb-1">{page.practice.pujaHindi}</p>
          <p className="text-sm text-ink/70">{page.practice.puja}</p>
        </div>
        <div className="folio rounded-xl p-4 sm:p-5">
          <div className="text-xs uppercase tracking-wide text-maroon/70 mb-1">Who keeps it</div>
          <p className="text-sm text-ink mb-1">{page.practice.whoHindi}</p>
          <p className="text-sm text-ink/70">{page.practice.who}</p>
        </div>
        <div className="folio rounded-xl p-4 sm:p-5">
          <div className="text-xs uppercase tracking-wide text-maroon/70 mb-1">Care</div>
          <p className="text-sm text-ink mb-1">{page.practice.careHindi}</p>
          <p className="text-sm text-ink/70">{page.practice.care}</p>
        </div>
      </div>

      <p className="text-xs text-ink/50 leading-relaxed">{page.sources}</p>
    </div>
  )
}
