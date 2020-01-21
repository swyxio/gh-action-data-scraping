#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const randomUser = require('random-user');

// for you to change easily
const dataFolder = '/data';
const now = new Date();
const pathToData = path.join(__dirname, dataFolder, fileString(now)) + '.json';

// read data, if needed
let data = [];
if (fs.existsSync(pathToData)) {
  data = JSON.parse(fs.readFileSync(pathToData));
}

// scrape data, possibly using prior data
async function getData() {
  const user = await randomUser('simple');
  user.invokedAt = now;
  data.push(user);
}

// execute and persist data
getData() // no top level await... yet
  .then(() => {
    // persist data
    fs.writeFileSync(path.resolve(pathToData), JSON.stringify(data, null, 2));
  });

/**
 *
 * utils
 *
 */
function fileString(ts) {
  const year = ts.getUTCFullYear();
  const month = (ts.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = ts
    .getUTCDate()
    .toString()
    .toString()
    .padStart(2, '0');
  const name = `${year}-${month}-${day}`;
  return name;
}
