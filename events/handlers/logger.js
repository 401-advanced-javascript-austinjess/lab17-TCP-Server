const eventHub = require('../hub');

const net = require('net');
const client = new net.Socket();

const LOGGER_PORT = process.env.LOGGER_PORT || 3001;
const LOGGER_HOST = process.env.LOGGER_HOST || 'localhost';

client.connect(LOGGER_PORT, LOGGER_HOST, initializeLogger);

function initializeLogger() {
  eventHub.on('read', log('read'));
  eventHub.on('upper', log('upper'));
  eventHub.on('save', log('save'));
  function log(eventType) {
    return (payload) => {
      if (typeof payload === undefined) return;
      let json = JSON.stringify({
        eventType,
        payload,
      });
      client.write(`${json}\r\n`);
    };
  }
}
