'use strict';
require('./events/handlers/readFile');
require('./events/handlers/upper');
require('./events/handlers/writeFile');
require('./events/handlers/logger');

const eventHub = require('./events/hub');

// Accepts a filename as a command line parameter
// Reads the file from the file system
// Converts it's contents to upper case
// Writes it back to the file system

let fileToModify = process.argv.slice(2).shift();

eventHub.emit('read', fileToModify);
