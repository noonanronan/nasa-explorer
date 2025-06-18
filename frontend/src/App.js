import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [apod, setApod] = useState(null); // Store the NASA APOD data (Astronomy Picture of the Day)


  useEffect(() => {
    // Fetch APOD data from backend on component load
    axios.get('http://localhost:5000/api/apod')
      .then(response => {
        setApod(response.data);
      })
      .catch(error => {
        console.error('Error fetching apod:', error);
      });
  }, []);
  
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
    </div>
  );
}

export default App;