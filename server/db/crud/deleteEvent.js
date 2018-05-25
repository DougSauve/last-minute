const mongoose = require('../mongoose.js');
const {Event} = require('../../models/Event.js');

const deleteEvent = async (_id) => {
  const res = await Event.findOneAndRemove({_id});
  if (!res) return false;
  return res;
}
const deleteAllEvents = async (password) => {
  if (password = "good riddance") {
    const res = await Event.remove({});
    if (!res) return false;
    return res;
  } else {
    return true;
  }
}

module.exports = {
  deleteEvent,
  deleteAllEvents,
};
