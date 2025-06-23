// Import required packages
const express = require('express'); // Web framework to build the backend
const axios = require('axios'); // To make requests to NASA's APIs
const cors = require('cors'); // Allows frontend and backend to talk to each other
require('dotenv').config(); // Loads environment variables (like your API key) from .env file

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors()); // Allow requests from the frontend (running on a different port)

// ******* Routes *******

// Astronomy Picture of the Day (APOD)
app.get('/api/apod', async (req, res) => {
  try {
    const { date } = req.query; // Get optional ?date param
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}` +
                (date ? `&date=${date}` : '');

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('APOD API Error:', error.message);
    res.status(500).json({ message: 'Error fetching data from NASA API' });
  }
});


// Mars Rover Photos (from Sol 1000)
app.get('/api/mars', async (req, res) => {
    try{
        const response = await axios.get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NASA_API_KEY}` 
        );
        res.json(response.data.photos); // Send only the photo array
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data for Mars rover'})
    }
});

// EPIC (Earth images from satellite)
app.get('/api/epic', async (req, res) => {
    try {
        const response = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`
        );
        res.json(response.data); // Send the list of EPIC images
    } catch (error) {
        console.error('EPIC API Error:', error.message);
        res.status(500).json({ message: 'Error fetching EPIC data' });
    }
});

// Near Earth Objects (asteroids)
app.get('/api/neo', async (req, res) => {
    try {
        // Get today and 3 days ago (for date range)
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];

        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - 3); // 3 days
        const startDate = pastDate.toISOString().split('T')[0];

        const response = await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`
        );
        res.json(response.data.near_earth_objects); // Send NEO data
    } catch (error) {
        console.error('NEO API Error:', error.message);
        res.status(500).json({ message: 'Error fetching NEO data' });
    }
});

// NASA Image and Video Library
app.get('/api/media', async (req, res) => {
  try {
    const query = req.query.q || 'moon'; // If no search term, default to "moon"
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
    const items = response.data.collection.items;

    // Map results to essential info
    const results = items.map(item => {
      const data = item.data[0];
      const links = item.links?.[0];
      return {
        title: data.title,
        description: data.description,
        date_created: data.date_created,
        thumbnail: links?.href || '',
      };
    });

    res.json(results);
  } catch (error) {
    console.error('Media API Error:', error.message);
    res.status(500).json({ message: 'Error fetching media' });
  }
});

// Start the backend server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
