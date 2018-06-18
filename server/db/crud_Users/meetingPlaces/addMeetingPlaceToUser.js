const mongoose = (process.env.NODE_ENV === 'test') ? require('../../mongoose_testing') : require('../../mongoose');
const { ObjectID } = require('mongodb');
const { User } = require('../../../models/User');


const addMeetingPlaceToUser = (user, meetingPlace) => {
  const meetingPlaceToAdd = {
    _id: (meetingPlace._id) ? meetingPlace._id : new ObjectID(),
    name: meetingPlace.name,
    location: meetingPlace.location,
    address: meetingPlace.address,
  };

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id },
      { $set: { ...user, meetingPlaces: user.meetingPlaces.concat(meetingPlaceToAdd) } },
      { new: true }).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));
  });
};

module.exports = { addMeetingPlaceToUser };
