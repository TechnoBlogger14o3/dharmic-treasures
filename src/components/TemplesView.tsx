import { useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { templeIntroduction, temples, templesGrouped, type NumberedTemple } from '../../data/temples'
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

const ALSO_LABEL: Record<NonNullable<NumberedTemple['also']>, string> = {
  jyotirlinga: 'Also a Jyotirlinga',
  'char-dham': 'Also Char Dham',
  shaktipeeth: 'Also a Shaktipeeth',
}

function TempleModal({ temple, onClose }: { temple: NumberedTemple; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 pb-4 bg-ink/40 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="folio rounded-2xl max-w-3xl w-full max-h-[calc(100vh-6rem)] my-auto animate-scaleIn overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-saffron text-cream p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-saffron-dark"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="pr-10">
            <div className="text-xs uppercase tracking-wide text-cream/80 mb-1">
              {temple.stateHindi} · {temple.state}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-1">{temple.nameHindi}</h2>
            <p className="text-lg text-cream/90">{temple.name}</p>
            <p className="text-sm mt-2 text-cream/80">
              {temple.location} · {temple.deityHindi} / {temple.deity}
            </p>
          </div>
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-full border border-gold bg-saffron-light text-maroon">{temple.tradition}</span>
            {temple.also ? (
              <span className="px-2 py-1 rounded-full border border-gold/70 text-ink/70">{ALSO_LABEL[temple.also]}</span>
            ) : null}
          </div>
          <div>
            <h3 className="font-serif text-maroon text-lg mb-2">कथा · Katha</h3>
            <p className="text-ink leading-relaxed mb-2">{temple.kathaHindi}</p>
            <p className="text-ink/70 text-sm leading-relaxed">{temple.katha}</p>
          </div>
          <div className="border-t border-gold pt-4">
            <h3 className="font-serif text-maroon text-lg mb-2">इतिहास · History</h3>
            <p className="text-ink leading-relaxed mb-2">{temple.historyHindi}</p>
            <p className="text-ink/70 text-sm leading-relaxed">{temple.history}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TemplesView() {
  const grouped = useMemo(() => templesGrouped(), [])
  const [stateFilter, setStateFilter] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [selected, setSelected] = useState<NumberedTemple | null>(null)

  const filteredGroups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return grouped
      .filter((group) => stateFilter === 'all' || group.state === stateFilter)
      .map((group) => ({
        ...group,
        temples: needle
          ? group.temples.filter((temple) =>
              `${temple.name} ${temple.nameHindi} ${temple.deity} ${temple.location} ${temple.state}`
                .toLowerCase()
                .includes(needle),
            )
          : group.temples,
      }))
      .filter((group) => group.temples.length > 0)
  }, [grouped, query, stateFilter])

  const visible = filteredGroups.flatMap((group) => group.temples)
  const centerLat = visible.reduce((sum, temple) => sum + temple.coordinates.lat, 0) / (visible.length || 1)
  const centerLng = visible.reduce((sum, temple) => sum + temple.coordinates.lng, 0) / (visible.length || 1)

  return (
    <>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-6xl animate-fadeIn pb-20 sm:pb-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-maroon mb-2">
            {templeIntroduction.title}
          </h1>
          <p className="text-base sm:text-lg text-ink/70">{templeIntroduction.titleEnglish}</p>
          <p className="mt-3 inline-block bg-saffron text-white px-4 py-2 rounded-lg font-medium">
            {temples.length} temples · {grouped.length} states and union territories
          </p>
        </div>

        <div className="folio rounded-xl p-4 sm:p-6 mb-6">
          <p className="font-serif text-ink leading-relaxed whitespace-pre-line">{templeIntroduction.content}</p>
          <div className="border-t border-gold pt-4 mt-4">
            <p className="text-ink/80 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {templeIntroduction.contentEnglish}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search temple, deity, or town..."
            className="flex-1 px-3 py-2.5 rounded-lg border border-gold bg-cream min-h-[44px] focus:outline-none focus:ring-2 focus:ring-saffron"
          />
          <button
            type="button"
            onClick={() => setShowMap((open) => !open)}
            className="px-4 py-2.5 bg-saffron text-white rounded-lg hover:bg-saffron-dark font-medium min-h-[44px]"
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-hide mb-6 -mx-3 px-3">
          <div className="flex gap-2 min-w-min pb-1">
            <button
              type="button"
              onClick={() => setStateFilter('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full border text-sm min-h-[36px] ${
                stateFilter === 'all' ? 'bg-saffron text-cream border-gold' : 'bg-cream border-gold/60 text-ink'
              }`}
            >
              All
            </button>
            {grouped.map((group) => (
              <button
                key={group.state}
                type="button"
                onClick={() => setStateFilter(group.state)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full border text-sm min-h-[36px] whitespace-nowrap ${
                  stateFilter === group.state ? 'bg-saffron text-cream border-gold' : 'bg-cream border-gold/60 text-ink'
                }`}
              >
                {group.stateHindi}
                <span className="ml-1 opacity-70">({group.temples.length})</span>
              </button>
            ))}
          </div>
        </div>

        {showMap && visible.length > 0 ? (
          <div className="folio rounded-xl p-4 mb-6 h-96">
            <MapContainer
              key={`${stateFilter}-${visible.length}`}
              center={[centerLat, centerLng]}
              zoom={stateFilter === 'all' ? 5 : 7}
              style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {visible.map((temple) => (
                <Marker key={temple.id} position={[temple.coordinates.lat, temple.coordinates.lng]}>
                  <Popup>
                    <div className="text-center">
                      <div className="font-serif font-bold">{temple.nameHindi}</div>
                      <div className="text-sm">{temple.name}</div>
                      <div className="text-xs text-ink/60">{temple.location}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : null}

        {filteredGroups.map((group) => (
          <section key={group.state} className="mb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon mb-1">
              {group.stateHindi}
              <span className="text-base font-sans font-normal text-ink/60 ml-2">{group.state}</span>
            </h2>
            <p className="text-xs text-ink/50 mb-3">
              {group.temples.length} {group.temples.length === 1 ? 'temple' : 'temples'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.temples.map((temple) => (
                <button
                  key={temple.id}
                  type="button"
                  onClick={() => setSelected(temple)}
                  className="folio lotus-corner rounded-xl p-4 sm:p-5 text-left hover:shadow-xl transition-all touch-manipulation"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-maroon">{temple.nameHindi}</h3>
                      <p className="text-sm text-ink/70">{temple.name}</p>
                    </div>
                    <span className="text-[11px] uppercase tracking-wide text-saffron-dark flex-shrink-0">
                      {temple.tradition}
                    </span>
                  </div>
                  <p className="text-xs text-ink/60 mb-2">
                    {temple.location} · {temple.deityHindi}
                  </p>
                  <p className="text-sm text-ink line-clamp-2">{temple.historyHindi}</p>
                </button>
              ))}
            </div>
          </section>
        ))}

        {visible.length === 0 ? (
          <p className="text-center text-ink/60 py-12">No temple matches that search.</p>
        ) : null}
      </div>
      {selected ? <TempleModal temple={selected} onClose={() => setSelected(null)} /> : null}
    </>
  )
}
