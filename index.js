const express = require('express');
const sharp = require('sharp');
const axios = require('axios');

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', async (req, res) => {
  const url3 = req.url.split("url=")[1]
  try {
    const response = await axios.get(url3, { responseType: 'arraybuffer' });
    const resizedImageBuffer = await sharp(response.data)
      .resize({ width: 1424, height: 1061 })
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