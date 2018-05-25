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

// Figure out how to make timestamps appear human-readable - to the hour would be good. Write my own logic for this? That would be fun. :)

}
// const updateName = async (name, content) => {
//
//   console.log(`Start: name is ${name} and new name is ${content}.`);
//
//   result = await Post.findOneAndUpdate(
//     { name },
//     { $set: { name: content, editedAt: new moment().valueOf() } },
//     { new: true }
//   );
//   if (!result) return false;
//   return result;
//
// }

module.exports = {
  updateEvent
};
