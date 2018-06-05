const mongoose = require('../mongoose.js');
const { User } = require('../../models/User.js');

const readUser = async ( _id ) => {
  const res = await User.findOne({ _id });

  if (!res) return false;
  return res;
};
const readAllUsers = async () => {
  const res = await User.find();
  if (!res || !res[0]) return false;
  return res;
};

module.exports = {
  readUser,
  readAllUsers
};
