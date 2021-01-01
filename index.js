const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// listening for incoming sockets
io.on('connection', (socket) => {
  let i = 1;
  console.log('USER CONNECTED');

  setInterval(() => {
    io.emit('message', `NEW MESSAGE ${i}`);
    i = i + 1;
  }, 5000);

  // sockets also listen for disconnects
  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED');
  });
});

const port = 3000;

http.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});