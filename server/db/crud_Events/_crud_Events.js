const { createEvent } = require('./createEvent');
const { readEvent, readAllEvents } = require('./readEvent');
const { updateEvent } = require('./updateEvent');
const { deleteEvent } = require('./deleteEvent');

module.exports = {
  createEvent,
  readEvent,
  readAllEvents,
  updateEvent,
  deleteEvent,
};
