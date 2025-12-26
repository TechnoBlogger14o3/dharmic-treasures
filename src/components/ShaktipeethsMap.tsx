import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Shaktipeeth } from '../../data/shaktipeeths'

// Fix for default marker icons in React-Leaflet
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

// Approximate coordinates for major locations (can be replaced with actual coordinates from JSON)
const locationCoordinates: Record<string, [number, number]> = {
  // Pakistan
  'Lasbela, Balochistan': [25.5, 65.5],
  'Karachi': [24.8607, 67.0011],
  
  // Bangladesh
  'Shikarpur, Barisal': [22.7, 90.4],
  'Sitakunda': [22.6167, 91.6667],
  'Kalajore, Sylhet': [24.9, 91.9],
  'Bhavanipur': [24.4, 88.6],
  'Ishwaripur': [22.3, 89.1],
  
  // India - Jammu & Kashmir
  'Anantnag': [33.73, 75.15],
  'Srinagar': [34.0837, 74.7973],
  'Lakhia': [34.2, 74.8],
  
  // India - Himachal Pradesh
  'Kangra': [32.1, 76.27],
  
  // India - Punjab
  'Jalandhar': [31.3260, 75.5762],
  
  // India - Haryana
  'Thanesar': [29.97, 76.83],
  
  // India - Rajasthan
  'Pushkar': [26.49, 74.55],
  'Bairat': [27.45, 76.18],
  
  // India - Gujarat
  'Somnath': [20.89, 70.40],
  
  // India - Madhya Pradesh
  'Ujjain': [23.18, 75.78],
  'Amarkantak': [22.67, 81.75],
  'Chitrakoot': [25.2, 80.9],
  
  // India - Uttar Pradesh
  'Prayagraj': [25.44, 81.84],
  'Varanasi': [25.3176, 82.9739],
  'Mathura': [27.4924, 77.6737],
  'Nashik': [19.9975, 73.7898],
  
  // India - Maharashtra
  'Kolhapur': [16.7050, 74.2433],
  
  // India - West Bengal
  'Kolkata': [22.5726, 88.3639],
  'Katwa': [23.65, 88.13],
  'Guskara': [23.5, 87.75],
  'Salbari': [26.72, 88.45],
  'Khanakul': [22.95, 87.78],
  'Kiritkona': [23.75, 87.85],
  'Tamluk': [22.3, 87.92],
  'Labhpur': [23.78, 87.78],
  'Nalhati': [24.3, 87.82],
  'Dubrajpur': [23.8, 87.38],
  'Sainthia': [23.95, 87.67],
  'Khirgram': [23.6, 87.4],
  
  // India - Bihar
  'Gaya': [24.78, 85.0],
  
  // India - Jharkhand
  'Deoghar': [24.48, 86.7],
  
  // India - Odisha
  'Jajpur': [20.85, 86.33],
  
  // India - Assam
  'Guwahati': [26.1445, 91.7362],
  'Sadiya': [27.83, 95.67],
  
  // India - Tamil Nadu
  'Kumari': [8.08, 77.55],
  'Kanchipuram': [12.83, 79.7],
  'Suchindram': [8.15, 77.47],
  
  // India - Andhra Pradesh
  'Srisailam': [16.08, 78.87],
  'Rajahmundry': [17.0, 81.78],
  
  // India - Tripura
  'Udaipur': [23.53, 91.48],
  
  // Nepal
  'Kathmandu': [27.7172, 85.3240],
  'Janakpur': [26.7288, 85.9254],
  'Muktinath': [28.82, 83.87],
  
  // China/Tibet
  'Lake Manasarovar': [30.7, 81.3],
  
  // Sri Lanka
  'Trincomalee': [8.5874, 81.2152],
}

// Get coordinates for a location (approximate)
function getCoordinates(peeth: Shaktipeeth): [number, number] | null {
  // Try exact location match
  if (locationCoordinates[peeth.location]) {
    return locationCoordinates[peeth.location]
  }
  
  // Try state-based approximation
  const stateApprox: Record<string, [number, number]> = {
    'West Bengal': [23.0, 87.5],
    'Uttar Pradesh': [26.5, 80.5],
    'Maharashtra': [19.0, 75.0],
    'Tamil Nadu': [11.0, 78.0],
    'Gujarat': [23.0, 72.0],
    'Rajasthan': [27.0, 74.0],
    'Assam': [26.0, 92.0],
    'Andhra Pradesh': [16.0, 80.0],
    'Madhya Pradesh': [23.0, 77.0],
    'Bihar': [25.0, 85.0],
    'Jharkhand': [23.5, 85.5],
    'Odisha': [20.5, 85.0],
    'Himachal Pradesh': [32.0, 77.0],
    'Punjab': [31.0, 75.0],
    'Haryana': [29.0, 76.0],
    'Jammu & Kashmir': [34.0, 74.5],
    'Tripura': [23.5, 91.5],
    'Ladakh': [34.0, 77.5],
    'Pakistan': [30.0, 70.0],
    'Bangladesh': [23.7, 90.4],
    'Nepal': [28.0, 84.0],
    'China': [30.0, 81.0],
    'Sri Lanka': [7.0, 81.0],
  }
  
  if (stateApprox[peeth.state] || stateApprox[peeth.country]) {
    return stateApprox[peeth.state] || stateApprox[peeth.country] || null
  }
  
  return null
}

interface MapBoundsUpdaterProps {
  bounds: L.LatLngBounds | null
}

function MapBoundsUpdater({ bounds }: MapBoundsUpdaterProps) {
  const map = useMap()
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [bounds, map])
  
  return null
}

interface ShaktipeethsMapProps {
  shaktipeeths: Shaktipeeth[]
  onMarkerClick?: (peeth: Shaktipeeth) => void
}

export default function ShaktipeethsMap({ shaktipeeths, onMarkerClick }: ShaktipeethsMapProps) {
  // Get all valid coordinates
  const markers = shaktipeeths
    .map(peeth => {
      const coords = getCoordinates(peeth)
      return coords ? { peeth, coords } : null
    })
    .filter((m): m is { peeth: Shaktipeeth; coords: [number, number] } => m !== null)
  
  // Calculate bounds
  const bounds = markers.length > 0
    ? L.latLngBounds(markers.map(m => m.coords))
    : null
  
  // Center point (India subcontinent)
  const center: [number, number] = [23.5, 78.0]
  const zoom = markers.length > 0 ? 5 : 4
  
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-300 shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bounds && <MapBoundsUpdater bounds={bounds} />}
        {markers.map(({ peeth, coords }) => (
          <Marker
            key={peeth.id}
            position={coords}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(peeth)
                }
              }
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg text-gray-900 mb-1">#{peeth.id} {peeth.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong> {peeth.location}, {peeth.state}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Body Part:</strong> {peeth.bodyPart}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Shakti:</strong> {peeth.deviName} | <strong>Bhairava:</strong> {peeth.bhairavaName}
                </p>
                {peeth.description && (
                  <p className="text-xs text-gray-500 italic">{peeth.description}</p>
                )}
                {onMarkerClick && (
                  <button
                    onClick={() => onMarkerClick(peeth)}
                    className="mt-2 w-full bg-amber-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-amber-600 transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

