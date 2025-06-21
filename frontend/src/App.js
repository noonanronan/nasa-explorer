import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [apod, setApod] = useState(null); // Store the NASA APOD data (Astronomy Picture of the Day)
  const [marsPhotos, setMarsPhotos] = useState([]); // Store Mars pictures
  const [epicPhotos, setEpicPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [apodResponse, marsResponse, epicResponse] = await Promise.all([
        // Fetch APOD & Mars data from backend on component load
        axios.get('http://localhost:5000/api/apod'),
        axios.get('http://localhost:5000/api/mars'),
        axios.get('http://localhost:5000/api/epic'),
      ]);
      setApod(apodResponse.data);
      setMarsPhotos(marsResponse.data);
      setEpicPhotos(epicResponse.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again later.');
      setLoading(false);
    }
  };

  fetchData();
}, []); // Empty array to	run the effect only once


  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h1>NASA Astronomy Picture of the Day</h1>

      {apod && (
        <div>
          <h2>{apod.title}</h2>
          <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          <p>{apod.explanation}</p>
        </div>
      )}

      <h1>Mars Rover Photos (Sol 1000)</h1>
      {/* Only 10 photos */}
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

      <h1>EPIC Earth Images</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {epicPhotos.slice(0, 10).map((photo) => {
          const dateParts = photo.date.split(" ")[0].split("-");
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/png/${photo.image}.png`;

          return (
            <div key={photo.identifier} style={{ width: '300px' }}>
              <img
                src={imageUrl}
                alt={photo.caption}
                style={{ width: '100%' }}
              />
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

export default App;