const db = require('../db/crud_Users/_crud_Users');

const UserSocketListener = (socket) => {

  socket.on('createUser', async (user, acknowledge) => {
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

    const readUserResult = await db.readUser(user._id);
    const userExists = readUserResult.res;

    if (userExists) {
      const {err, res} = await db.updateUser(user);
      acknowledge(err, res);
    } else {
      acknowledge('could not find the specified user.', null);
    };
  });

  socket.on('deleteUser', async (_id, acknowledge) => {
    const {err, res} = await db.deleteUser(_id);
    acknowledge(err, res);
  });

  socket.on('validateUser', async (creds, acknowledge) => {
    const {err, user} = await db.validateUser(creds);
    acknowledge(err, user);
  });

  socket.on('addAttendingEventToUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.addAttendingEventToUser(user, event);
    acknowledge(err, res);
  });

  socket.on('updateAttendingEventOnUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.updateAttendingEventOnUser(user, event);
    acknowledge(err, res);
  });

  socket.on('deleteAttendingEventFromUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.deleteAttendingEventFromUser(user, event);
    acknowledge(err, res);
  });

  socket.on('addHostedEventToUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.addHostedEventToUser(user, event);
    acknowledge(err, res);
  });

  socket.on('updateHostedEventOnUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.updateHostedEventOnUser(user, event);
    acknowledge(err, res);
  });

  socket.on('deleteHostedEventFromUser', async ({user, event}, acknowledge) => {
    const {err, res} = await db.deleteHostedEventFromUser(user, event);
    acknowledge(err, res);
  });

  socket.on('addMeetingPlaceToUser', async ({user, meetingPlace}, acknowledge) => {
    const {err, res} = await db.addMeetingPlaceToUser(user, meetingPlace);
    acknowledge(err, res);
  });

  socket.on('deleteMeetingPlaceFromUser', async ({user, _id}, acknowledge) => {
    const {err, res} = await db.deleteMeetingPlaceFromUser(user, _id);
    acknowledge(err, res);
  });

  socket.on('addHomeLocationToUser', async ({user, homeLocation}, acknowledge) => {
    const {err, res} = await db.addHomeLocationToUser(user, homeLocation);
    acknowledge(err, res);
  });

  socket.on('deleteHomeLocationFromUser', async ({user, _id}, acknowledge) => {
    const {err, res} = await db.deleteHomeLocationFromUser(user, _id);
    acknowledge(err, res);
  });
};

module.exports = {
  UserSocketListener
};
