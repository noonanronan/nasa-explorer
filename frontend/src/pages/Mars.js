import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Mars() {
  const [marsPhotos, setMarsPhotos] = useState([]); // Stores Mars rover images returned from the API
  const [sol, setSol] = useState(1000); // Selected Martian sol (day)
  const [camera, setCamera] = useState(''); // Selected camera filter
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // List of valid camera options
  const cameras = [
    '', 'FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'
  ];

  // Fetch Mars Rover photos
  useEffect(() => {
    const fetchMars = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/mars?sol=${sol}`);
        setMarsPhotos(response.data);
      } catch (err) {
        setError('Failed to fetch Mars photos.');
      } finally {
        setLoading(false);
      }
    };
    fetchMars();
  }, [sol]);

  // Filter photos based on camera selection
  const filteredPhotos = camera
    ? marsPhotos.filter(photo => photo.camera.name === camera)
    : marsPhotos;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>
        Mars Rover Photos (
        <abbr 
          title="A 'Sol' is a Martian day, roughly 24 hours and 39 minutes" 
          style={{ textDecoration: 'none', cursor: 'help' }}
        >
          Sol
        </abbr>{' '}
        {sol})
      </h1>


      {/* Error and loading messages */}
      {loading && <p>Loading photos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Sol selector */}
      <label style={{ marginRight: '1rem' }}>
        <strong>Sol:</strong>
        <input
          type="number"
          value={sol}
          onChange={(e) => setSol(e.target.value)}
          style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
        />
      </label>

      {/* Camera selector dropdown */}
      <label>
        <strong>Camera:</strong>
        <select
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
        >
          {cameras.map(cam => (
            <option key={cam} value={cam}>{cam || 'All'}</option>
          ))}
        </select>
      </label>

      {/* Display filtered photos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {filteredPhotos.slice(0, 10).map(photo => (
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
