import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [apod, setApod] = useState(null); // Store the NASA APOD data (Astronomy Picture of the Day)
  const [marsPhotos, setMarsPhotos] = useState([]); // Store Mars pictures


  useEffect(() => {
    // Fetch APOD data from backend on component load
    axios.get('http://localhost:5000/api/apod')
      .then(response => {
        setApod(response.data);
      })
      .catch(error => {
        console.error('Error fetching apod:', error);
      });
  }, []); // Empty array to	run the effect only once

  useEffect(() => {
    // Fetch Mrs pic data from backend on component load
    axios.get('http://localhost:5000/api/mars')
      .then(response => {
        setMarsPhotos(response.data);
      })
      .catch(error => {
        console.error('Error fetching apod:', error);
      });
  }, []); // Empty array to	run the effect only once

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>NASA Astronomy Picture of the Day</h1>

      {apod && (
        <div>
          <h2>{apod.title}</h2>
          <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          <p>{apod.explanation}</p>
        </div>
      )}

      <h1>Mars Rover Photos (Sol 1000)</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {marsPhotos.slice(0, 10).map((photo) => (
          <div key={photo.id} style={{ width: '300px' }}>
            <img
              src={photo.img_src}
              alt={`Taken by ${photo.rover.name} with ${photo.camera.full_name}`}
              style={{ width: '100%' }}
            />
            <p>
              <strong>Rover:</strong> {photo.rover.name}<br />
              <strong>Camera:</strong> {photo.camera.full_name}<br />
              <strong>Earth Date:</strong> {photo.earth_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;