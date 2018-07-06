const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const setCurrentHomeLocation = (user, homeLocation) => {
  const currentHomeLocation = {
    _id: homeLocation._id,
    name: homeLocation.name,
    location: homeLocation.location,
    address: homeLocation.address,
  };
  let foundAMatch = false;

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, {
      $set: {
        currentHomeLocation,
      }
    }, { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err: {err, user, homeLocation}, res: null }));
  });
};

module.exports = { setCurrentHomeLocation };
