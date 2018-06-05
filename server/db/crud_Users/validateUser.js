const mongoose = require('mongoose');
const { User } = require('../../models/User');

const validateUser = async (creds) => {

  const user = await User.findOne({ email: creds.email });

  if (!user) return {err: 'user could not be found.', user: undefined}
  if (user.password === creds.password) return {err: '', user};
  return {err: 'incorrect password.', user: undefined};
};

module.exports = { validateUser };
