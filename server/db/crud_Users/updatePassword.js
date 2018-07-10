const mongoose = (process.env.NODE_ENV === 'test') ? require('../mongoose_testing') : require('../mongoose');
const bcrypt = require('bcryptjs');

const { User } = require('../../models/User.js');

const updatePassword = async (user, password) => {

  const hashedPassword = await generatePassword(password);

  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(user._id, {$set: { password: hashedPassword } }, { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

const generatePassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash);
      });
    });
  }).catch((e) => reject(e));
};

module.exports = {
  updatePassword
};
