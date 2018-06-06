const mongoose = require('mongoose');
const { User } = require('../../../models/User');

const addHostedEventToUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        hostedEvents: user.hostedEvents.concat({
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
        }),
        meetingPlaces: user.meetingPlaces.concat({
          name: event.place,
          location: event.location,
          address: event.address,
        })
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) err = "Update could not be completed. Please fire the system administrator.";
  console.log('result in addhostedevent:', result);
  return {err, res};
};

module.exports = { addHostedEventToUser };
