const express = require('express');
const cors = require('cors');
const correctionRoute = require('./routes/correction');
const translationRoute = require('./routes/translation');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello LEGEND');
});

app.use('/api/correction', correctionRoute);
app.use('/api/translation', translationRoute);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});