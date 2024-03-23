const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"] // Allow only GET and POST requests
  }
});

// Listen for connection events
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);

    // Listen for incoming messages and broadcast to all clients
    socket.on('message', (message) => {
      console.log( message);
        io.emit('message', message);
    });

    // Clean up the socket on disconnect
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
