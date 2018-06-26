const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const updateAttendingEventOnUser = (user, event) => {
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
        attendingEvents: user.attendingEvents.map((attendingEvent) => {
          if (JSON.stringify(attendingEvent._id) === JSON.stringify(event._id)) {
            foundAMatch = true;
            return event;
          } else {
            return attendingEvent;
          }
        })
      }
    }, { new: true }).then((res) => {
      if (foundAMatch === true) {
        resolve({ err: null, res });
      } else {
        resolve({ err: 'That event could not be found', res });
      }
    }).catch((err) => resolve({ err: {err, user, event}, res: null }));
  });
};

module.exports = { updateAttendingEventOnUser };
