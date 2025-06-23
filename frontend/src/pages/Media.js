import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Media() {
  const [mediaSearch, setMediaSearch] = useState("moon"); // Default search term
  const [mediaResults, setMediaResults] = useState([]); // Search results
  const [selectedItem, setSelectedItem] = useState(null); // Modal view
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch media from backend
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/media?q=${mediaSearch}`);
        setMediaResults(response.data);
      } catch (err) {
        setError("Failed to load media content.");
      } finally {
        setLoading(false);
      }
    };

    if (mediaSearch.trim()) fetchMedia();
  }, [mediaSearch]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>NASA Image and Video Library</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search for NASA images or videos (e.g., moon, Mars)"
        value={mediaSearch}
        onChange={(e) => setMediaSearch(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Gallery */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {mediaResults.length === 0 && !loading && <p>No media found.</p>}

        {mediaResults.slice(0, 10).map((item, idx) => (
          <div
            key={idx}
            style={{ width: '300px', cursor: 'pointer' }}
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.thumbnail} alt={item.title} style={{ width: '100%' }} />
            <p><strong>{item.title}</strong></p>
            <p>{item.description.slice(0, 100)}...</p>
            <p><small>{item.date_created}</small></p>
            <p><em>Type: {item.media_type}</em></p>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff', padding: '2rem', borderRadius: '8px',
            maxWidth: '800px', width: '100%', maxHeight: '90%', overflowY: 'auto'
          }}>
            <h2>{selectedItem.title}</h2>
            {selectedItem.media_type === 'video' ? (
              selectedItem.url.endsWith('.mp4') ? (
                <video controls style={{ width: '100%' }}>
                  <source src={selectedItem.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p style={{ color: 'red' }}>This video is unavailable or cannot be played.</p>
              )
            ) : (
              <img src={selectedItem.url} alt={selectedItem.title} style={{ width: '100%' }} />
            )}
            <p>{selectedItem.description}</p>
            <p><small>{selectedItem.date_created}</small></p>
            <button onClick={() => setSelectedItem(null)} style={{ marginTop: '1rem' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Media;
