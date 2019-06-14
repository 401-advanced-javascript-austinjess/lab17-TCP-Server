const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const eventHub = require('../hub');

async function writeFile(data) {
  console.log('WRITING FILE');
  await writeFileAsync(data.file, Buffer.from(data.content));
  // eventHub.emit('log', `${data.file} was updated!`);
}

eventHub.on('save', writeFile);

module.exports = writeFile;
