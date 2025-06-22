import React, { useEffect, useState } from 'react';
import axios from 'axios';

function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/apod');
        setApod(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load APOD data.');
        setLoading(false);
      }
    };
    fetchAPOD();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>NASA Astronomy Picture of the Day</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apod && (
        <>
          <h2>{apod.title}</h2>
          <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />
          <p>{apod.explanation}</p>
        </>
      )}
    </div>
  );
}

export default APOD;
