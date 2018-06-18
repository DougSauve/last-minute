const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const {ObjectID} = require('mongodb');
const moment = require('moment');

const { Event } = require('../../models/Event.js');
const createEvent = async (event) => {
  const newEvent = new Event({
    _id: (event._id) ? event._id : new ObjectID(),
    createdBy: event.createdBy,
    location: event.location,
    address: event.address,
    title: event.title,
    place: event.place,
    createdAt: (process.env.NODE_ENV === 'test') ? event.createdAt : new moment().format(),
    expiresAt: event.expiresAt,
    expiresAtHour: event.expiresAtHour,
    expiresAtMinute: event.expiresAtMinute,
    expiresAtAM: event.expiresAtAM,
    attendees: [event.createdBy],
    minimumPeople: event.minimumPeople,
    maximumPeople: event.maximumPeople,
    notes: event.notes,
  });
  return new Promise((resolve, reject) => {
    newEvent.save().then((res) => {
      resolve({ err: null, res });
    }).catch((err) => {
      resolve({ err, res: null });
    });
  });
}

module.exports = {
  createEvent
};
