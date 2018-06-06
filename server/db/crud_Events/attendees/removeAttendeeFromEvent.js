const mongoose = require('mongoose');
const { Event } = require('../../../models/Event');

const removeAttendeeFromEvent = async (user, event) => {

  console.log('user', user);
    console.log('event', event);

  const res = await Event.findOneAndUpdate(
    { _id: event._id },
    {
      $set: {
        attendees: event.attendees.filter((attendee) => attendee._id !== user._id)
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.title) err = "Event could not be removed. Please fire the system administrator.";

  console.log ('result', res);
  return {err, res};
};

module.exports = { removeAttendeeFromEvent };
