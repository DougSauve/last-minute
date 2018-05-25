const mongoose = require('../mongoose.js');
const { Event } = require('../../models/Event.js');

const readEvent = async ( _id ) => {
  const res = await Event.findOne({ _id });
  
  if (!res) return false;
  return res;
};
const readAllEvents = async () => {
  const res = await Event.find();
  if (!res || !res[0]) return false;
  return res;
};

module.exports = {
  readEvent,
  readAllEvents
};
