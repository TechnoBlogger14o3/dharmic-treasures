import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import {
  civilDateForDay,
  formatChhathDate,
  chhathDatesForYear,
  kolkataTodayIso,
  upcomingChhathYear,
} from '../utils/chhathDates.ts'
import {
  chhathDays,
  chhathDeities,
  chhathHistory,
  chhathIntroduction,
  chhathKathaEnglish,
  chhathKathaHindi,
  chhathPlaces,
  chhathPractice,
  chhathSources,
} from '../../data/chhathPuja'
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

export default function ChhathPujaView() {
  const [showMap, setShowMap] = useState(false)
  const centerLat = chhathPlaces.reduce((sum, place) => sum + place.coordinates.lat, 0) / chhathPlaces.length
  const centerLng = chhathPlaces.reduce((sum, place) => sum + place.coordinates.lng, 0) / chhathPlaces.length
  const chhathYear = upcomingChhathYear(kolkataTodayIso())
  const civilDates = chhathDatesForYear(chhathYear)
  const dateSuffix = (dayId: number) => {
    const iso = civilDateForDay(civilDates, dayId)
    return iso ? ` · ${formatChhathDate(iso)}` : ''
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-5xl animate-fadeIn pb-20 sm:pb-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-maroon mb-2">
          {chhathIntroduction.title}
        </h1>
        <p className="text-base sm:text-lg text-ink/70">{chhathIntroduction.titleEnglish}</p>
        <p className="mt-3 text-sm text-ink/60">Kartik Shukla Shashthi · dusk first, then dawn</p>
      </div>

      <div className="folio rounded-xl p-4 sm:p-6 md:p-8 mb-6 animate-scaleIn">
        <p className="font-serif text-ink leading-relaxed whitespace-pre-line">{chhathIntroduction.content}</p>
        <div className="border-t border-gold pt-4 mt-4">
          <p className="text-ink/80 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {chhathIntroduction.contentEnglish}
          </p>
        </div>
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">चार दिन · Four days</h2>
      <p className="text-sm text-ink/60 mb-4">
        {civilDates
          ? `Kartik ${chhathYear} civil dates (India). After this year’s Usha Arghya the next Kartik appears. Confirm sunrise and sunset with a local panchang.`
          : 'Tithi names stay the same every year. Civil dates after 2034 are not listed yet — use a local panchang.'}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {chhathDays.map((day) => (
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
              {dateSuffix(day.id)}
            </div>
            <p className="text-sm text-ink leading-relaxed mb-2">{day.summaryHindi}</p>
            <p className="text-sm text-ink/70 leading-relaxed">{day.summary}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">किन्हें पूजा जाता है · Who is worshipped</h2>
      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {chhathDeities.map((deity) => (
          <div key={deity.name} className="folio rounded-xl p-4">
            <div className="font-serif text-lg text-maroon">{deity.nameHindi}</div>
            <div className="text-xs text-ink/60 mb-2">{deity.name}</div>
            <p className="text-sm text-ink mb-1">{deity.noteHindi}</p>
            <p className="text-sm text-ink/70">{deity.note}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">कथा · The Devasena katha</h2>
      <div className="folio rounded-xl p-4 sm:p-6 mb-8">
        <p className="font-serif text-ink leading-relaxed mb-3">{chhathKathaHindi}</p>
        <p className="text-sm text-ink/70 leading-relaxed">{chhathKathaEnglish}</p>
      </div>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">इतिहास और कथा · History and story</h2>
      <p className="text-sm text-ink/60 mb-4">Three layers get mixed in popular talk. They are not the same kind of evidence.</p>
      <div className="space-y-3 mb-8">
        {chhathHistory.map((item) => (
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
            zoom={8}
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {chhathPlaces.map((place) => (
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
        {chhathPlaces.map((place) => (
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
      <p className="text-sm text-ink/60 mb-8">
        Core home: Bhojpuri–Magahi–Maithili country and Nepal’s Madhesh. The last decades carried the
        ghat to Delhi, Mumbai, and the diaspora. The river still has to be clean for the arghya to
        mean what the songs say.
      </p>

      <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-3">विधि · How the vrat is kept</h2>
      <div className="space-y-3 mb-8">
        <div className="folio rounded-xl p-4 sm:p-5">
          <div className="text-xs uppercase tracking-wide text-maroon/70 mb-1">Soop</div>
          <p className="text-sm text-ink mb-1">{chhathPractice.soopHindi}</p>
          <p className="text-sm text-ink/70">{chhathPractice.soop}</p>
        </div>
        <div className="folio rounded-xl p-4 sm:p-5">
          <div className="text-xs uppercase tracking-wide text-maroon/70 mb-1">Who fasts</div>
          <p className="text-sm text-ink mb-1">{chhathPractice.whoHindi}</p>
          <p className="text-sm text-ink/70">{chhathPractice.who}</p>
        </div>
        <div className="folio rounded-xl p-4 sm:p-5">
          <div className="text-xs uppercase tracking-wide text-maroon/70 mb-1">Care</div>
          <p className="text-sm text-ink mb-1">{chhathPractice.careHindi}</p>
          <p className="text-sm text-ink/70">{chhathPractice.care}</p>
        </div>
      </div>

      <p className="text-xs text-ink/50 leading-relaxed">{chhathSources}</p>
    </div>
  )
}
