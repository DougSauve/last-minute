const mongoose = require('mongoose');
const { Event } = require('../../../models/Event');

const deleteAttendeeFromEvent = (attendeeToDelete, event) => {

  return new Promise((resolve, reject) => {
    Event.findOneAndUpdate(
      { _id: event._id },
      {
        $set: {
          attendees: event.attendees.filter((attendee) => {
            if (JSON.stringify(attendee._id) === JSON.stringify(attendeeToDelete._id)) {
              // console.log('match');
              return false; //delete it
            }else{
              // console.log('no match');
              return true; //keep it
            }
          })
        }
      },
      { new: true }
    ).then((res) => {
      resolve({ err: null, res });
    }).catch((err) => resolve({ err, res: null }));

  });

};

module.exports = { deleteAttendeeFromEvent };
