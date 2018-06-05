const db = require('../db/crud_Users/_crud_Users');

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
    console.log('result in readUser:', result);

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

  socket.on('validateUser', async (creds, acknowledge) => {

    const {err, user} = await db.validateUser(creds);

    acknowledge(err, user);

  });

  socket.on('addEventToUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.addEventToUser(user, event);
    acknowledge(err, res);
  });

  socket.on('addUserToEvent', async ({user, event}, acknowledge) => {
    const {err, res} = await db.addUserToEvent(user, event);
    acknowledge(err, res);
  });

  socket.on('removeEventFromUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.removeEventFromUser(user, event);
    console.log('1:', err, res);
    acknowledge(err, res);
  });

  socket.on('removeUserFromEvent', async ({user, event}, acknowledge) => {
    const {err, res} = await db.removeUserFromEvent(user, event);
    console.log('2:', err, res);
    acknowledge(err, res);
  });
};

module.exports = {
  UserSocketListener
};
