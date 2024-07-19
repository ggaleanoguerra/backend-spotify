const express = require('express');
require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

const app = express();
app.use(cors());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.get('/auth/token', async (req, res) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    data: qs.stringify({
      grant_type: 'client_credentials',
    }),
    url: tokenUrl,
  };

  try {
    const response = await axios(authOptions);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch token', details: error.response ? error.response.data : error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
