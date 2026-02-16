const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json());

app.post('/api/openai', async (req, res) => {
  try {
    const prompt = req.body.prompt || '';
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured on server.' });
    }

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      }),
    });

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('OpenAI proxy error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Serve static build in production (optional)
app.use(express.static(path.join(__dirname, 'build')));
// catch-all to serve React build (use a regex to avoid path-to-regexp issues)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
