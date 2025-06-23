import React from 'react';

// This is the home page of the NASA Explorer app
const Home = () => (
  <div>
    {/* Main welcome heading */}
    <h1>Welcome to NASA Explorer</h1>

    {/* Introduction */}
    <p>
      Explore real time data and images from NASA's open APIs, including:
    </p>

    {/* List of available features in the app */}
    <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
      <li>Astronomy Picture of the Day (APOD)</li>
      <li>Mars Rover Photos</li>
      <li>EPIC Earth Images</li>
      <li>Near-Earth Objects Visualization</li>
      <li>NASA Image and Video Library</li>
    </ul>

    {/* Closing message */}
    <p style={{ marginTop: '2rem' }}>
      Navigate using the menu above to jump into space data!
    </p>
  </div>
);

export default Home;
