const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = new express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 4202;

// serves a file in /public if it exists
app.use(express.static(path.join(__dirname, '../public')));

// redirects all other files to main.js
app.get('/*', (req, res) => {

  //modifies the req object so that all paths get routed to /. This doesn't modify anything the user can see. Main.js routes requests based on window.location.pathname.
  if (!req.url.includes('.')) {
    req.url = '/';
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(port, () => {console.log(`http server listening on port ${port}`)});
