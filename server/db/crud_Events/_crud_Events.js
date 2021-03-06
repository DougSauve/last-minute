const { createEvent } = require('./createEvent');
const { readEvent, readAllEvents } = require('./readEvent');
const { updateEvent } = require('./updateEvent');
const { deleteEvent } = require('./deleteEvent');

const { addAttendeeToEvent } = require('./attendees/addAttendeeToEvent');
const { deleteAttendeeFromEvent } = require('./attendees/deleteAttendeeFromEvent');

module.exports = {
  createEvent,
  readEvent,
  readAllEvents,
  updateEvent,
  deleteEvent,

  addAttendeeToEvent,
  deleteAttendeeFromEvent,
};
