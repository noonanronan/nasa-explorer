import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import APOD from './pages/APOD';
import Mars from './pages/Mars';
import EPIC from './pages/EPIC';
import NEO from './pages/NEO';
import Media from './pages/Media';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <Routes>
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
