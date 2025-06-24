// Import React and React Router for page navigation
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the Navbar component (menu bar at the top)
import Navbar from './components/Navbar';

// Import different pages - Lazy loading
const Home = lazy(() => import('./pages/Home'));
const APOD = lazy(() => import('./pages/APOD'));
const Mars = lazy(() => import('./pages/Mars'));
const EPIC = lazy(() => import('./pages/EPIC'));
const NEO = lazy(() => import('./pages/NEO'));
const Media = lazy(() => import('./pages/Media'));

function App() {
  return (
     // Router wraps everything and enables navigation between pages
    <Router>
      {/* Navbar stays visible on all pages */}
      <Navbar />
      <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/mars" element={<Mars />} />
          <Route path="/epic" element={<EPIC />} />
          <Route path="/neo" element={<NEO />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
