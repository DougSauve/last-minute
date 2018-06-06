const mongoose = require('mongoose');
const { User } = require('../../../models/User');

const updateAttendingEventOnUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        attendingEvents: user.attendingEvents.map((attendingEvent) => {
            if (attendingEvent._id.equals(event._id)) {
              attendingEvent = {
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
            }

            return attendingEvent;
        })
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) err = "Update could not be completed. Please fire the system administrator.";

  return {err, res};
};

  module.exports = { updateAttendingEventOnUser };
