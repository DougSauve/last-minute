const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const moment = require('moment');

const { User } = require('../../models/User.js');

const createUser = (user) => {

  const newUser = new User({
    _id: (user._id) && user._id,
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
    .catch((err) => {
      console.log(err);
      console.log(err.message);
      if (err.message.includes('duplicate key error') && err.message.includes('email')) {
        resolve({ err: 'Email already in use. Please use a different email address.'})
      };
      resolve({ err: 'Error while creating user', res: null });
    });
  });
}

module.exports = {
  createUser,
};
