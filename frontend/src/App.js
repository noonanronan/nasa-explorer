import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


function App() {
  const [apod, setApod] = useState(null); // Store the NASA APOD data (Astronomy Picture of the Day)
  const [marsPhotos, setMarsPhotos] = useState([]); // Store Mars pictures
  const [epicPhotos, setEpicPhotos] = useState([]); // Epic Camera photos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search for Mars
  const [neoData, setNeoData] = useState([]);



  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [apodResponse, marsResponse, epicResponse, neoResponse] = await Promise.all([
        // Fetch APOD & Mars data from backend on component load
        axios.get('http://localhost:5000/api/apod'),
        axios.get('http://localhost:5000/api/mars'),
        axios.get('http://localhost:5000/api/epic'),
        axios.get('http://localhost:5000/api/neo'),
      ]);
      setApod(apodResponse.data);
      setMarsPhotos(marsResponse.data);
      setEpicPhotos(epicResponse.data);
      setNeoData(neoResponse.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again later.');
      setLoading(false);
    }
  };

  fetchData();
}, []); // Empty array to	run the effect only once

// Flatten NEO data (NASA groups by date)
const neoChartData = Object.values(neoData).flat().slice(0, 10).map((asteroid) => ({
  name: asteroid.name,
  diameter: (asteroid.estimated_diameter.meters.estimated_diameter_max / 1000).toFixed(3), // Using km to visualize 
}));

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

      <input
        type="text"
        placeholder="Search by camera name (eg. MAST,FHAZ...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      {/* Only 10 photos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {marsPhotos
          .filter(photo => photo.camera.name.includes(searchTerm))
          .slice(0, 10)
          .map((photo) => (
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

      <input
        type="text"
        placeholder="Search EPIC images by time (eg. 00:13:03)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {epicPhotos
          .filter(photo => {
            const time = photo.date.split(' ')[1]; // get "HH:MM:SS"
            return time.includes(searchTerm);
          })
          .slice(0, 10)
          .map((photo) => {

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

      <h1>Near Earth Objects</h1>
      <p>Showing estimated max diameters in meters of 10 asteroids near earth</p>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={neoChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Diameter (km)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="diameter" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default App;