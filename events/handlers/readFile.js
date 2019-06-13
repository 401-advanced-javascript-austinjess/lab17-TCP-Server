const fs = require('fs');
const { promisify } = require('util');
const eventHub = require('../hub.js');

const readFileAsync = promisify(fs.readFile);

async function readFile(file) {
  console.log('READING FILE');
  let results = await readFileAsync(file);
  // call the function
  eventHub.emit('upper', { results, file });
}

eventHub.on('read', readFile);
