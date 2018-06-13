const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const { User } = require('../../models/User.js');

const deleteUser = (_id) => {
  return new Promise ((resolve, reject) => {
    User.findOneAndRemove({_id}).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = {
  deleteUser,
};
