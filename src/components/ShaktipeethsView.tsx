import { useState, useMemo } from 'react'
import { shaktipeethIntroduction, shaktipeethCountByState, shaktipeeths, Shaktipeeth } from '../../data/shaktipeeths'
import ShaktipeethsMap from './ShaktipeethsMap'

interface ShaktipeethModalProps {
  peeth: Shaktipeeth | null
  onClose: () => void
}

function ShaktipeethModal({ peeth, onClose }: ShaktipeethModalProps) {
  if (!peeth) return null

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
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Top Left - ID and Puranic Reference */}
          <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
            <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg border-2 border-white">
              <span className="text-amber-600 font-bold text-lg">#{peeth.id}</span>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/30">
              <p className="text-white text-xs font-bold uppercase tracking-wide">{peeth.puranicReference}</p>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="pt-16 pr-10">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{peeth.name}</h2>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-medium drop-shadow-md">{peeth.location}, {peeth.state}, {peeth.country}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-xs uppercase text-gray-500 mb-1">Body Part</p>
              <p className="text-sm font-bold text-gray-900">{peeth.bodyPart}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-xs uppercase text-gray-500 mb-1">Shakti</p>
              <p className="text-sm font-bold text-gray-900">{peeth.deviName}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs uppercase text-gray-500 mb-1">Bhairava</p>
              <p className="text-sm font-bold text-gray-900">{peeth.bhairavaName}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-xs uppercase text-gray-500 mb-1">Country</p>
              <p className="text-sm font-bold text-gray-900">{peeth.country}</p>
            </div>
          </div>

          {/* Description */}
          {peeth.description && (
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Overview
              </h3>
              <p className="text-gray-700 leading-relaxed italic">{peeth.description}</p>
            </div>
          )}

          {/* Historical Significance */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Historical Significance
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                The {peeth.name} Shaktipeeth holds immense historical importance as one of the 51 sacred sites where parts of Goddess Sati's body fell. According to the <span className="font-semibold">{peeth.puranicReference}</span>, this site marks where the <span className="font-semibold">{peeth.bodyPart}</span> of the Goddess descended.
              </p>
              <p className="leading-relaxed">
                This ancient pilgrimage site has been revered for centuries, with references found in various Puranas and ancient texts. The temple complex and surrounding area bear witness to the rich cultural and religious heritage of the region.
              </p>
            </div>
          </div>

          {/* Spiritual Importance */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Spiritual Importance
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                The {peeth.name} Shaktipeeth is dedicated to <span className="font-semibold">{peeth.deviName}</span>, a powerful manifestation of the Divine Mother. The presence of <span className="font-semibold">{peeth.bhairavaName}</span> as the Bhairava represents the protective and transformative aspect of Lord Shiva.
              </p>
              <p className="leading-relaxed">
                Devotees believe that visiting this sacred site and offering prayers can help in:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Attaining spiritual liberation (Moksha)</li>
                <li>Receiving divine blessings and protection</li>
                <li>Fulfilling desires and overcoming obstacles</li>
                <li>Gaining inner strength and wisdom</li>
                <li>Connecting with the divine feminine energy (Shakti)</li>
              </ul>
            </div>
          </div>

          {/* Pilgrimage Information */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pilgrimage Information
            </h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold mb-1">Location:</p>
                <p className="leading-relaxed">{peeth.location}, {peeth.state}, {peeth.country}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Best Time to Visit:</p>
                <p className="leading-relaxed">The temple is open throughout the year, but the most auspicious times are during Navratri, Maha Shivaratri, and other major Hindu festivals. Early morning and evening hours are considered particularly sacred for darshan.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How to Reach:</p>
                <p className="leading-relaxed">The site is accessible by road. The nearest major city or town provides good connectivity. Local transportation and guided tours are available for pilgrims.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Accommodation:</p>
                <p className="leading-relaxed">Various accommodation options are available near the temple, ranging from budget guesthouses to more comfortable hotels. Many devotees also prefer staying in dharamshalas (pilgrim rest houses) for a more traditional experience.</p>
              </div>
            </div>
          </div>

          {/* Related Stories & Legends */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Related Stories & Legends
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                According to the legend of Shaktipeeths, when Lord Shiva was performing the Tandava dance while carrying the body of Goddess Sati, Lord Vishnu used his Sudarshan Chakra to cut her body into 51 pieces. The <span className="font-semibold">{peeth.bodyPart}</span> fell at the location where {peeth.name} now stands.
              </p>
              <p className="leading-relaxed">
                The {peeth.puranicReference} describes this site as a place where the divine energy of the Goddess is particularly strong. Many devotees have reported experiencing profound spiritual transformations and miracles after visiting this sacred site.
              </p>
              <p className="leading-relaxed">
                Local legends speak of the temple's power to grant wishes and provide protection to those who visit with pure devotion. The presence of both the Shakti ({peeth.deviName}) and Bhairava ({peeth.bhairavaName}) creates a powerful spiritual vortex that attracts seekers from all over the world.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
     
     
     
     
     
     
     
     
      </div>
    </div>
  )
}

type SortOption = 'name' | 'state' | 'country' | 'id'
type ViewMode = 'grid' | 'list'

export default function ShaktipeethsView() {
  const totalCount = shaktipeeths.length
  const [selectedPeeth, setSelectedPeeth] = useState<Shaktipeeth | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('id')
  const [filters, setFilters] = useState<{
    state: string | null
    country: string | null
    bodyPart: string | null
  }>({
    state: null,
    country: null,
    bodyPart: null,
  })

  // Get unique values for filters
  const uniqueStates = useMemo(() => [...new Set(shaktipeeths.map(p => p.state))].sort(), [])
  const uniqueCountries = useMemo(() => [...new Set(shaktipeeths.map(p => p.country))].sort(), [])
  const uniqueBodyParts = useMemo(() => [...new Set(shaktipeeths.map(p => p.bodyPart))].sort(), [])

  // Filter and sort data
  const filteredAndSorted = useMemo(() => {
    let filtered = shaktipeeths.filter(peeth => {
      if (filters.state && peeth.state !== filters.state) return false
      if (filters.country && peeth.country !== filters.country) return false
      if (filters.bodyPart && peeth.bodyPart !== filters.bodyPart) return false
      return true
    })

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'state':
          return a.state.localeCompare(b.state) || a.name.localeCompare(b.name)
        case 'country':
          return a.country.localeCompare(b.country) || a.name.localeCompare(b.name)
        case 'id':
        default:
          return a.id - b.id
      }
    })

    return filtered
  }, [filters, sortBy])

  // Statistics
  const bodyPartStats = useMemo(() => {
    const stats = filteredAndSorted.reduce((acc, peeth) => {
      acc[peeth.bodyPart] = (acc[peeth.bodyPart] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return Object.entries(stats)
      .map(([bodyPart, count]) => ({ bodyPart, count }))
      .sort((a, b) => b.count - a.count)
  }, [filteredAndSorted])

  const countryStats = useMemo(() => {
    const stats = filteredAndSorted.reduce((acc, peeth) => {
      acc[peeth.country] = (acc[peeth.country] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return Object.entries(stats)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
  }, [filteredAndSorted])

  const maxBodyPartCount = Math.max(...bodyPartStats.map(s => s.count), 1)
  const maxCountryCount = Math.max(...countryStats.map(s => s.count), 1)

  const toggleFilter = (type: 'state' | 'country' | 'bodyPart', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }))
  }

  const clearAllFilters = () => {
    setFilters({ state: null, country: null, bodyPart: null })
  }

  const hasActiveFilters = filters.state || filters.country || filters.bodyPart

  return (
    <>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl animate-fadeIn pb-20 sm:pb-8">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            शक्तिपीठ
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4">Shaktipeeths</p>
          <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-lg sm:text-xl shadow-lg">
            Total: {totalCount} Shaktipeeths {hasActiveFilters && `(${filteredAndSorted.length} filtered)`}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200 mb-6 sm:mb-8 animate-scaleIn">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-4 text-center">
            {shaktipeethIntroduction.titleEnglish}
          </h2>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 text-center">
            {shaktipeethIntroduction.title}
          </h3>
          <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="whitespace-pre-line">{shaktipeethIntroduction.content}</div>
            <div className="border-t pt-4 mt-4">
              <div className="whitespace-pre-line text-gray-600">{shaktipeethIntroduction.contentEnglish}</div>
            </div>
          </div>
        </div>

        {/* Statistics and Visualizations */}
        <div className="space-y-6 mb-6 sm:mb-8">
          {/* Body Part Distribution Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              Body Part Distribution | शरीर के अंग वितरण
            </h2>
            <div className="space-y-3">
              {bodyPartStats.slice(0, 10).map((stat) => (
                <div key={stat.bodyPart} className="flex items-center gap-3">
                  <div className="w-32 sm:w-40 text-sm font-medium text-gray-700 truncate">
                    {stat.bodyPart}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${(stat.count / maxBodyPartCount) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{stat.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Country Breakdown Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              Country Breakdown | देश-वार वितरण
            </h2>
            <div className="space-y-3">
              {countryStats.map((stat) => (
                <div key={stat.country} className="flex items-center gap-3">
                  <div className="w-32 sm:w-40 text-sm font-medium text-gray-700">
                    {stat.country}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${(stat.count / maxCountryCount) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{stat.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map Visualization */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              Interactive Map | इंटरैक्टिव मानचित्र
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Click on markers to view details. Map shows approximate locations of all Shaktipeeths.
            </p>
            <ShaktipeethsMap 
              shaktipeeths={filteredAndSorted} 
              onMarkerClick={setSelectedPeeth}
            />
          </div>

          {/* State-wise Distribution Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              State-wise Distribution | राज्य-वार वितरण
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {shaktipeethCountByState.map((state) => {
                const intensity = Math.min(state.count / 10, 1) // Normalize to 0-1
                return (
                  <div
                    key={state.stateCountry}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border-2 border-amber-300 hover:shadow-lg transition-all cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, rgba(251, 191, 36, ${0.3 + intensity * 0.7}), rgba(249, 115, 22, ${0.3 + intensity * 0.7}))`,
                      borderColor: `rgba(251, 191, 36, ${0.5 + intensity * 0.5})`
                    }}
                    onClick={() => toggleFilter('state', state.state)}
                  >
                    <div className="text-center">
                      <div className="font-bold text-gray-800 text-sm mb-1">{state.state}</div>
                      <div className="text-xs text-gray-600 mb-2">{state.country}</div>
                      <div className="bg-white/80 rounded-full w-10 h-10 flex items-center justify-center mx-auto font-bold text-amber-700">
                        {state.count}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              All Shaktipeeths | सभी 51 शक्तिपीठ
            </h2>
            <div className="flex flex-wrap gap-3 items-center">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="id">Sort by ID</option>
                <option value="name">Sort by Name (A-Z)</option>
                <option value="state">Sort by State</option>
                <option value="country">Sort by Country</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="space-y-4">
            {/* State Filters */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Filter by State:</p>
              <div className="flex flex-wrap gap-2">
                {uniqueStates.map(state => (
                  <button
                    key={state}
                    onClick={() => toggleFilter('state', state)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      filters.state === state
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Filters */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Filter by Country:</p>
              <div className="flex flex-wrap gap-2">
                {uniqueCountries.map(country => (
                  <button
                    key={country}
                    onClick={() => toggleFilter('country', country)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      filters.country === country
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Part Filters */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Filter by Body Part:</p>
              <div className="flex flex-wrap gap-2">
                {uniqueBodyParts.slice(0, 15).map(bodyPart => (
                  <button
                    key={bodyPart}
                    onClick={() => toggleFilter('bodyPart', bodyPart)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      filters.bodyPart === bodyPart
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {bodyPart}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Shaktipeeths List/Grid */}
        <div className="mb-6 sm:mb-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredAndSorted.map((peeth, index) => (
                <div
                  key={peeth.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  {/* Card content - same as before */}
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 sm:p-5 relative">
                    <div className="absolute top-3 right-3">
                      <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                        {peeth.puranicReference}
                      </p>
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className="bg-orange-400 border border-orange-500 rounded-lg px-2 py-1">
                        <span className="text-white font-bold text-sm">#{peeth.id}</span>
                      </div>
                    </div>
                    <div className="pt-8 pb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {peeth.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-800 font-medium">
                        {peeth.location}, {peeth.state}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 sm:p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
                            BODY PART
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {peeth.bodyPart}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
                            BHAIRAVA
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {peeth.bhairavaName}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
                            DEVI FORM
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {peeth.deviName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
                            COUNTRY
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {peeth.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 sm:px-5 pb-4 sm:pb-5">
                    {peeth.description && (
                      <p className="text-sm text-gray-500 italic mb-4">
                        {peeth.description}
                      </p>
                    )}
                    <button
                      onClick={() => setSelectedPeeth(peeth)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Discover Spiritual Significance</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSorted.map((peeth, index) => (
                <div
                  key={peeth.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn p-4 sm:p-6"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-orange-400 border border-orange-500 rounded-lg px-3 py-1 inline-block">
                        <span className="text-white font-bold">#{peeth.id}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{peeth.name}</h3>
                        <p className="text-xs uppercase text-gray-400">{peeth.puranicReference}</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs uppercase text-gray-500 mb-1">Location</p>
                          <p className="text-sm font-semibold text-gray-800">{peeth.location}, {peeth.state}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-500 mb-1">Body Part</p>
                          <p className="text-sm font-semibold text-gray-800">{peeth.bodyPart}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-500 mb-1">Shakti</p>
                          <p className="text-sm font-semibold text-gray-800">{peeth.deviName}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-500 mb-1">Bhairava</p>
                          <p className="text-sm font-semibold text-gray-800">{peeth.bhairavaName}</p>
                        </div>
                      </div>
                      {peeth.description && (
                        <p className="text-sm text-gray-600 italic mb-3">{peeth.description}</p>
                      )}
                      <button
                        onClick={() => setSelectedPeeth(peeth)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Discover Spiritual Significance</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ShaktipeethModal peeth={selectedPeeth} onClose={() => setSelectedPeeth(null)} />
    </>
  )
}
