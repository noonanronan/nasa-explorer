import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function NEO() {
  const [neoData, setNeoData] = useState({}); // Stores Near Earth Object data from NASA
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [daysBack, setDaysBack] = useState(3); // How many days back to fetch NEO data (1–7)

  // Fetch NEO data from the backend
  useEffect(() => {
    const fetchNEO = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/neo?days=${daysBack}`);
        setNeoData(response.data);
      } catch (err) {
        setError('Failed to fetch NEO data.');
      } finally {
        setLoading(false);
      }
    };
    fetchNEO();
  }, [daysBack]);

  // Prepare chart data: flatten the object and extract name and diameter for each asteroid
  const neoChartData = Object.values(neoData).flat().slice(0, 10).map((asteroid) => ({
    name: asteroid.name,
    diameter: (asteroid.estimated_diameter.meters.estimated_diameter_max / 1000).toFixed(3), // Convert meters to kilometers
    date: asteroid.close_approach_data?.[0]?.close_approach_date,
    distance: asteroid.close_approach_data?.[0]?.miss_distance.kilometers,
  }));

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Near Earth Objects</h1>
      <p>Estimated max diameters (km) of 10 asteroids near Earth:</p>

      {/* Select how many days back to view NEO data */}
      <label style={{ marginBottom: '1rem', display: 'block' }}>
        View objects from past 
        <select
          value={daysBack}
          onChange={(e) => setDaysBack(Number(e.target.value))}
          style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <option key={day} value={day}>{day} day{day > 1 ? 's' : ''}</option>
          ))}
        </select>
      </label>

      {/* Show loading or error message */}
      {loading && <p>Loading NEO data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render bar chart using Recharts */}
      {!loading && !error && (
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={neoChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Diameter (km)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === 'diameter') {
                    return [`${value} km`, 'Max Diameter'];
                  }
                }}
                labelFormatter={(label) => {
                  const obj = neoChartData.find(item => item.name === label);
                  return `${label} (${obj?.date}, Distance: ${parseFloat(obj?.distance).toFixed(0)} km)`;
                }}
              />
              <Bar dataKey="diameter" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default NEO;
