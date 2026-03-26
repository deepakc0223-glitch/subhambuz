const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Changed from restricted localhost to allow all origins
    methods: ["GET", "POST"]
  }
});

let buzzerData = [];         // Store buzzer data (teamName, timestamp)
let buzzerActive = false;    // Track if buzzer is active
let connectedTeams = new Map(); // Track connected teams

// Serve static files from the "public" folder
app.use(express.static('public'));

// Serve the root (index) page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 🔌 Handle socket connections
io.on('connection', (socket) => {
  console.log(`🔌 New connection: ${socket.id}`);

  // Send current buzzer state and connected teams to the new client
  socket.emit('buzzerState', buzzerActive);
  io.emit('updateConnectedTeams', Array.from(connectedTeams.values()));

  // ✅ Register Team (for tracking connected teams)
  socket.on('registerTeam', (teamName) => {
    connectedTeams.set(socket.id, teamName);
    console.log(`✅ Team Registered: ${teamName}`);
    io.emit('updateConnectedTeams', Array.from(connectedTeams.values()));
  });

  // 🛎️ Handle buzzer press (use client's timestamp)
  socket.on('buzzerPressed', (data) => {
    if (!buzzerActive) return; // Ignore if buzzer inactive

    const { teamName, timestamp } = data;
    const buzzerEntry = { teamName, timestamp: parseFloat(timestamp).toFixed(4) };

    // Prevent duplicate entries
    if (!buzzerData.some((entry) => entry.teamName === teamName)) {
      buzzerData.push(buzzerEntry);
      console.log(`🚨 Buzzer Pressed by ${teamName} at ${buzzerEntry.timestamp} ms`);
      io.emit('buzzerUpdate', buzzerEntry); // Broadcast to admin and teams
    }
  });

  // 🔄 Admin: Reset Buzzer
  socket.on('resetBuzzer', () => {
    console.log('🔄 Buzzer Reset by Admin');
    buzzerData = []; // Clear buzzer data
    io.emit('resetBuzzer');
  });

  // ✅ Admin: Activate Buzzer
  socket.on('activateBuzzer', () => {
    console.log('✅ Buzzer Activated by Admin');
    buzzerActive = true;
    io.emit('activateBuzzer');
  });

  // ❌ Admin: Deactivate Buzzer
  socket.on('deactivateBuzzer', () => {
    console.log('❌ Buzzer Deactivated by Admin');
    buzzerActive = false;
    io.emit('deactivateBuzzer');
  });

  // 🔌 Handle Team Disconnection
  socket.on('disconnect', () => {
    const teamName = connectedTeams.get(socket.id);
    if (teamName) {
      console.log(`❌ Team Disconnected: ${teamName}`);
      connectedTeams.delete(socket.id);
      io.emit('updateConnectedTeams', Array.from(connectedTeams.values()));
    }
    console.log(`🔴 Disconnected: ${socket.id}`);
  });
});

// 🚀 Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
