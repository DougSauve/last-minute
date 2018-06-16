const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const {Event} = require('../../models/Event.js');

const deleteEvent = async (_id) => {
  return new Promise((resolve, reject) => {
    Event.findOneAndRemove({_id}).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = {
  deleteEvent,
};
