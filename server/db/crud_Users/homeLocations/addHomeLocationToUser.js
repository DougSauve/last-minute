const { ObjectID } = require('mongodb');

const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const addHomeLocationToUser = (user, homeLocation) => {
  const homeLocationToAdd = {
    _id: (homeLocation._id) ? homeLocation._id : new ObjectID(),
    name: homeLocation.name,
    location: homeLocation.location,
    address: homeLocation.address,
  };

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id },
      { $set: { ...user, homeLocations: user.homeLocations.concat(homeLocationToAdd) } },
      { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = { addHomeLocationToUser };
