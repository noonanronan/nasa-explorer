import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EPIC() {
  const [epicPhotos, setEpicPhotos] = useState([]); // Stores EPIC Earth images from NASA
  const [searchTerm, setSearchTerm] = useState(''); // Stores the user's search input

  // Fetch EPIC data when the component loads
  useEffect(() => {
    const fetchEPIC = async () => {
      const response = await axios.get('http://localhost:5000/api/epic');
      setEpicPhotos(response.data); // Save the photos in state
    };
    fetchEPIC();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>EPIC Earth Images</h1>
      
      {/* Search input for filtering by time */}
      <input
        type="text"
        placeholder="Search EPIC images by time (eg. 00:13:03)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

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
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default EPIC;
