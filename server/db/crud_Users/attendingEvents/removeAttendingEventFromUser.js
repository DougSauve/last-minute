const mongoose = require('mongoose');
const { User } = require('../../../models/User');

const removeAttendingEventFromUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        attendingEvents: user.attendingEvents.filter((attendingEvent) => attendingEvent._id.toString() !== event._id.toString())
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) err = "Event could not be removed. Please fire the system administrator.";

  console.log ('result', res);
  return {err, res};
};

module.exports = { removeAttendingEventFromUser };
