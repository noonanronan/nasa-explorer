import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', background: '#0b0c10', color: '#fff', display: 'flex', gap: '1rem' }}>
    <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
    <Link to="/apod" style={{ color: '#fff', textDecoration: 'none' }}>APOD</Link>
    <Link to="/mars" style={{ color: '#fff', textDecoration: 'none' }}>Mars</Link>
    <Link to="/epic" style={{ color: '#fff', textDecoration: 'none' }}>EPIC</Link>
    <Link to="/neo" style={{ color: '#fff', textDecoration: 'none' }}>NEO</Link>
    <Link to="/media" style={{ color: '#fff', textDecoration: 'none' }}>Media</Link>
  </nav>
);

export default Navbar;