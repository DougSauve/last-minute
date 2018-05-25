const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = new express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 4202;

const db = require('./db/crud/_crud');

const { sanitize } = require('../utils/sanitize');
// serves a file in /public if it exists
app.use(express.static(path.join(__dirname, '../public')));

// redirects all other files to main.js
app.get('/*', (req, res) => {
  req.url = sanitize(req.url);

  //modifies the req object so that all paths get routed to /. This doesn't modify anything the user can see. Main.js routes requests based on window.location.pathname.
  if (!req.url.includes('.')) {
    req.url = '/';
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


io.on('connection', (socket) => {
  // console.log('server: connected.');

  socket.on('createEvent', async (event, acknowledge) => {

    let err;
    let result;

    // add event to DB
    result = await db.createEvent(event);
    if(!result) err = "An error occured during event creation.";
    acknowledge(err, result);

    if (result) {
        socket.emit('eventCreated', result);
    }
  });
  socket.on('readAllEvents', async (acknowledge) => {
    let err;
    let result;

    result = await db.readAllEvents();

    if (!result) err = `Could not find any blog posts.`;

    acknowledge(err, result);
  });
  socket.on('updateEvent', async (event, acknowledge) => {
    let err;
    let result;
    if (!await db.readEvent(event._id)) {
      err = `Could not find that event.`;
    } else {
      result = await db.updateEvent(event);
    }
    acknowledge(err, result);
  });
  socket.on('deleteEvent', async (_id, acknowledge) => {
    let err;
    let result;

    result = await db.deleteEvent(_id);

    if (!result) err = `Could not find the event to delete.`;

    acknowledge(err, result);
  });
  socket.on('deleteAllEvents', async (password, acknowledge) => {
    let err;
    let result;

    result = await db.deleteAllEvents(sanitize(password));
    if (result === true) {
       err = 'Incorrect password.';
    } else if (!result) err = `Could not find any events.`;

    acknowledge(err, result);
  });
  socket.on('submitEvent', async (event, acknowledge) => {

    let err;
    let successMessage;
    let result;

    if (!await db.readEvent(event._id)) {

      result = await db.createEvent(event);

      if(!result) {
        err = "An error occured during event creation.";
      } else {
        successMessage = `${result.title} has been added.`;
      }

    } else {

      result = await db.updateEvent(event);

      if (!result) {
        err = "event update failed.";
      } else {
        successMessage = `${result.title} has been updated.`;
      }
    }

    acknowledge(err, successMessage, result);
  });
});

server.listen(port, () => {console.log(`http server listening on port ${port}`)});
