const eventHub = require('../hub');

function uppercase(data) {
  console.log('TRANSFORMING CONTENT');
  let content = data.results.toString().toUpperCase();
  eventHub.emit('save', { content, file: data.file });
}

eventHub.on('upper', uppercase);

module.exports = uppercase;
