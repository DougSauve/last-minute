const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const moment = require('moment');

const { User } = require('../../models/User.js');


// returns Promise: {err, res}
const createUser = (user) => {

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

  let res = undefined;
  let err = undefined;

  return new Promise((resolve, reject) => {
    newUser.save().then((res) => resolve({ err: null, res }))
    .catch((err) => resolve({ err, res: null }));
  });
}

module.exports = {
  createUser,
};
