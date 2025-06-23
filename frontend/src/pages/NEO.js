import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function NEO() {
  const [neoData, setNeoData] = useState({}); // Stores Near Earth Object data from NASA

  // Fetch NEO data from the backend
  useEffect(() => {
    const fetchNEO = async () => {
      const response = await axios.get('http://localhost:5000/api/neo');
      setNeoData(response.data);
    };
    fetchNEO();
  }, []);

  // Prepare chart data: flatten the object and extract name and diameter for each asteroid
  const neoChartData = Object.values(neoData).flat().slice(0, 10).map((asteroid) => ({
    name: asteroid.name,
    diameter: (asteroid.estimated_diameter.meters.estimated_diameter_max / 1000).toFixed(3) // Convert meters to kilometers
  }));

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Near Earth Objects</h1>
      <p>Estimated max diameters (km) of 10 asteroids near Earth:</p>

      {/* Render bar chart using Recharts */}
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={neoChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Diameter (km)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="diameter" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default NEO;
