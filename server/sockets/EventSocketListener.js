const db = require('../db/crud_Events/_crud_Events');

const EventSocketListener = (socket) => {

  socket.on('submitEvent', async ({user, event}, acknowledge) => {

    const readEventResult = await db.readEvent(event._id);
    const eventExists = readEventResult.res;

    if (!eventExists) {
      const {err, res} = await db.createEvent(event);
      acknowledge(err, res);
    } else {
      const {err, res} = await db.updateEvent(event);
      acknowledge(err, res);
    };
  });

  socket.on('readEvent', async (_id, acknowledge) => {
    const {err, res} = await db.readEvent(_id);
    acknowledge(err, res);
  });

  //this will change to 'read all events in user's area. Checking for age will become part of this.'
  socket.on('readAllEvents', async (acknowledge) => {
    let err;
    let result;

    result = await db.readAllEvents();

    if (!result) err = `Could not find any events.`;

    acknowledge(err, result);
  });

  socket.on('deleteEvent', async (_id, acknowledge) => {
    const {err, res} = await db.deleteEvent(_id);
    acknowledge(err, res);
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

  socket.on('addAttendeeToEvent', async ({attendee, event}, acknowledge) => {
    const {err, res} = await db.addAttendeeToEvent(attendee, event);
    acknowledge(err, res);
  });

  socket.on('deleteAttendeeFromEvent', async ({attendee, event}, acknowledge) => {
    const {err, res} = await db.deleteAttendeeFromEvent(attendee, event);
    acknowledge(err, res);
  });
};

module.exports = {
  EventSocketListener
};
