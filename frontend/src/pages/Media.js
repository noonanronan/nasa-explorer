import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Media() {
  const [mediaSearch, setMediaSearch] = useState("moon"); // Default search term for NASA media
  const [mediaResults, setMediaResults] = useState([]); // Stores search results from the NASA media API

  // Fetch media data whenever the search term changes
  useEffect(() => {
    const fetchMedia = async () => {
      const response = await axios.get(`http://localhost:5000/api/media?q=${mediaSearch}`);
      setMediaResults(response.data);
    };
    if (mediaSearch.trim()) fetchMedia(); // Only fetch if the search term is not empty
  }, [mediaSearch]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>NASA Image and Video Library</h1>

      {/* Input for search term */}
      <input
        type="text"
        placeholder="Search for NASA images (e.g., moon, Mars)"
        value={mediaSearch}
        onChange={(e) => setMediaSearch(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      {/* Display search results */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {mediaResults.slice(0, 10).map((item, idx) => (
          <div key={idx} style={{ width: '300px' }}>
            <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: 'auto' }} />
            <p><strong>{item.title}</strong></p>
            <p>{item.description}</p>
            <p><small>{item.date_created}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Media;
