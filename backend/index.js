const express = require('express'); // The web Framework
const axios = require('axios'); // For HTTP Requests 
const cors = require('cors'); // Frontend and backend communication (on diff port)
require('dotenv').config(); // To use enviroment variables form the env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// Route to get Astronomy Picture of the Day from NASA API
app.get('/api/apod', async (req, res) => {
    try{
        const response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}` 
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from NASA API'})
    }
});

app.get('/api/mars', async (req, res) => {
    try{
        const response = await axios.get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NASA_API_KEY}` 
        );
        res.json(response.data.photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data for Mars rover'})
    }
});

app.get('/api/epic', async (req, res) => {
    try {
        const response = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error('EPIC API Error:', error.message);
        res.status(500).json({ message: 'Error fetching EPIC data' });
    }
});

app.get('/api/neo', async (req, res) => {
    try {
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];

        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - 3); // 3 days
        const startDate = pastDate.toISOString().split('T')[0];

        const response = await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`
        );
        res.json(response.data.near_earth_objects);
    } catch (error) {
        console.error('NEO API Error:', error.message);
        res.status(500).json({ message: 'Error fetching NEO data' });
    }
});



// Start the backend server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
