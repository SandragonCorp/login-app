const { Server } = require("socket.io");
const { createServer } = require("http");

// On this file, we create a server that handles the sockets.
// sockets are basically the one handling events that can easily communicate (send / received) to client
// $ npx nodemon ".\app\server\_socket.ts"

const httpServer = createServer();
const serverIO = new Server(httpServer, {
    cors: {
        // move to .env
        // this is the url where the client is from
        origin: "http://192.168.100.5:3000",
        methods: ['GET', 'POST']
    }
})

// when a client is connected to this server
serverIO.on('connection', async (socket: any) => {
    // list to an event from all connected clients
    socket.on('addMessage', (data: any) => {
        // send an event back to the client
        socket.broadcast.emit('addMessage', 'server: ' + data.username + ": "  + data.message); 
    });
});

// when server is up
httpServer.listen(4000, () => {
    console.log('LISTENING TO PORT: 4000');
});