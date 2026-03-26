const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
        methods: ["GET", "POST"]
    }
});

// Allow CORS for API routes
app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('buzzerPress', (data) => {
        console.log('Buzzer Pressed:', data);
        io.emit('buzzerPress', data);
    });

    socket.on('resetBuzzers', () => {
        console.log('Resetting buzzers');
        io.emit('buzzerReset');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
