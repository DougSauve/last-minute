const db = require('../db/crud/_crud_Events');

const EventSocketListener = (socket) => {

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
  //this will change to 'read all events in user's area. Checking for age will become part of this.'
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
};

module.exports = {
  EventSocketListener
};
