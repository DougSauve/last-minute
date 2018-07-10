const mongoose = require('mongoose');
const { User } = require('../../models/User');
const bcrypt = require('bcryptjs');

//finds a user by the email and checks if the specified password is a match. Returns the user if it is.
const validateUser = (creds) => {

  return new Promise(async (resolve, reject) => {
    User.findOne({ email: creds.email }).then((user) => {

      bcrypt.compare(creds.password, user.password, (err, match) => {
        if (!match) {
          resolve({ err: 'Incorrect password.', user: null });
        } else {
          resolve({ err: '', user });
        };
      });
    }).catch((err) => {
      resolve({ err: 'Email not found', user: null });
    });
  });
};

module.exports = { validateUser };
