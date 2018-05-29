const mongoose = require('../mongoose.js');
const { User } = require('../../models/User.js');

const deleteUser = async (_id) => {
  const res = await User.findOneAndRemove({_id});
  if (!res) return false;
  return res;
}

module.exports = {
  deleteUser,
};
