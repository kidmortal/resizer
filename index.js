const express = require('express');
const sharp = require('sharp');
const axios = require('axios');

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', async (req, res) => {
  const url = req.url.split("url=")[1]
  if (!url) {
    return res.status(200).send(`
    <div>
    <h1>Server up and running</h1>
    <br/>
    <span>Enter ?url="imageurl" on query to resize images</span>
    <br/>
    <br/>
    <span>Exameple: https://resizer-jj7e.onrender.com/?url=https://firebasestorage.googleapis.com/v0/b/smartimob-dev-test.appspot.com/o/empresas%2FweOGq249Mw1CRI7npBVM%2FxlsfLH5uUiCpouElNbHC%2Fqcxyuq?alt=media&token=026f86ec-8d0e-483d-af90-53f1b2f606d0</span>
    </div>
    `);
  }
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const resizedImageBuffer = await sharp(response.data)
      .resize({ width: 1424, height: 1061 })
      .toBuffer();
    res.type('image/png').send(resizedImageBuffer);
  } catch (error) {
    console.error('Error fetching or resizing image:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});