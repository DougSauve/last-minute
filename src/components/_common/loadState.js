const loadState = (socket, setUser, setMyEvent, setEvents) => {
  let user;
  let myEvent;

  return new Promise((resolve, reject) => {

    Promise.all([
      getUserFromSession(socket, setUser),
      getMyEventFromSession(socket, setMyEvent),
      getAllEventsFromDB(socket, setEvents)
    ])
    .then( async (res) => {
      user = res[0];
      myEvent = res[1];

      if (!myEvent.title) {
        myEvent = await getMyEventFromDB(socket, setMyEvent, user);
      };

      await setMyEvent(myEvent);
      resolve();
    });
  });
};

const getUserFromSession = (socket, setUser) => {
  return new Promise((resolve, reject) => {
    socket.emit('getCurrentUser', async (userFromSession) => {
      if (!userFromSession) reject(window.location.pathname = '/');
      await setUser(userFromSession);
      resolve(userFromSession);
    });
  });
};
const getMyEventFromSession = (socket, setMyEvent) => {
  return new Promise((resolve, reject) => {
    socket.emit('getMyEvent', async (myEvent) => {
      if (!myEvent) resolve({});
      resolve(myEvent);
    });
  });
};
const getMyEventFromDB = (socket, setMyEvent, sessionUser) => {
  return new Promise((resolve, reject) => {
    socket.emit('readUser', sessionUser._id, async (err, user) => {
      if (err) resolve(err);
      if (user.hostedEvents[0]) {
        resolve(user.hostedEvents[0]);
      } else {
        resolve({});
      }
    });
  });
};
const getAllEventsFromDB = (socket, setEvents) => {
  return new Promise((resolve, reject) => {
    socket.emit('readAllEvents', async (err, res) => {
      if (err) resolve(err)
      await setEvents(res);
      resolve(true);
    });
  });
};

module.exports = {
  loadState,
  getAllEventsFromDB
}
