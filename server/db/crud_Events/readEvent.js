const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const moment = require('moment');
const { Event } = require('../../models/Event.js');

const readEvent = ( _id ) => {
  return new Promise((resolve, reject) => {
    Event.findOne({ _id }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

const readAllEvents = async () => {
  const res = await Event.find();

  //for each item in res, removeExpiredEvent, which needs to hit the db as well as res.
  await removeExpiredEvents(res);

  if (!res || !res[0]) return false;
  return res;
};

const removeExpiredEvents = async (res) => { //currently a counter
  let count = 1;
  res.forEach((event) => {
    count++
  });

  console.log(`There are ${count} events in the db.`);
  //go through the list from the beginning and check to see if expiresAt is older than new moment. If it is, remove it.
  //or... I can instead check each one's expiry date as it gets chosen to show to a user. If it's too old, discard it.
  //
};

module.exports = {
  readEvent,
  readAllEvents
};
