import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { jyotirlingas, jyotirlingaIntroduction, Jyotirlinga } from '../../data/jyotirlingas'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface JyotirlingaModalProps {
  jyotirlinga: Jyotirlinga | null
  onClose: () => void
}

function JyotirlingaModal({ jyotirlinga, onClose }: JyotirlingaModalProps) {
  if (!jyotirlinga) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 pb-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[calc(100vh-6rem)] my-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="pt-4 pr-10">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{jyotirlinga.nameHindi}</h2>
            <p className="text-xl text-white mb-2 drop-shadow-md">{jyotirlinga.name}</p>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-medium drop-shadow-md">{jyotirlinga.location}, {jyotirlinga.state}, {jyotirlinga.country}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <p className="text-xs uppercase text-gray-500 mb-1">Significance</p>
              <p className="text-sm font-bold text-gray-900">{jyotirlinga.significanceHindi}</p>
              <p className="text-xs text-gray-600">{jyotirlinga.significance}</p>
            </div>
            {jyotirlinga.puranicReference && (
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-xs uppercase text-gray-500 mb-1">Puranic Reference</p>
                <p className="text-sm font-bold text-gray-900">{jyotirlinga.puranicReference}</p>
              </div>
            )}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-xs uppercase text-gray-500 mb-1">State</p>
              <p className="text-sm font-bold text-gray-900">{jyotirlinga.state}</p>
            </div>
          </div>

          {/* Legend */}
          {jyotirlinga.legend && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-5 border border-orange-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Legend (कथा)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3 italic">{jyotirlinga.legend}</p>
              {jyotirlinga.legendHindi && (
                <div className="border-t border-orange-200 pt-3 mt-3">
                  <p className="text-gray-700 leading-relaxed">{jyotirlinga.legendHindi}</p>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">{jyotirlinga.description}</p>
          </div>

          {/* Travel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Best Time to Visit
              </h3>
              <p className="text-gray-700">{jyotirlinga.bestTimeToVisit}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-5 border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                How to Reach
              </h3>
              <p className="text-gray-700">{jyotirlinga.howToReach}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JyotirlingasView() {
  const [selectedJyotirlinga, setSelectedJyotirlinga] = useState<Jyotirlinga | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'state'>('id')

  // Sort jyotirlingas
  const sortedJyotirlingas = useMemo(() => {
    return [...jyotirlingas].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'state':
          return a.state.localeCompare(b.state) || a.name.localeCompare(b.name)
        case 'id':
        default:
          return a.id - b.id
      }
    })
  }, [sortBy])

  // Calculate center of map
  const centerLat = jyotirlingas.reduce((sum, j) => sum + (j.coordinates?.lat || 0), 0) / jyotirlingas.length
  const centerLng = jyotirlingas.reduce((sum, j) => sum + (j.coordinates?.lng || 0), 0) / jyotirlingas.length

  return (
    <>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl animate-fadeIn pb-20 sm:pb-8">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            ज्योतिर्लिंग
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4">Jyotirlingas</p>
          <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-lg sm:text-xl shadow-lg">
            Total: 12 Jyotirlingas
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{jyotirlingaIntroduction.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-line">{jyotirlingaIntroduction.content}</p>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <p className="text-gray-600 text-sm font-semibold mb-2">{jyotirlingaIntroduction.titleEnglish}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{jyotirlingaIntroduction.contentEnglish}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'id' | 'name' | 'state')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="state">State</option>
            </select>
          </div>

          {/* Map Toggle */}
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>

        {/* Map */}
        {showMap && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-200 h-96">
            <MapContainer
              center={[centerLat, centerLng]}
              zoom={5}
              style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {jyotirlingas.map((jyotirlinga) => {
                if (!jyotirlinga.coordinates) return null
                return (
                  <Marker key={jyotirlinga.id} position={[jyotirlinga.coordinates.lat, jyotirlinga.coordinates.lng]}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-lg">{jyotirlinga.nameHindi}</h3>
                        <p className="text-sm">{jyotirlinga.name}</p>
                        <p className="text-xs text-gray-600">{jyotirlinga.location}, {jyotirlinga.state}</p>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>
        )}

        {/* Grid of Jyotirlingas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedJyotirlingas.map((jyotirlinga) => (
            <div
              key={jyotirlinga.id}
              onClick={() => setSelectedJyotirlinga(jyotirlinga)}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer animate-fadeIn"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
                      #{jyotirlinga.id}
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-semibold">
                      {jyotirlinga.significance}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{jyotirlinga.nameHindi}</h3>
                  <p className="text-lg text-gray-600 mb-2">{jyotirlinga.name}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{jyotirlinga.location}, {jyotirlinga.state}</span>
                </div>
              </div>

              {jyotirlinga.legend && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 italic">{jyotirlinga.legend.substring(0, 100)}...</p>
              )}
              
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{jyotirlinga.description.substring(0, 120)}...</p>
              
              <button className="mt-2 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors font-medium">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedJyotirlinga && <JyotirlingaModal jyotirlinga={selectedJyotirlinga} onClose={() => setSelectedJyotirlinga(null)} />}
    </>
  )
}
