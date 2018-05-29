const mongoose = require('../mongoose.js');
const moment = require('moment');

const { Event } = require('../../models/Event.js');

const updateEvent = async (event) => {

  const result = await Event.findOneAndUpdate(
    { _id: event._id },
    { $set: {
        title: event.title,
        place: event.place,
        expiresAt: event.expiresAt,
        expiresAtHour: event.expiresAtHour,
        expiresAtMinute: event.expiresAtMinute,
        expiresAtAM: event.expiresAtAM,
        minimumPeople: event.minimumPeople,
        maximumPeople: event.maximumPeople,
        notes: event.notes,
      }
    },
    { new: true }
  );
  if (!result) return false;
  return result;
}

module.exports = {
  updateEvent
};
