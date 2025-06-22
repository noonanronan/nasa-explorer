import React from 'react';

const Home = () => (
  <div>
    <h1>Welcome to NASA Explorer </h1>
    <p>
      Explore real time data and images from NASA's open APIs, including:
    </p>
    <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
      <li>Astronomy Picture of the Day (APOD)</li>
      <li>Mars Rover Photos</li>
      <li>EPIC Earth Images</li>
      <li>Near-Earth Objects Visualization</li>
      <li>NASA Image and Video Library</li>
    </ul>
    <p style={{ marginTop: '2rem' }}>
      Navigate using the menu above to jump into space data!
    </p>
  </div>
);

export default Home;
