const state = {
  user: undefined,
  myEvent: undefined,
};

const StatePersister = (socket) => {

  socket.on('setCurrentUser', (user, ack) => {
    state.user = user;
    ack();
   });

  socket.on('getCurrentUser', (acknowledge) => acknowledge(state.user));

  socket.on('setMyEvent', (event) => {
    state.myEvent = event;
  });
  socket.on('getMyEvent', (acknowledge) => acknowledge(state.myEvent));
}

module.exports = {
  StatePersister
};
