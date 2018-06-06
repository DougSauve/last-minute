const mongoose = require('mongoose');
const { Event } = require('../../../models/Event');

const addAttendeeToEvent = async (user, event) => {

  const res = await Event.findOneAndUpdate(
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
  );

  let err = null;

  if (!res.title) err = "Update could not be completed. Please fire the system administrator.";

  console.log ('result', res);
  return {err, res};
};

module.exports = { addAttendeeToEvent };
