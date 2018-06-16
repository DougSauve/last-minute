const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { Event } = require('../../../models/Event');

const addAttendeeToEvent = async (user, event) => {
  return new Promise((resolve, reject) => {
    Event.findOneAndUpdate(
      { _id: event._id },
      {
        $set: {
          attendees: event.attendees.concat({
            _id: user._id,
            name: user.name,
            ageRange: user.ageRange,
            gender: user.gender,
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
