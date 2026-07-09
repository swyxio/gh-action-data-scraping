#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const randomUser = require('random-user');

// Corrected data directory to be relative to the project root
const dataFolder = 'data'; 
const now = new Date();
const directory = path.join(__dirname, dataFolder);
const pathToData = path.join(directory, fileString(now) + '.json');

// Read existing data
let data = [];
if (fs.existsSync(pathToData)) {
  data = JSON.parse(fs.readFileSync(pathToData));
}

// Scrape data
async function getData() {
  const user = await randomUser('simple');
  user.invokedAt = now;
  data.push(user);
}

// Ensure directory exists
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

// Execute and persist data with robust error handling
getData()
  .then(() => {
    fs.writeFileSync(pathToData, JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error('Failed to scrape data:', err);
    process.exit(1);
  });

/**
 * Utils
 */
function fileString(ts) {
  const year = ts.getUTCFullYear();
  const month = (ts.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = ts
    .getUTCDate()
    .toString()
    .padStart(2, '0');
  return `${year}-${month}-${day}`;
}
