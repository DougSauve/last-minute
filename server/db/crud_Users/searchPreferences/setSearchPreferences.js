const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const setSearchPreferences = (user, distance, units) => {

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, {
      $set: {
        searchPreferences: { distance, units }
      }
    }, { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err: {err, user, distance, units}, res: null }));
  });
};

module.exports = { setSearchPreferences };
