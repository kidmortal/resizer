const express = require('express');
const sharp = require('sharp');
const axios = require('axios');

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', async (req, res) => {
  const url3 = req.url.split("url=")[1]
  console.log(url3)
  const url2 = "https://firebasestorage.googleapis.com/v0/b/smartimob-dev-test.appspot.com/o/empresas%2FweOGq249Mw1CRI7npBVM%2FQP1eYu5bbqQgINSG9118%2Fhtkswcz?alt=media&token=22012311-0198-41da-95f6-7d60e1a51ca7.png";
  if (!url3) {
    return res.status(400).send('Missing "url" parameter.');
  }

  try {
    const response = await axios.get(url3, { responseType: 'arraybuffer' });
    const resizedImageBuffer = await sharp(response.data)
      .resize({ height: 300 })
      .toBuffer();


    res.type('image/jpeg').send(resizedImageBuffer);
  } catch (error) {
    console.error('Error fetching or resizing image:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});