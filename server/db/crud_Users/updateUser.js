const mongoose = require('../mongoose.js');
const moment = require('moment');

const { User } = require('../../models/User.js');

const updateUser = async (user) => {

  const result = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        name: user.name,
        email: user.email,
        password: user.password,
        ageRange: user.ageRange,
        gender: user.gender,

        accountCreatedAt: user.accountCreateAt,
        meetingPlaces: user.meetingPlaces,
        flags: user.flags,
        tokens: user.tokens,
      }
    },
    { new: true }
  );
  if (!result) return false;
  return result;
}

module.exports = {
  updateUser
};
