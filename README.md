# Socket.IO Tutorial Chat App

A simple real-time chat application built with Socket.IO, Express, and Node.js to demonstrate the core features of Socket.IO.

## Features

- Real-time bidirectional communication
- User join/leave notifications
- Typing indicators
- Message broadcasting
- Clean, responsive UI

## Socket.IO Concepts Demonstrated

1. **Connection Events**: Handling connect, disconnect, and reconnection
2. **Emitting Events**: Sending data between client and server
3. **Broadcasting**: Sending messages to all connected clients
4. **Rooms**: (Not implemented in this basic version, but mentioned in the sidebar)
5. **Namespaces**: (Not implemented in this basic version)

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node server.js
   ```
4. Open your browser and navigate to `http://localhost:3000`

## How It Works

### Server-Side (server.js)

The server uses Express to serve static files and Socket.IO to handle real-time communication:

- Sets up an Express server and initializes Socket.IO
- Handles connection events
- Processes incoming messages and broadcasts them to all clients
- Manages typing indicators

### Client-Side (public/main.js)

The client connects to the Socket.IO server and:

- Handles user interface interactions
- Emits events to the server (messages, typing)
- Listens for events from the server (messages from other users)
- Updates the UI in real-time

## Project Structure

```
├── server.js           # Server-side code
├── package.json        # Project dependencies
├── public/             # Client-side files
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   └── main.js         # Client-side JavaScript
└── README.md           # This file
```

## Extending the Application

Here are some ideas to extend this basic chat application:

1. Add user authentication
2. Implement private messaging
3. Create chat rooms
4. Add file sharing capabilities
5. Store chat history in a database
6. Add emoji support
7. Implement read receipts

## License

MIT
