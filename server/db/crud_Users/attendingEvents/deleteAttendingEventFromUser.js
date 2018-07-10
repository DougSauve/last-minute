const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const deleteAttendingEventFromUser = (user, event) => {

  let foundAMatch = false;

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, {
      $set: {
        attendingEvents: user.attendingEvents.filter((attendingEvent) => {
          if (JSON.stringify(attendingEvent._id) === JSON.stringify(event._id)) {
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
        resolve({ err: 'That event could not be found: deleteAttendingEventOnUser', res });
      }
    }).catch((err) => {
      resolve({ err, res: null });
    });
  });
};

module.exports = { deleteAttendingEventFromUser };
