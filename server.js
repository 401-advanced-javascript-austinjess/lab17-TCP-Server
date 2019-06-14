'use strict';

// Listens for connections on port 3001
// Broadcasts out every message it hears to all connections

const net = require('net');
const uuid = require('uuid');

const port = process.env.PORT || 3001;
const server = net.createServer();

// TODO!!!!!
// Parse the text it receives
// Given a good "event" broadcast the event to all connected clients

server.listen(port, () => console.log(`Server up on ${port}`));

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${uuid()}`;
  socketPool[id] = socket;
  socket.on('data', dispatchEvent);
  socket.on('close', () => {
    delete socketPool[id];
  });
});

// MOVE THIS TO NEW MODULE
let dispatchEvent = (buffer) => {
  console.log('DISPATCH EVENT!');
  let text = buffer.toString().trim();
  console.log(text);
  for (let socket in socketPool) {
    console.log('SOCKET!', socket);
    socketPool[socket].write(`${text}\r\n`);
  }
};
