const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const deleteAttendingEventFromUser = (user, event) => {

  let foundAMatch = false;

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, {
      $set: {
        attendingEvents: user.attendingEvents.filter((attendingEvent) => {
          if (attendingEvent._id.equals(event._id)) {
            foundAMatch = true;
            // console.log('match');
            return false;
          } else {
            // console.log('no match');
            return true;
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

module.exports = { deleteAttendingEventFromUser };
