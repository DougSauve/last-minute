const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');

const { User } = require('../../models/User.js');

// returns Promise: {err, res}
const updateUser = async (user) => {

  const userWithChanges = {
    name: user.name,
    email: user.email,
    password: user.password,
    ageRange: user.ageRange,
    gender: user.gender,

    ageRangeCanChangeAt: user.ageRangeCanChangeAt,
    accountCreatedAt: user.accountCreatedAt,
    meetingPlaces: user.meetingPlaces,
    flags: user.flags,
    tokens: user.tokens,
  };

  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(user._id, {$set: userWithChanges}, { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = {
  updateUser
};
