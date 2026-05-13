require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const API_URL = 'https://api.anthropic.com/v1/messages';
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.warn('Warning: ANTHROPIC_API_KEY is not set. Set it in your environment before starting the server.');
}

async function forwardToAnthropic(body) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'x-api-key': API_KEY
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return { status: res.status, data };
}

app.post('/api/chat', async (req, res) => {
  try {
    const { status, data } = await forwardToAnthropic(req.body);
    res.status(status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { status, data } = await forwardToAnthropic(req.body);
    res.status(status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

module.exports = app;
