import React from 'react';
import { FaRocket, FaCameraRetro, FaGlobeEurope, FaMeteor, FaPhotoVideo, FaImage } from 'react-icons/fa';


// This is the home page of the NASA Explorer app
const Home = () => (
  <div style={{ padding: '2rem', fontFamily: 'Arial', display: 'flex', justifyContent: 'center' }}>
    <div
      style={{
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        maxWidth: '800px',
        width: '100%',
      }}
    >
      {/* Main welcome heading */}
      <h1 style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
        <FaRocket style={{ color: '#ff5722' }} />
        Welcome to NASA Explorer
      </h1>

      {/* Introduction */}
      <p>
        Real time space data and stunning visuals provided by NASA’s public APIs. Explore the cosmos like never before:
      </p>

      {/* List of available features in the app */}
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.8' }}>
        <li><FaImage style={{ marginRight: '8px' }} /> <strong>Astronomy Picture of the Day (APOD):</strong> A new space image every day with an explanation.</li>
        <li><FaCameraRetro style={{ marginRight: '8px' }} /> <strong>Mars Rover Photos:</strong> See what NASA’s rovers have captured on the Martian surface.</li>
        <li><FaGlobeEurope style={{ marginRight: '8px' }} /> <strong>EPIC Earth Images:</strong> Satellite images of Earth taken by the DSCOVR spacecraft.</li>
        <li><FaMeteor style={{ marginRight: '8px' }} /> <strong>Near-Earth Objects:</strong> Track asteroids flying close to our planet, visualized with charts.</li>
        <li><FaPhotoVideo style={{ marginRight: '8px' }} /> <strong>NASA Image & Video Library:</strong> Search through NASA’s massive collection of media.</li>
      </ul>


      {/* Closing message */}
      <p style={{ marginTop: '2rem' }}>
        Use the navigation menu above to start your journey through the stars!
      </p>
    </div>
  </div>
);

export default Home;
