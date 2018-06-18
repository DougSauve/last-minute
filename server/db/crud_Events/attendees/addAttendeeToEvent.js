const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { Event } = require('../../../models/Event');

const addAttendeeToEvent = async (attendee, event) => {
  return new Promise((resolve, reject) => {
    Event.findOneAndUpdate(
      { _id: event._id },
      {
        $set: {
          ...event,
          attendees: event.attendees.concat({
            _id: attendee._id,
            name: attendee.name,
            ageRange: attendee.ageRange,
            gender: attendee.gender,
          })
        }
      },
      { new: true }
    ).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = { addAttendeeToEvent };
