import React, { useEffect, useState } from 'react';
import axios from 'axios';

function APOD() {
  // State to store the APOD data
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true); // Show loading state
  const [error, setError] = useState(null); // Show error if request fails

  // Function to generate a random date string in YYYY-MM-DD format
  const getRandomDate = () => {
    const start = new Date(1995, 5, 16); // APOD start date (June 16, 1995)
    const end = new Date(); // Today's date
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Fetch APOD data from the backend, optional custom date for random APODs
  const fetchAPOD = async (customDate = '') => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/apod${customDate ? `?date=${customDate}` : ''}` // Include date param if passed
      );
      setApod(response.data); // Save the APOD data
      setLoading(false); // Hide loading
    } catch (err) {
      setError('Failed to load APOD data.'); // Show error if something goes wrong
      setLoading(false);
    }
  };

  // Call once on component mount to load today's APOD
  useEffect(() => {
    fetchAPOD(); // Call the function
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1>NASA Astronomy Picture of the Day</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apod && (
        <div style={{ background: '#f4f4f4', padding: '1.5rem', borderRadius: '8px' }}>
          {/* Show title, date, and media */}
          <h2>{apod.title}</h2>
          <p><strong>Date:</strong> {apod.date}</p>

          {/* Show image or video depending on media type */}
          {apod.media_type === "image" ? (
            <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              style={{ width: '100%', height: '500px', marginBottom: '1rem' }}
            ></iframe>
          )}

          {/* Show the explanation text */}
          <p style={{ textAlign: 'justify' }}>{apod.explanation}</p>

          {/* Button to load a random APOD */}
          <button
            onClick={() => {
              const randomDate = getRandomDate();
              setLoading(true);
              fetchAPOD(randomDate);
            }}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#0077cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Show Random APOD
          </button>
        </div>
      )}
    </div>
  );
}

export default APOD;
