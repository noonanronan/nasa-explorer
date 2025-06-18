const express = require('express'); // The web Framework for creating routes
const axios = require('axios'); // For HTTP Requests 
const cors = require('cors'); // For frontend and backend comms (on diff port)
require('dotenv').config(); // To use enviroment variables form the env file

const app = express();
const PORT = process.emvPORT || 5000;

app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
