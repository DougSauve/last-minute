const mongoose =require('../../mongoose');
const { User } = require('../../../models/User');

const addAttendingEventToUser = (user, event) => {

  console.log(user);

  return new Promise((resolve, reject) => {
    User.findById(user._id).then((err, user) => {
      console.log(err);
      console.log('user', user);
      resolve({err: err, res: user});
    });

    // User.findOneAndUpdate(
    //   { _id: user._id },
    //   {
    //     $set: {
    //       attendingEvents: user.attendingEvents.concat({
    //         _id: event._id,
    //         createdBy: event.createdBy,
    //         location: event.location,
    //         address: event.address,
    //         title: event.title,
    //         place: event.place,
    //         expiresAt: event.expiresAt,
    //         expiresAtHour: event.expiresAtHour,
    //         expiresAtMinute: event.expiresAtMinute,
    //         expiresAtAM: event.expiresAtAM,
    //         attendees: event.attendees,
    //         minimumPeople: event.minimumPeople,
    //         maximumPeople: event.maximumPeople,
    //         notes: event.notes,
    //       })
    //     }
    //   },
    //   { new: true },
    //   () => {
    //
    //   }
    // );

  });
};

module.exports = { addAttendingEventToUser };
