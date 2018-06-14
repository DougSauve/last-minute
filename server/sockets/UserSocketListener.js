const db = require('../db/crud_Users/_crud_Users');

const UserSocketListener = (socket) => {

  socket.on('createUser', async (user, acknowledge) => {

    // add event to DB
    const {err, res} = await db.createUser(user);
    acknowledge(err, res);
  });

  socket.on('readUser', async (_id, acknowledge) => {

    const {err, res} = await db.readUser(_id);
    acknowledge(err, res);
  });

  socket.on('readAllUsers', async (acknowledge) => {

    const {err, res} = await db.readAllUsers();
    acknowledge(err, result);
  });

  socket.on('updateUser', async (user, acknowledge) => {
  let err, res;
    if (!await db.readUser(user._id)) {
      err = 'Could not find the specified user.';
    } else {
      const {err, res} = await db.updateUser(user);
    }
    acknowledge(err, res);
  });

  socket.on('deleteUser', async (_id, acknowledge) => {
    const {err, res} = await db.deleteUser(_id);
    acknowledge(err, res);
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
