import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EPIC() {
  const [epicPhotos, setEpicPhotos] = useState([]); // Stores EPIC Earth images from NASA
  const [searchTerm, setSearchTerm] = useState(''); // Stores the user's search input
  const [selectedDate, setSelectedDate] = useState(''); // Date selected by user to fetch images for
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch EPIC data when the component loads or when the selectedDate changes
  useEffect(() => {
    const fetchEPIC = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = selectedDate
          ? `${process.env.REACT_APP_API_URL}/api/epic?date=${selectedDate}`
          : `${process.env.REACT_APP_API_URL}/api/epic`;
        const response = await axios.get(endpoint);
        setEpicPhotos(response.data); // Save the photos in state
      } catch (err) {
        setError('Failed to fetch EPIC images.');
      } finally {
        setLoading(false);
      }
    };
    fetchEPIC();
  }, [selectedDate]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>EPIC Earth Images</h1>

      {/* Date selector to fetch EPIC images for a specific date */}
      <label style={{ display: 'block', marginBottom: '1rem' }}>
        <strong>Select a date (YYYY-MM-DD):</strong>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ marginLeft: '1rem', padding: '0.3rem' }}
        />
      </label>

      {/* Search input for filtering by time */}
      <input
        type="text"
        placeholder="Search EPIC images by time (eg. 00:13:03)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      {/* Show loading or error messages */}
      {loading && <p>Loading images...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display a list of filtered EPIC images */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {epicPhotos
          .filter(photo => photo.date.split(' ')[1].includes(searchTerm)) // Filter by time
          .slice(0, 10) // Show only the first 10 results
          .map(photo => {
            // Build the image URL based on the photo's date
            const dateParts = photo.date.split(" ")[0].split("-");
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/png/${photo.image}.png`;

            return (
              <div key={photo.identifier} style={{ width: '300px' }}>
                <img src={imageUrl} alt={photo.caption} style={{ width: '100%' }} />
                <p>
                  <strong>Caption:</strong> {photo.caption}<br />
                  <strong>Date:</strong> {photo.date}
                </p>
                {/* Download image button */}
                <a href={imageUrl} download target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
                  Download Image
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default EPIC;
