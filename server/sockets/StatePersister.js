const state = {
  user: undefined,
  myEvent: undefined,
  firstTimeUser: false,
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

  socket.on('setFirstTimeUser', () => {
    state.firstTimeUser = true;
  });
  socket.on('unsetFirstTimeUser', () => {
    state.firstTimeUser = false;
  });

  socket.on('checkFirstTimeUser', (acknowledge) => {
    acknowledge(state.firstTimeUser);
  });
}

module.exports = {
  StatePersister
};
