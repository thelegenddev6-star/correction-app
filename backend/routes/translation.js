 const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const langpair = `fr|${targetLang}`;
    const url = `const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}&de=votre.email@exemple.com`;`;

    const response = await fetch(url);
    const data = await response.json();

    res.json({ translatedText: data.responseData.translatedText });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la traduction' });
  }
});

module.exports = router;