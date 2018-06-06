const mongoose = require('mongoose');
const { User } = require('../../../models/User');

const removeHostedEventFromUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        hostedEvents: user.hostedEvents.filter((hostedEvent) => hostedEvent._id.toString() !== event._id.toString())
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) console.log("Event could not be removed. Please fire the system administrator.");

  console.log ('result in removeHostedEventFromUser', res);
  return {err, res};
};

module.exports = { removeHostedEventFromUser };
