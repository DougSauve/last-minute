const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const { User } = require('../../models/User.js');

const readUser = ( _id ) => {
  return new Promise((resolve, reject) => {
    User.findById(_id).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
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
