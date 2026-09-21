const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        text: text,
        language: 'fr',
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la correction' });
  }
});

module.exports = router;