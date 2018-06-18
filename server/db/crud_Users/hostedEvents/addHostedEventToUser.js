const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const addHostedEventToUser = (user, event) => {
  const eventToAdd = {
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
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, { $set: { ...user,
      hostedEvents: user.hostedEvents.concat(eventToAdd),
     } }, { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = { addHostedEventToUser };
