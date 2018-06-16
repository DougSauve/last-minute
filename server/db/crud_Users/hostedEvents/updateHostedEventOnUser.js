const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const updateHostedEventOnUser = (user, event) => {
  const eventToUpdate = {
    _id: event._id,
    createdBy: event.createdBy,
    location: event.location,
    address: event.address,
    title: event.title,
    place: event.place,
    expiresAt: event.expiresAt,
    expiresAtHour: event.expiresAtHour,
    expiresAtMinute: event.expiresAtMinute,
    expiresAtAM: event.expiresAtAM,
    attendees: event.attendees,
    minimumPeople: event.minimumPeople,
    maximumPeople: event.maximumPeople,
    notes: event.notes,
  };
  let foundAMatch = false;

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, {
      $set: {
        hostedEvents: user.hostedEvents.map((hostedEvent) => {
          if (hostedEvent._id.equals(event._id)) {
            foundAMatch = true;
            // console.log('match');
            return event;
          } else {
            // console.log('no match');
            return hostedEvent;
          }
        })
      }
    }, { new: true }).then((res) => {
      if (foundAMatch === true) {
        resolve({ err: null, res });
      } else {
        resolve({ err: 'That event could not be found', res });
      }
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = { updateHostedEventOnUser };
