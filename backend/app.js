// backend/app.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ********** OpenAI Summarizer **********

const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0125',
        messages: [{ role: 'user', content: `Summarize this for a beginner:\n\n${text}` }],
        max_tokens: 100,
        temperature: 0.5,
        top_p: 1
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response) console.log("OpenAI error:", error.response.data);
    if (error.response?.status === 429) return 'AI summary limit reached.';
    return 'AI summary unavailable.';
  }
};

app.post('/api/summarize', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Missing text' });
  const summary = await summarizeText(text);
  res.json({ summary });
});

// ********** NASA APIs **********

app.get('/api/apod', async (req, res) => {
  try {
    const { date } = req.query;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}` +
                (date ? `&date=${date}` : '');
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('APOD Error:', error.message);
    res.status(500).json({ message: 'Error fetching APOD data' });
  }
});

app.get('/api/mars', async (req, res) => {
  try {
    const sol = req.query.sol || 1000;
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${process.env.NASA_API_KEY}`
    );
    res.json(response.data.photos);
  } catch (error) {
    console.error('Mars Error:', error.message);
    res.status(500).json({ message: 'Error fetching Mars data' });
  }
});

app.get('/api/epic', async (req, res) => {
  try {
    const { date } = req.query;
    const url = date
      ? `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${process.env.NASA_API_KEY}`
      : `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('EPIC Error:', error.message);
    res.status(500).json({ message: 'Error fetching EPIC data' });
  }
});

app.get('/api/neo', async (req, res) => {
  try {
    const daysBack = Math.min(parseInt(req.query.days) || 3, 7);
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysBack);
    const startDate = pastDate.toISOString().split('T')[0];
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`
    );
    res.json(response.data.near_earth_objects);
  } catch (error) {
    console.error('NEO Error:', error.message);
    res.status(500).json({ message: 'Error fetching NEO data' });
  }
});

app.get('/api/media', async (req, res) => {
  try {
    const query = req.query.q || 'moon';
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image,video`);
    const items = response.data.collection.items;

    const results = await Promise.all(
      items.map(async (item) => {
        const data = item.data[0];
        const nasaId = data.nasa_id;
        const mediaType = data.media_type;
        let thumbnail = item.links?.[0]?.href || '';
        let url = thumbnail;

        if (mediaType === 'video') {
          try {
            const assetRes = await axios.get(`https://images-api.nasa.gov/asset/${nasaId}`);
            const allAssets = assetRes.data.collection.items;
            const mp4 = allAssets.find(asset => asset.href.endsWith('.mp4'));
            const jpg = allAssets.find(asset => asset.href.endsWith('.jpg'));
            if (mp4) {
              url = mp4.href;
              thumbnail = jpg?.href || thumbnail;
            } else return null;
          } catch {
            return null;
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

    res.json(results.filter(Boolean));
  } catch (error) {
    console.error('Media Error:', error.message);
    res.status(500).json({ message: 'Error fetching media' });
  }
});

module.exports = app;
