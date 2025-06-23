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
    const { date } = req.query; // Get optional date param
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
  try {
    const sol = req.query.sol || 1000; // Default to 1000 

    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${process.env.NASA_API_KEY}`
    );

    res.json(response.data.photos);
  } catch (error) {
    console.error('Mars API Error:', error.message);
    res.status(500).json({ message: 'Error fetching data for Mars rover' });
  }
});

// EPIC (Earth images from satellite)
app.get('/api/epic', async (req, res) => {
    try {
        const date = req.query.date; // Optional date in YYYY-MM-DD format
        let url;

        if (date) {
            // If a date is provided, fetch images for that specific date
            url = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${process.env.NASA_API_KEY}`;
        } else {
            // Otherwise, fetch the latest available images
            url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`;
        }

        const response = await axios.get(url);
        res.json(response.data); // Send the list of EPIC images
    } catch (error) {
        console.error('EPIC API Error:', error.message);
        res.status(500).json({ message: 'Error fetching EPIC data' });
    }
});

// Near Earth Objects (asteroids)
app.get('/api/neo', async (req, res) => {
    try {
        // Get the number of days back from query (default to 3, max 7 due to NASA API limit)
        const daysBack = Math.min(parseInt(req.query.days) || 3, 7);

        const today = new Date();
        const endDate = today.toISOString().split('T')[0];

        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - daysBack);
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
    const query = req.query.q || 'moon'; // Default search term
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image,video`);
    const items = response.data.collection.items;

    const results = await Promise.all(
      items.map(async (item) => {
        const data = item.data[0];
        const mediaType = data.media_type;
        const nasaId = data.nasa_id;
        let thumbnail = item.links?.[0]?.href || '';
        let url = thumbnail; // Default to image thumbnail for image media types

        if (mediaType === 'video') {
          try {
            const assetRes = await axios.get(`https://images-api.nasa.gov/asset/${nasaId}`);
            const allAssets = assetRes.data.collection.items;

            // Find the first .mp4 asset
            const mp4Asset = allAssets.find(asset => asset.href.endsWith('.mp4'));

            if (mp4Asset) {
              url = mp4Asset.href;
              thumbnail = allAssets.find(asset => asset.href.endsWith('.jpg'))?.href || thumbnail;
            } else {
              return null; // Skip this video if no .mp4 file is found
            }
          } catch (err) {
            console.warn(`Could not fetch video asset for ${nasaId}`);
            return null; // Skip this video if asset fetch fails
          }
        }

        return {
          title: data.title,
          description: data.description,
          date_created: data.date_created,
          media_type: mediaType,
          thumbnail,
          url,
        };
      })
    );

    const cleanedResults = results.filter(Boolean); // Remove nulls (invalid videos)
    res.json(cleanedResults);

  } catch (error) {
    console.error('Media API Error:', error.message);
    res.status(500).json({ message: 'Error fetching media' });
  }
});


// Start the backend server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
