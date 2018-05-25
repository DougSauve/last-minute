const { createEvent } = require('./createEvent');
const { readEvent, readAllEvents } = require('./readEvent');
const { updateEvent } = require('./updateEvent');
const { deleteEvent, deleteAllEvents } = require('./deleteEvent');

module.exports = {
  createEvent,
  readEvent,
  readAllEvents,
  updateEvent,
  deleteEvent,
  deleteAllEvents,
};
