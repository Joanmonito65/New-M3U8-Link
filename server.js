const express = require('express');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const app = express();
const PORT = process.env.PORT || 3000;

// A simple in-memory database to map "New Links" to "Original Links"
const linkDatabase = new Map();

app.use(express.json());
app.use(express.static('public')); // Serves your frontend

// 1. Endpoint to generate the new link
app.post('/api/generate', (req, { text }) => {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

    // Generate a unique ID for the new link
    const uniqueId = Math.random().toString(36).substring(2, 10);
    
    // Store the relationship
    linkDatabase.set(uniqueId, originalUrl);

    // Construct the brand new .m3u8 link
    const newM3u8Link = `${req.protocol}://${req.get('host')}/stream/${uniqueId}.m3u8`;
    
    res.json({ newLink: newM3u8Link });
});

// 2. The new .m3u8 link endpoint that proxies the video data
app.get('/stream/:id.m3u8', async (req, res) => {
    const uniqueId = req.params.id;
    const originalUrl = linkDatabase.get(uniqueId);

    if (!originalUrl) return res.status(404).send('Stream not found');

    try {
        // Fetch the real .m3u8 file contents from the source
        const response = await fetch(originalUrl);
        const manifestText = await response.text();

        // Set the correct header so video players recognize it as an actual live stream
        res.setHeader('Content-Type', 'application/x-mpegURL');
        res.setHeader('Access-Control-Allow-Origin', '*'); // Dynamic CORS fix

        // Send the raw stream data directly to the player
        res.send(manifestText);
    } catch (error) {
        res.status(500).send('Error fetching original stream');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
