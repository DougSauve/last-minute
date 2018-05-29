const mongoose = require('../mongoose.js');
const moment = require('moment');
const { Event } = require('../../models/Event.js');

const readEvent = async ( _id ) => {
  const res = await Event.findOne({ _id });

  if (!res) return false;
  return res;
};

const readAllEvents = async () => {
  const res = await Event.find();

  //for each item in res, removeExpiredEvent, which needs to hit the db as well as res.
  await removeExpiredEvents(res);

  if (!res || !res[0]) return false;
  return res;
};

const removeExpiredEvents = async (res) => {

  res.forEach((event) => {
    console.log('events are cool'); //working :)
  });

  //go through the list from the beginning and check to see if expiresAt is older than new moment. If it is, remove it.
  //or... I can instead check each one's expiry date as it gets chosen to show to a user. If it's too old, discard it.
  //
};

module.exports = {
  readEvent,
  readAllEvents
};
