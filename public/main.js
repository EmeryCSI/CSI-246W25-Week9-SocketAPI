// DOM elements
const joinContainer = document.getElementById("join-container");
const chatContainer = document.getElementById("chat-container");
const joinForm = document.getElementById("join-form");
const chatForm = document.getElementById("chat-form");
const chatMessages = document.getElementById("chat-messages");
const msgInput = document.getElementById("msg");
const typingIndicator = document.getElementById("typing-indicator");

// State variables
let username = "";
let typingTimeout = null;

// Initialize Socket.IO connection
const socket = io();

// Join form submit event
joinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get username
  username = document.getElementById("username").value.trim();

  if (username) {
    // Show chat interface, hide join form
    joinContainer.style.display = "none";
    chatContainer.style.display = "grid";

    // Focus on message input
    msgInput.focus();

    // Notify server (optional - you could add a 'join' event here)
    console.log(`Joined as ${username}`);
  }
});

// Message from server
socket.on("message", (message) => {
  // Display message
  outputMessage(message);

  // Scroll down to latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Handle typing events
socket.on("typing", (user) => {
  typingIndicator.textContent = `${user} is typing...`;
});

socket.on("stopTyping", () => {
  typingIndicator.textContent = "";
});

// Message submit event
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const msg = msgInput.value.trim();

  if (msg) {
    // Emit message to server
    socket.emit("chatMessage", {
      user: username,
      text: msg,
    });

    // Clear input and focus
    msgInput.value = "";
    msgInput.focus();

    // Stop typing indicator
    socket.emit("stopTyping");
    clearTimeout(typingTimeout);
  }
});

// Input event for typing indicator
msgInput.addEventListener("input", () => {
  // Emit typing event
  socket.emit("typing", username);

  // Clear previous timeout
  clearTimeout(typingTimeout);

  // Set timeout to stop typing after 1 second of inactivity
  typingTimeout = setTimeout(() => {
    socket.emit("stopTyping");
  }, 1000);
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");

  // Add appropriate class based on message type
  if (message.user === "System") {
    div.classList.add("system");
  } else if (message.user === username) {
    div.classList.add("self");
  }

  div.innerHTML = `
        <div class="meta">
            <span>${message.user}</span> <span>${message.time}</span>
        </div>
        <p class="text">${message.text}</p>
    `;

  chatMessages.appendChild(div);
}

// Connection events for demonstration
socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("connect_error", (error) => {
  console.log("Connection error:", error);
});

// Reconnection events
socket.on("reconnect_attempt", () => {
  console.log("Attempting to reconnect...");
});

socket.on("reconnect", (attemptNumber) => {
  console.log("Reconnected after", attemptNumber, "attempts");
});
