import './App.css'
import type { Place } from './services/api/Place'
import Map from './components/Map'
import LocationSearch from './components/LocationSearch'
import { useState } from 'react'

function App() {
  const [place, setPlace] = useState<Place | null>(null);

  return (
    <div className='min-h-screen rounded-2xl border-1 border-green-300 bg-gray-100 w-full overflow-x-hidden sm:px-2 md:px-4'>
      <div className='container mx-auto px-4 py-8'>
        <header className='mb-10'>
          <h2 className='text-4xl font-bold text-gray-800 text-center'>
            Location Finder
          </h2>
          <p className='text-center mt-2 text-gray-600'>Find and explore locations worldwide</p>
        </header>

        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Search Panel */}
            <div className='lg:col-span-3'>
              <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'>
                <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Search Location</h2>
                <LocationSearch onPlaceClick={(p) => setPlace(p)} />
                {place && (
                  <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100'>
                    <h3 className='font-medium text-blue-900 mb-2'>Selected Location:</h3>
                    <p className='text-blue-800'>{place.name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map Panel */}
            <div className='lg:col-span-9'>
              <div className='bg-white rounded-xl shadow-lg p-4 h-[600px] hover:shadow-xl transition-shadow duration-300'>
                <Map place={place} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
