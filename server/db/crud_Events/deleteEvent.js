const mongoose = require('../mongoose.js');
const {Event} = require('../../models/Event.js');

const deleteEvent = async (_id) => {
  const res = await Event.findOneAndRemove({_id});
  if (!res) return false;
  return res;
};

module.exports = {
  deleteEvent,
};
