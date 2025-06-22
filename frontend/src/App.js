// Import React and React Router for page navigation
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the Navbar component (menu bar at the top)
import Navbar from './components/Navbar';

// Import different pages
import Home from './pages/Home';
import APOD from './pages/APOD';
import Mars from './pages/Mars';
import EPIC from './pages/EPIC';
import NEO from './pages/NEO';
import Media from './pages/Media';

function App() {
  return (
     // Router wraps everything and enables navigation between pages
    <Router>
      {/* Navbar stays visible on all pages */}
      <Navbar />
      {/* The page content area */}
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <Routes>
          {/* Each page Route */}
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/mars" element={<Mars />} />
          <Route path="/epic" element={<EPIC />} />
          <Route path="/neo" element={<NEO />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
