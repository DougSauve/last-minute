const mongoose = require('mongoose');
const { User } = require('../../models/User');

//finds a user by the email and checks if the specified password is a match. Returns the user if it is.
const validateUser = (creds) => {

  return new Promise(async (resolve, reject) => {
    User.findOne({ email: creds.email }).then((user) => {
      if (user.password === creds.password) resolve({ err: '', user });
      resolve({ err: 'Incorrect password.', user: null });
    }).catch((err) => {
      resolve({ err: 'Email not found', user: null });
    });
  });
};

module.exports = { validateUser };
