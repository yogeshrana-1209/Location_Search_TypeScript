import type { Place } from '../services/api/Place';
import { useState, Fragment } from 'react';
import search from '../services/api/search';

interface LocationSearchProps {
    onPlaceClick: (place: Place) => void;
}

const LocationSearch = ({ onPlaceClick }: LocationSearchProps) => {

    const [places, setPlaces] = useState<Place[]>([]);
    const [term, setTerm] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        // Validation for empty input
        if (!term.trim()) {
            setError('Please enter a location to search');
            return;
        }

        // API call to get places based on the term
        const results = await search(term);
        setPlaces(results);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className='font-bold' htmlFor='term'>
                    Search
                </label>
                <input
                    className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md text-black shadow-sm focus:border-indigo-500 px-4 py-2 w-full`}
                    id='term'
                    value={term}
                    onChange={e => {
                        setTerm(e.target.value);
                        setError(''); // Clear error when user starts typing
                    }}
                    placeholder="Enter location"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                <button
                    type="submit"
                    className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-600"
                >
                    Search
                </button>
            </form>
            <h4 className='font-bold mt-6'>Found Locations</h4>
            <div className='grid grid-cols-[1fr_40px] gap-2 mt-2 items-center'>
                {places.map(place => (
                    <Fragment key={place.id}>
                        <p className='text-sm text-black'>{place.name}</p>
                        <button
                            className='bg-gradient-to-r from-blue-500 to-indigo-500 text-xs text-white font-bold py-1 px-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-600 h-8 w-12 flex items-center justify-center'
                            onClick={() => onPlaceClick(place)}
                        >
                            Go
                        </button>
                        <div className='border-b w-full col-span-2' />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default LocationSearch;
