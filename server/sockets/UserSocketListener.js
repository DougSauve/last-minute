const db = require('../db/crud/_crud_Users');

const UserSocketListener = (socket) => {

  socket.on('createUser', async (user, acknowledge) => {

    let err;
    let result;
    // add event to DB
    result = await db.createUser(user);

    if(!result) err = "An error occured during user creation.";
    acknowledge(err, result);
  });

  socket.on('readUser', async (_id, acknowledge) => {
    let err;
    let result;

    result = await db.readUser(_id);

    if (!result) err = `Could not find the specified user.`;

    acknowledge(err, result);
  });

  socket.on('readAllUsers', async (acknowledge) => {
    let err;
    let result;

    result = await db.readAllUsers();

    if (!result) err = `Could not find any users.`;

    acknowledge(err, result);
  });

  socket.on('updateUser', async (user, acknowledge) => {
    let err;
    let result;

    if (!await db.readUser(user._id)) {
      err = 'Could not find the specified user.';
    } else {
      result = await db.updateUser(user);
    }
    acknowledge(err, result);
  });

  socket.on('deleteUser', async (_id, acknowledge) => {
    let err;
    let result;

    result = await db.deleteUser(_id);

    if (!result) err = `Could not find the user to delete.`;

    acknowledge(err, result);
  });
};

module.exports = {
  UserSocketListener
};
