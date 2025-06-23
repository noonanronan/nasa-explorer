import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Mars() {
  const [marsPhotos, setMarsPhotos] = useState([]); // Stores Mars rover images returned from the API
  const [searchTerm, setSearchTerm] = useState('');  // Stores the search input for filtering by camera name

  // Fetch Mars Rover photos
  useEffect(() => {
    const fetchMars = async () => {
      const response = await axios.get('http://localhost:5000/api/mars');
      setMarsPhotos(response.data);
    };
    fetchMars();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Mars Rover Photos (Sol 1000)</h1>

      {/* Input box for filtering photos by camera name */}
      <input
        type="text"
        placeholder="Search by camera name (eg. MAST, FHAZ, RHAZ...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      {/* Display filtered images */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {marsPhotos
          .filter(photo => photo.camera.name.includes(searchTerm))
          .slice(0, 10) // Show only the first 10 images
          .map(photo => (
            <div key={photo.id} style={{ width: '300px' }}>
              <img src={photo.img_src} alt={photo.camera.full_name} style={{ width: '100%' }} />
              <p>
                <strong>Camera:</strong> {photo.camera.full_name}<br />
                <strong>Date:</strong> {photo.earth_date}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Mars;
