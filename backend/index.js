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

// Start the backend server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
