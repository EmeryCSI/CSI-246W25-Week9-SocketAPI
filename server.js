const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Welcome message to the connected user
  socket.emit("message", {
    user: "System",
    text: "Welcome to the chat!",
    time: new Date().toLocaleTimeString(),
  });

  // Broadcast to all other users that someone joined
  socket.broadcast.emit("message", {
    user: "System",
    text: "A new user has joined the chat",
    time: new Date().toLocaleTimeString(),
  });

  // Handle chat messages
  socket.on("chatMessage", (msg) => {
    io.emit("message", {
      user: msg.user,
      text: msg.text,
      time: new Date().toLocaleTimeString(),
    });
  });

  // Handle typing events
  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  // Handle when user stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    io.emit("message", {
      user: "System",
      text: "A user has left the chat",
      time: new Date().toLocaleTimeString(),
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
