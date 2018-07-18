import moment from 'moment';

const checkMyEventForExpiry = (socket, user, setUser, setMyEvent) => {

  const event = user.hostedEvents[0];

  if (moment(event.expiresAt).isBefore(moment())) {
    socket.emit('deleteHostedEventFromUser', {user, event}, (err, userWithDeletedHostedEvent) => {

      // socket.emit('addAttendingEventToUser', {user: userWithDeletedHostedEvent, event}, (err, updatedUser) => {
      //   console.log('added attending');

        setMyEvent({});
        setUser(userWithDeletedHostedEvent);
        socket.emit('setCurrentUser', user, () => {
        });
      // });
    });
  };
};

export {checkMyEventForExpiry as default};
