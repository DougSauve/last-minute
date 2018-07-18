import moment from 'moment';

const cleanEventsList = (socket) => {
  return new Promise((resolve, reject) => {
    socket.emit('readAllEvents', (err, res) => {

      let skipRemainder = false;
      let eventRemoved = false;

      if (res.length === 0) resolve(false);

      const resLength = res.length - 1;

      res.forEach((event, index) => {
        if (skipRemainder) return;

        if (moment(event.expiresAt).isBefore(moment())) {
          // future archiving here
          eventRemoved = true;

          socket.emit('deleteEvent', event._id, (err, res) => {
            (index === resLength) && resolve(eventRemoved);
            return;
          });
        } else {
          skipRemainder = true;
          (index === resLength) && resolve(eventRemoved);
          return;
        }
      });
    });
  });
};

export { cleanEventsList as default };
