const { createUser } = require('./createUser');
const { readUser, readAllUsers } = require('./readUser');
const { updateUser } = require('./updateUser');
const { updatePassword } = require('./updatePassword');
const { deleteUser } = require('./deleteUser');

const { validateUser } = require('./validateUser');

const { addAttendingEventToUser } = require('./attendingEvents/addAttendingEventToUser');
const { updateAttendingEventOnUser } = require('./attendingEvents/updateAttendingEventOnUser');
const { deleteAttendingEventFromUser } = require('./attendingEvents/deleteAttendingEventFromUser');

const { addHostedEventToUser } = require('./hostedEvents/addHostedEventToUser');
const { updateHostedEventOnUser } = require('./hostedEvents/updateHostedEventOnUser');
const { deleteHostedEventFromUser } = require('./hostedEvents/deleteHostedEventFromUser');

const { addMeetingPlaceToUser } = require('./meetingPlaces/addMeetingPlaceToUser');
const { deleteMeetingPlaceFromUser } = require('./meetingPlaces/deleteMeetingPlaceFromUser');

const { addHomeLocationToUser } = require('./homeLocations/addHomeLocationToUser');
const { deleteHomeLocationFromUser } = require('./homeLocations/deleteHomeLocationFromUser');

const { setCurrentHomeLocation } = require('./currentHomeLocation/setCurrentHomeLocation');

const { setSearchPreferences } = require('./searchPreferences/setSearchPreferences');

module.exports = {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  updatePassword,
  deleteUser,

  validateUser,

  addAttendingEventToUser,
  updateAttendingEventOnUser,
  deleteAttendingEventFromUser,

  addHostedEventToUser,
  updateHostedEventOnUser,
  deleteHostedEventFromUser,

  addMeetingPlaceToUser,
  deleteMeetingPlaceFromUser,

  addHomeLocationToUser,
  deleteHomeLocationFromUser,

  setCurrentHomeLocation,

  setSearchPreferences,
};
