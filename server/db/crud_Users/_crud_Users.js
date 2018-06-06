const { createUser } = require('./createUser');
const { readUser, readAllUsers } = require('./readUser');
const { updateUser } = require('./updateUser');
const { deleteUser } = require('./deleteUser');

const { validateUser } = require('./validateUser');

const { addAttendingEventToUser } = require('./attendingEvents/addAttendingEventToUser');
const { updateAttendingEventOnUser } = require('./attendingEvents/updateAttendingEventOnUser');
const { removeAttendingEventFromUser } = require('./attendingEvents/removeAttendingEventFromUser');

const { addHostedEventToUser } = require('./hostedEvents/addHostedEventToUser');
const { updateHostedEventOnUser } = require('./hostedEvents/updateHostedEventOnUser');
const { removeHostedEventFromUser } = require('./hostedEvents/removeHostedEventFromUser');

module.exports = {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,

  validateUser,

  addAttendingEventToUser,
  updateAttendingEventOnUser,
  removeAttendingEventFromUser,

  addHostedEventToUser,
  updateHostedEventOnUser,
  removeHostedEventFromUser,
};
