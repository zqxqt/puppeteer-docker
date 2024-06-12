const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });  // Ensure the correct path

const app = express();
const port = process.env.PORT || 3020;
const password = process.env.PASSWORD;

app.get('/generate-screenshot', async (req, res) => {
  const url = req.query.url;
  const providedPassword = req.query.password;
  const width = parseInt(req.query.width); 
  const height = parseInt(req.query.height);
  const fileName = req.query.fileName; 

  if (providedPassword !== password) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  if (!width || !height || isNaN(width) || isNaN(height)) { 
    return res.status(400).json({ error: 'Invalid width or height' });
  }

  if (!fileName) {
    return res.status(400).json({ error: 'Missing fileName' });
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  const page = await browser.newPage();
  await page.emulateMediaType('print');
  await page.setViewport({ width: width, height: height }); 
  await page.goto(url);

  try {
    await page.waitForSelector('body');
  } catch (error) {
    await browser.close();
    return res.status(500).json({ error: 'Timeout waiting for page to load' });
  }

  // Add a delay of 5 seconds using setTimeout
  await new Promise(resolve => setTimeout(resolve, 5000));

  const screenshot = await page.screenshot({ fullPage: true, type: 'jpeg' });

  await browser.close();

  const filePath = path.join('src', 'output', `${fileName}.jpg`);

  await fs.writeFile(filePath, screenshot);

  res.send(`Screenshot saved at ${filePath}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
