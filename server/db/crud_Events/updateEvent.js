const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const moment = require('moment');

const { Event } = require('../../models/Event.js');

const updateEvent = async (event) => {
  return new Promise((resolve, reject) => {
    Event.findOneAndUpdate(
      { _id: event._id },
      { $set:
        {
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
    ).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = {
  updateEvent
};
