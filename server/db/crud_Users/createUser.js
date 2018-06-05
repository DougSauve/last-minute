const mongoose = require('../mongoose.js');
const moment = require('moment');

const { User } = require('../../models/User.js');

const createUser = async (user) => {

  const newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
    ageRange: user.ageRange,
    gender: user.gender,

    accountCreatedAt: new moment().format(),
    meetingPlaces: [],
    flags: [],
    tokens: [],
  });

  let res = newUser;
  await newUser.save((err) => {
    if (err) {
      console.log(err);
      res = false;
    }
  })

  return res;
}

module.exports = {
  createUser,
};
