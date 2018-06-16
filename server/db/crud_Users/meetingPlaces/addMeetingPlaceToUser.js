const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { User } = require('../../../models/User');

const addMeetingPlaceToUser = (user, meetingPlace) => {
  const meetingPlaceToAdd = {
    _id: meetingPlace._id,
    name: meetingPlace.createdBy,
    location: meetingPlace.location,
    address: meetingPlace.address,
  };

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id },
      { $set: { meetingPlaces: user.meetingPlaces.concat(meetingPlaceToAdd) } },
      { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = { addMeetingPlaceToUser };
