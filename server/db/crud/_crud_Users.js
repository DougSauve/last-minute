const { createUser } = require('./createUser');
const { readUser, readAllUsers } = require('./readUser');
const { updateUser } = require('./readUser');
const { deleteUser } = require('./deleteUser');

module.exports = {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
};
