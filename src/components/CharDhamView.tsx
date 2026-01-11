import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { charDham, charDhamIntroduction, CharDham } from '../../data/charDham'
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

interface CharDhamModalProps {
  dham: CharDham | null
  onClose: () => void
}

function CharDhamModal({ dham, onClose }: CharDhamModalProps) {
  if (!dham) return null

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
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="pt-4 pr-10">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{dham.nameHindi}</h2>
            <p className="text-xl text-white mb-2 drop-shadow-md">{dham.name}</p>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-medium drop-shadow-md">{dham.location}, {dham.state}, {dham.country}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs uppercase text-gray-500 mb-1">Deity</p>
              <p className="text-sm font-bold text-gray-900">{dham.deityHindi}</p>
              <p className="text-xs text-gray-600">{dham.deity}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-xs uppercase text-gray-500 mb-1">Significance</p>
              <p className="text-sm font-bold text-gray-900">{dham.significanceHindi}</p>
            </div>
            {dham.altitude && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-xs uppercase text-gray-500 mb-1">Altitude</p>
                <p className="text-sm font-bold text-gray-900">{dham.altitude}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">{dham.description}</p>
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
              <p className="text-gray-700">{dham.bestTimeToVisit}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-5 border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                How to Reach
              </h3>
              <p className="text-gray-700">{dham.howToReach}</p>
            </div>
          </div>

          {dham.puranicReference && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-5 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Puranic Reference
              </h3>
              <p className="text-gray-700">{dham.puranicReference}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CharDhamView() {
  const [selectedDham, setSelectedDham] = useState<CharDham | null>(null)
  const [showMap, setShowMap] = useState(false)

  // Calculate center of map (average of all coordinates)
  const centerLat = charDham.reduce((sum, d) => sum + (d.coordinates?.lat || 0), 0) / charDham.length
  const centerLng = charDham.reduce((sum, d) => sum + (d.coordinates?.lng || 0), 0) / charDham.length

  return (
    <>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl animate-fadeIn pb-20 sm:pb-8">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            चार धाम
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4">Char Dham</p>
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-lg sm:text-xl shadow-lg">
            Total: 4 Dhams
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{charDhamIntroduction.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-line">{charDhamIntroduction.content}</p>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <p className="text-gray-600 text-sm font-semibold mb-2">{charDhamIntroduction.titleEnglish}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{charDhamIntroduction.contentEnglish}</p>
          </div>
        </div>

        {/* Map Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
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
              {charDham.map((dham) => {
                if (!dham.coordinates) return null
                return (
                  <Marker key={dham.id} position={[dham.coordinates.lat, dham.coordinates.lng]}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-lg">{dham.nameHindi}</h3>
                        <p className="text-sm">{dham.name}</p>
                        <p className="text-xs text-gray-600">{dham.location}, {dham.state}</p>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>
        )}

        {/* Grid of Char Dhams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {charDham.map((dham) => (
            <div
              key={dham.id}
              onClick={() => setSelectedDham(dham)}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer animate-fadeIn"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
                      #{dham.id}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      {dham.significance}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{dham.nameHindi}</h3>
                  <p className="text-lg text-gray-600 mb-2">{dham.name}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{dham.location}, {dham.state}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.384l3-1.5a1 1 0 00.788 0l2 1a1 1 0 001.11 0l1-.5a.999.999 0 01.622-.122l4.5 1.714a1 1 0 00.836-.636l1-3a1 1 0 00-.08-1.05l-7-4.5z" />
                  </svg>
                  <span className="text-sm font-semibold">{dham.deityHindi}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">{dham.description.substring(0, 150)}...</p>
              
              <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedDham && <CharDhamModal dham={selectedDham} onClose={() => setSelectedDham(null)} />}
    </>
  )
}
