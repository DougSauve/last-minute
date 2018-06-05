const { createUser } = require('./createUser');
const { readUser, readAllUsers } = require('./readUser');
const { updateUser } = require('./updateUser');
const { deleteUser } = require('./deleteUser');
const { validateUser } = require('./validateUser');
const { addEventToUser, addHostedEventToUser, addUserToEvent, removeEventFromUser, removeHostedEventFromUser, removeUserFromEvent } = require('./joinEvent');

module.exports = {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
  validateUser,
  addEventToUser,
  addHostedEventToUser,
  addUserToEvent,
  removeEventFromUser,
  removeHostedEventFromUser,
  removeUserFromEvent,
};
